import { AlertTriangle } from 'lucide-react'
import { ICompanyReport } from '../../lib/types'

export const getStyles = (
  value: boolean | null | undefined,
  isReportPending: boolean,
  onTrueStyle: string,
  onFalseStyle: string,
  onLoadingStyle: string
) => {
  if (value === null || value === undefined) {
    if (isReportPending) {
      return onLoadingStyle
    }
    return onTrueStyle
  }
  if (value) {
    return onTrueStyle
  }
  return onFalseStyle
}

export const RedFlags = ({
  currentReport,
}: {
  currentReport: ICompanyReport
}) => {
  // const isReportPending = currentReport?.status === 'in_progress'

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {[
          {
            label: 'Suspicious DBA Activity',
            value: currentReport?.suspicious_dba,
          },
          {
            label: 'Broker as Carrier',
            value: currentReport?.broker_as_carrier,
          },
          {
            label: 'Legal Complaints',
            value: currentReport?.legal_complaints,
          },
          {
            label: 'Mismatched Claims',
            value: currentReport?.mismatched_claims,
          },
        ].map((flag, index) => (
          <div
            key={index}
            className="bg-gray-50 border-2 border-gray-200 p-4 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900">{flag.label}</span>
              <span
                className={`px-3 py-1 rounded text-sm font-bold border-2 ${
                  flag.value
                    ? 'bg-red-100 text-red-800 border-red-300'
                    : 'bg-green-100 text-green-800 border-green-300'
                }`}
              >
                {flag.value ? '🚩 FLAGGED' : '✅ CLEAR'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Risk Analysis Preview */}
      <div>
        <h4 className="text-lg font-bold text-gray-900 mb-4">
          Detailed Risk Analysis
        </h4>
        <div className="space-y-4">
          {currentReport?.red_flag_details?.slice(0, 3).map((detail, index) => (
            <div
              key={index}
              className="bg-red-50 border-2 border-red-200 p-6 rounded-lg"
            >
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-bold text-red-900 mb-2">
                    RISK FACTOR #{index + 1}
                  </div>
                  <div className="text-red-800">{detail}</div>
                </div>
              </div>
            </div>
          ))}
          {currentReport?.red_flag_details &&
            currentReport?.red_flag_details.length > 3 && (
              <div className="text-center p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-600 font-medium">
                  + {currentReport?.red_flag_details.length - 3} more detailed
                  risk factors in full report
                </p>
              </div>
            )}
        </div>
      </div>
    </>
  )
}
