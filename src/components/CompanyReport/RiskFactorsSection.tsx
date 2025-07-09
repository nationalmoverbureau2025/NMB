import { ICompanyReport } from '../../lib/types'
import { RedFlags } from './RedFlags'

export const RiskFactorsSection = ({
  currentReport,
}: {
  currentReport: ICompanyReport
}) => (
  <section>
    <div className="border-b-4 border-gray-900 pb-3 mb-6">
      <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
        6. RISK FACTORS ANALYSIS
      </h3>
    </div>

    <RedFlags currentReport={currentReport} />
  </section>
)
