import {
  Building2,
  Calendar,
  Globe,
  Hash,
  Home,
  Mail,
  Phone,
  Truck,
} from 'lucide-react';
import { ICompanyReport } from '../lib/types';
import { RiskMeter } from './RiskMeter';
import { displayValueOrLoader } from '../lib/displayValueOrLoader';
import { InlineSpinner } from './InlineSpinner';

export const CompanyOverview = ({
  currentReport,
}: {
  currentReport: ICompanyReport | null;
}) => {
  const ai_credibility_score = currentReport?.ai_credibility_score ?? 0;
  const isReportPending = currentReport?.status === 'in_progress';

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Company Overview
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              {displayValueOrLoader(
                currentReport?.companies_perfsol.company_name,
                isReportPending
              )}
            </h3>

            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 capitalize">
              <Building2 className="w-4 h-4" />
              {displayValueOrLoader(
                currentReport?.companies_perfsol.company_type,
                isReportPending
              )}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <Truck className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-sm text-gray-500">DOT Number</div>
                <div className="font-medium">
                  {displayValueOrLoader(
                    currentReport?.companies_perfsol.dot_number,
                    isReportPending
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <Hash className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-sm text-gray-500">MC Number</div>
                <div className="font-medium">
                  {displayValueOrLoader(
                    currentReport?.companies_perfsol.mc_number,
                    isReportPending
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <Home className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-sm text-gray-500">Address</div>
                <div className="font-medium">
                  {displayValueOrLoader(
                    currentReport?.address,
                    isReportPending
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div className="font-medium">
                  {displayValueOrLoader(currentReport?.phone, isReportPending)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-medium">
                  {displayValueOrLoader(currentReport?.email, isReportPending)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <Globe className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-sm text-gray-500">Website</div>
                <div className="font-medium">
                  {currentReport?.website ? (
                    <a
                      href={currentReport?.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-500"
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

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-sm text-gray-500">Years in Business</div>
                <div className="font-medium">
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
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">
                AI Risk Assessment
              </h4>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  ai_credibility_score >= 70
                    ? 'bg-green-100 text-green-600'
                    : ai_credibility_score >= 40
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-red-100 text-red-600'
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

          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-4">Company Type</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-800">Type</span>
                <span className="font-medium text-blue-900 capitalize">
                  {displayValueOrLoader(
                    currentReport?.companies_perfsol.company_type,
                    isReportPending
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-800">Fleet Size</span>
                <span className="font-medium text-blue-900 capitalize">
                  {displayValueOrLoader(
                    currentReport?.fleet_size,
                    isReportPending
                  )}{' '}
                  vehicles
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-800">Safety Rating</span>
                <span className="font-medium text-blue-900 capitalize">
                  {displayValueOrLoader(
                    currentReport?.safety_rating,
                    isReportPending
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
