import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {
  FileText,
  AlertTriangle,
  Search,
  User,
  CreditCard,
  LogOut,
  Clock,
  Shield,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import { Button } from '../components/Button'
import { useDashboard } from '../hooks/useDashboard'
import { RefreshPaymentButton } from '../components/RefreshPaymentButton'

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function ReportsList() {
  const navigate = useNavigate()
  const { isLoading, logout, userData, isAuthenticated, userReports } =
    useDashboard()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const handleViewReport = (reportId: number) => {
    navigate(`/report/${reportId}`)
  }

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date()
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Reports</h1>
          <p className="text-gray-600 mt-2">
            View and manage your official moving company verification reports
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-700">
            <User className="w-5 h-5" />
            <span>{userData.email}</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">
              NATIONAL MOVER BUREAU REPORTS
            </h2>
            <p className="text-sm text-gray-600">
              Official Moving Company Verification Reports
            </p>
          </div>
        </div>
        {userReports && userReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {userReports.map((report) => (
              <div
                key={report.id}
                className="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => handleViewReport(report.id)}
              >
                {/* Official Header */}
                <div className="bg-blue-900 text-white px-4 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                        <Shield className="w-2.5 h-2.5 text-blue-900" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wide">
                          OFFICIAL REPORT
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs font-bold">
                        {report.id.toString().slice(0, 8).toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Banner */}
                <div
                  className={`px-4 py-1.5 border-b ${
                    report.status === 'finished'
                      ? 'bg-green-50 border-green-200'
                      : report.status === 'in_progress'
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {report.status === 'finished' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : report.status === 'in_progress' ? (
                        <Clock className="w-4 h-4 text-yellow-600 animate-spin" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span
                        className={`font-bold text-xs uppercase tracking-wide ${
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
                      <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 border border-red-300">
                        <AlertTriangle className="w-3 h-3" />
                        EXPIRED
                      </span>
                    )}
                  </div>
                </div>

                {/* Company Information */}
                <div className="p-3">
                  <div className="mb-4">
                    <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight">
                      {report?.companies_perfsol?.company_name ||
                        'Unknown Company'}
                    </h3>

                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div className="bg-blue-50 border border-blue-200 rounded p-1.5 text-center">
                        <div className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
                          DOT
                        </div>
                        <div className="text-xs font-bold text-blue-900">
                          {report?.companies_perfsol?.dot_number || 'N/A'}
                        </div>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded p-1.5 text-center">
                        <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                          Status
                        </div>
                        <div
                          className={`text-xs font-bold ${
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
                      <div className="bg-gray-50 border border-gray-200 rounded p-1.5 text-center">
                        <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                          Generated
                        </div>
                        <div className="text-xs font-bold text-gray-900">
                          {formatDate(report.created_at)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-between items-center">
                    {report.expires_at && (
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Valid until:</span>{' '}
                        <span
                          className={
                            isExpired(report.expires_at)
                              ? 'text-red-600 font-bold'
                              : 'text-green-600'
                          }
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
                        className="bg-blue-900 hover:bg-blue-800 text-white font-bold"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleViewReport(report.id)
                        }}
                      >
                        {report.status === 'finished' ? (
                          <>
                            <FileText className="w-4 h-4 mr-2" />
                            VIEW REPORT
                          </>
                        ) : report.status === 'in_progress' ? (
                          <>
                            <Clock className="w-4 h-4 mr-2 animate-spin" />
                            PROCESSING
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            DETAILS
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Official Footer */}
                <div className="bg-blue-900 text-white px-4 py-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Shield className="w-2.5 h-2.5" />
                      <span className="font-medium">NATIONAL MOVER BUREAU</span>
                    </div>
                    <div className="text-gray-400">
                      © {new Date().getFullYear()} Official Verification System
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-600 text-center py-8">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Official Reports Yet
            </h3>
            <p className="text-gray-600 mb-2">
              Generate your first comprehensive moving company verification
              report
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Get instant access to official records, AI analysis, and risk
              assessment
            </p>
            <Button
              className="mt-4 bg-blue-900 hover:bg-blue-800"
              onClick={() => navigate('/search')}
            >
              <Search className="w-4 h-4 mr-2" />
              Generate Official Report
            </Button>
          </div>
        )}
      </div>

      {/* Account Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Current Plan</h3>
            <p className="text-gray-600">{userData.plan}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => navigate('/pricing')}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Upgrade Plan
            </Button>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Report Credits</h3>
            <p className="text-gray-600">
              {userData.credits} credits remaining
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => navigate('/pricing')}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Buy Credits
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
