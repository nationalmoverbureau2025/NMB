import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle, FileText, ArrowRight } from 'lucide-react'
import { Button } from '../components/Button'
import { supabase } from '../lib/supabase'

export function CheckoutSuccess() {
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [orderDetails, setOrderDetails] = useState<any>(null)

  const sessionId = searchParams.get('session_id')
  const companyDot = searchParams.get('companyDot')

  useEffect(() => {
    const verifyCheckout = async () => {
      if (!sessionId) {
        setError('Invalid checkout session')
        setLoading(false)
        return
      }

      try {
        // Verify checkout with Supabase function
        const { data, error } = await supabase.functions.invoke(
          'verify-checkout',
          {
            body: { sessionId },
          }
        )

        if (error) throw error

        setOrderDetails(data)

        if (companyDot) {
          await fetch(import.meta.env.VITE_N8N_INITIATE_PARSING, {
            method: 'POST',
            body: JSON.stringify({ dot: companyDot, userId: data.user_id }),
          })
        }
      } catch (err) {
        console.error('Error verifying checkout:', err)
        setError(
          'There was an error verifying your purchase. Please contact support.'
        )
      } finally {
        setLoading(false)
      }
    }

    verifyCheckout()
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying your purchase...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/contact">
            <Button>Contact Support</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mt-2">
            Thank you for your purchase. Your order has been processed
            successfully.
          </p>
        </div>

        {orderDetails && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="font-semibold text-gray-900 mb-3">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Product:</span>
                <span className="font-medium">{orderDetails.product_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">
                  ${(orderDetails.amount / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono text-xs">
                  {orderDetails.payment_intent}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {orderDetails?.product_type === 'single_report' ? (
            <Link to="/search" className="block">
              <Button className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Start Using Your Report Credit
              </Button>
            </Link>
          ) : (
            <Link to="/dashboard" className="block">
              <Button className="w-full">
                <ArrowRight className="w-4 h-4 mr-2" />
                Go to Your Dashboard
              </Button>
            </Link>
          )}

          <Link to="/" className="block">
            <Button variant="outline" className="w-full">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
