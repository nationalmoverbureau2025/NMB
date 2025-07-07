import { ICompanyReport } from '../lib/types'
import { displayValueOrLoader } from '../lib/displayValueOrLoader'
import { InlineSpinner } from './InlineSpinner'
import { AlertOctagon } from 'lucide-react'

export const CompanyOverview = ({
  currentReport,
}: {
  currentReport: ICompanyReport | null
}) => {
  const ai_credibility_score = currentReport?.ai_credibility_score ?? 0
  const isReportPending = currentReport?.status === 'in_progress'
  const isBroker =
    currentReport?.companies_perfsol.company_type?.toLowerCase() === 'broker'

  return (
    <>
      <div className="mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Company Information */}
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {displayValueOrLoader(
                currentReport?.companies_perfsol?.company_name,
                isReportPending
              )}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                <div className="text-xs font-medium text-blue-600 uppercase">
                  DOT Number
                </div>
                <div className="text-lg font-bold text-blue-900">
                  {displayValueOrLoader(
                    currentReport?.companies_perfsol?.dot_number,
                    isReportPending
                  )}
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                <div className="text-xs font-medium text-blue-600 uppercase">
                  MC Number
                </div>
                <div className="text-lg font-bold text-blue-900">
                  {displayValueOrLoader(
                    currentReport?.companies_perfsol?.mc_number,
                    isReportPending
                  )}
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg">
                <div className="text-xs font-medium text-gray-600 uppercase">
                  State
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {displayValueOrLoader(
                    currentReport?.companies_perfsol?.state,
                    isReportPending
                  )}
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg">
                <div className="text-xs font-medium text-gray-600 uppercase">
                  Years Active
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {displayValueOrLoader(
                    currentReport?.years_in_business,
                    isReportPending
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <span
                className={`px-6 py-3 rounded-lg text-lg font-bold border-2 ${
                  isBroker
                    ? 'bg-red-100 text-red-800 border-red-300'
                    : 'bg-green-100 text-green-800 border-green-300'
                }`}
              >
                {displayValueOrLoader(
                  currentReport?.companies_perfsol?.company_type,
                  isReportPending
                )}
                {isBroker && ' ⚠️ HIGH RISK'}
              </span>
              <span className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                {displayValueOrLoader(
                  `Fleet: ${currentReport?.fleet_size} vehicles`,
                  isReportPending
                )}
              </span>
              <span className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
                {displayValueOrLoader(
                  `Safety: ${currentReport?.safety_rating}`,
                  isReportPending
                )}
              </span>
            </div>
          </div>

          {/* Risk Score Box */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-4 border-gray-300 p-8 rounded-xl text-center h-full flex flex-col justify-center">
              {ai_credibility_score ? (
                <div className="text-6xl font-bold text-gray-900 mb-4">
                  {ai_credibility_score}
                  <span className="text-3xl text-gray-600">/100</span>
                </div>
              ) : isReportPending ? (
                <InlineSpinner />
              ) : (
                'N/A'
              )}
              <div className="text-xl font-bold text-gray-700 mb-4">
                AI Credibility Score
              </div>
              <div
                className={`inline-block px-6 py-3 rounded-lg text-lg font-bold border-2 ${
                  ai_credibility_score >= 70
                    ? 'bg-green-100 text-green-800 border-green-300'
                    : ai_credibility_score >= 40
                    ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                    : 'bg-red-100 text-red-800 border-red-300'
                }`}
              >
                HIGH RISK
              </div>
            </div>
          </div>
        </div>
      </div>
      {isBroker && (
        <div className="bg-red-50 border-4 border-red-300 p-8 mb-12 rounded-xl">
          <div className="flex items-start gap-6">
            <AlertOctagon className="w-12 h-12 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-red-900 mb-4">
                🚨 CRITICAL BROKER ALERT
              </h3>
              <div className="bg-white border-2 border-red-200 rounded-lg p-6">
                <p className="text-red-800 text-lg font-medium mb-3">
                  This company is a <strong>BROKER</strong>, not a direct moving
                  company. This significantly increases your risk of fraud,
                  hidden fees, and poor service.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-bold text-red-900 mb-2">
                      🔴 BROKER RISKS:
                    </h4>
                    <ul className="list-disc list-inside text-red-800 space-y-1">
                      <li>No trucks or trained crews</li>
                      <li>Sells your move to unknown carriers</li>
                      <li>Limited accountability for damages</li>
                      <li>Bait-and-switch pricing common</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-900 mb-2">
                      ✅ DIRECT CARRIER BENEFITS:
                    </h4>
                    <ul className="list-disc list-inside text-green-800 space-y-1">
                      <li>Own trucks and equipment</li>
                      <li>Trained, employed crews</li>
                      <li>Direct accountability</li>
                      <li>Transparent pricing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
