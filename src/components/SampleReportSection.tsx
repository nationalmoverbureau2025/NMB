import { Link } from 'react-router-dom'
import { Button } from './Button'
import { RedFlags } from './RedFlags'
import { Shield } from 'lucide-react'
import { AIFlags } from './AIFlags'
import { ReviewRating } from './ReviewRating'
import { Lawsuits } from './Lawsuits'
import { CompliantCounts } from './CompliantCounts'
import { CargoTypes } from './CargoTypes'
import { AuthorityStatus } from './AuthorityStatus'
import { Insurance } from './Insurance'
import { AuthorityRegistration } from './AuthorityRegistration'
import { CompanyOwners } from './CompanyOwners'
import { DbaNames } from './DbaNames'
import { CompanyOverview } from './CompanyOverview'
import { ICompanyReport } from '../lib/types'

const currentReport: ICompanyReport = {
  user_id: 'abc921ab-c256-4312-8b2c-a018ca6ad801',
  status: 'finished',
  expires_at: '2025-07-24 16:17:53.382+00',
  created_at: '2025-06-24 16:17:53.652834+00',
  updated_at: '2025-06-24 16:17:53.652834+00',
  years_in_business: 3,
  companies_perfsol: {
    company_name: 'One Source Van Lines Llc',
    dot_number: '3798698',
    id: 7,
    mc_number: '1366414',
    company_type: 'Broker',
    state: 'Florida',
    state_shortened: 'FL',
  },
  dba_names: [
    {
      name: 'We Move Anywhere LLC',
      end_date: '',
      start_date: '2022-01-15',
    },
  ],
  owners: [
    {
      name: 'Dirk Perdrix',
      role: 'Owner',
      since: '2021-12-27',
    },
    {
      name: 'Dylan Clairmont',
      role: 'Owner',
      since: '2021-12-27',
    },
  ],
  address: '101 s federal hwy ste 450, boynton beach, fl 33435',
  phone: '888-908-1114',
  email: 'contact@onesourcevanlines.com',
  website: 'https://onesourcevanlines.com',
  domain_registration_date: '',
  authority_registration_dates: [
    {
      date: '2022-04-05',
      type: 'FMCSA Brokerage Authority',
    },
    {
      date: '2021-12-27',
      type: 'Florida LLC Registration',
    },
  ],
  authority_statuses: [
    {
      type: 'FMCSA Brokerage Authority',
      status: 'Active',
      updated_at: '2025-05-15',
    },
    {
      type: 'Florida LLC Status',
      status: 'Active',
      updated_at: '2025-06-01',
    },
  ],
  fmcsa_status:
    'Active brokerage authority with no current cargo or liability insurance filings found',
  insurance: [
    {
      type: 'Cargo Insurance',
      status: 'Not Verified',
      expiration_date: 'N/A',
    },
    {
      type: 'Liability Insurance',
      status: 'Not Verified',
      expiration_date: 'N/A',
    },
  ],
  safety_rating: 'None assigned',
  fleet_size: 0,
  cargo_types: [],
  complaint_counts: [
    {
      count: 52,
      source: 'BBB',
    },
    {
      count: 12,
      source: 'FMCSA Consumer Complaints',
    },
  ],
  state_registration_match: true,
  lawsuits: [
    {
      date: '2024-03-15',
      court: 'Broward County Court',
      title: 'Breach of contract – undelivered deposit refund',
      status: 'Pending',
      summary:
        'Small claims involving retention of customer deposits following service cancellation',
      source_url: 'https://www.browardclerk.org/cases/2024/03/15/Case-12345',
    },
    {
      date: '2024-04-02',
      court: 'Broward County Court',
      title: 'Deposit dispute over moving services',
      status: 'Pending',
      summary: 'Allegations of non-refundable deposits withheld in dispute',
      source_url: 'https://www.browardclerk.org/cases/2024/04/02/Case-12399',
    },
    {
      date: '2024-05-20',
      court: 'Broward County Court',
      title: 'Claim for breach of contract relating to delivery delays',
      status: 'Pending',
      summary: 'Customer alleges delay and damaged goods, seeking compensation',
      source_url: 'https://www.browardclerk.org/cases/2024/05/20/Case-12420',
    },
  ],
  google_rating: 2.3,
  google_reviews_count: 147,
  yelp_rating: 2.1,
  yelp_reviews_count: 32,
  bbb_rating: 2.4,
  bbb_reviews_count: 28,
  trustpilot_rating: 2.3,
  trustpilot_reviews_count: 40,
  star_breakdown: {
    '1': 310,
    '2': 25,
    '3': 21,
    '4': 9,
    '5': 91,
  },
  sentiment_breakdown: {
    neutral: 55,
    negative: 310,
    positive: 91,
  },
  review_timeline: [
    {
      date: '2023-03',
      count: 35,
    },
    {
      date: '2024-01',
      count: 48,
    },
    {
      date: '2025-03',
      count: 37,
    },
    {
      date: '2025-05',
      count: 44,
    },
  ],
  ai_credibility_score: 35,
  volume_timing_flags: [
    '37 five-star reviews posted within 72-hour bursts in late March 2025',
  ],
  reviewer_credibility_flags: [
    '49% of positive reviewers have single-review histories on my moving journey',
    'Negative reviewers demonstrate multi-platform activity and detailed narratives',
  ],
  language_pattern_flags: [
    "23 positive reviews contain identical phrasing 'stress-free move with expert coordination'",
  ],
  platform_conflicts: [
    "Google archives indicate 4.7-star ratings, contrasted by BBB's consistent 1-star narratives",
  ],
  geographic_gaps: [
    "19% of five-star reviewers list locations outside company's operational regions (e.g., Idaho, Wyoming)",
  ],
  sentiment_specificity_flags: [
    'Positive reviews use generic praise with few service details',
    'Negative reviews provide detailed accounts of contractual violations and financial losses',
  ],
  suspicious_activity_summary:
    'Analysis reveals probable review manipulation through clustered positive reviews with identical language, inconsistent geographic reviewer data, and discrepancies between platform ratings. The presence of suspicious DBA activity and broker-carrier misrepresentation further exacerbates credibility concerns.',
  suspicious_dba: true,
  broker_as_carrier: true,
  revoked_authority: false,
  similar_to_banned: true,
  recent_or_private_domain: true,
  legal_complaints: true,
  mismatched_claims: true,
  red_flag_details: [
    'Broker misrepresented as direct mover in marketing materials despite brokerage-only FMCSA authority',
    '52 unresolved BBB complaints citing deceptive pricing and refund refusals',
    'No verifiable cargo or liability insurance maintained according to FMCSA L&I database',
    'Small claims lawsuits alleging breach of contract and retention of deposits',
    'Suspicion of review manipulation indicated by AI-detected linguistic and temporal anomalies',
    'Operation under multiple names (DBA) with overlapping complaints and management',
    'Failure to disclose domain registration details contributing to transparency concerns',
  ],
  id: '5f77455a-303d-4a93-aeb3-58abbd6f7fb0',
  workflow_run_id: 950,
}

const isReportPending = false

export const SampleReportSection = () => (
  <section className="py-16 bg-white border-y border-gray-200" id="reports">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            See What's Inside Our Reports
          </h2>
          <p className="text-xl text-gray-600">
            Get instant access to comprehensive data and AI analysis
          </p>
        </div>
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="max-w-5xl mx-auto space-y-8">
            <CompanyOverview currentReport={currentReport} />

            <DbaNames
              dba_names={currentReport?.dba_names}
              isReportPending={isReportPending}
            />

            <CompanyOwners
              owners={currentReport?.owners}
              isReportPending={isReportPending}
            />

            <AuthorityRegistration
              authority_registration_dates={
                currentReport?.authority_registration_dates
              }
              isReportPending={isReportPending}
            />

            <AuthorityStatus
              authority_statuses={currentReport?.authority_statuses}
              isReportPending={isReportPending}
            />

            <Insurance
              insurance={currentReport?.insurance}
              isReportPending={isReportPending}
            />

            <CargoTypes
              cargo_types={currentReport?.cargo_types}
              isReportPending={isReportPending}
            />

            <CompliantCounts
              complaint_counts={currentReport?.complaint_counts}
              isReportPending={isReportPending}
            />

            <Lawsuits
              lawsuits={currentReport?.lawsuits}
              isReportPending={isReportPending}
            />

            <ReviewRating currentReport={currentReport} />

            <AIFlags currentReport={currentReport} />

            <RedFlags currentReport={currentReport} />

            {/* Report Footer */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                <Shield className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">
                    This is an official report generated by National Mover
                    Bureau AI-powered verification system. All data is sourced
                    from federal and state records, updated daily.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Report ID: {currentReport?.id?.split('-')[0]} • Generated on{' '}
                    {currentReport?.created_at?.slice(0, 10)} • National Mover
                    Bureau © {new Date().getFullYear()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Report Preview Footer */}
        <div className="bg-gray-50 p-6 text-center">
          <p className="text-gray-600 mb-4">
            This is a preview of our comprehensive report
          </p>
          <Link to="/signup">
            <Button>Get Full Report Access</Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
)
