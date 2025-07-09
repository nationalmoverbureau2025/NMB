import { type ClassValue, clsx } from 'clsx'
import {AlertTriangle, CheckCircle, XCircle} from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const hasMonthPassed = (dateString: string): boolean => {
  const purchaseDate = new Date(dateString)
  const today = new Date()

  // Calculate the difference in milliseconds
  const diffTime = today.getTime() - purchaseDate.getTime()

  // Convert to days (1000ms * 60s * 60m * 24h = milliseconds in a day)
  const diffDays = diffTime / (1000 * 60 * 60 * 24)

  // Check if 30 days (approximately a month) have passed
  return diffDays >= 30
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'text-green-600'
    case 'suspended':
      return 'text-red-600'
    case 'expired':
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
}

export const getStatusIcon = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return <CheckCircle className="w-5 h-5 text-green-600" />
    case 'suspended':
    case 'expired':
      return <XCircle className="w-5 h-5 text-red-600" />
    default:
      return <AlertTriangle className="w-5 h-5 text-yellow-600" />
  }
}
