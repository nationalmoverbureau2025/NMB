import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { ICompanyReport } from '../lib/types'

interface IcompanyListReport
  extends Pick<ICompanyReport, 'id' | 'status' | 'created_at' | 'expires_at'> {
  companies_perfsol: {
    company_name: string
    dot_number: number
  }
}

export const useDashboard = () => {
  const { isAuthenticated, isLoading, user, logout } = useAuth()
  const [userData, setUserData] = useState({
    email: '',
    plan: 'Free Plan',
    credits: 0,
  })
  const [userReports, setUserReports] = useState<IcompanyListReport[]>([])

  const fetchUserCredits = async (userId: number) => {
    try {
      const { data, error } = await supabase
        .from('customer_credits')
        .select('credits_remaining')
        .eq('user_id', userId)
        .single()

      if (error) {
        console.error('Error fetching user credits:', error)
        return 0
      }

      return data?.credits_remaining || 0
    } catch (error) {
      console.error('Failed to fetch user credits:', error)
      return 0
    }
  }

  const fetchUserReports = async (userId: number) => {
    try {
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reports_perfsol')
        .select(
          'id, status, created_at, expires_at , companies_perfsol ( company_name, dot_number )'
        )
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (reviewsError) throw reviewsError
      setUserReports(reviewsData as unknown as IcompanyListReport[])
    } catch (err) {
      console.error('Error:', err)
    }
  }

  // Set user data when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const getUserData = async () => {
        const userCredits = await fetchUserCredits(user.id)
        await fetchUserReports(user.id)

        setUserData({
          email: user.email || '',
          plan: 'Free Plan',
          credits: userCredits,
        })
      }

      getUserData()
    }
  }, [isAuthenticated, user])

  return {
    isLoading,
    logout,
    userData,
    isAuthenticated,
    userReports,
  }
}
