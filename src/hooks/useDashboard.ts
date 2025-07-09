import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { ICompanyReport } from '../lib/types'
import { hasMonthPassed } from '../lib/utils'

export interface IcompanyListReport
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
        .select('credits_remaining, subscription_type, purchase_date')
        .eq('user_id', userId)
        .single()

      if (error) {
        console.error('Error fetching user credits:', error)
        return {
          credits_remaining: 0,
          subscription_type: '',
          purchase_date: '',
        }
      }

      return data
    } catch (error) {
      console.error('Failed to fetch user credits:', error)
      return { credits_remaining: 0, subscription_type: '', purchase_date: '' }
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

        const credits =
          userCredits?.subscription_type === 'price_monthly_subscription'
            ? hasMonthPassed(userCredits?.purchase_date)
              ? 0
              : userCredits.credits_remaining
            : userCredits.credits_remaining

        setUserData({
          email: user.email || '',
          plan: userCredits?.subscription_type || 'free_report',
          credits: credits,
        })

        if (
          userCredits?.subscription_type === 'price_monthly_subscription' &&
          hasMonthPassed(userCredits?.purchase_date)
        ) {
          try {
            await supabase
              .from('customer_credits')
              .update({
                credits_remaining: 0,
                subscription_type: 'price_monthly_subscription',
              })
              .eq('user_id', user?.id)
          } catch (error) {
            console.log('Error updating report credits:', error)
          }
        }
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
