import { loadStripe } from '@stripe/stripe-js'
import { supabase } from './supabase'

// Replace with your actual Stripe publishable key
const STRIPE_PUBLISHABLE_KEY =
  'pk_test_51OxYzLCkBJNwKOVOJUkZVVfhgHXATKdDlQlU7YXgvlKJlUMgGXmZ3LYZdcBGRQQBmxQJwRXQQZGwpFLlhKLGLnSX00oBfKWZtm'

// Initialize Stripe
export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

// Product definitions
export const products = {
  singleReport: {
    id: 'price_single_report',
    name: 'Single Report',
    price: 3400, // in cents
    description: 'One-time comprehensive report',
  },
  bundle3Reports: {
    id: 'price_three_reports',
    name: '3 Reports Bundle',
    price: 9900, // in cents
    description: 'Bundle of 3 full reports',
  },
  refreshReport: {
    id: 'refresh_report',
    name: 'Refresh Bundle',
    price: 2000, // in cents
    description: 'Refresh your report',
  },
  monthlySubscription: {
    id: 'price_monthly_subscription',
    name: 'Monthly Subscription',
    price: 8900, // in centsAdd commentMore actions
    description: 'Monthly access to unlimited reports',
  },
}

// Create a checkout session
export const createCheckoutSession = async ({
  priceId,
  customerId,
  companyDot,
  voucherCode,
}: {
  priceId: string
  customerId?: string
  companyDot?: number
  voucherCode?: string
}) => {
  try {
    const { data, error } = await supabase.functions.invoke(
      'create-checkout-session',
      {
        body: {
          priceId,
          customerId,
          voucherCode,
          successUrl: `${window.location.origin}/checkout/success`,
          cancelUrl: `${window.location.origin}/pricing`,
          companyDot,
        },
      }
    )

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

// Create a customer portal session
export const createCustomerPortalSession = async (customerId: string) => {
  try {
    const { data, error } = await supabase.functions.invoke(
      'create-customer-portal',
      {
        body: {
          customerId,
          returnUrl: `${window.location.origin}/dashboard`,
        },
      }
    )

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating customer portal session:', error)
    throw error
  }
}
