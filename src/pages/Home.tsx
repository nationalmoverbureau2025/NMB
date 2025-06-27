import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Shield,
  AlertTriangle,
  Search,
  FileText,
  XCircle,
  Lock,
} from 'lucide-react'
import { searchCompanies } from '../lib/search'
import { Button } from '../components/Button'
import { SearchForm } from '../components/SearchForm'
import { CheckoutButton } from '../components/CheckoutButton'
import { products } from '../lib/stripe'
import { useQuery } from '@tanstack/react-query'
import { Results } from '../components/Results'
import { SampleReportSection } from '../components/SampleReportSection'

export function Home() {
  const [searchParams, setSearchParams] = useState<{
    query: string
    type: 'name' | 'dot' | 'mc'
    state?: string
  } | null>(null)

  const {
    data: results,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['companies', searchParams],
    queryFn: () =>
      searchParams
        ? searchCompanies(
            searchParams.query,
            searchParams.type,
            searchParams.state
          )
        : Promise.resolve([]),
    enabled: !!searchParams,
  })

  const handleSearch = (
    query: string,
    type: 'name' | 'dot' | 'mc',
    state?: string
  ) => {
    setSearchParams({ query, type, state })
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Search */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full mb-6">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">
                Moving scams are up 250% in 2025
              </span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              The Most Comprehensive Moving Company Verification System
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Access exclusive data from{' '}
              <span className="font-semibold text-blue-900">
                FMCSA, DOT, BBB, and State Records
              </span>{' '}
              combined with advanced AI analysis to verify any moving company
              instantly.
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Verify a Moving Company
            </h2>
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              <span>
                {typeof error === 'string'
                  ? error
                  : 'An error occurred while searching. Please try again.'}
              </span>
            </div>
          )}

          <div className="space-y-4 mb-8 max-w-4xl mx-auto">
            <Results results={results} />

            {results?.length === 0 && searchParams && !isLoading && (
              <div className="text-center py-8 text-gray-600">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>No companies found matching your search criteria.</p>
                <p className="mt-2 text-sm">
                  Try adjusting your search terms or contact support if you need
                  assistance.
                </p>
              </div>
            )}

            {isLoading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
                <p className="mt-4 text-gray-600">Searching for companies...</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/search">
              <Button size="lg" className="w-full sm:w-auto">
                <Search className="w-5 h-5 mr-2" />
                Search Companies
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Get you free report
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why You Need a Report Section */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why You Need a Verification Report
              </h2>
              <p className="text-xl text-gray-600">
                Moving is stressful enough without worrying about scams. Don't
                risk your belongings with basic online reviews—get the full
                picture before it's too late.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Common Misconceptions */}
              <div className="bg-red-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-red-900 mb-4">
                  Common Moving Mistakes
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-900">
                        "All licensed movers are the same"
                      </p>
                      <p className="text-sm text-red-800">
                        32% of licensed movers have serious violations or
                        complaints. A license alone doesn't guarantee
                        reliability.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-900">
                        "I'll just check online reviews"
                      </p>
                      <p className="text-sm text-red-800">
                        Our AI detects that 40% of moving company reviews are
                        manipulated or fake. Don't trust surface-level ratings.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-900">
                        "They seem professional on the phone"
                      </p>
                      <p className="text-sm text-red-800">
                        Many scammers operate sophisticated front operations.
                        Phone manner isn't a reliable indicator of legitimacy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What Our Report Reveals */}
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  What Our Report Reveals
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">
                        Hidden Broker Status
                      </p>
                      <p className="text-sm text-blue-800">
                        Instantly identify if you're dealing with a broker or
                        actual moving company—a crucial distinction that affects
                        your move.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">
                        Insurance & Bond Status
                      </p>
                      <p className="text-sm text-blue-800">
                        Verify active insurance coverage and bond status to
                        ensure your belongings are protected during transit.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">
                        Legal History & Complaints
                      </p>
                      <p className="text-sm text-blue-800">
                        Access complete complaint history, legal actions, and
                        resolution patterns across multiple databases.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost of Not Knowing */}
            <div className="bg-gray-900 text-white rounded-xl p-8 mb-12">
              <h3 className="text-xl font-bold mb-6 text-center">
                The Cost of Not Knowing
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">
                    $8,500
                  </div>
                  <p className="text-gray-300">
                    Average loss from moving scams
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">
                    47%
                  </div>
                  <p className="text-gray-300">Experience unexpected fees</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">
                    15,000+
                  </div>
                  <p className="text-gray-300">Moving scams reported in 2024</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Don't Risk Your Move
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                For less than 1% of your moving budget, get complete peace of
                mind with our comprehensive verification report. Don't wait
                until it's too late.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/search">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Search className="w-5 h-5 mr-2" />
                    Verify a Moving Company
                  </Button>
                </Link>
                <a href="#reports">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    View Report Samples
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SampleReportSection />

      {/* Final CTA Section */}
      <section className="bg-blue-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Don't Risk Your Move
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get instant access to our AI-powered moving company reports. Protect
            yourself from fraud, hidden fees, and unreliable movers.
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
      </section>
    </div>
  )
}
