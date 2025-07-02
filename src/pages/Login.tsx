import React from 'react'
import { Link } from 'react-router-dom'
import { AuthForm } from '../components/AuthForm'

export function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Log in to your account
        </h1>
        <p className="mt-2 text-gray-600">
          Access your reports and verification tools
        </p>
      </div>

      <AuthForm mode="login" />

      <div className="mt-6 text-center text-sm text-gray-600 space-y-2">
        <p>
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Sign up
          </Link>
        </p>
        <p>
          <Link
            to="/forgot-password"
            className="text-blue-600 hover:text-blue-500"
          >
            Forgot your password?
          </Link>
        </p>
        <p>
          <Link
            to="/forgot-username"
            className="text-blue-600 hover:text-blue-500"
          >
            Forgot your username?
          </Link>
        </p>
      </div>
    </div>
  )
}
