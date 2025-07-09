import { ICompanyReport } from '../lib/types'
import { Spinner } from './Spinner'

export const CompanyOwners = ({
  owners,
  isReportPending,
}: {
  owners: ICompanyReport['owners']
  isReportPending: boolean
}) => (
  <div className="mt-8">
    <h4 className="text-lg font-bold text-gray-900 mb-4">Company Ownership</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {owners?.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {owners.map((owner, index) => (
            <div
              key={index}
              className="bg-gray-50 border-2 border-gray-200 p-4 rounded-lg"
            >
              <div className="font-bold text-gray-900">{owner.name}</div>
              <div className="text-sm text-gray-600">
                {owner.role} • Since: {owner.since}
              </div>
            </div>
          ))}
        </div>
      ) : isReportPending ? (
        <Spinner />
      ) : (
        <p className="text-gray-600">No owner information available</p>
      )}
    </div>
  </div>
)
