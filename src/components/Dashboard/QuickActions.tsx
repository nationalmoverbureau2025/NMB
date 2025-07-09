import {
  FileText,
  AlertTriangle,
  Search,
  Award,
  Clock,
  CheckCircle,
  TrendingUp,
} from 'lucide-react'
import { Button } from '../Button'
import { useNavigate } from 'react-router-dom'
import { IcompanyListReport } from '../../hooks/useDashboard'

export const QuickActions = ({
  userReports,
}: {
  userReports: IcompanyListReport[]
}) => {
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-stretch">
      {/* Enhanced Search Companies Card */}
      <div className="relative bg-white p-6 rounded-xl shadow-xl border-2 border-gray-200 overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full min-h-[220px]">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-transparent to-green-100 opacity-60"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-green-300 rounded-full opacity-10"></div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border-2 border-green-500">
              <Search className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-black text-gray-900 leading-tight tracking-tight">
                🔍 COMPANY VERIFICATION
              </h2>
              <p className="text-sm text-green-700 font-bold">
                Federal Database Access
              </p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                  LIVE DATA
                </span>
              </div>
            </div>
          </div>

          <div className="text-gray-700 text-sm mb-6 flex-1 flex items-center font-medium leading-relaxed">
            <p>
              Access real-time verification data from federal and state
              regulatory databases. Instant credibility assessment powered by
              AI.
            </p>
          </div>

          <div className="mt-auto">
            <Button
              onClick={() => navigate('/search')}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 font-black text-sm py-3 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-green-500 uppercase tracking-wide"
            >
              <Search className="w-5 h-5 mr-2" />
              INITIATE VERIFICATION
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced My Reports Card */}
      <div className="relative bg-white p-6 rounded-xl shadow-xl border-2 border-gray-200 overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full min-h-[220px]">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-blue-100 opacity-60"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-300 rounded-full opacity-10"></div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border-2 border-blue-500">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-black text-gray-900 leading-tight tracking-tight">
                📋 OFFICIAL REPORTS
              </h2>
              <p className="text-sm text-blue-700 font-bold">
                Certified Verifications
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Award className="w-3 h-3 text-blue-600" />
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  AUTHENTICATED
                </span>
              </div>
            </div>
          </div>

          {/* Compact Reports Count Display */}
          <div className="mb-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-black text-blue-900 drop-shadow-sm">
                {userReports?.length || 0}
              </div>
              <div className="flex-1">
                <div className="text-sm font-black text-blue-800 mb-2 uppercase tracking-wide">
                  {userReports?.length === 1
                    ? 'OFFICIAL REPORT'
                    : 'OFFICIAL REPORTS'}
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden shadow-inner">
                  <div
                    className="h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm transition-all duration-1000"
                    style={{ width: userReports?.length ? '100%' : '0%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Status Indicators */}
          <div className="flex-1 flex items-center mb-4">
            {userReports && userReports.length > 0 ? (
              <div className="flex gap-2 flex-wrap">
                {userReports.filter((r) => r.status === 'finished').length >
                  0 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-xs font-black border border-green-300 shadow-sm">
                    <CheckCircle className="w-3 h-3" />
                    {
                      userReports.filter((r) => r.status === 'finished').length
                    }{' '}
                    COMPLETE
                  </span>
                )}
                {userReports.filter((r) => r.status === 'in_progress').length >
                  0 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-black border border-yellow-300 shadow-sm">
                    <Clock className="w-3 h-3" />
                    {
                      userReports.filter((r) => r.status === 'in_progress')
                        .length
                    }{' '}
                    PROCESSING
                  </span>
                )}
              </div>
            ) : (
              <p className="text-gray-600 text-sm font-medium">
                No official reports generated yet
              </p>
            )}
          </div>

          <div className="mt-auto">
            <Button
              onClick={() => navigate('/reports')}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 font-black text-sm py-3 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-blue-500 uppercase tracking-wide"
            >
              <FileText className="w-5 h-5 mr-2" />
              {userReports?.length > 0 ? 'ACCESS REPORTS' : 'GENERATE REPORT'}
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Alerts Card */}
      <div className="relative bg-white p-6 rounded-xl shadow-xl border-2 border-gray-200 overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full min-h-[220px]">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-transparent to-purple-100 opacity-60"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-300 rounded-full opacity-10"></div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border-2 border-purple-500">
              <AlertTriangle className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-black text-gray-900 leading-tight tracking-tight">
                🚨 SMART MONITORING
              </h2>
              <p className="text-sm text-purple-700 font-bold">
                AI-Powered Surveillance
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-purple-600" />
                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                  REAL-TIME
                </span>
              </div>
            </div>
          </div>

          <div className="text-gray-700 text-sm mb-6 flex-1 flex items-center font-medium leading-relaxed">
            <p>
              Automated monitoring system tracks regulatory changes, complaint
              filings, and risk indicators across all verified companies.
            </p>
          </div>

          <div className="mt-auto">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 font-black text-sm py-3 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-purple-500 uppercase tracking-wide">
              <AlertTriangle className="w-5 h-5 mr-2" />
              CONFIGURE ALERTS
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
