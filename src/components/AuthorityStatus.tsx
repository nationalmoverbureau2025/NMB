import { ICompanyReport } from '../lib/types'
import { Spinner } from './Spinner'

export const AuthorityStatus = ({
  authority_statuses,
  isReportPending,
}: {
  authority_statuses: ICompanyReport['authority_statuses']
  isReportPending: boolean
}) => (
  <div className="mb-8">
    <h4 className="text-lg font-bold text-gray-900 mb-4">
      Current Authority Status
    </h4>
    <div className="space-y-3">
      {authority_statuses?.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {authority_statuses.map((status, index) => (
            <div
              key={index}
              className="bg-gray-50 border-2 border-gray-200 p-4 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900">{status.type}</div>
                  <div className="text-sm text-gray-600">
                    Updated: {status.updated_at}
                  </div>
                </div>
                <span
                  className={`px-4 py-2 rounded font-bold border-2 ${
                    status.status?.toLowerCase() === 'active'
                      ? 'bg-green-100 text-green-800 border-green-300'
                      : 'bg-red-100 text-red-800 border-red-300'
                  }`}
                >
                  {status.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : isReportPending ? (
        <Spinner />
      ) : (
        <p className="text-gray-600">No authority status data available</p>
      )}
    </div>
  </div>
)
