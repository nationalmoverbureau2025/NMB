import { ICompanyReport } from '../../lib/types'
import { AuthorityRegistration } from './AuthorityRegistration'
import { AuthorityStatus } from './AuthorityStatus'
import { Insurance } from './Insurance'

export const AuthoritySection = ({
  currentReport,
}: {
  currentReport: ICompanyReport
}) => {
  const isReportPending = currentReport?.status === 'in_progress'

  return (
    <section>
      <div className="border-b-4 border-gray-900 pb-3 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
          2. AUTHORITY & REGISTRATION
        </h3>
      </div>

      <AuthorityRegistration
        authority_registration_dates={
          currentReport?.authority_registration_dates
        }
        isReportPending={isReportPending}
      />

      <AuthorityStatus
        authority_statuses={currentReport?.authority_statuses}
        isReportPending={isReportPending}
      />

      <Insurance
        insurance={currentReport?.insurance}
        isReportPending={isReportPending}
      />
    </section>
  )
}
