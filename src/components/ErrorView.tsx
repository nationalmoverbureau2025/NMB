import { Link } from 'react-router-dom'
import { Button } from './Button'
import { AlertTriangle } from 'lucide-react'

export const ErrorView = ({ error }: { error: string }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
      <div className="text-red-500 mb-4">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Something went wrong
      </h1>
      <p className="text-gray-600 mb-6">{error}</p>
      <Link to="/contact">
        <Button>Contact Support</Button>
      </Link>
    </div>
  </div>
)
