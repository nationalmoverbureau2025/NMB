import { supabase } from './supabase'

export interface SearchResult {
  id: string
  name: string
  dot: string | null
  mc: string | null
  address: string
  address_zip?: string
  risk_score?: number
  complaint_count?: number
  is_broker?: boolean
  bbb_rating?: string | null
  safety_rating?: string | null
}

export async function searchCompanies(
  query: string,
  type: 'name' | 'dot' | 'mc',
  state?: string
) {
  try {
    const res = await fetch(import.meta.env.VITE_N8N_SEARCH, {
      method: 'POST',
      body: JSON.stringify({
        company_name: type === 'name' ? query : '',
        state,
        company_dot: type === 'dot' ? query : '',
        company_mx: type === 'mc' ? query : '',
      }),
    })

    const data = await res.json()

    if (data.message) {
      throw data.message
      return []
    }

    if (data.error) {
      throw data.error
    }

    return data ?? []
  } catch (error) {
    console.error('Search error:', error)
    throw error
  }
}

export async function getCompanyDetails(id: string) {
  try {
    const { data: company, error } = await supabase
      .from('companies')
      .select(
        `
        *,
        company_reviews (
          id,
          rating,
          review_text,
          review_date,
          is_suspicious,
          ai_analysis,
          source
        ),
        company_complaints (
          id,
          complaint_type,
          description,
          filing_date,
          resolution_status
        )
      `
      )
      .eq('id', id)
      .single()

    if (error) throw error
    return company
  } catch (error) {
    console.error('Error fetching company details:', error)
    throw error
  }
}
