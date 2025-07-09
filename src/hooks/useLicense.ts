import { useState } from 'react'
import { supabase } from '../lib/supabase'

export interface VerificationResult {
  status: 'active' | 'inactive' | 'suspended' | 'expired'
  dot_number: string
  company_name: string
  license_status: string
  insurance_status: string
  operating_status: string
  safety_rating: string
  last_updated: string
}

export const useLicense = () => {
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

  return {handleSearch, searchType, setSearchType, searchQuery, setSearchQuery, isLoading, result, error}
}
