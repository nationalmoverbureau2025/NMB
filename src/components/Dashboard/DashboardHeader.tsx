import { LogOut, User } from 'lucide-react'
import { Button } from '../Button'
import { useNavigate } from 'react-router-dom'

type Props = {
  logout: () => Promise<void>
  userData: {
    email: string
    plan: string
    credits: number
  }
}

export const DashboardHeader = ({ logout, userData }: Props) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
      <div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
          OFFICIAL DASHBOARD
        </h1>
        <p className="text-gray-600 mt-2">
          National Mover Bureau Verification System - Authorized Access Portal
        </p>
      </div>
      <div className="mt-6 md:mt-0 flex items-center gap-6 flex-wrap">
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
            <div className="font-semibold text-gray-900">{userData.email}</div>
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
  )
}
