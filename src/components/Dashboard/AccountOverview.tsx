import { useNavigate } from 'react-router-dom'
import { User, CreditCard } from 'lucide-react'
import { Button } from '../Button'

const planNames = {
  free_report: 'Free Report',
  single_report: 'Single Report',
  reports_bundle: '3 Reports Bundle',
  refresh_report: 'Refresh Report',
  price_monthly_subscription: 'Monthly Subscription',
}

export const AccountOverview = ({
  userData,
}: {
  userData: {
    email: string
    plan: string
    credits: number
  }
}) => {
  const navigate = useNavigate()

  return (
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
  )
}
