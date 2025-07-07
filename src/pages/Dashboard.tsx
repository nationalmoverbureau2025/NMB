import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {
  FileText,
  AlertTriangle,
  Search,
  User,
  CreditCard,
  LogOut,
  Award,
  Clock,
  Shield,
  CheckCircle,
  XCircle,
  Star,
  Lock,
  Globe,
  TrendingUp,
} from 'lucide-react'
import { Button } from '../components/Button'
import { useDashboard } from '../hooks/useDashboard'
import { RefreshPaymentButton } from '../components/RefreshPaymentButton'

const planNames = {
  free_report: 'Free Report',
  single_report: 'Single Report',
  reports_bundle: '3 Reports Bundle',
  refresh_report: 'Refresh Report',
  price_monthly_subscription: 'Monthly Subscription',
}

export function Dashboard() {
  const navigate = useNavigate()
  const { isLoading, logout, userData, isAuthenticated, userReports } =
    useDashboard()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const handleViewReport = (reportId: number) => {
    navigate(`/report/${reportId}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            OFFICIAL DASHBOARD
          </h1>
          <p className="text-gray-600 mt-2">
            National Mover Bureau Verification System - Authorized Access Portal
          </p>
        </div>
        <div className="mt-6 md:mt-0 flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-blue-900">
              VERIFIED ACCESS
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Authorized User
              </div>
              <div className="font-semibold text-gray-900">
                {userData.email}
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="border-red-300 text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Secure Logout
          </Button>
        </div>
      </div>

      {/* Official Status Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white rounded-xl p-6 mb-8 shadow-2xl border-2 border-blue-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-blue-900" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight mb-1">
                NATIONAL MOVER BUREAU
              </h2>
              <p className="text-blue-200 font-semibold">
                Official Moving Company Verification Database
              </p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">
                    SECURE CONNECTION
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-300" />
                  <span className="text-sm font-medium text-blue-300">
                    FEDERAL DATABASE ACCESS
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-blue-200 mb-1">
              System Status
            </div>
            <div className="flex items-center gap-2 bg-blue-800 px-4 py-2 rounded border border-blue-600">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-bold text-white text-sm">OPERATIONAL</span>
            </div>
            <div className="text-xs text-blue-300 mt-1">
              Last Updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
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
                        userReports.filter((r) => r.status === 'finished')
                          .length
                      }{' '}
                      COMPLETE
                    </span>
                  )}
                  {userReports.filter((r) => r.status === 'in_progress')
                    .length > 0 && (
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

      {/* Reports List */}
      <div className="bg-white rounded-xl shadow-2xl border-2 border-gray-200 p-8 mb-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl flex items-center justify-center shadow-lg border-2 border-blue-700">
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

                    <div className="grid grid-cols-3 gap-3 mb-4">
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
              Generate your first comprehensive moving company verification
              report
            </p>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Access instant verification data from federal databases,
              AI-powered risk analysis, and comprehensive credibility assessment
              for any moving company in the United States.
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

      {/* Account Overview */}
      <div className="bg-white rounded-xl shadow-2xl border-2 border-gray-200 p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center shadow-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
            ACCOUNT OVERVIEW
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 shadow-lg">
            <h3 className="font-black text-gray-900 mb-3 text-lg uppercase tracking-wide">
              Current Plan
            </h3>
            <p className="text-blue-800 font-bold text-xl mb-4">
              {planNames[userData.plan]}
            </p>
            <Button
              variant="outline"
              className="border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-bold"
              onClick={() => navigate('/pricing')}
            >
              <CreditCard className="w-5 h-5 mr-2" />
              UPGRADE PLAN
            </Button>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200 shadow-lg">
            <h3 className="font-black text-gray-900 mb-3 text-lg uppercase tracking-wide">
              Report Credits
            </h3>
            <p className="text-green-800 font-bold text-xl mb-4">
              {userData.credits} CREDITS REMAINING
            </p>
            <Button
              variant="outline"
              className="border-2 border-green-600 text-green-700 hover:bg-green-50 font-bold"
              onClick={() => navigate('/pricing')}
            >
              <CreditCard className="w-5 h-5 mr-2" />
              PURCHASE CREDITS
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
