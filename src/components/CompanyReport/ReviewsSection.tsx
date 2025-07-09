import {ICompanyReport} from '../../lib/types'
import { ReviewRating } from './ReviewRating'

export const ReviewsSection = ({
  currentReport,
}: {
  currentReport: ICompanyReport
}) => (
  <section>
    <div className="border-b-4 border-gray-900 pb-3 mb-6">
      <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
        4. CUSTOMER REVIEWS ANALYSIS
      </h3>
    </div>

    <ReviewRating currentReport={currentReport} />
  </section>
)
