import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

export function ForgotUsername() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // In Supabase, the username is the email, so we're essentially doing the same
      // operation as a password reset, but with a different UI message
      const { error } = await resetPassword(email);

      if (error) {
        throw error;
      }

      setStatus('success');
    } catch (err) {
      console.error('Username recovery error:', err);
      setStatus('error');
      setErrorMessage(
        err instanceof Error 
          ? err.message 
          : 'An error occurred while sending the recovery email.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Recover your username</h1>
          <p className="mt-2 text-gray-600">
            Enter your email address and we'll send you your account information
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          {status === 'success' ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Check your email</h2>
              <p className="text-gray-600 mb-6">
                We've sent your account information to <strong>{email}</strong> from National Mover Bureau. 
                Please check your inbox for instructions on how to access your account.
              </p>
              <p className="text-sm text-gray-500 mb-4">
                If you don't see the email, check your spam folder or make sure you entered the correct email address.
              </p>
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Return to login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && (
                <div className="p-4 bg-red-50 text-red-600 rounded-md flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'Recover username'}
              </Button>

              <div className="text-center">
                <Link to="/login" className="text-sm text-blue-600 hover:text-blue-500 flex items-center justify-center gap-1">
                  <ArrowLeft className="w-4 h-4" />
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remember your username?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}