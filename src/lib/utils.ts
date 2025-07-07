import { type ClassValue, clsx } from 'clsx'
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
