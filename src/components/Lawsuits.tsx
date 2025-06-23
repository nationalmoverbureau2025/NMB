import { Scale } from 'lucide-react';
import { ICompanyReport } from '../lib/types';
import { Spinner } from './Spinner';

export const Lawsuits = ({
  lawsuits,
  isReportPending,
}: {
  lawsuits: ICompanyReport['lawsuits'];
  isReportPending: boolean;
}) => (
  <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Legal History</h2>
    {lawsuits?.length > 0 ? (
      <div className="space-y-3">
        {lawsuits.map((lawsuit, index) => (
          <div
            key={index}
            className="p-3 bg-red-50 rounded-md border border-red-200"
          >
            <div className="flex items-center gap-3">
              <Scale className="w-5 h-5 text-red-600" />
              <div className="text-gray-900">{lawsuit}</div>
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
);
