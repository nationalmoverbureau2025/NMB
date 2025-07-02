import React, { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { AlertTriangle, Info } from 'lucide-react'
import { SearchForm } from '../components/SearchForm'
import { searchCompanies } from '../lib/search'

import { Results } from '../components/Results'
import { useLocation } from 'react-router-dom'

export function Search() {
  const location = useLocation()
  const urlSearchParams = new URLSearchParams(location.search)
  const companyDot = urlSearchParams.get('companyDot')

  const [searchParams, setSearchParams] = useState<{
    query: string
    type: 'name' | 'dot' | 'mc'
    state?: string
  } | null>(null)

  useEffect(() => {
    companyDot && setSearchParams({ query: companyDot, type: 'dot' })
  }, [])

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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Search Moving Companies
          </h1>
          <p className="text-gray-600">
            Search by company name, DOT number, or MC number to get detailed
            verification reports
          </p>
        </div>

        {/* DOT/MC Number Recommendation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-900 font-medium">
              For the most accurate results, please search using a DOT or MC
              number.
            </p>
            <p className="text-blue-800 text-sm mt-1">
              Company names can sometimes match multiple businesses. Using a DOT
              or MC number ensures you find the exact company you're looking
              for.
            </p>
          </div>
        </div>

        {/* Search Form */}
        <div className="mb-8">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Error Message */}
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

        {/* Results */}
        <div className="space-y-4">
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
      </div>
    </div>
  )
}
