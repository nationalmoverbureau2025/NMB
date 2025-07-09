import {
  FileText,
  AlertTriangle,
  Search,
  Clock,
  Shield,
  CheckCircle,
  XCircle,
  Star,
} from 'lucide-react'
import { IcompanyListReport } from '../../hooks/useDashboard'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../../lib/utils'
import { RefreshPaymentButton } from '../RefreshPaymentButton'
import { Button } from '../Button'

export const ReportsList = ({
  userReports,
}: {
  userReports: IcompanyListReport[]
}) => {
  const navigate = useNavigate()
  const handleViewReport = (reportId: string) => {
    navigate(`/report/${reportId}`)
  }
  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date()
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl border-2 border-gray-200 p-8 mb-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-16 min-w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl flex items-center justify-center shadow-lg border-2 border-blue-700">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
            NATIONAL MOVER BUREAU REPORTS
          </h2>
          <p className="text-lg text-gray-600 font-semibold">
            Official Moving Company Verification Reports
          </p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-green-600 uppercase tracking-wide">
                SYSTEM OPERATIONAL
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">
                CERTIFIED AUTHENTIC
              </span>
            </div>
          </div>
        </div>
      </div>
      {userReports && userReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {userReports.map((report) => (
            <div
              key={report.id}
              className="relative bg-white border-2 border-gray-300 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1 group"
              onClick={() => handleViewReport(report.id)}
            >
              {/* Official Header */}
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-3 border-b-2 border-blue-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Shield className="w-3 h-3 text-blue-900" />
                    </div>
                    <div>
                      <div className="text-sm font-black uppercase tracking-wider">
                        OFFICIAL REPORT
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm font-black bg-blue-800 px-2 py-1 rounded border border-blue-600">
                      {report.id.toString().slice(0, 8).toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              <div
                className={`px-6 py-2 border-b-2 ${
                  report.status === 'finished'
                    ? 'bg-green-50 border-green-300'
                    : report.status === 'in_progress'
                    ? 'bg-yellow-50 border-yellow-300'
                    : 'bg-red-50 border-red-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {report.status === 'finished' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : report.status === 'in_progress' ? (
                      <Clock className="w-5 h-5 text-yellow-600 animate-spin" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span
                      className={`font-black text-sm uppercase tracking-wider ${
                        report.status === 'finished'
                          ? 'text-green-800'
                          : report.status === 'in_progress'
                          ? 'text-yellow-800'
                          : 'text-red-800'
                      }`}
                    >
                      {report.status === 'finished'
                        ? 'COMPLETE'
                        : report.status === 'in_progress'
                        ? 'PROCESSING'
                        : 'ERROR'}
                    </span>
                  </div>

                  {/* Expired Badge */}
                  {report.expires_at && isExpired(report.expires_at) && (
                    <span className="bg-red-100 text-red-800 text-sm font-black px-3 py-1.5 rounded-full flex items-center gap-1 border-2 border-red-400 shadow-sm animate-pulse">
                      <AlertTriangle className="w-4 h-4" />
                      EXPIRED
                    </span>
                  )}
                </div>
              </div>

              {/* Company Information */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-black text-gray-900 mb-3 leading-tight group-hover:text-blue-900 transition-colors duration-300">
                    {report?.companies_perfsol?.company_name ||
                      'Unknown Company'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-2 text-center shadow-sm">
                      <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                        DOT
                      </div>
                      <div className="text-sm font-black text-blue-900">
                        {report?.companies_perfsol?.dot_number || 'N/A'}
                      </div>
                    </div>
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2 text-center shadow-sm">
                      <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                        Status
                      </div>
                      <div
                        className={`text-sm font-black ${
                          report.status === 'finished'
                            ? 'text-green-600'
                            : report.status === 'in_progress'
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        }`}
                      >
                        {report.status === 'finished'
                          ? 'READY'
                          : report.status === 'in_progress'
                          ? 'PENDING'
                          : 'ERROR'}
                      </div>
                    </div>
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2 text-center shadow-sm">
                      <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                        Generated
                      </div>
                      <div className="text-sm font-black text-gray-900">
                        {formatDate(report.created_at)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-between items-center">
                  {report.expires_at && (
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Valid until:</span>{' '}
                      <span
                        className={`font-black ${
                          isExpired(report.expires_at)
                            ? 'text-red-600'
                            : 'text-green-600'
                        }`}
                      >
                        {formatDate(report.expires_at)}
                      </span>
                    </div>
                  )}
                  {report.expires_at && isExpired(report.expires_at) ? (
                    <RefreshPaymentButton
                      companyDot={report?.companies_perfsol?.dot_number}
                    />
                  ) : (
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-black shadow-lg hover:shadow-xl border-2 border-blue-700 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewReport(report.id)
                      }}
                    >
                      {report.status === 'finished' ? (
                        <>
                          <FileText className="w-5 h-5 mr-2" />
                          VIEW REPORT
                        </>
                      ) : report.status === 'in_progress' ? (
                        <>
                          <Clock className="w-5 h-5 mr-2 animate-spin" />
                          PROCESSING
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-5 h-5 mr-2" />
                          DETAILS
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {/* Official Footer */}
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-2 border-t-2 border-blue-700">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3" />
                    <span className="font-black">NATIONAL MOVER BUREAU</span>
                  </div>
                  <div className="text-blue-300 font-semibold">
                    © {new Date().getFullYear()} Official Verification System
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FileText className="w-12 h-12 text-blue-600" />
          </div>
          <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
            NO OFFICIAL REPORTS GENERATED
          </h3>
          <p className="text-lg text-gray-700 mb-3 font-semibold">
            Generate your first comprehensive moving company verification report
          </p>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Access instant verification data from federal databases, AI-powered
            risk analysis, and comprehensive credibility assessment for any
            moving company in the United States.
          </p>
          <Button
            className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-black px-8 py-4 text-lg shadow-xl hover:shadow-2xl border-2 border-blue-700 transition-all duration-300 uppercase tracking-wide"
            onClick={() => navigate('/search')}
          >
            <Search className="w-6 h-6 mr-3" />
            GENERATE OFFICIAL REPORT
          </Button>
        </div>
      )}
    </div>
  )
}
