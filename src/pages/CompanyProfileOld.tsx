import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Shield,
  AlertTriangle,
  FileText,
  Building2,
  Truck,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  Scale,
  AlertOctagon,
  BadgeCheck,
  User,
  Award,
  Hash,
  Home,
  Calendar,
  FileWarning,
  Bone as Money,
  Lock,
  Warehouse,
  AlertCircle,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CompanyFromApi, CompanyNew, ICompanyReport } from '../lib/types';

export default function CompanyProfile() {
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

        // companyData && setCompany(processCompanyFromApi(companyData));
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading comprehensive report...</p>
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600">{error || 'Company not found'}</p>
        </div>
      </div>
    );
  }

  const getRiskColor = (score: number) => {
    if (score >= 7) return 'text-red-600';
    if (score >= 4) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getRiskBackground = (score: number) => {
    if (score >= 7) return 'bg-red-100';
    if (score >= 4) return 'bg-yellow-100';
    return 'bg-green-100';
  };

  const getRiskLabel = (score: number) => {
    if (score >= 7) return 'High Risk';
    if (score >= 4) return 'Medium Risk';
    return 'Low Risk';
  };

  const getBBBRatingColor = (rating: string) => {
    switch (rating) {
      case 'A+':
      case 'A':
      case 'A-':
        return 'text-green-700 border-green-200 bg-green-50';
      case 'B+':
      case 'B':
      case 'B-':
        return 'text-blue-700 border-blue-200 bg-blue-50';
      case 'C+':
      case 'C':
      case 'C-':
        return 'text-yellow-700 border-yellow-200 bg-yellow-50';
      case 'D+':
      case 'D':
      case 'D-':
      case 'F':
        return 'text-red-700 border-red-200 bg-red-50';
      default:
        return 'text-gray-700 border-gray-200 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    return status === 'Active' ? (
      <CheckCircle className="w-5 h-5 text-green-600" />
    ) : (
      <XCircle className="w-5 h-5 text-red-600" />
    );
  };

  const RiskMeter = ({ score }: { score: number }) => {
    const percentage = (score / 10) * 100;
    const color = getRiskColor(score);
    const bgColor = getRiskBackground(score);

    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Risk Level</span>
          <span className={`text-sm font-bold ${color}`}>{score}/10</span>
        </div>
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${bgColor} transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>Safe</span>
          <span>Moderate</span>
          <span>High Risk</span>
        </div>
      </div>
    );
  };

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < Math.floor(rating)
                ? 'text-yellow-400 fill-current'
                : i < rating
                ? 'text-yellow-400 fill-current opacity-50'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const currentReview = reviews?.[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Official Report Header */}
      <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-6 md:py-8 border-b border-blue-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="bg-white p-2 rounded-lg">
                <Shield className="w-6 md:w-8 h-6 md:h-8 text-blue-900" />
              </div>
              <div className="flex-1 md:flex-auto">
                <h1 className="text-xl md:text-3xl font-bold leading-tight">
                  Official Moving Company Report
                </h1>
                <p className="text-sm md:text-base text-blue-200">
                  MoveGuard Verification System
                </p>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <div className="text-sm text-blue-200">Report ID</div>
              <div className="font-mono bg-blue-800 px-4 py-2 rounded-lg text-sm md:text-base w-full md:w-auto text-center md:text-left">
                {currentReview?.id}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-blue-200">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="whitespace-nowrap">
                  Generated on {currentReview?.created_at}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4" />
                <span>Official Record</span>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-start">
              <Scale className="w-4 h-4" />
              <span className="text-center md:text-left">
                Data verified by multiple sources
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-5xl mx-auto">
          {/* Company Overview Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-200">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {company?.company_name}
                  </h2>
                  {company?.is_broker && (
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 w-fit">
                      <Building2 className="w-4 h-4" />
                      Broker
                    </span>
                  )}
                </div>
                <div className="space-y-3 text-gray-600">
                  {company?.owners?.length ? (
                    <>
                      <span>Owners:</span>
                      {company.owners.map((owner) => (
                        <div
                          className="flex items-center gap-2 p-2 bg-gray-50 rounded-md"
                          key={owner.name}
                        >
                          <User className="w-5 h-5 text-blue-600" />
                          <span>
                            Name:{' '}
                            <strong>{owner.name || 'Not available'}</strong>
                          </span>
                          <span>
                            Role:{' '}
                            <strong>{owner.role || 'Not available'}</strong>
                          </span>
                          <span>
                            Since:{' '}
                            <strong>{owner.since || 'Not available'}</strong>
                          </span>
                        </div>
                      ))}
                    </>
                  ) : null}
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                    <Home className="w-5 h-5 text-blue-600" />
                    <span>
                      Address: <strong>{company.address}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <span>
                      DOT Number: <strong>{company.dot_number}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                    <Hash className="w-5 h-5 text-blue-600" />
                    <span>
                      MC Number: <strong>{company.mc_number || 'N/A'}</strong>
                    </span>
                  </div>
                  {company?.dba_names?.length ? (
                    <>
                      <span>Legal Names:</span>

                      {company?.dba_names.map((dba_name) => (
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <span>
                            Name: <strong>{dba_name.name}</strong>
                          </span>
                          <span>
                            Start date:{' '}
                            <strong>{dba_name.start_date || 'N/A'}</strong>
                          </span>
                          <span>
                            End date:{' '}
                            <strong>{dba_name.end_date || 'N/A'}</strong>
                          </span>
                        </div>
                      ))}
                    </>
                  ) : null}
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span>
                      Established: <strong>{company?.date_established}</strong>
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h5 className="font-semibold text-gray-900 mb-3">
                    Operating Authority
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {company?.operating_authority_types?.map((authority) => (
                      <span
                        key={authority}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {authority}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Risk Assessment
                    </h4>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskBackground(
                        company?.risk_score
                      )} ${getRiskColor(company?.risk_score)}`}
                    >
                      {getRiskLabel(company?.risk_score)}
                    </span>
                  </div>
                  <RiskMeter score={company?.risk_score} />
                  <div className="mt-6 space-y-4">
                    {company?.previous_business_names?.length > 0 && (
                      <div className="flex items-start gap-3 text-red-600">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Multiple Business Names</p>
                          <p className="text-sm text-red-700">
                            Previously operated as:{' '}
                            {company?.previous_business_names.join(', ')}
                          </p>
                        </div>
                      </div>
                    )}
                    {company?.penalty_history?.length > 0 && (
                      <div className="flex items-start gap-3 text-red-600">
                        <FileWarning className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Recent Penalties</p>
                          <p className="text-sm text-red-700">
                            $
                            {company?.penalty_history[0].amount.toLocaleString()}{' '}
                            - {company?.penalty_history[0].description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-4">
                    Bond Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-800">Bond Status</span>
                      <span className="font-medium text-blue-900">
                        {company?.bond_status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-800">Bond Amount</span>
                      <span className="font-medium text-blue-900">
                        ${company?.bond_amount?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Analysis Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Rating Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Published Rating
                </h4>
                <div className="flex items-center gap-4 mb-2">
                  <StarRating rating={company?.raw_rating} />
                  <span className="text-2xl font-bold text-gray-900">
                    {company?.raw_rating?.toFixed(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Average rating from all published reviews
                </p>
              </div>

              <div className="bg-red-50 p-6 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">
                  AI-Adjusted Rating
                </h4>
                <div className="flex items-center gap-4 mb-2">
                  <StarRating rating={company.adjusted_rating} />
                  <span className="text-2xl font-bold text-red-900">
                    {company.adjusted_rating?.toFixed(1)}
                  </span>
                </div>
                <p className="text-sm text-red-800">
                  Rating adjusted after removing suspected fake reviews
                </p>
                <div className="mt-4 flex items-center gap-2 text-red-800">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="text-sm">
                    {(
                      ((company.raw_rating - company.adjusted_rating) /
                        company.raw_rating) *
                      100
                    ).toFixed(0)}
                    % of reviews flagged as potentially fake
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* FMCSA Information Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              FMCSA Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900">Safety Rating</h4>
                </div>
                <div className="text-2xl font-bold text-center my-4">
                  {company?.safety_rating || 'Not Rated'}
                </div>
                <p className="text-sm text-gray-600">
                  Federal Motor Carrier Safety Administration Rating
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Warehouse className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900">Fleet Size</h4>
                </div>
                <div className="text-2xl font-bold text-center my-4">
                  {company.fleet_size || 0} Trucks
                </div>
                <p className="text-sm text-gray-600">
                  Registered vehicles with FMCSA
                </p>
              </div>

              {company?.complaint_counts?.length ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium text-gray-900">
                      DOT Complaints
                    </h4>
                  </div>
                  {company.complaint_counts.map((complaint) => (
                    <div
                      className="text-2xl font-bold text-center my-4"
                      key={complaint.source}
                    >
                      {`${complaint.source}: ${complaint.source || 0}`}
                    </div>
                  ))}
                  <p className="text-sm text-gray-600">
                    Filed complaints in the last 24 months
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          {/* Insurance Information Card */}
          {company?.insurance?.length ? (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Insurance Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Lock className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium text-gray-900">
                      Coverage Information
                    </h4>
                  </div>
                  {company?.insurance.map((ins) => (
                    <div className="space-y-3">
                      {/* <div className="flex justify-between">
                    <span className="text-gray-600">Coverage Amount</span>
                    <span className="font-medium">
                      ${company.insurance_coverage_amount?.toLocaleString()}
                    </span>
                  </div> */}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type</span>
                        <span className="font-medium">{ins?.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status</span>
                        <span className="font-medium">{ins?.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expiry Date</span>
                        <span className="font-medium">
                          {ins?.expiration_date}
                        </span>
                      </div>
                      {/* <div className="flex justify-between">
                    <span className="text-gray-600">Provider</span>
                    <span className="font-medium">
                      {company.insurance_provider}
                    </span>
                  </div> */}
                      {/* <div className="flex justify-between">
                    <span className="text-gray-600">Policy Number</span>
                    <span className="font-medium">
                      {company.insurance_policy_number}
                    </span>
                  </div> */}
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Money className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium text-gray-900">
                      Bond Information
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bond Status</span>
                      <span className="font-medium">
                        {company?.bond_status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bond Amount</span>
                      <span className="font-medium">
                        ${company?.bond_amount?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Operating History Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Operating History
            </h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Previous Business Names
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {company?.previous_business_names?.map((name) => (
                        <span
                          key={name}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileWarning className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Penalty History</p>
                    <div className="mt-2 space-y-3">
                      {company?.penalty_history?.map((penalty) => (
                        <div
                          key={penalty.date}
                          className="bg-white p-3 rounded-md"
                        >
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {penalty.date}
                            </span>
                            <span className="font-medium text-red-600">
                              ${penalty.amount.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mt-1">
                            {penalty.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertOctagon className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Out of Service Orders
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {company?.out_of_service_orders || 0} orders in the last
                      24 months
                    </p>
                  </div>
                </div>

                {company?.has_storage_facilities && (
                  <div className="flex items-start gap-3">
                    <Warehouse className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Storage Facilities
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Company operates storage facilities
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Customer Reviews
            </h3>
            <div className="divide-y">
              {reviews?.map((review) => (
                <div key={review.id} className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-4">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <StarRating rating={review.rating} />
                      </div>
                      <div className="text-sm text-gray-500">
                        Posted on{' '}
                        {new Date(review.review_date).toLocaleDateString()}
                      </div>
                    </div>
                    {review.is_suspicious && (
                      <div className="flex items-center gap-1 text-red-600 text-sm">
                        <AlertTriangle className="w-4 h-4" />
                        Suspicious Review
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{review.review_text}</p>
                  {review.ai_analysis && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-blue-900 mb-2">
                        <Shield className="w-4 h-4" />
                        <strong>AI Analysis</strong>
                      </div>
                      <p className="text-sm text-blue-800">
                        {review.ai_analysis}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Report Footer */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
              <Shield className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">
                  This is an official report generated by MoveGuard's AI-powered
                  verification system. All data is sourced from federal and
                  state records, updated daily.
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Report ID: {currentReview?.id} • Generated on{' '}
                  {currentReview?.created_at} • MoveGuard ©{' '}
                  {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CompanyProfile };
