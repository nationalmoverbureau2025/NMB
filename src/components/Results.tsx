import React from 'react'
import { AlertTriangle, Truck, Building2, Star, MapPin } from 'lucide-react'
import { Button } from '../components/Button'
import { type SearchResult } from '../lib/search'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { hasMonthPassed } from '../lib/utils'

const getRiskColor = (score: number) => {
  if (score >= 7) return 'text-red-600'
  if (score >= 4) return 'text-yellow-600'
  return 'text-green-600'
}

export const Results = ({ results }: { results: SearchResult[] }) => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  const handleViewReport = async (company: SearchResult) => {
    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      // Redirect to login with return path
      navigate(`/login?redirect=search&companyDot=${company.dot}`)
      return
    }

    try {
      // Check user's available credits
      const { data: credits, error } = await supabase
        .from('customer_credits')
        .select('credits_remaining, subscription_type, purchase_date')
        .eq('user_id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is "no rows returned" - handle other errors
        console.error('Error checking credits:', error)
        // Allow navigation anyway - handle gracefully
        navigate('/pricing')
        return
      }

      // If no credits record exists or credits_remaining is 0
      if (!credits || credits.credits_remaining <= 0) {
        // Redirect to pricing page
        navigate('/pricing')
        return
      }

      if (
        credits.subscription_type === 'price_monthly_subscription' &&
        hasMonthPassed(credits.purchase_date)
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
        navigate('/pricing')
        return
      }

      const res = await fetch(import.meta.env.VITE_N8N_INITIATE_PARSING, {
        method: 'POST',
        body: JSON.stringify({ dot: company.dot, userId: user.id }),
      })
      const data = await res.json()
      // User has credits, allow navigation to company report
      navigate(`/report/${data.reportId}`)
    } catch (err) {
      console.error('Error checking user credits:', err)
      // Handle error gracefully - allow navigation
      navigate(`/pricing`)
    }
  }

  return (
    <>
      {results?.map((company, index: number) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {company.name}
              </h3>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  DOT: {company.dot || 'N/A'}
                </span>
                {company.mc && (
                  <span className="flex items-center gap-1">
                    MC: {company.mc}
                  </span>
                )}
                {company.is_broker && (
                  <span className="flex items-center gap-1 text-amber-600">
                    <Building2 className="w-4 h-4" />
                    Broker
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {company.address}
                </span>
                {company.bbb_rating && (
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    BBB: {company.bbb_rating}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              {company.safety_rating ? (
                <div
                  className={`text-lg font-semibold ${getRiskColor(
                    Number(company.safety_rating)
                  )}`}
                >
                  Safety rating: {company.safety_rating}
                </div>
              ) : null}
              {company.complaint_count && company.complaint_count > 0 && (
                <div className="flex items-center gap-1 text-sm text-red-600 mt-1">
                  <AlertTriangle className="w-4 h-4" />
                  {company.complaint_count} complaints
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end">
            <Button onClick={() => handleViewReport(company)}>
              View Full Report
            </Button>
          </div>
        </div>
      ))}
    </>
  )
}
