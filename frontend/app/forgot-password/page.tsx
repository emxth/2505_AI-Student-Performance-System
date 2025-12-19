'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import api from '@/lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/forgotpassword', { email });
      
      if (response.data.success) {
        toast.success('Password reset email sent! Check your inbox.');
        setEmailSent(true);
      } else {
        toast.error(response.data.message || 'Failed to send reset email');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Reset Your Password
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        {emailSent ? (
          <div className="p-6 text-center border border-green-200 rounded-lg bg-green-50">
            <div className="mb-2 font-semibold text-green-600">
              Email Sent Successfully!
            </div>
            <p className="mb-4 text-gray-700">
              Check your email for a password reset link. The link will expire in 10 minutes.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setEmailSent(false);
                  setEmail('');
                }}
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Send Another Reset Link
              </button>
              <Link
                href="/login"
                className="block w-full px-4 py-2 text-center text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Back to Login
              </Link>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>

            <div className="space-y-2 text-center">
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Back to Login
              </Link>
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link
                  href="/login?register=true"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        )}

        <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
          <h3 className="mb-1 text-sm font-medium text-yellow-800">
            <span className="inline-block mr-2">💡</span> Need help?
          </h3>
          <ul className="space-y-1 text-xs text-yellow-700 list-disc list-inside">
            <li>Check your spam folder if you don&apos;t see the email</li>
            <li>Ensure you&apos;re using the email associated with your account</li>
            <li>Reset links expire in 10 minutes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}