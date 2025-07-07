import { Lock } from 'lucide-react'
import { ICompanyReport } from '../lib/types'
import { Spinner } from './Spinner'

export const Insurance = ({
  insurance,
  isReportPending,
}: {
  insurance: ICompanyReport['insurance']
  isReportPending: boolean
}) => (
  <div>
    <h4 className="text-lg font-bold text-gray-900 mb-4">Insurance Coverage</h4>
    {insurance?.length > 0 ? (
      <div className="space-y-3">
        {insurance.map((ins, index) => (
          <div
            key={index}
            className="bg-gray-50 border-2 border-gray-200 p-4 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-gray-900 capitalize">
                  {ins.type}
                </div>
                <div className="text-sm text-gray-600">
                  Expires: {ins.expiration_date}
                </div>
              </div>
              <span
                className={`px-4 py-2 rounded font-bold border-2 ${
                  ins.status?.toLowerCase() === 'active'
                    ? 'bg-green-100 text-green-800 border-green-300'
                    : 'bg-red-100 text-red-800 border-red-300'
                }`}
              >
                {ins.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    ) : isReportPending ? (
      <Spinner />
    ) : (
      <p className="text-gray-600">No insurance information available</p>
    )}
  </div>
)
