import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno'
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
}
const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY')
const stripe = new Stripe(STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})
const PRICE_LOOKUP = {
  price_single_report: {
    price: 4500,
    name: 'Single Report',
    type: 'single_report',
    description: 'One-time comprehensive report',
  },
  price_three_reports: {
    price: 9900,
    name: '3 Reports Bundle',
    type: 'reports_bundle',
    description: 'Bundle of 3 full reports',
  },
  refresh_report: {
    price: 2000,
    name: 'Refresh Bundle',
    type: 'refresh_report',
    description: 'Refresh your report',
  },
  price_monthly_subscription: {
    type: 'price_monthly_subscription',
    name: 'Monthly Subscription',
    price: 8900,
    description: 'Monthly access to unlimited reports',
    recurring: {
      interval: 'month',
      interval_count: 1,
    },
  },
}
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders,
      status: 200,
    })
  }
  try {
    const { priceId, customerId, successUrl, cancelUrl, companyDot } =
      await req.json()
    // Validate required parameters
    if (!priceId || !successUrl || !cancelUrl) {
      return new Response(
        JSON.stringify({
          error: 'Missing required parameters',
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      )
    }
    // Get price details from our lookup
    const priceDetails = PRICE_LOOKUP[priceId]
    if (!priceDetails) {
      return new Response(
        JSON.stringify({
          error: 'Invalid price ID',
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      )
    }
    // Create line items based on product type
    const lineItems = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: priceDetails.name,
            description: priceDetails.description,
          },
          unit_amount: priceDetails.price,
          ...(priceDetails.recurring
            ? { recurring: priceDetails.recurring }
            : {}),
        },
        quantity: 1,
      },
    ]
    let stripeCustomerId
    try {
      // Try to find existing Stripe customer by metadata
      const customers = await stripe.customers.search({
        query: `metadata['user_id']:'${customerId}'`,
      })
      if (customers.data.length > 0) {
        // Use existing customer
        stripeCustomerId = customers.data[0].id
        console.log('Found existing Stripe customer:', stripeCustomerId)
      } else {
        // Create a new customer
        const newCustomer = await stripe.customers.create({
          // email: userEmail,
          metadata: {
            user_id: customerId,
          },
        })
        stripeCustomerId = newCustomer.id
        console.log('Created new Stripe customer:', stripeCustomerId)
      }
    } catch (error) {
      console.error('Error creating/finding Stripe customer:', error)
      return new Response(
        JSON.stringify({
          error: 'Failed to create Stripe customer',
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      )
    }
    console.log('Creating checkout session with customer:', stripeCustomerId)
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: priceDetails.recurring ? 'subscription' : 'payment',
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}${
        companyDot ? `&companyDot=${companyDot}` : ''
      }`,
      cancel_url: cancelUrl,
      metadata: {
        product_type: priceDetails.type,
        user_id: customerId,
      },
    })
    return new Response(
      JSON.stringify({
        url: session.url,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  }
})
