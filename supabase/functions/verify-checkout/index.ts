import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
}
const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const stripe = new Stripe(STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})
const supabase = createClient(
  SUPABASE_URL || '',
  SUPABASE_SERVICE_ROLE_KEY || ''
)
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders,
      status: 200,
    })
  }
  try {
    const { sessionId } = await req.json()
    if (!sessionId) {
      return new Response(
        JSON.stringify({
          error: 'Session ID is required',
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
    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'payment_intent', 'subscription'],
    })
    if (!session) {
      return new Response(
        JSON.stringify({
          error: 'Invalid session',
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
    // Get product details
    const productType = session.metadata?.product_type || 'unknown'

    const customerId = session.customer?.id
    const paymentIntent = session.payment_intent?.id || session.subscription?.id
    const amount = session.amount_total || 0
    // Determine product name
    let productName = 'Unknown Product'
    if (productType === 'single_report') {
      productName = 'Single Report'
    } else if (productType === 'reports_bundle') {
      productName = '3 Reports Bundle'
    }
    // Get user ID from Stripe customer metadata
    let userId = null
    if (customerId) {
      const customer = await stripe.customers.retrieve(customerId)
      userId = customer.metadata?.user_id
    }
    // If we have a user ID, update their subscription status
    // if (userId && productType === 'subscription') {
    //   await supabase.from('user_subscriptions').upsert({
    //     user_id: userId,
    //     stripe_customer_id: customerId,
    //     stripe_subscription_id: session.subscription?.id,
    //     status: 'active',
    //     plan_type: 'unlimited',
    //     current_period_end: new Date(
    //       Date.now() + 30 * 24 * 60 * 60 * 1000
    //     ).toISOString(),
    //   });
    // }
    if (userId) {
      const credits =
        productType === 'price_monthly_subscription'
          ? 99
          : productType === 'reports_bundle'
          ? 3
          : 1
      const currentDate = new Date().toISOString()
      // First, check if user already has a record
      const { data: existingCredits } = await supabase
        .from('customer_credits')
        .select('*')
        .eq('user_id', userId)
        .single()
      console.log('existingCredits', existingCredits)
      if (existingCredits) {
        // Update existing record
        try {
          await supabase
            .from('customer_credits')
            .update({
              credits_remaining: existingCredits.credits_remaining + credits,
              subscription_type: productType,
              purchase_date: currentDate,
            })
            .eq('user_id', userId)
        } catch (error) {
          console.log('Error updating report credits:', error)
          return new Response(
            JSON.stringify({
              error: 'Failed to update report credits',
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
      } else {
        // Create new record
        // Create new record
        try {
          console.log('Creating new customer_credits record with data:', {
            user_id: userId,
            credits_remaining: credits,
            purchase_date: currentDate,
          })
          const { data, error } = await supabase
            .from('customer_credits')
            .insert({
              user_id: userId,
              credits_remaining: credits,
              subscription_type: productType,
              purchase_date: currentDate,
            })
            .select()
          if (error) {
            console.error('Supabase insert error:', error)
            return new Response(
              JSON.stringify({
                error: `Failed to insert report credits: ${error.message}`,
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
          console.log(
            'Created new customer_credits record, response data:',
            data
          )
        } catch (error) {
          console.error('Error inserting report credits:', error)
          return new Response(
            JSON.stringify({
              error: `Failed to insert report credits: ${error.message}`,
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
      }
    }
    return new Response(
      JSON.stringify({
        success: true,
        product_type: productType,
        product_name: productName,
        customer_id: customerId,
        user_id: userId,
        payment_intent: paymentIntent,
        amount: amount,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error verifying checkout:', error)
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
