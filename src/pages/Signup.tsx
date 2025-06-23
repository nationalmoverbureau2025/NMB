import React from 'react';
import { Link } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';

export function Signup() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create your account</h1>
        <p className="mt-2 text-gray-600">
          Join thousands of users protecting themselves from moving scams
        </p>
      </div>
      
      <AuthForm mode="signup" />
      
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
          Log in
        </Link>
      </p>
      
      <div className="mt-8 text-center text-xs text-gray-500 max-w-md mx-auto">
        By signing up, you agree to our{' '}
        <Link to="/terms" className="text-blue-600 hover:text-blue-500">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}