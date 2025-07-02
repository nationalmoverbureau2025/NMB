import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {
  FileText,
  AlertTriangle,
  Search,
  User,
  LogOut,
  Calendar,
  Clock,
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
          <h1 className="text-3xl font-bold text-gray-900">Reporst list</h1>
          <p className="text-gray-600 mt-2">Generated reports</p>
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
        <h2 className="text-xl font-semibold mb-6">Recent Reports</h2>
        {userReports && userReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userReports.map((report) => (
              <div
                key={report.id}
                className="relative bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleViewReport(report.id)}
              >
                {/* Expired Badge */}
                {report.expires_at && isExpired(report.expires_at) && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Expired
                    </span>
                  </div>
                )}

                {/* Company Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 pr-16">
                    {report?.companies_perfsol?.company_name ||
                      'Unknown Company'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    DOT: {report?.companies_perfsol?.dot_number || 'N/A'}
                  </p>
                </div>

                {/* Status and Dates */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">Created:</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                      {formatDate(report.created_at)}
                    </span>
                  </div>

                  {report.expires_at && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">Expires:</span>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          isExpired(report.expires_at)
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {formatDate(report.expires_at)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          report.status === 'finished'
                            ? 'bg-green-500'
                            : report.status === 'in_progress'
                            ? 'bg-yellow-500'
                            : 'bg-gray-500'
                        }`}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">Status:</span>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded capitalize ${
                        report.status === 'finished'
                          ? 'bg-green-100 text-green-800'
                          : report.status === 'in_progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {report.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end">
                  {report.expires_at && isExpired(report.expires_at) ? (
                    <RefreshPaymentButton
                      companyDot={report?.companies_perfsol?.dot_number}
                    />
                  ) : (
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewReport(report.id)
                      }}
                    >
                      View Report
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-600 text-center py-8">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>No reports available yet.</p>
            <p className="mt-2">Start by searching for a moving company!</p>
            <Button className="mt-4" onClick={() => navigate('/search')}>
              <Search className="w-4 h-4 mr-2" />
              Search Companies
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
