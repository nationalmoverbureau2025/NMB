import { ICompanyReport } from '../lib/types';
import { Spinner } from './Spinner';

export const CargoTypes = ({
  cargo_types,
  isReportPending,
}: {
  cargo_types: ICompanyReport['cargo_types'];
  isReportPending: boolean;
}) => (
  <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
    <h2 className="text-xl font-bold text-gray-900 mb-6">
      Authorized Cargo Types
    </h2>
    {cargo_types?.length > 0 ? (
      <div className="flex flex-wrap gap-2">
        {cargo_types.map((cargo, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
          >
            {cargo}
          </span>
        ))}
      </div>
    ) : isReportPending ? (
      <Spinner />
    ) : (
      <p className="text-gray-600">No cargo type information available</p>
    )}
  </div>
);
