import React, { useState } from 'react'
import { CreditCard, Loader } from 'lucide-react'
import { Button } from './Button'
import { createCheckoutSession } from '../lib/stripe'
import { useAuth } from '../context/AuthContext'

interface CheckoutButtonProps {
  companyDot: number
}

export function RefreshPaymentButton({ companyDot }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const handleCheckout = async (e) => {
    e.stopPropagation()
    setLoading(true)

    try {
      // Create checkout session
      const { url } = await createCheckoutSession({
        priceId: 'refresh_report',
        customerId: user.id,
        companyDot,
      })

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url
      } else {
        throw new Error('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('There was an error processing your checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      size="sm"
      variant="outline"
      className="text-blue-600 border-blue-600 hover:bg-blue-50"
    >
      {loading ? (
        <>
          <Loader className="w-4 h-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="w-4 h-4 mr-2" />
          Refresh for 20$
        </>
      )}
    </Button>
  )
}
