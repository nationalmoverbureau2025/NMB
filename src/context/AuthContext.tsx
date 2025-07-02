import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { updateChatUser } from '../lib/chat'

type AuthContextType = {
  isAuthenticated: boolean
  isLoading: boolean
  user: any | null
  login: (email: string, password: string) => Promise<{ error: any | null }>
  signup: (email: string, password: string) => Promise<{ error: any | null }>
  loginWithSocial: (
    provider: 'google' | 'apple'
  ) => Promise<{ error: any | null; url?: string }>
  resetPassword: (email: string) => Promise<{ error: any | null }>
  updatePassword: (password: string) => Promise<{ error: any | null }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: async () => ({ error: null }),
  signup: async () => ({ error: null }),
  loginWithSocial: async () => ({ error: null }),
  resetPassword: async () => ({ error: null }),
  updatePassword: async () => ({ error: null }),
  logout: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any | null>(null)

  useEffect(() => {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      setIsLoading(false)
      return
    }

    // Get the current session
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession()

        if (data?.session) {
          setIsAuthenticated(true)
          setUser(data.session.user)
          // Update chat user when authenticated
          if (data.session.user.email) {
            updateChatUser(data.session.user.email)
          }
        } else {
          setIsAuthenticated(false)
          setUser(null)
        }
      } catch (error) {
        console.error('Session check error:', error)
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event)

        if (event === 'SIGNED_IN' && session) {
          setIsAuthenticated(true)
          setUser(session.user)
          // Update chat user when signed in
          if (session.user.email) {
            updateChatUser(session.user.email)
          }
        } else if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
          setIsAuthenticated(false)
          setUser(null)
        } else if (event === 'TOKEN_REFRESHED' && session) {
          setIsAuthenticated(true)
          setUser(session.user)
        } else if (event === 'USER_UPDATED' && session) {
          setUser(session.user)
          // Update chat user when user data changes
          if (session.user.email) {
            updateChatUser(session.user.email)
          }
        } else if (event === 'PASSWORD_RECOVERY' && session) {
          // Handle password recovery event
          setIsAuthenticated(true)
          setUser(session.user)
        }
      }
    )

    // Return cleanup function
    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Real authentication with Supabase
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { error }
      }

      return { error: null }
    } catch (error) {
      console.error('Login error:', error)
      return { error }
    }
  }

  const signup = async (email: string, password: string) => {
    try {
      // Real signup with Supabase
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        return { error }
      }

      return { error: null, data }
    } catch (error) {
      console.error('Signup error:', error)
      return { error }
    }
  }

  const loginWithSocial = async (provider: 'google' | 'apple') => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        return { error }
      }

      return { error: null, url: data?.url }
    } catch (error) {
      console.error(`${provider} auth error:`, error)
      return { error }
    }
  }

  const resetPassword = async (email: string) => {
    try {
      // Use the site URL as the base for the redirect
      const redirectTo = `${window.location.origin}/reset-password`
      console.log('Reset password redirect URL:', redirectTo)

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      })

      if (error) {
        console.error('Reset password error:', error)
        return { error }
      }

      console.log('Reset password email sent successfully')
      return { error: null }
    } catch (error) {
      console.error('Password reset error:', error)
      return { error }
    }
  }

  const updatePassword = async (password: string) => {
    try {
      console.log('Updating password in AuthContext')
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        console.error('Error updating password in AuthContext:', error)
        return { error }
      }

      console.log('Password updated successfully in AuthContext')
      return { error: null }
    } catch (error) {
      console.error('Password update error in AuthContext:', error)
      return { error }
    }
  }

  const logout = async () => {
    try {
      // Update local state first to ensure UI is responsive
      setIsAuthenticated(false)
      setUser(null)

      // Then attempt to sign out from Supabase if configured
      if (isSupabaseConfigured()) {
        await supabase.auth.signOut()
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    signup,
    loginWithSocial,
    resetPassword,
    updatePassword,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
