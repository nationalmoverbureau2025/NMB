import { FileText } from 'lucide-react'
import { ICompanyReport } from '../lib/types'
import { Spinner } from './Spinner'

export const AuthorityRegistration = ({
  authority_registration_dates,
  isReportPending,
}: {
  authority_registration_dates: ICompanyReport['authority_registration_dates']
  isReportPending: boolean
}) => (
  <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
    <h2 className="text-xl font-bold text-gray-900 mb-6">
      Authority Registration
    </h2>
    {authority_registration_dates?.length > 0 ? (
      <div className="grid md:grid-cols-2 gap-4">
        {authority_registration_dates.map((auth, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium text-gray-900">{auth.type}</div>
                <div className="text-sm text-gray-600">
                  Registered: {auth.date}
                </div>
              </div>
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
