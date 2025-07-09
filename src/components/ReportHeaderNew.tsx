import { Download, Shield } from 'lucide-react'
import { Button } from './Button'
import { ICompanyReport } from '../lib/types'

export const ReportHeaderNew = ({
  currentReport,
}: {
  currentReport: ICompanyReport
}) => (
  <div className="bg-white border-b-4 border-blue-900">
    <div className="px-8 py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-16 min-w-16 h-16 bg-blue-900 rounded-lg flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
              NATIONAL MOVER BUREAU
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              Official Moving Company Verification Report
            </p>
            <p className="text-sm text-gray-500">
              Comprehensive Analysis & Risk Assessment
            </p>
          </div>
        </div>
        <Button className="bg-blue-900 hover:bg-blue-800" size="lg">
          <Download className="w-5 h-5 mr-2" />
          Download Official PDF
        </Button>
      </div>

      <div className="bg-gray-50 border-2 border-gray-300 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
          <div>
            <span className="font-bold text-gray-700 block">Report ID:</span>
            <div className="font-mono text-lg">
              {currentReport?.id?.split('-')[0]?.toUpperCase()}
            </div>
          </div>
          <div>
            <span className="font-bold text-gray-700 block">Generated:</span>
            <div className="text-lg">
              {currentReport?.created_at?.slice(0, 10)}
            </div>
          </div>
          <div>
            <span className="font-bold text-gray-700 block">Valid Until:</span>
            <div className="text-lg">
              {currentReport?.expires_at?.slice(0, 10)}
            </div>
          </div>
          <div>
            <span className="font-bold text-gray-700 block">Status:</span>
            <div className="text-lg font-bold text-green-600">COMPLETE</div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
