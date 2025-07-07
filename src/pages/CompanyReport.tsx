import React from 'react'
import { Shield, AlertTriangle } from 'lucide-react'

import { useReport } from '../hooks/useReport'
import { Spinner } from '../components/Spinner'
import { CompanyOverview } from '../components/CompanyOverview'
import { DbaNames } from '../components/DbaNames'
import { CompanyOwners } from '../components/CompanyOwners'
import { AuthorityRegistration } from '../components/AuthorityRegistration'
import { AuthorityStatus } from '../components/AuthorityStatus'
import { Insurance } from '../components/Insurance'
import { CompliantCounts } from '../components/CompliantCounts'
import { Lawsuits } from '../components/Lawsuits'
import { ReviewRating } from '../components/ReviewRating'
import { AIFlags } from '../components/AIFlags'
import { RedFlags } from '../components/RedFlags'
import { Button } from '../components/Button'
import { generateReportPDF } from '../lib/pdf'
import { ReportHeaderNew } from '../components/ReportHeaderNew'
import {CompanyInformation} from '../components/CompanyInformation'

const TOTAL_REPORT_FIELDS = 44

export function CompanyReport() {
  const { currentReport, loading, error, filledFieldsCount } = useReport()
  const isReportPending = currentReport?.status === 'in_progress'
  const isReportError = currentReport?.status === 'canceled'

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner text="Loading comprehensive report..." />
      </div>
    )
  }

  if (error || !currentReport) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600">{error || 'Company not found'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* Official Report Header */}
      <ReportHeaderNew currentReport={currentReport} />

      <div className="container mx-auto px-4 pt-6 md:pt-8">
        <div className="max-w-5xl mx-auto flex justify-between items-center gap-6">
          {currentReport?.status === 'in_progress' ? (
            <div className="bg-blue-50 p-6 rounded-lg grow">
              <span className="text-blue-800 ">
                Report processing usually takes around 10 minutes
              </span>
              <div className="w-full">
                <div className="flex items-center justify-between mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-blue-400 transition-all duration-500`}
                    style={{
                      width: `${
                        (filledFieldsCount / TOTAL_REPORT_FIELDS) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <Button onClick={() => generateReportPDF(currentReport)}>
            Download PDF
          </Button>
        </div>
      </div>

      {isReportError ? (
        <div className="bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
            <p className="text-gray-600">
              {
                'Error during report generation. Credits will be refunded to you balance.'
              }
            </p>
          </div>
        </div>
      ) : null}

      <div className="bg-white border-4 border-gray-300 rounded-xl overflow-hidden max-w-5xl mx-auto shadow-2xl">
        <div className="px-8 py-8">
          <CompanyOverview currentReport={currentReport} />
          <div className="space-y-12">
            <section>
              <div className="border-b-4 border-gray-900 pb-3 mb-6">
                <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
                  1. COMPANY INFORMATION & CONTACT DETAILS
                </h3>
              </div>

              <CompanyInformation currentReport={currentReport} />
              <DbaNames
                dba_names={currentReport?.dba_names}
                isReportPending={isReportPending}
              />

              <CompanyOwners
                owners={currentReport?.owners}
                isReportPending={isReportPending}
              />
            </section>

            <section>
              <div className="border-b-4 border-gray-900 pb-3 mb-6">
                <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
                  2. AUTHORITY & REGISTRATION
                </h3>
              </div>

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
            </section>

            {/* <CargoTypes
            cargo_types={currentReport?.cargo_types}
            isReportPending={isReportPending}
          /> */}

            <section>
              <div className="border-b-4 border-gray-900 pb-3 mb-6">
                <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
                  3. COMPLAINT & LEGAL HISTORY
                </h3>
              </div>

              <CompliantCounts
                complaint_counts={currentReport?.complaint_counts}
                isReportPending={isReportPending}
              />

              <Lawsuits
                lawsuits={currentReport?.lawsuits}
                isReportPending={isReportPending}
              />
            </section>
            <section>
              <div className="border-b-4 border-gray-900 pb-3 mb-6">
                <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
                  4. CUSTOMER REVIEWS ANALYSIS
                </h3>
              </div>

              <ReviewRating currentReport={currentReport} />
            </section>

            <section>
              <div className="border-b-4 border-gray-900 pb-3 mb-6">
                <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
                  5. AI SUSPICIOUS ACTIVITY DETECTION
                </h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AIFlags currentReport={currentReport} />
              </div>
            </section>
            <section>
              <div className="border-b-4 border-gray-900 pb-3 mb-6">
                <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
                  6. RISK FACTORS ANALYSIS
                </h3>
              </div>

              <RedFlags currentReport={currentReport} />
            </section>
          </div>
        </div>
        {/* Report Footer */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <Shield className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">
                This is an official report generated by National Mover Bureau
                AI-powered verification system. All data is sourced from federal
                and state records, updated daily.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Report ID: {currentReport?.id?.split('-')[0]} • Generated on{' '}
                {currentReport?.created_at?.slice(0, 10)} • National Mover
                Bureau © {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
        <div className="border-t-4 border-gray-900 pt-8 mt-16">
          <div className="bg-gray-50 border-2 border-gray-200 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">
                    NATIONAL MOVER BUREAU
                  </div>
                  <div className="text-sm text-gray-600">
                    Official Moving Company Verification System
                  </div>
                </div>
              </div>
              <div className="text-right text-sm text-gray-600">
                <div className="font-mono font-bold">
                  Report ID: {currentReport?.id?.split('-')[0]}
                </div>
                <div>Generated: {currentReport?.created_at?.slice(0, 10)}</div>
                <div>© {new Date().getFullYear()} National Mover Bureau</div>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-4">
              <div className="text-center text-xs text-gray-600">
                <p>
                  <strong>OFFICIAL VERIFICATION REPORT:</strong> This is an
                  official verification report with comprehensive analysis
                  including all available data fields, AI-powered insights, and
                  risk assessment. All data is sourced from federal and state
                  records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
