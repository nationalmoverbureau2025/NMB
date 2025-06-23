import { User } from 'lucide-react';
import { ICompanyReport } from '../lib/types';
import { Spinner } from './Spinner';

export const CompanyOwners = ({
  owners,
  isReportPending,
}: {
  owners: ICompanyReport['owners'];
  isReportPending: boolean;
}) => (
  <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Company Owners</h2>
    {owners?.length > 0 ? (
      <div className="grid md:grid-cols-2 gap-4">
        {owners.map((owner, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-md"
          >
            <User className="w-5 h-5 text-blue-600" />
            <div>
              <div className="font-medium text-gray-900">{owner.name}</div>
              <div className="text-sm text-gray-600">
                {owner.role} | Since: {owner.since || 'N/A'}
              </div>
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
);
