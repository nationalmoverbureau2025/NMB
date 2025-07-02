import { supabase } from './supabase'

export interface ReportTemplate {
  id: string
  name: string
  description: string
  sections: ReportSection[]
  is_active: boolean
}

export interface ReportSection {
  name: string
  required: boolean
  dataSource: string
}

export interface ReportData {
  id: string
  report_id: string
  section_id: string
  data: any
  generated_at: string
  expires_at: string | null
}

export class ReportService {
  static async generateReport(companyId: string, templateId: string) {
    try {
      // Start a new report
      const { data: report, error: reportError } = await supabase
        .from('reports')
        .insert({
          company_id: companyId,
          status: 'generating',
          template_id: templateId,
        })
        .select()
        .single()

      if (reportError) throw reportError

      // Get template sections
      const { data: template, error: templateError } = await supabase
        .from('report_templates')
        .select('*, report_sections(*)')
        .eq('id', templateId)
        .single()

      if (templateError) throw templateError

      // Generate each section
      for (const section of template.report_sections) {
        const sectionData = await this.generateSectionData(companyId, section)

        await supabase.from('report_data').insert({
          report_id: report.id,
          section_id: section.id,
          data: sectionData,
        })
      }

      // Update report status
      await supabase
        .from('reports')
        .update({ status: 'complete' })
        .eq('id', report.id)

      return report.id
    } catch (error) {
      console.error('Error generating report:', error)
      throw error
    }
  }

  static async generateSectionData(companyId: string, section: any) {
    // Fetch and process data based on section.data_source
    const { data, error } = await supabase
      .from(section.data_source)
      .select('*')
      .eq('company_id', companyId)

    if (error) throw error
    return data
  }

  static async getReport(reportId: string) {
    try {
      const { data: report, error: reportError } = await supabase
        .from('reports')
        .select(
          `
          *,
          company:companies(*),
          report_data(*)
        `
        )
        .eq('id', reportId)
        .single()

      if (reportError) throw reportError

      // Log access
      await this.logReportAccess(reportId)

      return report
    } catch (error) {
      console.error('Error fetching report:', error)
      throw error
    }
  }

  static async logReportAccess(reportId: string) {
    try {
      await supabase.from('report_access_logs').insert({
        report_id: reportId,
        user_agent: navigator.userAgent,
      })
    } catch (error) {
      console.error('Error logging report access:', error)
    }
  }

  static async getUserReports() {
    const { data, error } = await supabase
      .from('reports')
      .select(
        `
        *,
        company:companies(company_name, dot_number),
        template:report_templates(name)
      `
      )
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }
}
