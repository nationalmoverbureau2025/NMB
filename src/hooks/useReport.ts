import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { ICompanyReport } from '../lib/types'

export const useReport = () => {
  const { id } = useParams<{ id: string }>()
  const [currentReport, setCurrentReport] = useState<ICompanyReport | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  console.log('currentReport main', currentReport)

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reports_perfsol')
          .select('* , companies_perfsol ( * )')
          .eq('id', id)
          .single()

        if (reviewsError) throw reviewsError

        setCurrentReport(reviewsData)
      } catch (err) {
        setError('Failed to load company data')
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanyData()

    const subscription = supabase
      .channel('custom-update-channel')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'reports_perfsol' },
        (payload) => {
          console.log('payload', payload)
          console.log('eq', payload.new.id === currentReport?.id)
          console.log('p', payload.new.id)
          console.log('c', currentReport?.id)

          if (payload.new.id === currentReport?.id) {
            console.log('equal')
            setCurrentReport((prev) => {
              console.log(
                'Report updated:',
                {
                  ...prev,
                  ...(payload.new as ICompanyReport),
                }?.years_in_business
              )

              return {
                ...prev,
                ...(payload.new as ICompanyReport),
              }
            })
          }
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status) // Add this for debugging
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [id])

  return { currentReport, loading, error }
}
