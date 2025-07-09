import { AlertTriangle, Brain, CheckCircle, Clock } from 'lucide-react'
import { ICompanyReport } from '../lib/types'
import { Spinner } from './Spinner'

export const AIFlags = ({
  currentReport,
}: {
  currentReport: ICompanyReport
}) => {
  const isReportPending = currentReport?.status === 'in_progress'

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Volume & Timing Analysis
          </h4>
          {currentReport?.volume_timing_flags &&
          currentReport?.volume_timing_flags.length > 0 ? (
            <div className="space-y-3">
              {currentReport?.volume_timing_flags.map((flag, index) => (
                <div
                  key={index}
                  className="bg-red-50 border-2 border-red-200 p-4 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-red-900 text-sm mb-1">
                        SUSPICIOUS PATTERN
                      </div>
                      <div className="text-red-800 text-sm">{flag}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : isReportPending ? (
            <Spinner />
          ) : (
            <div className="bg-green-50 border-2 border-green-200 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="text-green-800 font-medium text-sm">
                  No suspicious patterns detected
                </div>
              </div>
            </div>
          )}
        </div>

        {/* <div>
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
        </div> */}

        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Language Pattern Analysis
          </h4>
          {currentReport?.language_pattern_flags &&
          currentReport?.language_pattern_flags.length > 0 ? (
            <div className="space-y-3">
              {currentReport?.language_pattern_flags.map((flag, index) => (
                <div
                  key={index}
                  className="bg-red-50 border-2 border-red-200 p-4 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-red-900 text-sm mb-1">
                        MANIPULATION DETECTED
                      </div>
                      <div className="text-red-800 text-sm">{flag}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : isReportPending ? (
            <Spinner />
          ) : (
            <div className="bg-green-50 border-2 border-green-200 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="text-green-800 font-medium text-sm">
                  No language manipulation detected
                </div>
              </div>
            </div>
          )}
        </div>

        {/* <div>
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
        </div> */}

        {/* <div>
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
        </div> */}

        {/* <div>
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
        </div> */}
      </div>
    </div>
  )
}
