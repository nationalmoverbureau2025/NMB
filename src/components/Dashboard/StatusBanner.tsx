import { Globe, Lock, Shield } from 'lucide-react'

export const StatusBanner = () => (
  <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white rounded-xl p-6 mb-8 shadow-2xl border-2 border-blue-700">
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="w-16 min-w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
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
)
