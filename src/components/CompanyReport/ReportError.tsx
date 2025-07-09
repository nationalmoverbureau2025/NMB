import { AlertTriangle } from 'lucide-react'

export const ReportError = ({ error }: { error: string | null }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
      <p className="text-gray-600">{error || 'Company not found'}</p>
    </div>
  </div>
)
