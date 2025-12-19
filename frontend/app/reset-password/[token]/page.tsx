'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import api from '@/lib/api';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [validToken, setValidToken] = useState<boolean | null>(null);
  const [token, setToken] = useState<string>('');
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params?.token) {
      setToken(params.token as string);
      // You could validate token here by making an API call
      setValidToken(true);
    }
  }, [params]);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await api.put(`/auth/resetpassword/${token}`, { password });
      
      if (response.data.success) {
        toast.success('Password reset successful! You can now login.');
        router.push('/login');
      } else {
        toast.error(response.data.message || 'Failed to reset password');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid or expired reset token');
    } finally {
      setLoading(false);
    }
  };

  if (validToken === false) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
        <div className="w-full max-w-md text-center">
          <div className="p-6 border border-red-200 rounded-lg bg-red-50">
            <div className="mb-4 text-4xl text-red-600">❌</div>
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              Invalid Reset Link
            </h2>
            <p className="mb-4 text-gray-700">
              This password reset link is invalid or has expired.
            </p>
            <Link
              href="/forgot-password"
              className="inline-block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Request New Reset Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Set New Password
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Create a new password for your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter new password"
                minLength={6}
              />
              <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Confirm new password"
                minLength={6}
              />
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>

            <Link
              href="/login"
              className="block w-full px-4 py-2 text-center text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Back to Login
            </Link>
          </div>

          <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
            <h3 className="mb-1 text-sm font-medium text-blue-800">
              <span className="inline-block mr-2">🔒</span> Password Tips
            </h3>
            <ul className="space-y-1 text-xs text-blue-700 list-disc list-inside">
              <li>Use at least 8 characters for better security</li>
              <li>Include numbers, uppercase and lowercase letters</li>
              <li>Avoid using personal information</li>
              <li>Don&apos;t reuse passwords from other sites</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}