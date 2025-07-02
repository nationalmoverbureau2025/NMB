import { Scale } from 'lucide-react'
import { ICompanyReport } from '../lib/types'
import { Spinner } from './Spinner'

export const Lawsuits = ({
  lawsuits,
  isReportPending,
}: {
  lawsuits: ICompanyReport['lawsuits']
  isReportPending: boolean
}) => (
  <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Legal History</h2>
    {lawsuits?.length > 0 ? (
      <div className="space-y-4">
        {lawsuits.map((lawsuit, index) => (
          <div
            key={index}
            className="p-4 bg-red-50 rounded-md border border-red-200"
          >
            <div className="flex justify-between mb-2 items-center">
              <div className="font-medium text-gray-900">{lawsuit.title}</div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium text-center ${
                  lawsuit.status.toLowerCase() === 'resolved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {lawsuit.status}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              {lawsuit.date} • {lawsuit.court}
            </div>
            <div className="text-gray-800 mb-3">{lawsuit.summary}</div>
            {lawsuit.source_url && (
              <div className="mt-2">
                <a
                  href={lawsuit.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline text-sm flex items-center"
                >
                  <Scale className="w-4 h-4 mr-1" />
                  View Court Record
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    ) : isReportPending ? (
      <Spinner />
    ) : (
      <p className="text-gray-600">No legal history on record</p>
    )}
  </div>
)
