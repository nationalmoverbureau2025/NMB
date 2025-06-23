import { BadgeCheck } from 'lucide-react';
import { ICompanyReport } from '../lib/types';
import { Spinner } from './Spinner';

export const AuthorityStatus = ({
  authority_statuses,
  isReportPending,
}: {
  authority_statuses: ICompanyReport['authority_statuses'];
  isReportPending: boolean;
}) => (
  <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Authority Status</h2>
    {authority_statuses?.length > 0 ? (
      <div className="grid md:grid-cols-2 gap-4">
        {authority_statuses.map((status, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
          >
            <div className="flex items-center gap-3">
              <BadgeCheck className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium text-gray-900">{status.type}</div>
                <div className="text-sm text-gray-600">
                  Updated: {status.updated_at}
                </div>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                status.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {status.status}
            </span>
          </div>
        ))}
      </div>
    ) : isReportPending ? (
      <Spinner />
    ) : (
      <p className="text-gray-600">No authority status data available</p>
    )}
  </div>
);
