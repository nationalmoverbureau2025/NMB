import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = 'https://jvmgjdhsrautecchxezp.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2bWdqZGhzcmF1dGVjY2h4ZXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNTU5ODMsImV4cCI6MjA1NTczMTk4M30.IRa15knRES5VLuP9naqboaWBydW9o0NnyliKOYeSi94'

// Helper to check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  return (
    supabaseUrl !== undefined &&
    supabaseUrl !== '' &&
    supabaseAnonKey !== undefined &&
    supabaseAnonKey !== ''
  )
}

// Create the Supabase client
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.com',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      // Set custom email template IDs
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  }
)

// Database types
export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          dot_number: string | null
          company_name: string
          legal_name: string | null
          owner_name: string | null
          is_broker: boolean | null
          license_status: string | null
          insurance_status: string | null
          bbb_rating: string | null
          complaint_count: number | null
          risk_score: number | null
          ai_summary: string | null
          created_at: string
          updated_at: string
          mc_number: string | null
          safety_rating: string | null
          fleet_size: number | null
          dot_complaints: number | null
          address_street: string | null
          address_city: string | null
          address_state: string | null
          address_zip: string | null
          raw_rating: number | null
          adjusted_rating: number | null
          operating_status: string | null
          operating_authority_types: string[] | null
          authorized_for_hhg: boolean | null
          date_established: string | null
          insurance_coverage_amount: number | null
          insurance_expiry_date: string | null
          insurance_provider: string | null
          insurance_policy_number: string | null
          previous_business_names: string[] | null
          has_storage_facilities: boolean | null
          out_of_service_orders: number | null
          penalty_history: any | null
          bond_status: string | null
          bond_amount: number | null
        }
        Insert: {
          id?: string
          dot_number?: string | null
          company_name: string
          legal_name?: string | null
          owner_name?: string | null
          is_broker?: boolean | null
          license_status?: string | null
          insurance_status?: string | null
          bbb_rating?: string | null
          complaint_count?: number | null
          risk_score?: number | null
          ai_summary?: string | null
          created_at?: string
          updated_at?: string
          mc_number?: string | null
          safety_rating?: string | null
          fleet_size?: number | null
          dot_complaints?: number | null
          address_street?: string | null
          address_city?: string | null
          address_state?: string | null
          address_zip?: string | null
          raw_rating?: number | null
          adjusted_rating?: number | null
          operating_status?: string | null
          operating_authority_types?: string[] | null
          authorized_for_hhg?: boolean | null
          date_established?: string | null
          insurance_coverage_amount?: number | null
          insurance_expiry_date?: string | null
          insurance_provider?: string | null
          insurance_policy_number?: string | null
          previous_business_names?: string[] | null
          has_storage_facilities?: boolean | null
          out_of_service_orders?: number | null
          penalty_history?: any | null
          bond_status?: string | null
          bond_amount?: number | null
        }
        Update: {
          id?: string
          dot_number?: string | null
          company_name?: string
          legal_name?: string | null
          owner_name?: string | null
          is_broker?: boolean | null
          license_status?: string | null
          insurance_status?: string | null
          bbb_rating?: string | null
          complaint_count?: number | null
          risk_score?: number | null
          ai_summary?: string | null
          created_at?: string
          updated_at?: string
          mc_number?: string | null
          safety_rating?: string | null
          fleet_size?: number | null
          dot_complaints?: number | null
          address_street?: string | null
          address_city?: string | null
          address_state?: string | null
          address_zip?: string | null
          raw_rating?: number | null
          adjusted_rating?: number | null
          operating_status?: string | null
          operating_authority_types?: string[] | null
          authorized_for_hhg?: boolean | null
          date_established?: string | null
          insurance_coverage_amount?: number | null
          insurance_expiry_date?: string | null
          insurance_provider?: string | null
          insurance_policy_number?: string | null
          previous_business_names?: string[] | null
          has_storage_facilities?: boolean | null
          out_of_service_orders?: number | null
          penalty_history?: any | null
          bond_status?: string | null
          bond_amount?: number | null
        }
      }
      company_reviews: {
        Row: {
          id: string
          company_id: string
          source: string
          rating: number | null
          review_text: string | null
          review_date: string | null
          is_suspicious: boolean | null
          ai_analysis: string | null
          created_at: string
        }
        Insert: {
          id?: string
          company_id: string
          source: string
          rating?: number | null
          review_text?: string | null
          review_date?: string | null
          is_suspicious?: boolean | null
          ai_analysis?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          source?: string
          rating?: number | null
          review_text?: string | null
          review_date?: string | null
          is_suspicious?: boolean | null
          ai_analysis?: string | null
          created_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          subject: string
          message: string
          recaptcha_token: string | null
          status: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject: string
          message: string
          recaptcha_token?: string | null
          status?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string
          message?: string
          recaptcha_token?: string | null
          status?: string | null
          created_at?: string
        }
      }
      reports: {
        Row: {
          id: string
          user_id: string
          company_id: string
          status: string
          expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company_id: string
          status?: string
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company_id?: string
          status?: string
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: {
      check_report_credits: {
        Args: {
          user_id: string
        }
        Returns: number
      }
    }
  }
}
