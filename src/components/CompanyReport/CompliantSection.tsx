import { ICompanyReport } from '../../lib/types'
import { CompliantCounts } from './CompliantCounts'
import { Lawsuits } from './Lawsuits'

export const CompliantSection = ({
  currentReport,
}: {
  currentReport: ICompanyReport
}) => {
  const isReportPending = currentReport?.status === 'in_progress'

  return (
    <section>
      <div className="border-b-4 border-gray-900 pb-3 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
          3. COMPLAINT & LEGAL HISTORY
        </h3>
      </div>

      <CompliantCounts
        complaint_counts={currentReport?.complaint_counts}
        isReportPending={isReportPending}
      />

      <Lawsuits
        lawsuits={currentReport?.lawsuits}
        isReportPending={isReportPending}
      />
    </section>
  )
}
