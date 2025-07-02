import {
  Building2,
  Calendar,
  Globe,
  Hash,
  Home,
  Mail,
  Phone,
  Truck,
  AlertTriangle,
  Shield,
  Info,
} from 'lucide-react'
import { ICompanyReport } from '../lib/types'
import { RiskMeter } from './RiskMeter'
import { displayValueOrLoader } from '../lib/displayValueOrLoader'
import { InlineSpinner } from './InlineSpinner'

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
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="border-b border-gray-200 pb-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Company Overview</h2>
        <p className="text-gray-600 mt-1">
          Basic company information and verification details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {displayValueOrLoader(
                    currentReport?.companies_perfsol.company_name,
                    isReportPending
                  )}
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${
                      isBroker
                        ? 'bg-red-100 text-red-800 border-2 border-red-300'
                        : 'bg-green-100 text-green-800 border-2 border-green-300'
                    }`}
                  >
                    {isBroker ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : (
                      <Shield className="w-4 h-4" />
                    )}
                    {displayValueOrLoader(
                      currentReport?.companies_perfsol.company_type,
                      isReportPending
                    )}
                    {isBroker && <span className="text-xs">(HIGH RISK)</span>}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors overflow-hidden">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center min-w-10">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div className="max-w-full overflow-hidden">
                <div className="text-sm font-medium text-gray-500">
                  DOT Number
                </div>
                <div className="font-semibold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
                  {displayValueOrLoader(
                    currentReport?.companies_perfsol.dot_number,
                    isReportPending
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors overflow-hidden">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center min-w-10">
                <Hash className="w-5 h-5 text-blue-600" />
              </div>
              <div className="max-w-full overflow-hidden">
                <div className="text-sm font-medium text-gray-500">
                  MC Number
                </div>
                <div className="font-semibold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
                  {displayValueOrLoader(
                    currentReport?.companies_perfsol.mc_number,
                    isReportPending
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors overflow-hidden">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center min-w-10">
                <Home className="w-5 h-5 text-blue-600" />
              </div>
              <div className=" max-w-full">
                <div className="text-sm font-medium text-gray-500">Address</div>
                <div className="font-semibold text-gray-900 overflow-hidden text-ellipsis">
                  {displayValueOrLoader(
                    currentReport?.address,
                    isReportPending
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors overflow-hidden">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center min-w-10">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div className="max-w-full overflow-hidden">
                <div className="text-sm font-medium text-gray-500">Phone</div>
                <div className="font-semibold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
                  {displayValueOrLoader(currentReport?.phone, isReportPending)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors overflow-hidden">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center min-w-10">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div className="max-w-full overflow-hidden">
                <div className="text-sm font-medium text-gray-500">Email</div>
                <div className="font-semibold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
                  {displayValueOrLoader(currentReport?.email, isReportPending)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors overflow-hidden">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center min-w-10">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <div className="max-w-full overflow-hidden">
                <div className="text-sm font-medium text-gray-500">Website</div>
                <div className="font-semibold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
                  {currentReport?.website ? (
                    <a
                      href={currentReport?.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-500 hover:underline"
                    >
                      {currentReport?.website}
                    </a>
                  ) : isReportPending ? (
                    <InlineSpinner />
                  ) : (
                    'N/A'
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors overflow-hidden">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center min-w-10">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div className="max-w-full overflow-hidden">
                <div className="text-sm font-medium text-gray-500">
                  Years in Business
                </div>
                <div className="font-semibold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
                  {displayValueOrLoader(
                    currentReport?.years_in_business,
                    isReportPending
                  )}{' '}
                  years
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 mb-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  AI Risk Assessment
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Comprehensive risk analysis
                </p>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold text-center ${
                  ai_credibility_score >= 70
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : ai_credibility_score >= 40
                    ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}
              >
                {currentReport?.ai_credibility_score ? (
                  <>
                    {ai_credibility_score >= 70
                      ? 'Low Risk'
                      : ai_credibility_score >= 40
                      ? 'Medium Risk'
                      : 'High Risk'}
                  </>
                ) : isReportPending ? (
                  <InlineSpinner />
                ) : (
                  'High Risk'
                )}
              </span>
            </div>
            <RiskMeter
              score={currentReport?.ai_credibility_score}
              isReportPending={isReportPending}
            />
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
            <h4 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Company Details
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-blue-200 last:border-b-0">
                <span className="text-blue-800 font-medium">Type</span>
                <span
                  className={`font-semibold capitalize px-2 py-1 rounded ${
                    isBroker ? 'bg-red-100 text-red-800' : 'text-blue-900'
                  }`}
                >
                  {displayValueOrLoader(
                    currentReport?.companies_perfsol.company_type,
                    isReportPending
                  )}
                  {isBroker && ' ⚠️'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-blue-200 last:border-b-0">
                <span className="text-blue-800 font-medium">Fleet Size</span>
                <span className="font-semibold text-blue-900 capitalize">
                  {displayValueOrLoader(
                    currentReport?.fleet_size,
                    isReportPending
                  )}{' '}
                  vehicles
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-blue-800 font-medium">Safety Rating</span>
                <span className="font-semibold text-blue-900 capitalize">
                  {displayValueOrLoader(
                    currentReport?.safety_rating,
                    isReportPending
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Broker vs Carrier Explanation - Now positioned under the blue company details */}
          {isBroker && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-red-900 mb-2">
                    ⚠️ BROKER ALERT
                  </h4>
                  <p className="text-red-800 text-sm mb-3">
                    This company is a <strong>BROKER</strong>, not a direct
                    moving company. This significantly increases your risk.
                  </p>
                  <div className="bg-white rounded-lg p-3 border border-red-200">
                    <h5 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Key Differences:
                    </h5>
                    <div className="space-y-2 text-xs">
                      <div className="flex gap-2">
                        <span className="font-semibold text-red-700 min-w-[60px]">
                          BROKER:
                        </span>
                        <span className="text-red-800">
                          Middleman who sells your move to unknown carriers. No
                          trucks, no accountability.
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-semibold text-green-700 min-w-[60px]">
                          CARRIER:
                        </span>
                        <span className="text-green-800">
                          Direct moving company with their own trucks and
                          trained crews.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-red-100 rounded border border-red-300">
                    <p className="text-xs text-red-900 font-medium">
                      🚨 <strong>RISKS:</strong> Bait-and-switch pricing,
                      unknown subcontractors, limited recourse, potential scams
                    </p>
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
