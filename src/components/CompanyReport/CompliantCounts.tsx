import { ICompanyReport } from '../../lib/types'
import { Spinner } from '../Spinner'

export const CompliantCounts = ({
  complaint_counts,
  isReportPending,
}: {
  complaint_counts: ICompanyReport['complaint_counts']
  isReportPending: boolean
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    {complaint_counts?.length > 0 ? (
      <>
        {complaint_counts.map((complaint, index) => (
          <div
            key={index}
            className="bg-gray-50 border-2 border-gray-200 p-6 rounded-lg text-center"
          >
            <div
              className={`text-4xl font-bold mb-3 ${
                complaint.count < 5
                  ? 'text-green-600'
                  : complaint.count < 15
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}
            >
              {complaint.count}
            </div>
            <div className="text-lg font-bold text-gray-900">
              {complaint.source}
            </div>
            <div className="text-sm text-gray-600">Total Complaints</div>
          </div>
        ))}
      </>
    ) : isReportPending ? (
      <Spinner />
    ) : (
      <p className="text-gray-600">No complaint data available</p>
    )}
  </div>
)
