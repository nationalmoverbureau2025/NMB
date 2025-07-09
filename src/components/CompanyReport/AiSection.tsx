import { ICompanyReport } from '../../lib/types'
import { AIFlags } from './AIFlags'

export const AiSection = ({
  currentReport,
}: {
  currentReport: ICompanyReport
}) => (
  <section>
    <div className="border-b-4 border-gray-900 pb-3 mb-6">
      <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
        5. AI SUSPICIOUS ACTIVITY DETECTION
      </h3>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <AIFlags currentReport={currentReport} />
    </div>
  </section>
)
