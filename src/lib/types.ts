export interface CompanyNew {
  id: number;
  company_name: string;
  mc_number: string;
  dot_number: string;
  state: string;
  state_shortened: string;
  company_type: string;
}

export interface ICompanyReport {
  id: number;
  user_id: string;
  credits_remaining: number;
  bundle_size: number;
  purchase_date: string;
  created_at: string;
  expires_at: string;
  status: 'in_progress' | 'finished' | 'canceled';
  years_in_business: number;
  dba_names: { name: string; start_date: string; end_date: string }[];
  owners: { name: string; role: string; since: string }[];
  address: string;
  phone: string;
  email: string;
  website: string;
  domain_registration_date: string;
  authority_registration_dates: { type: string; date: string }[];
  authority_statuses: { type: string; status: string; updated_at: string }[];
  fmcsa_status: string;
  insurance: { type: string; status: string; expiration_date: string }[];
  safety_rating: string;
  fleet_size: number;
  cargo_types: string[];
  complaint_counts: { source: string; count: number }[];
  state_registration_match: boolean;
  lawsuits: string[];
  google_rating: number;
  google_reviews_count: number;
  yelp_rating: number;
  yelp_reviews_count: number;
  bbb_rating: number;
  bbb_reviews_count: number;
  trustpilot_rating: number;
  trustpilot_reviews_count: number;
  star_breakdown: Record<string, number> | null;
  sentiment_breakdown: {
    positive: number;
    neutral: number;
    negative: number;
  } | null;
  review_timeline: { date: string; count: number }[];
  ai_credibility_score: number;
  volume_timing_flags: string[];
  reviewer_credibility_flags: string[];
  language_pattern_flags: string[];
  platform_conflicts: string[];
  geographic_gaps: string[];
  sentiment_specificity_flags: string[];
  suspicious_activity_summary: string;
  suspicious_dba: boolean;
  broker_as_carrier: boolean;
  revoked_authority: boolean;
  similar_to_banned: boolean;
  recent_or_private_domain: boolean;
  legal_complaints: boolean;
  mismatched_claims: boolean;
  red_flag_details: string[];
  companies_perfsol: {
    company_name: string;
    dot_number: string;
    id: number;
    mc_number: string;
    state: string;
    state_shortened: string;
    company_type: string;
  };
}
