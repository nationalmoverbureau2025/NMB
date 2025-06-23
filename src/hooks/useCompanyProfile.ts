import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CompanyNew, ICompanyReport } from '../lib/types';

export const useCompanyProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<CompanyNew | null>(null);
  const [reviews, setReviews] = useState<ICompanyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const { data: companyData, error: companyError } = await supabase
          .from('companies_perfsol')
          .select('*')
          .eq('dot_number', id)
          .single<CompanyNew>();

        if (companyError) throw companyError;

        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reports_perfsol')
          .select('*')
          .eq('company_id', companyData.id)
          .order('created_at', { ascending: false });

        if (reviewsError) throw reviewsError;

        companyData && setCompany(companyData);
        setReviews(reviewsData || []);
      } catch (err) {
        setError('Failed to load company data');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();

    const subscription = supabase
      .channel('custom-update-channel')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'companies_perfsol' },
        (payload: { new: CompanyNew }) => {
          setCompany(payload.new);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [id]);

  const currentReview = reviews?.[0];

  return { company, currentReview, loading, error };
};
