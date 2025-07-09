import { Award, Brain, Star } from 'lucide-react'
import { ICompanyReport } from '../lib/types'
import { displayValueOrLoader } from '../lib/displayValueOrLoader'

export const ReviewRating = ({
  currentReport,
}: {
  currentReport: ICompanyReport
}) => {
  const isReportPending = currentReport?.status === 'in_progress'

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Customer Reviews Analysis
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-50 border-2 border-gray-200 p-4 rounded-lg text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {displayValueOrLoader(
                currentReport?.google_rating,
                isReportPending
              )}
            </div>
            <div className="text-sm font-bold text-gray-700">Google</div>
            <div className="text-xs text-gray-600">
              {displayValueOrLoader(
                currentReport?.google_reviews_count,
                isReportPending
              )}{' '}
              reviews
            </div>
          </div>
          <div className="bg-gray-50 border-2 border-gray-200 p-4 rounded-lg text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {displayValueOrLoader(
                currentReport?.yelp_rating,
                isReportPending
              )}
            </div>
            <div className="text-sm font-bold text-gray-700">Yelp</div>
            <div className="text-xs text-gray-600">
              {displayValueOrLoader(
                currentReport?.yelp_reviews_count,
                isReportPending
              )}{' '}
              reviews
            </div>
          </div>
          <div className="bg-gray-50 border-2 border-gray-200 p-4 rounded-lg text-center">
            <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {displayValueOrLoader(currentReport?.bbb_rating, isReportPending)}
            </div>
            <div className="text-sm font-bold text-gray-700">BBB</div>
            <div className="text-xs text-gray-600">
              {displayValueOrLoader(
                currentReport?.bbb_reviews_count,
                isReportPending
              )}{' '}
              reviews
            </div>
          </div>
          <div className="bg-gray-50 border-2 border-gray-200 p-4 rounded-lg text-center">
            <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {displayValueOrLoader(
                currentReport?.trustpilot_rating,
                isReportPending
              )}
            </div>
            <div className="text-sm font-bold text-gray-700">Trustpilot</div>
            <div className="text-xs text-gray-600">
              {displayValueOrLoader(
                currentReport?.trustpilot_reviews_count,
                isReportPending
              )}{' '}
              reviews
            </div>
          </div>
        </div>

        {/* Star Breakdown */}
        {/* {currentReport?.star_breakdown && (
          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">
              Rating Distribution
            </h4>
            <div className="space-y-2">
              {Object.entries(currentReport?.star_breakdown).map(
                ([stars, count]) => (
                  <div
                    key={stars}
                    className="flex items-center gap-3 w-full justify-between"
                  >
                    <span className="w-8 text-sm">{stars}★</span>
                    <div className=" bg-gray-200 rounded-full h-3 w-full">
                      <div
                        className="bg-yellow-400 h-3 rounded-full"
                        style={{
                          width: `${
                            (count /
                              Math.max(
                                ...Object.values(currentReport?.star_breakdown!)
                              )) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="w-12 text-sm text-gray-600">{count}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )} */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {displayValueOrLoader(
                currentReport?.sentiment_breakdown?.positive,
                isReportPending
              )}
              %
            </div>
            <div className="text-sm font-bold text-green-700">Positive</div>
          </div>
          <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {displayValueOrLoader(
                currentReport?.sentiment_breakdown?.neutral,
                isReportPending
              )}
              %
            </div>
            <div className="text-sm font-bold text-yellow-700">Neutral</div>
          </div>
          <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {displayValueOrLoader(
                currentReport?.sentiment_breakdown?.negative,
                isReportPending
              )}
              %
            </div>
            <div className="text-sm font-bold text-red-700">Negative</div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-4 border-yellow-300 p-6 rounded-xl">
        <h4 className="text-lg font-bold text-yellow-900 mb-3 flex items-center gap-2">
          <Brain className="w-5 h-5" />
          AI Review Analysis Summary
        </h4>
        <div className="bg-white border-2 border-yellow-200 p-4 rounded-lg">
          <p className="text-yellow-800 text-sm leading-relaxed">
            {currentReport?.suspicious_activity_summary}
          </p>
        </div>
      </div>
    </>
  )
}
