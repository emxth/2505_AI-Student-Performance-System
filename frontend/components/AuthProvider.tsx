"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  isAuthenticated,
  getUser,
  setUser as saveUser,
  removeAuthToken,
} from "@/lib/auth";
import api from "@/lib/api";
import {
  AuthContextType,
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async (): Promise<void> => {
      if (isAuthenticated()) {
        try {
          const savedUser = getUser();
          if (savedUser) {
            setUser(savedUser);
          } else {
            // Fetch user data from API
            const response = await api.get("/auth/me");
            setUser(response.data.user);
            saveUser(response.data.user);
          }
        } catch (error) {
          console.error("Failed to load user:", error);
          removeAuthToken();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (
    credentials: LoginCredentials
  ): Promise<AuthResponse> => {
    try {
      const response = await api.post("/auth/login", credentials);
      const { token, user } = response.data;

      if (typeof window !== "undefined") {
        localStorage.setItem("ai_student_token", token);
      }
      saveUser(user);
      setUser(user);

      return { success: true, token, user };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await api.post("/auth/register", userData);
      const { token, user } = response.data;

      if (typeof window !== "undefined") {
        localStorage.setItem("ai_student_token", token);
      }
      saveUser(user);
      setUser(user);

      return { success: true, token, user };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.errors?.[0]?.msg || "Registration failed",
      };
    }
  };

  const logout = (): void => {
    removeAuthToken();
    setUser(null);
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
