import { ICompanyReport } from '../lib/types'
import { Spinner } from './Spinner'

export const AIFlags = ({
  currentReport,
}: {
  currentReport: ICompanyReport
}) => {
  const isReportPending = currentReport?.status === 'in_progress'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        AI Suspicious Activity Flags
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            Volume & Timing Flags
          </h4>
          {currentReport?.volume_timing_flags &&
          currentReport?.volume_timing_flags.length > 0 ? (
            <div className="space-y-2">
              {currentReport?.volume_timing_flags.map((flag, index) => (
                <div
                  key={index}
                  className="p-2 bg-red-50 rounded text-sm text-red-800 capitalize"
                >
                  {flag}
                </div>
              ))}
            </div>
          ) : isReportPending ? (
            <Spinner />
          ) : null}
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            Reviewer Credibility Flags
          </h4>
          {currentReport?.reviewer_credibility_flags &&
          currentReport?.reviewer_credibility_flags.length > 0 ? (
            <div className="space-y-2">
              {currentReport?.reviewer_credibility_flags.map((flag, index) => (
                <div
                  key={index}
                  className="p-2 bg-red-50 rounded text-sm text-red-800 capitalize"
                >
                  {flag}
                </div>
              ))}
            </div>
          ) : isReportPending ? (
            <Spinner />
          ) : null}
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            Language Pattern Flags
          </h4>
          {currentReport?.language_pattern_flags &&
          currentReport?.language_pattern_flags.length > 0 ? (
            <div className="space-y-2">
              {currentReport?.language_pattern_flags.map((flag, index) => (
                <div
                  key={index}
                  className="p-2 bg-red-50 rounded text-sm text-red-800 capitalize"
                >
                  {flag}
                </div>
              ))}
            </div>
          ) : isReportPending ? (
            <Spinner />
          ) : null}
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-3">Platform Conflicts</h4>
          {currentReport?.platform_conflicts &&
          currentReport?.platform_conflicts.length > 0 ? (
            <div className="space-y-2">
              {currentReport?.platform_conflicts.map((conflict, index) => (
                <div
                  key={index}
                  className="p-2 bg-red-50 rounded text-sm text-red-800 capitalize"
                >
                  {conflict}
                </div>
              ))}
            </div>
          ) : isReportPending ? (
            <Spinner />
          ) : null}
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-3">Geographic Gaps</h4>
          {currentReport?.geographic_gaps &&
          currentReport?.geographic_gaps.length > 0 ? (
            <div className="space-y-2">
              {currentReport?.geographic_gaps.map((gap, index) => (
                <div
                  key={index}
                  className="p-2 bg-red-50 rounded text-sm text-red-800 capitalize"
                >
                  {gap}
                </div>
              ))}
            </div>
          ) : isReportPending ? (
            <Spinner />
          ) : null}
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            Sentiment Specificity Flags
          </h4>
          {currentReport?.sentiment_specificity_flags &&
          currentReport?.sentiment_specificity_flags.length > 0 ? (
            <div className="space-y-2">
              {currentReport?.sentiment_specificity_flags.map((flag, index) => (
                <div
                  key={index}
                  className="p-2 bg-red-50 rounded text-sm text-red-800 capitalize"
                >
                  {flag}
                </div>
              ))}
            </div>
          ) : isReportPending ? (
            <Spinner />
          ) : null}
        </div>
      </div>

      {currentReport?.suspicious_activity_summary && (
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h4 className="font-medium text-yellow-900 mb-2">Summary</h4>
          <p className="text-yellow-800 capitalize">
            {currentReport?.suspicious_activity_summary}
          </p>
        </div>
      )}
    </div>
  )
}
