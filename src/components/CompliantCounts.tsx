import { AlertCircle } from 'lucide-react'
import { ICompanyReport } from '../lib/types'
import { Spinner } from './Spinner'

export const CompliantCounts = ({
  complaint_counts,
  isReportPending,
}: {
  complaint_counts: ICompanyReport['complaint_counts']
  isReportPending: boolean
}) => (
  <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Complaint History</h2>
    {complaint_counts?.length > 0 ? (
      <div className="grid md:grid-cols-3 gap-4">
        {complaint_counts.map((complaint, index) => (
          <div
            key={index}
            className="p-4 pt-6 bg-gray-50 rounded-lg text-center relative"
          >
            <AlertCircle
              className={`absolute top-2 left-2 w-5 h-5 text-${
                complaint.count < 2
                  ? 'green'
                  : complaint.count < 4
                  ? 'orange'
                  : 'red'
              }-600`}
            />
            <div className="flex items-center justify-center gap-2 mb-2">
              <h4 className="font-medium text-gray-900">{complaint.source}</h4>
            </div>
            <div
              className={`text-2xl font-bold text-${
                complaint.count < 2
                  ? 'green'
                  : complaint.count < 4
                  ? 'orange'
                  : 'red'
              }-600`}
            >
              {complaint.count}
            </div>
            <div className="text-sm text-gray-600">Complaints</div>
          </div>
        ))}
      </div>
    ) : isReportPending ? (
      <Spinner />
    ) : (
      <p className="text-gray-600">No complaint data available</p>
    )}
  </div>
)
