import React from 'react'
import { Shield, AlertTriangle } from 'lucide-react'

import { useReport } from '../hooks/useReport'
import { Spinner } from '../components/Spinner'
import { ReportHeader } from '../components/ReportHeader'
import { CompanyOverview } from '../components/CompanyOverview'
import { DbaNames } from '../components/DbaNames'
import { CompanyOwners } from '../components/CompanyOwners'
import { AuthorityRegistration } from '../components/AuthorityRegistration'
import { AuthorityStatus } from '../components/AuthorityStatus'
import { Insurance } from '../components/Insurance'
import { CargoTypes } from '../components/CargoTypes'
import { CompliantCounts } from '../components/CompliantCounts'
import { Lawsuits } from '../components/Lawsuits'
import { ReviewRating } from '../components/ReviewRating'
import { AIFlags } from '../components/AIFlags'
import { RedFlags } from '../components/RedFlags'
import { Button } from '../components/Button'
import { generateReportPDF } from '../lib/pdf'

export function CompanyReport() {
  const { currentReport, loading, error } = useReport()
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
    <div className="min-h-screen bg-gray-50">
      {/* Official Report Header */}
      <ReportHeader
        id={currentReport?.id}
        created_at={currentReport?.created_at}
      />

      <div className="container mx-auto px-4 pt-6 md:pt-8">
        <div className="max-w-5xl mx-auto flex justify-between items-center gap-6">
          {currentReport?.status === 'in_progress' ? (
            <div className="bg-blue-50 p-6 rounded-lg grow">
              <span className="text-blue-800 ">
                Report processing usually takes around 10 minutes
              </span>
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
                  This is an official report generated by National Mover Bureau
                  AI-powered verification system. All data is sourced from
                  federal and state records, updated daily.
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
    </div>
  )
}
