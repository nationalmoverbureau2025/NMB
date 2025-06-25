import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Check,
  FileText,
  Search,
  Shield,
  Star,
  UserCheck,
  FilesIcon,
} from 'lucide-react'
import { Button } from '../components/Button'
import { CheckoutButton } from '../components/CheckoutButton'
import { products } from '../lib/stripe'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

const primaryPlans = [
  {
    name: '3 reports bundle',
    price: 99,
    description: 'Easy start',
    popular: true,
    features: [
      'Full company background check',
      'AI-powered risk analysis',
      'Broker identification check',
      'Fake review detection',
      'Complaint history review',
      'Downloadable PDF report',
      'Valid for 30 days',
      'Email support',
    ],
    priceId: products.bundle3Reports.id,
  },
]

const secondaryPlans = [
  {
    name: '1 additional report',
    price: 45,
    description: 'Single company discovery',
    popular: false,
    features: [
      'Full company background check',
      'AI-powered risk analysis',
      'Broker identification check',
      'Fake review detection',
      'Complaint history review',
      'Downloadable PDF report',
      'Valid for 30 days',
      'Email support',
    ],
    priceId: products.singleReport.id,
  },
]

export function Pricing() {
  const { isAuthenticated, user } = useAuth()
  const [isOldUser, setIsOldUser] = useState(false)

  const fetchUserData = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('customer_credits')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) {
        console.error('Error fetching user credits:', error)
        return false
      }

      return !!data
    } catch (error) {
      console.error('Failed to fetch user credits:', error)
      return false
    }
  }

  useEffect(() => {
    if (isAuthenticated && user) {
      const getUserData = async () => {
        const userData = await fetchUserData(user.id)

        setIsOldUser(!!userData)
      }

      getUserData()
    }
  }, [isAuthenticated, user])

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Verification Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get instant access to comprehensive moving company reports with
            AI-powered fraud detection.
          </p>
        </div>

        {/* Comparison Feature Highlight */}
        {/* <div className="max-w-4xl mx-auto mb-16 bg-blue-50 rounded-xl p-8 border border-blue-100">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <ArrowLeftRight className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-2">
                New: Advanced Company Comparison
              </h2>
              <p className="text-lg text-blue-800 mb-4">
                Compare multiple moving companies side by side with our new
                comparison tool. Available exclusively with the Unlimited
                Monthly plan.
              </p>
              <ul className="grid md:grid-cols-2 gap-4">
                <li className="flex items-center gap-2 text-blue-700">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span>Side-by-side price comparison</span>
                </li>
                <li className="flex items-center gap-2 text-blue-700">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span>Risk score analysis</span>
                </li>
                <li className="flex items-center gap-2 text-blue-700">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span>Service area overlap</span>
                </li>
                <li className="flex items-center gap-2 text-blue-700">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span>Customer satisfaction metrics</span>
                </li>
              </ul>
            </div>
          </div>
        </div> */}

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Scam Detection</h3>
            <p className="text-gray-600">
              AI-powered analysis to detect potential fraud and red flags.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Broker Detection</h3>
            <p className="text-gray-600">
              Identify undisclosed brokers and verify direct carriers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Review Analysis</h3>
            <p className="text-gray-600">
              Advanced AI detection of fake and manipulated reviews.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Comparison</h3>
            <p className="text-gray-600">
              Compare multiple companies side by side with our tools.
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto w-full md:w-[50%]">
          {(isOldUser ? secondaryPlans : primaryPlans).map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-lg shadow-md overflow-hidden
                'ring-2 ring-blue-600'
              `}
            >
              <div className="bg-blue-600 text-white text-center py-2 text-sm font-medium">
                Most Popular • Includes Company Comparison
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {plan.priceId === 'price_three_reports' ? (
                    <FilesIcon className="w-6 h-6 text-blue-600" />
                  ) : (
                    <FileText className="w-6 h-6 text-blue-600" />
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>
                </div>

                <div className="mt-4 mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-1">One-time payment</p>
                </div>

                <div className="space-y-4 mb-6">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <CheckoutButton
                  priceId={plan.priceId}
                  className={
                    plan.popular
                      ? 'w-full'
                      : 'w-full bg-white text-blue-900 border-blue-900 hover:bg-blue-50'
                  }
                >
                  Get Started
                </CheckoutButton>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                What's included in each report?
              </h3>
              <p className="text-gray-600">
                Each report includes broker verification, licensing checks,
                complaint history, safety records, review authenticity analysis,
                and AI-powered risk assessment.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                How does the comparison feature work?
              </h3>
              <p className="text-gray-600">
                With the Unlimited Monthly plan, you can compare multiple
                companies side by side, analyzing their risk scores, pricing,
                service areas, and customer satisfaction metrics in a
                comprehensive view.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Can I cancel my subscription?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your Unlimited Monthly subscription at any
                time. Your access will continue until the end of your billing
                period.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                We offer a 100% satisfaction guarantee. If you're not satisfied
                with your report, contact us within 7 days for a full refund.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 text-center">
          <div className="bg-blue-900 text-white rounded-xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Don't Risk Your Move</h2>
            <p className="text-xl text-blue-100 mb-6">
              For less than 1% of your moving budget, get complete peace of mind
              with our comprehensive verification system.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/search">
                <Button variant="secondary" size="lg">
                  Start Your Search
                </Button>
              </Link>
              <CheckoutButton
                priceId={products.singleReport.id}
                className="bg-transparent text-white border-white hover:bg-white hover:text-blue-900"
              >
                Buy Single Report
              </CheckoutButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
