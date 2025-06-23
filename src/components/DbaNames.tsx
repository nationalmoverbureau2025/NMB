import { ICompanyReport } from '../lib/types';
import { Spinner } from './Spinner';

export const DbaNames = ({
  dba_names,
  isReportPending,
}: {
  dba_names: ICompanyReport['dba_names'];
  isReportPending: boolean;
}) => (
  <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
    <h2 className="text-xl font-bold text-gray-900 mb-6">
      Business Names (DBA)
    </h2>
    {dba_names && dba_names.length > 0 ? (
      <div className="grid md:grid-cols-2 gap-4">
        {dba_names.map((dba, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
          >
            <div>
              <div className="font-medium text-gray-900">{dba.name}</div>
              <div className="text-sm text-gray-600">
                From: {dba.start_date || 'N/A'} | To: {dba.end_date || 'N/A'}
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : isReportPending ? (
      <Spinner />
    ) : (
      <p className="text-gray-600">No DBA names on record</p>
    )}
  </div>
);
