import { supabase } from './supabase'
import { format, subMonths } from 'date-fns'

export async function getCompanyAnalytics(companyId: string) {
  const startDate = subMonths(new Date(), 12)

  try {
    // Get monthly complaint trends
    const { data: complaints } = await supabase
      .from('company_complaints')
      .select('filing_date, complaint_type')
      .eq('company_id', companyId)
      .gte('filing_date', format(startDate, 'yyyy-MM-dd'))

    // Get review sentiment trends
    const { data: reviews } = await supabase
      .from('company_reviews')
      .select('review_date, rating, is_suspicious')
      .eq('company_id', companyId)
      .gte('review_date', format(startDate, 'yyyy-MM-dd'))

    // Process complaint data
    const complaintTrends = complaints?.reduce((acc: any, curr) => {
      const month = format(new Date(curr.filing_date), 'MMM yyyy')
      if (!acc[month]) acc[month] = { total: 0, byType: {} }
      acc[month].total++
      acc[month].byType[curr.complaint_type] =
        (acc[month].byType[curr.complaint_type] || 0) + 1
      return acc
    }, {})

    // Process review data
    const reviewTrends = reviews?.reduce((acc: any, curr) => {
      const month = format(new Date(curr.review_date), 'MMM yyyy')
      if (!acc[month]) acc[month] = { total: 0, avgRating: 0, suspicious: 0 }
      acc[month].total++
      acc[month].avgRating =
        (acc[month].avgRating * (acc[month].total - 1) + curr.rating) /
        acc[month].total
      if (curr.is_suspicious) acc[month].suspicious++
      return acc
    }, {})

    return {
      complaintTrends,
      reviewTrends,
    }
  } catch (error) {
    console.error('Error fetching analytics:', error)
    throw error
  }
}

export async function getRiskMetrics(companyId: string) {
  try {
    const { data: company } = await supabase
      .from('companies')
      .select(
        `
        risk_score,
        complaint_count,
        out_of_service_orders,
        safety_rating,
        insurance_status,
        license_status,
        dot_complaints,
        bbb_rating,
        company_reviews(rating, is_suspicious)
      `
      )
      .eq('id', companyId)
      .single()

    if (!company) throw new Error('Company not found')

    // Calculate review reliability
    const reviews = company.company_reviews || []
    const suspiciousReviews = reviews.filter((r) => r.is_suspicious).length
    const reviewReliability = reviews.length
      ? (1 - suspiciousReviews / reviews.length) * 100
      : 100

    // Calculate compliance score
    const complianceScore = calculateComplianceScore({
      insuranceStatus: company.insurance_status,
      licenseStatus: company.license_status,
      safetyRating: company.safety_rating,
      outOfServiceOrders: company.out_of_service_orders,
    })

    return {
      riskScore: company.risk_score,
      complaintRate: company.complaint_count,
      reviewReliability,
      complianceScore,
      dotComplaints: company.dot_complaints,
      bbbRating: company.bbb_rating,
    }
  } catch (error) {
    console.error('Error fetching risk metrics:', error)
    throw error
  }
}

function calculateComplianceScore({
  insuranceStatus,
  licenseStatus,
  safetyRating,
  outOfServiceOrders,
}: {
  insuranceStatus: string
  licenseStatus: string
  safetyRating: string
  outOfServiceOrders: number
}) {
  let score = 100

  // Deduct for insurance issues
  if (insuranceStatus !== 'Active') score -= 30

  // Deduct for license issues
  if (licenseStatus !== 'Active') score -= 30

  // Deduct for safety rating
  if (safetyRating === 'Unsatisfactory') score -= 20
  else if (safetyRating === 'Conditional') score -= 10

  // Deduct for out of service orders
  score -= Math.min(outOfServiceOrders * 5, 20)

  return Math.max(0, score)
}
