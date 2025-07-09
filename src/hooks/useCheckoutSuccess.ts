import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export type OrderDetailsType = {
  product_name: string
  amount: number
  payment_intent: string
  product_type: string
}

export const useCheckoutSuccess = () => {
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [orderDetails, setOrderDetails] = useState<OrderDetailsType | null>(
    null
  )

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

  return { loading, error, orderDetails }
}
