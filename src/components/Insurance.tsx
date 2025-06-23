import { Lock } from 'lucide-react';
import { ICompanyReport } from '../lib/types';
import { Spinner } from './Spinner';

export const Insurance = ({
  insurance,
  isReportPending,
}: {
  insurance: ICompanyReport['insurance'];
  isReportPending: boolean;
}) => (
  <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Insurance Coverage</h2>
    {insurance?.length > 0 ? (
      <div className="grid md:grid-cols-2 gap-4">
        {insurance.map((ins, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Lock className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-gray-900 capitalize">
                {ins.type}
              </h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span
                  className={`font-medium capitalize ${
                    ins.status === 'Active' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {ins.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expiration</span>
                <span className="font-medium">
                  {ins.expiration_date || 'N/A'}
                </span>
              </div>
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
);
