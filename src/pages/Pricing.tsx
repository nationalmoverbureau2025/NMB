import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import {
  Check,
  FileText,
  Shield,
  Star,
  AlertTriangle,
  Scale,
  Eye,
  Brain,
  Lock,
  Truck,
  CreditCard,
  CheckCircle,
  Award,
} from 'lucide-react'
import { Button } from '../components/Button'
import { CheckoutButton } from '../components/CheckoutButton'
import { products } from '../lib/stripe'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

const freePlans = [
  {
    name: '1 Free Report',
    price: 0,
    description: 'Single company free discovery for new users.',
    descr:
      'Compare With Confidence. Most people compare 3 to 6 moving companies - get your first one verified free.',
    popular: false,
    subtitle: 'One-time free report for new users.',
    features: [
      'Full company background check',
      'Authority Registration verification',
      'Authority Status confirmation',
      'Insurance Coverage analysis',
      'Authorized Cargo Types review',
      'Legal History investigation',
      'Customer Reviews Analysis',
      'AI Suspicious Activity Flags',
      'Red Flags Analysis',
      'Advanced fake review detection with AI',
      'Review authenticity scoring',
      'Sentiment analysis & manipulation detection',
      'Cross-platform review verification',
      'Downloadable PDF report',
      'Email support',
      'One-time free report for new users',
    ],
    priceId: null,
    buttonText: 'Get Your Free Report', // Explicitly set button text
  },
]

const primaryPlans = [
  {
    name: 'Single report',
    price: 34,
    description: "Perfect if you're only checking one company",
    descr:
      'Compare With Confidence. Most people compare 3 to 6 moving companies - get your first one verified free.',
    popular: false,
    features: [
      'Full company background check',
      'Authority Registration verification',
      'Authority Status confirmation',
      'Insurance Coverage analysis',
      'Authorized Cargo Types review',
      'Legal History investigation',
      'Customer Reviews Analysis',
      'AI Suspicious Activity Flags',
      'Red Flags Analysis',
      'Advanced fake review detection with AI',
      'Review authenticity scoring',
      'Sentiment analysis & manipulation detection',
      'Cross-platform review verification',
      'Downloadable PDF report',
    ],
    priceId: products.singleReport.id,
    buttonText: 'Check Your Mover Now',
  },
  {
    name: 'Unlimited Reports',
    price: 89,
    description: '30-Day Full Access for professional work',
    descr:
      'Compare With Confidence. Most people compare 3 to 6 moving companies - get your first one verified free.',
    subtitle: 'One-time payment',
    popular: true,
    features: [
      'Full company background check',
      'Authority Registration verification',
      'Authority Status confirmation',
      'Insurance Coverage analysis',
      'Authorized Cargo Types review',
      'Legal History investigation',
      'Customer Reviews Analysis',
      'AI Suspicious Activity Flags',
      'Red Flags Analysis',
      'Advanced fake review detection with AI',
      'Review authenticity scoring',
      'Sentiment analysis & manipulation detection',
      'Cross-platform review verification',
      'Downloadable PDF report',
      'Valid for 30 days',
      'Priority email support',
    ],
    priceId: products.monthlySubscription.id,
    buttonText: 'Check Your Mover Now',
  },
]

const secondaryPlans = [
  {
    name: 'Single report',
    price: 34,
    description: "Perfect if you're only checking one company",
    popular: false,
    features: [
      'Full company background check',
      'Authority Registration verification',
      'Authority Status confirmation',
      'Insurance Coverage analysis',
      'Authorized Cargo Types review',
      'Legal History investigation',
      'Customer Reviews Analysis',
      'AI Suspicious Activity Flags',
      'Red Flags Analysis',
      'Advanced fake review detection',
      'Downloadable PDF report',
    ],
    priceId: products.singleReport.id,
    buttonText: 'Check Your Mover Now',
  },
]

export function Pricing() {
  const { isAuthenticated, user } = useAuth()
  const [isOldUser, setIsOldUser] = useState(false)
  const navigate = useNavigate()

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

  const processFreeReport = async () => {
    if (!isAuthenticated) {
      navigate('/signup')
    }
    try {
      const { error } = await supabase
        .from('customer_credits')
        .insert({
          user_id: user.id,
          credits_remaining: 1,
          purchase_date: new Date().toISOString(),
          subscription_type: 'free_report',
        })
        .select()

      if (error) {
        throw error
      }

      navigate('/search')
    } catch (error) {
      console.error('Error processing free report:', error)
    }
  }

  const isHighlightFeature = (feature) => {
    return (
      feature.includes('fake review') ||
      feature.includes('AI Suspicious') ||
      feature.includes('authenticity') ||
      feature.includes('manipulation') ||
      feature.includes('Red Flags')
    )
  }

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
            AI-powered fraud detection and advanced fake review analysis.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              AI Fake Review Detection
            </h3>
            <p className="text-gray-600">
              Advanced AI analysis to identify manipulated and fake reviews
              across all platforms.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Authority Verification
            </h3>
            <p className="text-gray-600">
              Complete verification of operating authority, registration, and
              status.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scale className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Legal History Analysis
            </h3>
            <p className="text-gray-600">
              Comprehensive review of lawsuits, complaints, and legal
              proceedings.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Red Flags Detection</h3>
            <p className="text-gray-600">
              AI-powered identification of suspicious patterns and warning
              signs.
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-${
            isOldUser ? '2' : '3'
          } gap-8 justify-center mb-8`}
        >
          {(isOldUser ? primaryPlans : [...freePlans, ...primaryPlans]).map(
            (plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-lg shadow-md overflow-hidden
                ring-2 ring-blue-600
                `}
              >
                <div className="bg-blue-600 text-white text-center py-2 text-sm font-medium h-[36px]">
                  {plan.popular ? 'Most Popular' : ' '}
                </div>

                <div className="flex flex-col justify-between p-6 h-[97%]">
                  {/* Tagline at the top */}
                  <div>
                    <div className="text-center mb-6">
                      <p className="text-gray-600 text-sm mb-4">
                        {plan.descr ||
                          'Most people compare 3 to 6 different moving companies.'}
                      </p>

                      {/* Plan name and description */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{plan.description}</p>

                      {/* Price and payment info */}
                      <div className="mb-4">
                        <div className="text-4xl font-bold text-gray-900 mb-1">
                          ${plan.price}
                        </div>
                        <p className="text-gray-500 text-sm mb-2">
                          {plan?.subtitle || 'One-time payment'}
                        </p>

                        {/* Trust line */}
                        <div className="flex items-center justify-center text-xs text-gray-400 gap-1">
                          <span>🔒</span>
                          <span>Secure Checkout | No recurring charges</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span
                            className={`text-sm text-gray-600 ${
                              isHighlightFeature(feature) ? 'font-semibold' : ''
                            }`}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {plan.priceId ? (
                    <CheckoutButton priceId={plan.priceId} className="w-full">
                      {plan.buttonText}
                    </CheckoutButton>
                  ) : (
                    <Button className="w-full" onClick={processFreeReport}>
                      {plan.buttonText}
                    </Button>
                  )}
                </div>
              </div>
            )
          )}
        </div>

        {/* Trust Badges Section */}
        <div className="flex justify-center mb-16">
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl w-full">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500 font-medium">
                Trusted by thousands of customers
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
              {/* SSL Security Badge */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <Lock className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-xs text-gray-600">
                  <div className="font-semibold">SSL Secured</div>
                  <div>256-bit encryption</div>
                </div>
              </div>

              {/* Payment Security Badge */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-xs text-gray-600">
                  <div className="font-semibold">Secure Payments</div>
                  <div>Stripe protected</div>
                </div>
              </div>

              {/* Money Back Guarantee */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-xs text-gray-600">
                  <div className="font-semibold">Money Back</div>
                  <div>7-day guarantee</div>
                </div>
              </div>

              {/* Verified Reports Badge */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-xs text-gray-600">
                  <div className="font-semibold">Verified Reports</div>
                  <div>Official data sources</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comprehensive Analysis Features */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Complete Moving Company Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold">
                  Authority Registration
                </h3>
              </div>
              <p className="text-gray-600">
                Verify FMCSA registration dates, operating authority types, and
                compliance history.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold">Authority Status</h3>
              </div>
              <p className="text-gray-600">
                Real-time verification of current operating status and authority
                validity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold">Insurance Coverage</h3>
              </div>
              <p className="text-gray-600">
                Comprehensive insurance verification including cargo and
                liability coverage.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold">
                  Authorized Cargo Types
                </h3>
              </div>
              <p className="text-gray-600">
                Detailed breakdown of authorized cargo types and service
                limitations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold">Legal History</h3>
              </div>
              <p className="text-gray-600">
                Complete legal background including lawsuits, settlements, and
                court records.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold">
                  Customer Reviews Analysis
                </h3>
              </div>
              <p className="text-gray-600">
                AI-powered analysis of customer reviews with authenticity
                verification.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold">
                  AI Suspicious Activity Flags
                </h3>
              </div>
              <p className="text-gray-600">
                Advanced AI detection of suspicious patterns and potential fraud
                indicators.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold">Red Flags Analysis</h3>
              </div>
              <p className="text-gray-600">
                Comprehensive red flag identification including broker
                misrepresentation and violations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold">
                  Advanced Fake Review Detection
                </h3>
              </div>
              <p className="text-gray-600">
                Industry-leading AI technology to identify manipulated reviews,
                fake ratings, and review farms with 94% accuracy.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                What's the accuracy of your fake review detection?
              </h3>
              <p className="text-gray-600">
                Our AI-powered fake review detection system has a 94% accuracy
                rate, analyzing linguistic patterns, reviewer behavior, timing
                anomalies, and cross-platform verification to identify
                manipulated reviews.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                What's included in each report?
              </h3>
              <p className="text-gray-600">
                Each report includes authority verification, insurance coverage
                analysis, legal history, complaint records, AI-powered review
                analysis, red flag detection, and comprehensive risk assessment.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                What does the comparison feature include?
              </h3>
              <p className="text-gray-600">
                With the Unlimited Reports plan, you can compare multiple
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
                Yes, you can cancel your Unlimited Reports subscription at any
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
            <div>
              <h3 className="text-lg font-semibold mb-2">
                What makes your analysis different?
              </h3>
              <p className="text-gray-600">
                We're the only service that combines official government data
                with advanced AI analysis to detect fake reviews, identify
                broker misrepresentation, and provide comprehensive risk
                assessment.
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
              with our comprehensive verification system and industry-leading
              fake review detection.
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
