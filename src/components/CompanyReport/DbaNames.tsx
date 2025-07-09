import { ICompanyReport } from '../../lib/types'
import { Spinner } from '../Spinner'

export const DbaNames = ({
  dba_names,
  isReportPending,
}: {
  dba_names: ICompanyReport['dba_names']
  isReportPending: boolean
}) => (
  <div className="mt-8">
    <h4 className="text-lg font-bold text-gray-900 mb-4">
      Business Names (DBA)
    </h4>
    {dba_names?.length > 0 ? (
      <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-lg">
        <div className="space-y-3">
          {dba_names?.map((dba, index) => (
            <div
              key={index}
              className="bg-white border border-yellow-300 p-4 rounded"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900">{dba.name}</div>
                  <div className="text-sm text-gray-600">
                    {dba.start_date} - {dba.end_date || 'Current'}
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    dba.end_date
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {dba.end_date ? 'INACTIVE' : 'ACTIVE'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : isReportPending ? (
      <Spinner />
    ) : null}
  </div>
)
