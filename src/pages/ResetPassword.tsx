import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertCircle, Lock, CheckCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export function ResetPassword() {
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we have a valid session from the reset link
  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log('Checking session for password reset');
        console.log('URL:', window.location.href);
        
        // First, check if we have hash parameters (Supabase redirects with hash params)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type');
        
        console.log('Hash params:', { 
          hasAccessToken: !!accessToken, 
          hasRefreshToken: !!refreshToken, 
          type 
        });
        
        // If we have tokens in the URL hash, set the session
        if (accessToken && refreshToken && type === 'recovery') {
          try {
            console.log('Setting session from URL hash');
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            
            if (error) {
              console.error('Error setting session:', error);
              throw error;
            }
            
            console.log('Session set successfully');
            return;
          } catch (err) {
            console.error('Error setting session from URL:', err);
            setStatus('error');
            setErrorMessage('Invalid or expired password reset link. Please request a new one.');
            return;
          }
        }
        
        // If no tokens in URL hash, check if we have an existing session
        console.log('No tokens in URL hash, checking for existing session');
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setStatus('error');
          setErrorMessage('Invalid or expired password reset link. Please request a new one.');
          return;
        }
        
        if (!data.session) {
          console.error('No session found');
          setStatus('error');
          setErrorMessage('Invalid or expired password reset link. Please request a new one.');
          return;
        }
        
        console.log('Existing session found');
      } catch (err) {
        console.error('Error checking session:', err);
        setStatus('error');
        setErrorMessage('An error occurred while checking your session. Please try again.');
      }
    };
    
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Validate passwords
    if (password !== confirmPassword) {
      setStatus('error');
      setErrorMessage('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setStatus('error');
      setErrorMessage('Password must be at least 6 characters long');
      return;
    }

    try {
      console.log('Updating password');
      const { error } = await updatePassword(password);

      if (error) {
        console.error('Error updating password:', error);
        throw error;
      }

      console.log('Password updated successfully');
      setStatus('success');
      
      // Redirect to login after a delay
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      console.error('Password update error:', err);
      setStatus('error');
      setErrorMessage(
        err instanceof Error 
          ? err.message 
          : 'An error occurred while updating your password.'
      );
    }
  };

  if (status === 'error' && errorMessage === 'Invalid or expired password reset link. Please request a new one.') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">Invalid Reset Link</h2>
            <p className="text-gray-600 mb-6">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Button 
              onClick={() => navigate('/forgot-password')}
              className="w-full"
            >
              Request New Link
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reset your password</h1>
          <p className="mt-2 text-gray-600">
            Enter your new password below
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          {status === 'success' ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Password updated successfully</h2>
              <p className="text-gray-600 mb-6">
                Your password has been reset. You will be redirected to the login page shortly.
              </p>
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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your new password"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm your new password"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Updating...' : 'Reset Password'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}