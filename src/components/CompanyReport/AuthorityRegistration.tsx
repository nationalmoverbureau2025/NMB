
import { ICompanyReport } from '../../lib/types'
import { Spinner } from '../Spinner'

export const AuthorityRegistration = ({
  authority_registration_dates,
  isReportPending,
}: {
  authority_registration_dates: ICompanyReport['authority_registration_dates']
  isReportPending: boolean
}) => (
  <div className="mb-8">
    <h4 className="text-lg font-bold text-gray-900 mb-4">
      Registration History
    </h4>
    {authority_registration_dates?.length > 0 ? (
      <div className="space-y-3">
        {authority_registration_dates.map((auth, index) => (
          <div
            key={index}
            className="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-gray-900">{auth.type}</div>
                <div className="text-sm text-gray-600">
                  Registered: {auth.date}
                </div>
              </div>
              <span className="bg-blue-100 border border-blue-300 px-3 py-1 rounded text-sm font-bold text-blue-800">
                REGISTERED
              </span>
            </div>
          </div>
        ))}
      </div>
    ) : isReportPending ? (
      <Spinner />
    ) : (
      <p className="text-gray-600">No authority registration data available</p>
    )}
  </div>
)
