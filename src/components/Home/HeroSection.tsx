import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Search } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { searchCompanies } from '../../lib/search'
import { SearchForm } from '../SearchForm'
import { Results } from '../Results'
import { Button } from '../Button'

export const HeroSection = () => {
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
    <section className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full mb-6">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">
              Verified: Moving scams surged 250% in 2025. Get protected—run your
              free scan now.
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            The Only Moving Company Verification System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Built to expose fake reviews, hidden DBAs, and scam brokers using
            real-time data and advanced AI.
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
              Get your free report
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
