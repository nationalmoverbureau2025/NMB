import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export function AuthCallback() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Auth callback handling started')
        console.log('URL:', window.location.href)

        // Get the URL hash and parse it
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        )
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')
        const type = hashParams.get('type')

        console.log('Hash params:', {
          hasAccessToken: !!accessToken,
          hasRefreshToken: !!refreshToken,
          type,
        })

        if (accessToken && refreshToken) {
          // We have tokens in the URL hash, set the session
          try {
            console.log('Setting session from URL hash')
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            })

            if (error) {
              console.error('Error setting session:', error)
              throw error
            }

            console.log('Session set successfully')

            // If this is a recovery (password reset), redirect to reset password page
            if (type === 'recovery') {
              console.log('Redirecting to reset password page')
              navigate('/reset-password')
              return
            }
          } catch (err) {
            console.error('Error setting session from URL:', err)
            throw new Error(
              'Failed to set authentication session. Please try logging in again.'
            )
          }
        } else {
          // No tokens in URL hash, check if we already have a session
          console.log('No tokens in URL hash, checking for existing session')
          const { data } = await supabase.auth.getSession()

          if (!data?.session) {
            // No session, something went wrong
            console.error('No session found')
            throw new Error('Authentication failed. Please try again.')
          }

          console.log('Existing session found')
        }

        // Check if we need to redirect to checkout
        const savedPriceId = localStorage.getItem('checkoutPriceId')
        const companyDot = localStorage.getItem('companyDot')
        if (savedPriceId) {
          localStorage.removeItem('checkoutPriceId') // Clear it after use
          navigate('/pricing')
        } else if (companyDot) {
          navigate(`/search?companyDot=${companyDot}`)
        } else {
          navigate('/dashboard')
        }
      } catch (err) {
        console.error('Auth callback error:', err)
        setError(err instanceof Error ? err.message : 'Authentication failed')
        // Redirect to login after a delay
        setTimeout(() => navigate('/login'), 3000)
      }
    }

    handleAuthCallback()
  }, [navigate])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        {error ? (
          <div>
            <h2 className="text-xl font-bold text-red-600 mb-2">
              Authentication Error
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-gray-500">Redirecting to login page...</p>
          </div>
        ) : (
          <div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Completing authentication...</p>
          </div>
        )}
      </div>
    </div>
  )
}
