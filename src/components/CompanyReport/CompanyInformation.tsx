import { displayValueOrLoader } from '../../lib/displayValueOrLoader'
import { ICompanyReport } from '../../lib/types'
import { InlineSpinner } from '../InlineSpinner'

export const CompanyInformation = ({
  currentReport,
}: {
  currentReport: ICompanyReport | null
}) => {
  const isReportPending = currentReport?.status === 'in_progress'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-gray-50 border-2 border-gray-200 p-6 rounded-lg">
        <h4 className="text-lg font-bold text-gray-900 mb-4">
          Contact Information
        </h4>
        <div className="space-y-3 text-sm">
          <div>
            <strong>Address:</strong>{' '}
            {displayValueOrLoader(currentReport?.address, isReportPending)}
          </div>
          <div>
            <strong>Phone:</strong>{' '}
            {displayValueOrLoader(currentReport?.phone, isReportPending)}
          </div>
          <div>
            <strong>Email:</strong>{' '}
            {displayValueOrLoader(currentReport?.email, isReportPending)}
          </div>
          <div>
            <strong>Website:</strong>{' '}
            {currentReport?.website ? (
              <a
                href={currentReport?.website}
                className="text-blue-600 hover:underline"
              >
                {currentReport?.website}
              </a>
            ) : isReportPending ? (
              <InlineSpinner />
            ) : (
              'N/A'
            )}
          </div>
          <div>
            <strong>Domain Registration:</strong>{' '}
            {displayValueOrLoader(currentReport?.domain_registration_date, isReportPending)}
          </div>
        </div>
      </div>
      <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-lg">
        <h4 className="text-lg font-bold text-blue-900 mb-4">
          FMCSA Information
        </h4>
        <div className="text-sm">
          <div className="mb-3">
            <strong>FMCSA Status:</strong>
            <div className="bg-white border border-blue-200 p-2 rounded mt-1 text-xs">
              {displayValueOrLoader(currentReport?.fmcsa_status, isReportPending)}
            </div>
          </div>
          <div>
            <strong>State Registration Match:</strong>
            <span
              className={`ml-2 px-2 py-1 rounded text-xs font-bold ${
                currentReport?.state_registration_match
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {currentReport?.state_registration_match
                ? '✅ VERIFIED'
                : '❌ MISMATCH'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
