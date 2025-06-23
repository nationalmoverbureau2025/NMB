import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { ICompanyReport } from '../lib/types';
import { displayLabelsOrLoader } from '../lib/displayLabelsOrSpinner';
import { InlineSpinner } from '../components/InlineSpinner';

export const getStyles = (
  value: boolean | null | undefined,
  isReportPending: boolean,
  onTrueStyle: string,
  onFalseStyle: string,
  onLoadingStyle: string
) => {
  if (value === null || value === undefined) {
    if (isReportPending) {
      return onLoadingStyle;
    }
    return onTrueStyle;
  }
  if (!!value) {
    return onTrueStyle;
  }
  return onFalseStyle;
};

export const RedFlags = ({
  currentReport,
}: {
  currentReport: ICompanyReport;
}) => {
  const isReportPending = currentReport?.status === 'in_progress';

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Red Flags Analysis
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div
          className={`p-4 rounded-lg ${getStyles(
            currentReport?.suspicious_dba,
            isReportPending,
            'bg-red-50 border border-red-200',
            'bg-green-50 border border-green-200',
            'bg-grey-50 border border-grey-200'
          )}`}
        >
          <div className="flex items-center gap-3">
            {displayLabelsOrLoader(
              currentReport?.suspicious_dba,
              isReportPending,
              <XCircle className="w-5 h-5 text-red-600" />,
              <CheckCircle className="w-5 h-5 text-green-600" />,
              null
            )}
            <div>
              <div className="font-medium">Suspicious DBA</div>
              <div
                className={`text-sm ${
                  currentReport?.suspicious_dba
                    ? 'text-red-700'
                    : 'text-green-700'
                }`}
              >
                {displayLabelsOrLoader(
                  currentReport?.suspicious_dba,
                  isReportPending,
                  'Flagged',
                  'Clear',
                  <InlineSpinner />
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`p-4 rounded-lg ${getStyles(
            currentReport?.broker_as_carrier,
            isReportPending,
            'bg-red-50 border border-red-200',
            'bg-green-50 border border-green-200',
            'bg-grey-50 border border-grey-200'
          )}`}
        >
          <div className="flex items-center gap-3">
            {displayLabelsOrLoader(
              currentReport?.broker_as_carrier,
              isReportPending,
              <XCircle className="w-5 h-5 text-red-600" />,
              <CheckCircle className="w-5 h-5 text-green-600" />,
              null
            )}
            <div>
              <div className="font-medium">Broker as Carrier</div>
              <div
                className={`text-sm ${
                  currentReport?.broker_as_carrier
                    ? 'text-red-700'
                    : 'text-green-700'
                }`}
              >
                {displayLabelsOrLoader(
                  currentReport?.broker_as_carrier,
                  isReportPending,
                  'Flagged',
                  'Clear',
                  <InlineSpinner />
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`p-4 rounded-lg ${getStyles(
            currentReport?.revoked_authority,
            isReportPending,
            'bg-red-50 border border-red-200',
            'bg-green-50 border border-green-200',
            'bg-grey-50 border border-grey-200'
          )}`}
        >
          <div className="flex items-center gap-3">
            {displayLabelsOrLoader(
              currentReport?.revoked_authority,
              isReportPending,
              <XCircle className="w-5 h-5 text-red-600" />,
              <CheckCircle className="w-5 h-5 text-green-600" />,
              null
            )}
            <div>
              <div className="font-medium">Revoked Authority</div>
              <div
                className={`text-sm ${
                  currentReport?.revoked_authority
                    ? 'text-red-700'
                    : 'text-green-700'
                }`}
              >
                {displayLabelsOrLoader(
                  currentReport?.revoked_authority,
                  isReportPending,
                  'Flagged',
                  'Clear',
                  <InlineSpinner />
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`p-4 rounded-lg ${getStyles(
            currentReport?.similar_to_banned,
            isReportPending,
            'bg-red-50 border border-red-200',
            'bg-green-50 border border-green-200',
            'bg-grey-50 border border-grey-200'
          )}`}
        >
          <div className="flex items-center gap-3">
            {displayLabelsOrLoader(
              currentReport?.similar_to_banned,
              isReportPending,
              <XCircle className="w-5 h-5 text-red-600" />,
              <CheckCircle className="w-5 h-5 text-green-600" />,
              null
            )}
            <div>
              <div className="font-medium">Similar to Banned</div>
              <div
                className={`text-sm ${
                  currentReport?.similar_to_banned
                    ? 'text-red-700'
                    : 'text-green-700'
                }`}
              >
                {displayLabelsOrLoader(
                  currentReport?.similar_to_banned,
                  isReportPending,
                  'Flagged',
                  'Clear',
                  <InlineSpinner />
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`p-4 rounded-lg ${getStyles(
            currentReport?.recent_or_private_domain,
            isReportPending,
            'bg-red-50 border border-red-200',
            'bg-green-50 border border-green-200',
            'bg-grey-50 border border-grey-200'
          )}`}
        >
          <div className="flex items-center gap-3">
            {displayLabelsOrLoader(
              currentReport?.recent_or_private_domain,
              isReportPending,
              <XCircle className="w-5 h-5 text-red-600" />,
              <CheckCircle className="w-5 h-5 text-green-600" />,
              null
            )}
            <div>
              <div className="font-medium">Recent/Private Domain</div>
              <div
                className={`text-sm ${
                  currentReport?.recent_or_private_domain
                    ? 'text-red-700'
                    : 'text-green-700'
                }`}
              >
                {displayLabelsOrLoader(
                  currentReport?.recent_or_private_domain,
                  isReportPending,
                  'Flagged',
                  'Clear',
                  <InlineSpinner />
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`p-4 rounded-lg ${getStyles(
            currentReport?.legal_complaints,
            isReportPending,
            'bg-red-50 border border-red-200',
            'bg-green-50 border border-green-200',
            'bg-grey-50 border border-grey-200'
          )}`}
        >
          <div className="flex items-center gap-3">
            {displayLabelsOrLoader(
              currentReport?.legal_complaints,
              isReportPending,
              <XCircle className="w-5 h-5 text-red-600" />,
              <CheckCircle className="w-5 h-5 text-green-600" />,
              null
            )}
            <div>
              <div className="font-medium">Legal Complaints</div>
              <div
                className={`text-sm ${
                  currentReport?.legal_complaints
                    ? 'text-red-700'
                    : 'text-green-700'
                }`}
              >
                {displayLabelsOrLoader(
                  currentReport?.legal_complaints,
                  isReportPending,
                  'Flagged',
                  'Clear',
                  <InlineSpinner />
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`p-4 rounded-lg ${getStyles(
            currentReport?.mismatched_claims,
            isReportPending,
            'bg-red-50 border border-red-200',
            'bg-green-50 border border-green-200',
            'bg-grey-50 border border-grey-200'
          )}`}
        >
          <div className="flex items-center gap-3">
            {displayLabelsOrLoader(
              currentReport?.mismatched_claims,
              isReportPending,
              <XCircle className="w-5 h-5 text-red-600" />,
              <CheckCircle className="w-5 h-5 text-green-600" />,
              null
            )}
            <div>
              <div className="font-medium">Mismatched Claims</div>
              <div
                className={`text-sm ${
                  currentReport?.mismatched_claims
                    ? 'text-red-700'
                    : 'text-green-700'
                }`}
              >
                {displayLabelsOrLoader(
                  currentReport?.mismatched_claims,
                  isReportPending,
                  'Flagged',
                  'Clear',
                  <InlineSpinner />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Red Flag Details */}
      {currentReport?.red_flag_details &&
        currentReport?.red_flag_details.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">
              Detailed Red Flag Analysis
            </h4>
            <div className="space-y-2">
              {currentReport?.red_flag_details.map((detail, index) => (
                <div
                  key={index}
                  className="p-3 bg-red-50 rounded-md border border-red-200"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-red-800">{detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};
