import React, { useState } from 'react'
import {
  Shield,
  AlertTriangle,
  FileCheck,
  Download,
  Star,
  CheckCircle,
  XCircle,
  BadgeCheck,
  Award,
} from 'lucide-react'
import { Button } from './Button'

interface ReportViewerProps {
  report: any
  onDownload?: () => void
}

function RiskMeter({ score }: { score: number }) {
  const percentage = (score / 10) * 100
  const getColor = () => {
    if (score >= 7) return 'text-red-700'
    if (score >= 4) return 'text-yellow-700'
    return 'text-green-700'
  }
  const getBgColor = () => {
    if (score >= 7) return 'bg-red-100'
    if (score >= 4) return 'bg-yellow-100'
    return 'bg-green-100'
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-900">
          Risk Assessment Level
        </span>
        <span className={`text-sm font-bold ${getColor()}`}>{score}/10</span>
      </div>
      <div className="h-4 bg-gray-100 rounded border">
        <div
          className={`h-full ${getBgColor()} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs font-medium text-gray-600">
        <span>Low Risk</span>
        <span>Moderate Risk</span>
        <span>High Risk</span>
      </div>
    </div>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < Math.floor(rating)
              ? 'text-blue-700 fill-current'
              : i < rating
              ? 'text-blue-700 fill-current opacity-50'
              : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-2 text-sm font-medium text-gray-900">
        {rating.toFixed(1)}
      </span>
    </div>
  )
}

export function ReportViewer({ report, onDownload }: ReportViewerProps) {
  const [activeSection, setActiveSection] = useState('overview')

  if (!report) return null

  const sections = [
    { id: 'overview', name: 'Executive Summary', icon: Shield },
    { id: 'verification', name: 'Licensing & Insurance', icon: FileCheck },
    { id: 'risk', name: 'Risk Assessment', icon: AlertTriangle },
    { id: 'compliance', name: 'Compliance Record', icon: BadgeCheck },
    { id: 'reviews', name: 'Customer Reviews', icon: Star },
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Official Header */}
      <div className="bg-blue-900 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Shield className="w-12 h-12" />
              <div>
                <h1 className="text-2xl font-bold">NATIONAL MOVER BUREAU</h1>
                <div className="text-blue-200">
                  Official Moving Company Verification Report
                </div>
              </div>
            </div>
            {onDownload && (
              <Button
                onClick={onDownload}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Official Report
              </Button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="text-sm text-blue-200 mb-1">Company Name</div>
              <div className="text-xl font-semibold">{report.company_name}</div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-blue-200">DOT Number</div>
                  <div className="font-mono">{report.dot_number}</div>
                </div>
                <div>
                  <div className="text-sm text-blue-200">MC Number</div>
                  <div className="font-mono">{report.mc_number}</div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-block bg-blue-800 rounded px-4 py-3">
                <div className="text-sm text-blue-200">Report ID</div>
                <div className="font-mono">
                  {report.id?.slice(0, 8).toUpperCase()}
                </div>
                <div className="text-sm text-blue-200 mt-2">Generated</div>
                <div className="font-mono">
                  {new Date(report.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-gray-100 border-y border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-sm text-gray-500 font-medium">
                Operating Status
              </div>
              <div
                className={`flex items-center gap-2 mt-1 ${
                  report.operating_status === 'Active'
                    ? 'text-green-700'
                    : 'text-red-700'
                }`}
              >
                {report.operating_status === 'Active' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                <span className="font-semibold">{report.operating_status}</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 font-medium">
                Risk Level
              </div>
              <div
                className={`flex items-center gap-2 mt-1 ${
                  report.risk_score >= 7
                    ? 'text-red-700'
                    : report.risk_score >= 4
                    ? 'text-yellow-700'
                    : 'text-green-700'
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">{report.risk_score}/10</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 font-medium">
                Insurance Status
              </div>
              <div
                className={`flex items-center gap-2 mt-1 ${
                  report.insurance_status === 'Active'
                    ? 'text-green-700'
                    : 'text-red-700'
                }`}
              >
                {report.insurance_status === 'Active' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                <span className="font-semibold">{report.insurance_status}</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 font-medium">
                Safety Rating
              </div>
              <div className="flex items-center gap-2 mt-1 text-gray-900">
                <Award className="w-5 h-5" />
                <span className="font-semibold">
                  {report.safety_rating || 'Not Rated'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {report.risk_score >= 7 && (
        <div className="bg-red-50 border-b border-red-100">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center gap-3 text-red-800">
              <AlertTriangle className="w-6 h-6 flex-shrink-0" />
              <div>
                <div className="font-semibold">HIGH RISK ALERT</div>
                <div className="text-sm mt-1">
                  This company has been flagged for multiple serious risk
                  factors. Review the complete report carefully before
                  proceeding.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-6">
          <div className="flex space-x-8">
            {sections.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 text-sm font-medium transition-colors ${
                  activeSection === id
                    ? 'border-blue-900 text-blue-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto">
          {renderSectionContent(activeSection, report)}
        </div>
      </div>

      {/* Official Footer */}
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6" />
              <div className="text-sm">
                <div className="font-semibold">NATIONAL MOVER BUREAU</div>
                <div className="text-gray-400">
                  Official Moving Company Verification System
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Report ID: {report.id?.slice(0, 8).toUpperCase()} • Generated:{' '}
              {new Date(report.created_at).toLocaleDateString()} • Last Updated:{' '}
              {new Date(report.updated_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function renderSectionContent(section: string, report: any) {
  // ... (rest of the renderSectionContent function remains the same)
}
