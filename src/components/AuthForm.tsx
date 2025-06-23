import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { SocialAuth } from './SocialAuth';
import { useAuth } from '../context/AuthContext';
import { isSupabaseConfigured } from '../lib/supabase';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

export function AuthForm({ mode }: AuthFormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Check for redirect parameter
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect');

  useEffect(() => {
    // Reset error when mode changes
    setError(null);
  }, [mode]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      if (redirectPath === 'checkout') {
        const savedPriceId = localStorage.getItem('checkoutPriceId');
        if (savedPriceId) {
          navigate('/pricing');
          return;
        }
      }
      if (redirectPath === 'search') {
        const companyDot = searchParams.get('companyDot');
        navigate(`/search?companyDot=${companyDot}`);
        return;
      }
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate, redirectPath]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isSupabaseConfigured()) {
      setError(
        'Authentication is not configured. Please connect to Supabase first.'
      );
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error: signupError } = await signup(email, password);

        if (signupError) {
          if (signupError.message?.includes('already registered')) {
            setError(
              'An account with this email already exists. Please log in instead.'
            );
          } else {
            setError(signupError.message || 'An error occurred during signup');
          }
        } else {
          // Handle redirect after successful signup
          if (redirectPath === 'checkout') {
            const savedPriceId = localStorage.getItem('checkoutPriceId');
            if (savedPriceId) {
              navigate('/pricing');
              return;
            }
          }
          if (redirectPath === 'search') {
            const companyDot = searchParams.get('companyDot');
            navigate(`/search?companyDot=${companyDot}`);
            return;
          }
          navigate('/dashboard');
        }
      } else {
        const { error: loginError } = await login(email, password);

        if (loginError) {
          if (loginError.message?.includes('Invalid login credentials')) {
            setError('Invalid email or password. Please try again.');
          } else {
            setError(loginError.message || 'An error occurred during login');
          }
        } else {
          // Handle redirect after successful login
          if (redirectPath === 'checkout') {
            const savedPriceId = localStorage.getItem('checkoutPriceId');
            if (savedPriceId) {
              navigate('/pricing');
              return;
            }
          }
          if (redirectPath === 'search') {
            const companyDot = searchParams.get('companyDot');
            navigate(`/search?companyDot=${companyDot}`);
            return;
          }
          navigate('/dashboard');
        }
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isSupabaseConfigured()) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <div>
            <p className="font-medium">Authentication Not Configured</p>
            <p className="text-sm mt-1">
              Please click the "Connect to Supabase" button in the top right to
              set up authentication.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <SocialAuth mode={mode} onError={setError} setLoading={setLoading} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Sign Up'}
        </Button>
      </form>
    </div>
  );
}
