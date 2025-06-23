import { Award, Star, TrendingUp } from 'lucide-react';
import { ICompanyReport } from '../lib/types';
import { displayValueOrLoader } from '../lib/displayValueOrLoader';
import { ReviewTimelineChart } from './ReviewTimelineChart';

export const ReviewRating = ({
  currentReport,
}: {
  currentReport: ICompanyReport;
}) => {
  const isReportPending = currentReport?.status === 'in_progress';

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Customer Reviews Analysis
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h4 className="font-medium">Google</h4>
            </div>
            <div className="text-2xl font-bold">
              {displayValueOrLoader(
                currentReport?.google_rating,
                isReportPending
              )}
            </div>
            <div className="text-sm text-gray-600">
              {currentReport?.google_reviews_count || 0} reviews
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h4 className="font-medium">Yelp</h4>
            </div>
            <div className="text-2xl font-bold">
              {displayValueOrLoader(
                currentReport?.yelp_rating,
                isReportPending
              )}
            </div>
            <div className="text-sm text-gray-600">
              {currentReport?.yelp_reviews_count || 0} reviews
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium">BBB</h4>
            </div>
            <div className="text-2xl font-bold">
              {displayValueOrLoader(currentReport?.bbb_rating, isReportPending)}
            </div>
            <div className="text-sm text-gray-600">
              {currentReport?.bbb_reviews_count || 0} reviews
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-5 h-5 text-green-600" />
              <h4 className="font-medium">Trustpilot</h4>
            </div>
            <div className="text-2xl font-bold">
              {displayValueOrLoader(
                currentReport?.trustpilot_rating,
                isReportPending
              )}
            </div>
            <div className="text-sm text-gray-600">
              {currentReport?.trustpilot_reviews_count || 0} reviews
            </div>
          </div>
        </div>

        {/* Star Breakdown */}
        {currentReport?.star_breakdown && (
          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">
              Rating Distribution
            </h4>
            <div className="space-y-2">
              {Object.entries(currentReport?.star_breakdown).map(
                ([stars, count]) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="w-8 text-sm">{stars}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
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
        )}

        {/* Sentiment Breakdown */}
        {currentReport?.sentiment_breakdown && (
          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">
              Sentiment Analysis
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">
                  {currentReport?.sentiment_breakdown.positive}%
                </div>
                <div className="text-sm text-green-700">Positive</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-lg font-bold text-yellow-600">
                  {currentReport?.sentiment_breakdown.neutral}%
                </div>
                <div className="text-sm text-yellow-700">Neutral</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-lg font-bold text-red-600">
                  {currentReport?.sentiment_breakdown.negative}%
                </div>
                <div className="text-sm text-red-700">Negative</div>
              </div>
            </div>
          </div>
        )}
      </div>
      {currentReport?.review_timeline &&
        currentReport?.review_timeline.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Review Timeline
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Reviews over time</span>
            </div>
            <ReviewTimelineChart timeline={currentReport?.review_timeline} />
          </div>
        )}
    </>
  );
};
