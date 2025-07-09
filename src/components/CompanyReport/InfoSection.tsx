import { ICompanyReport } from '../../lib/types'
import { CompanyInformation } from './CompanyInformation'
import { CompanyOwners } from './CompanyOwners'
import { DbaNames } from './DbaNames'

export const InfoSection = ({
  currentReport,
}: {
  currentReport: ICompanyReport
}) => {
  const isReportPending = currentReport?.status === 'in_progress'

  return (
    <section>
      <div className="border-b-4 border-gray-900 pb-3 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
          1. COMPANY INFORMATION & CONTACT DETAILS
        </h3>
      </div>

      <CompanyInformation currentReport={currentReport} />
      <DbaNames
        dba_names={currentReport?.dba_names}
        isReportPending={isReportPending}
      />

      <CompanyOwners
        owners={currentReport?.owners}
        isReportPending={isReportPending}
      />
    </section>
  )
}
