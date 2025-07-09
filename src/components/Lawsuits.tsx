import { ICompanyReport } from '../lib/types'
import { Spinner } from './Spinner'

export const Lawsuits = ({
  lawsuits,
  isReportPending,
}: {
  lawsuits: ICompanyReport['lawsuits']
  isReportPending: boolean
}) => (
  <div>
    <h4 className="text-lg font-bold text-gray-900 mb-4">Legal Proceedings</h4>
    <div className="space-y-4">
      {lawsuits?.length > 0 ? (
        <div className="space-y-4">
          {lawsuits?.slice(0, 2).map((lawsuit, index) => (
            <div
              key={index}
              className="bg-red-50 border-2 border-red-200 p-6 rounded-lg"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-lg font-bold text-gray-900">
                    {lawsuit.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    {lawsuit.date} • {lawsuit.court}
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded text-sm font-bold ${
                    lawsuit.status.toLowerCase() === 'resolved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {lawsuit.status}
                </span>
              </div>
              <div className="bg-white border border-red-200 p-3 rounded text-sm">
                <strong>Summary:</strong> {lawsuit.summary}
              </div>
            </div>
          ))}
        </div>
      ) : isReportPending ? (
        <Spinner />
      ) : (
        <p className="text-gray-600">No legal history on record</p>
      )}
    </div>
  </div>
)
