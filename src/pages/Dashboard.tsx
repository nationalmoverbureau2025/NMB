
import { Navigate } from 'react-router-dom'

import { useDashboard } from '../hooks/useDashboard'

import { ReportLoading } from '../components/CompanyReport/ReportLoading'
import { DashboardHeader } from '../components/Dashboard/DashboardHeader'
import { StatusBanner } from '../components/Dashboard/StatusBanner'
import { QuickActions } from '../components/Dashboard/QuickActions'
import { ReportsList } from '../components/Dashboard/ReportsList'
import { AccountOverview } from '../components/Dashboard/AccountOverview'


export function Dashboard() {

  const { isLoading, logout, userData, isAuthenticated, userReports } =
    useDashboard()

  if (isLoading) {
    return <ReportLoading text="Loading dashboard..." />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader logout={logout} userData={userData} />

      <StatusBanner />

      <QuickActions userReports={userReports} />

      <ReportsList userReports={userReports} />

      <AccountOverview userData={userData} />
    </div>
  )
}
