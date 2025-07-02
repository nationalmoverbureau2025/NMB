import React, { useState } from 'react'
import {
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Shield,
  FileText,
  Truck,
  Building2,
} from 'lucide-react'
import { Button } from '../components/Button'
import { supabase } from '../lib/supabase'

interface VerificationResult {
  status: 'active' | 'inactive' | 'suspended' | 'expired'
  dot_number: string
  company_name: string
  license_status: string
  insurance_status: string
  operating_status: string
  safety_rating: string
  last_updated: string
}

export function License() {
  const [searchType, setSearchType] = useState<'dot' | 'mc'>('dot')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<VerificationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setResult(null)
    setIsLoading(true)

    try {
      // Query the database for the company
      const { data, error: dbError } = await supabase
        .from('companies')
        .select(
          `
          dot_number,
          company_name,
          license_status,
          insurance_status,
          operating_status,
          safety_rating,
          updated_at
        `
        )
        .eq(searchType === 'dot' ? 'dot_number' : 'mc_number', searchQuery)
        .single()

      if (dbError) throw dbError

      if (!data) {
        setError(
          'No company found with the provided number. Please verify and try again.'
        )
        return
      }

      setResult({
        status:
          data.license_status?.toLowerCase() === 'active'
            ? 'active'
            : 'inactive',
        dot_number: data.dot_number,
        company_name: data.company_name,
        license_status: data.license_status,
        insurance_status: data.insurance_status,
        operating_status: data.operating_status,
        safety_rating: data.safety_rating,
        last_updated: new Date(data.updated_at).toLocaleDateString(),
      })
    } catch (err) {
      console.error('License verification error:', err)
      setError(
        'An error occurred while verifying the license. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'text-green-600'
      case 'suspended':
        return 'text-red-600'
      case 'expired':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'suspended':
      case 'expired':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              License Verification
            </h1>
            <p className="text-xl text-gray-600">
              Verify the license status of any moving company instantly
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search by
                </label>
                <div className="flex rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={() => setSearchType('dot')}
                    className={`px-4 py-2 text-sm font-medium rounded-l-md ${
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
                    className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                      searchType === 'mc'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    MC Number
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Enter {searchType.toUpperCase()} Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Enter ${searchType.toUpperCase()} number...`}
                    required
                  />
                  <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify License'}
              </Button>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Status Header */}
              <div
                className={`p-6 ${
                  result.status === 'active' ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(result.status)}
                    <div>
                      <h2 className="text-lg font-semibold">
                        {result.company_name}
                      </h2>
                      <p className={`text-sm ${getStatusColor(result.status)}`}>
                        License Status: {result.license_status}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">DOT Number</div>
                    <div className="font-mono">{result.dot_number}</div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-sm text-gray-600">
                          Insurance Status
                        </div>
                        <div
                          className={`font-medium ${getStatusColor(
                            result.insurance_status
                          )}`}
                        >
                          {result.insurance_status}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-sm text-gray-600">
                          Operating Status
                        </div>
                        <div
                          className={`font-medium ${getStatusColor(
                            result.operating_status
                          )}`}
                        >
                          {result.operating_status}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-sm text-gray-600">
                          Safety Rating
                        </div>
                        <div className="font-medium">
                          {result.safety_rating || 'Not Rated'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-sm text-gray-600">
                          Last Updated
                        </div>
                        <div className="font-medium">{result.last_updated}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Warning Message */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-900">
                        Important Notice
                      </p>
                      <p className="text-sm text-amber-800 mt-1">
                        This verification result reflects the most recent data
                        available in our system. For the most current status,
                        please verify with the FMCSA directly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
