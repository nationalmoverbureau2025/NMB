import React, { useEffect, useState } from 'react'
import { Search as SearchIcon, MapPin } from 'lucide-react'
import { Button } from './Button'
import { US_STATES } from '../lib/constants'
import { useLocation } from 'react-router-dom'

interface SearchFormProps {
  onSearch: (query: string, type: 'name' | 'dot' | 'mc', state?: string) => void
  isLoading: boolean
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const location = useLocation()
  const urlSearchParams = new URLSearchParams(location.search)
  const companyDot = urlSearchParams.get('companyDot')

  const [query, setQuery] = useState('')
  const [searchType, setSearchType] = useState<'name' | 'dot' | 'mc'>('name')
  const [state, setState] = useState<string>('')

  useEffect(() => {
    if (companyDot) {
      setQuery(companyDot)
      setSearchType('dot')
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    onSearch(query.trim(), searchType, state)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-4">
        {/* Search Type Selection */}
        <div className="flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setSearchType('dot')}
            className={`px-4 py-2 text-sm font-medium rounded-l-md flex-1 lg:flex-none ${
              searchType === 'dot'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            DOT Number
          </button>
          <button
            type="button"
            onClick={() => setSearchType('mc')}
            className={`px-4 py-2 text-sm font-medium  flex-1 lg:flex-none ${
              searchType === 'mc'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            MC Number
          </button>
          <button
            type="button"
            onClick={() => setSearchType('name')}
            className={`px-4 py-2 text-sm font-medium rounded-r-md flex-1 lg:flex-none ${
              searchType === 'name'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Company Name
          </button>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                searchType === 'name'
                  ? 'Enter company name...'
                  : searchType === 'dot'
                  ? 'Enter DOT number...'
                  : 'Enter MC number...'
              }
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <SearchIcon className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>

          {/* State Selection (only for name search) */}
          {searchType === 'name' && (
            <div className="relative">
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">All States</option>
                {US_STATES.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
              <MapPin className="absolute right-3 top-2.5 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="w-full lg:w-auto"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </div>

      {/* Search Instructions */}
      <div className="text-sm text-gray-600">
        {searchType === 'name' ? (
          <p>
            Search by company name. For more accurate results, include the state
            where the company operates.
          </p>
        ) : searchType === 'dot' ? (
          <p>Enter the USDOT number (e.g., 1234567) for exact match.</p>
        ) : (
          <p>Enter the MC number (e.g., MC-123456) for exact match.</p>
        )}
      </div>
    </form>
  )
}
