import { useReport } from '../hooks/useReport'
import { CompanyOverview } from '../components/CompanyOverview'
import { Button } from '../components/Button'
import { generateReportPDF } from '../lib/pdf'
import { ReportHeaderNew } from '../components/ReportHeaderNew'
import { ReportLoading } from '../components/CompanyReport/ReportLoading'
import { ReportError } from '../components/CompanyReport/ReportError'
import { ReportProgress } from '../components/CompanyReport/ReportProgress'
import { InfoSection } from '../components/CompanyReport/InfoSection'
import { AuthoritySection } from '../components/CompanyReport/AuthoritySection'
import { CompliantSection } from '../components/CompanyReport/CompliantSection'
import { ReviewsSection } from '../components/CompanyReport/ReviewsSection'
import { AiSection } from '../components/CompanyReport/AiSection'
import { RiskFactorsSection } from '../components/CompanyReport/RiskFactorsSection'
import { ReportFooter } from '../components/CompanyReport/ReportFooter'

const TOTAL_REPORT_FIELDS = 44

export function CompanyReport() {
  const { currentReport, loading, error, filledFieldsCount } = useReport()
  const isReportError = currentReport?.status === 'canceled'

  if (loading) {
    return <ReportLoading text="Loading comprehensive report..." />
  }

  if (error || !currentReport) {
    return <ReportError error={error} />
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* Official Report Header */}
      <ReportHeaderNew currentReport={currentReport} />

      <div className="container mx-auto px-4 pt-6 md:pt-8">
        <div className="max-w-5xl mx-auto flex justify-between items-center gap-6">
          {currentReport?.status === 'in_progress' ? (
            <ReportProgress
              width={`${(filledFieldsCount / TOTAL_REPORT_FIELDS) * 100}%`}
            />
          ) : (
            <div></div>
          )}
          <Button onClick={() => generateReportPDF(currentReport)}>
            Download PDF
          </Button>
        </div>
      </div>

      {isReportError ? (
        <ReportError error="Error during report generation. Credits will be refunded to you balance." />
      ) : null}

      <div className="bg-white border-4 border-gray-300 rounded-xl overflow-hidden max-w-5xl mx-auto shadow-2xl">
        <div className="px-8 py-8">
          <CompanyOverview currentReport={currentReport} />
          <div className="space-y-12">
            <InfoSection currentReport={currentReport} />

            <AuthoritySection currentReport={currentReport} />

            <CompliantSection currentReport={currentReport} />

            <ReviewsSection currentReport={currentReport} />

            <AiSection currentReport={currentReport} />

            <RiskFactorsSection currentReport={currentReport} />
          </div>
        </div>
        {/* Report Footer */}
        <ReportFooter currentReport={currentReport} />
      </div>
    </div>
  )
}
