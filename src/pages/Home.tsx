import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  AlertTriangle,
  Search,
  FileText,
  Building2,
  Star,
  XCircle,
  Clock,
  DollarSign,
  Scale,
  BadgeCheck,
  Gauge,
  User,
  Award,
  Home as HomeIcon,
  Warehouse,
  AlertCircle,
  Calendar,
  FileWarning,
  Lock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchCompanies, type SearchResult } from '../lib/search';
import { Button } from '../components/Button';
import { SearchForm } from '../components/SearchForm';
import { CheckoutButton } from '../components/CheckoutButton';
import { products } from '../lib/stripe';
import { useQuery } from '@tanstack/react-query';
import { Results } from '../components/Results';

function RiskMeter({ score }: { score: number }) {
  const percentage = (score / 10) * 100;
  const getColor = () => {
    if (score >= 7) return 'text-red-600';
    if (score >= 4) return 'text-yellow-600';
    return 'text-green-600';
  };
  const getBgColor = () => {
    if (score >= 7) return 'bg-red-100';
    if (score >= 4) return 'bg-yellow-100';
    return 'bg-green-100';
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Risk Level</span>
        <span className={`text-sm font-bold ${getColor()}`}>{score}/10</span>
      </div>
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getBgColor()} transition-all duration-500`}
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
}

function StarRating({ rating }: { rating: number }) {
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
      <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
}

export function Home() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'verification' | 'reviews'
  >('overview');

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<{
    query: string;
    type: 'name' | 'dot' | 'mc';
    state?: string;
  } | null>(null);

  const {
    data: results,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['companies', searchParams],
    queryFn: () =>
      searchParams
        ? searchCompanies(
            searchParams.query,
            searchParams.type,
            searchParams.state
          )
        : Promise.resolve([]),
    enabled: !!searchParams,
  });

  const handleSearch = (
    query: string,
    type: 'name' | 'dot' | 'mc',
    state?: string
  ) => {
    setSearchParams({ query, type, state });
  };

  const sampleCompany = {
    name: 'ABC Moving & Storage',
    owner: 'John Smith',
    dot: '12345678',
    mc: 'MC-123456',
    safety: 'Satisfactory',
    fleet: 45,
    complaints: 12,
    is_broker: true,
    broker_info: {
      carriers: 15,
      avg_carrier_rating: 3.8,
      carrier_complaints: 8,
    },
    address: {
      street: '123 Moving Ave',
      city: 'Chicago',
      state: 'IL',
      zip: '60601',
    },
    ratings: {
      raw: 4.8,
      adjusted: 3.2,
    },
    operating: {
      status: 'Active',
      authorities: ['Property Broker', 'Broker of Household Goods'],
      hhgAuthorized: true,
      established: '2020-01-15',
    },
    insurance: {
      coverage: 750000,
      expiry: '2025-12-31',
      provider: 'SafeMove Insurance Co.',
      policy: 'POL-123456789',
    },
    bond: {
      status: 'Active',
      amount: 75000,
    },
    history: {
      previousNames: ['ABC Moving', 'Smith & Sons Moving'],
      hasStorage: true,
      outOfServiceOrders: 0,
      penalties: [
        {
          date: '2024-08-15',
          amount: 5000,
          description: 'Late filing of annual report',
        },
      ],
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Search */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full mb-6">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">
                Moving scams are up 250% in 2025
              </span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              The Most Comprehensive Moving Company Verification System
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Access exclusive data from{' '}
              <span className="font-semibold text-blue-900">
                FMCSA, DOT, BBB, and State Records
              </span>{' '}
              combined with advanced AI analysis to verify any moving company
              instantly.
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Verify a Moving Company
            </h2>
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              <span>
                {typeof error === 'string'
                  ? error
                  : 'An error occurred while searching. Please try again.'}
              </span>
            </div>
          )}

          <div className="space-y-4 mb-8 max-w-4xl mx-auto">
            <Results results={results} />

            {results?.length === 0 && searchParams && !isLoading && (
              <div className="text-center py-8 text-gray-600">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>No companies found matching your search criteria.</p>
                <p className="mt-2 text-sm">
                  Try adjusting your search terms or contact support if you need
                  assistance.
                </p>
              </div>
            )}

            {isLoading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
                <p className="mt-4 text-gray-600">Searching for companies...</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/search">
              <Button size="lg" className="w-full sm:w-auto">
                <Search className="w-5 h-5 mr-2" />
                Search Companies
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why You Need a Report Section */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why You Need a Verification Report
              </h2>
              <p className="text-xl text-gray-600">
                Moving is stressful enough without worrying about scams. Don't
                risk your belongings with basic online reviews—get the full
                picture before it's too late.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Common Misconceptions */}
              <div className="bg-red-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-red-900 mb-4">
                  Common Moving Mistakes
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-900">
                        "All licensed movers are the same"
                      </p>
                      <p className="text-sm text-red-800">
                        32% of licensed movers have serious violations or
                        complaints. A license alone doesn't guarantee
                        reliability.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-900">
                        "I'll just check online reviews"
                      </p>
                      <p className="text-sm text-red-800">
                        Our AI detects that 40% of moving company reviews are
                        manipulated or fake. Don't trust surface-level ratings.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-900">
                        "They seem professional on the phone"
                      </p>
                      <p className="text-sm text-red-800">
                        Many scammers operate sophisticated front operations.
                        Phone manner isn't a reliable indicator of legitimacy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What Our Report Reveals */}
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  What Our Report Reveals
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">
                        Hidden Broker Status
                      </p>
                      <p className="text-sm text-blue-800">
                        Instantly identify if you're dealing with a broker or
                        actual moving company—a crucial distinction that affects
                        your move.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">
                        Insurance & Bond Status
                      </p>
                      <p className="text-sm text-blue-800">
                        Verify active insurance coverage and bond status to
                        ensure your belongings are protected during transit.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">
                        Legal History & Complaints
                      </p>
                      <p className="text-sm text-blue-800">
                        Access complete complaint history, legal actions, and
                        resolution patterns across multiple databases.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost of Not Knowing */}
            <div className="bg-gray-900 text-white rounded-xl p-8 mb-12">
              <h3 className="text-xl font-bold mb-6 text-center">
                The Cost of Not Knowing
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">
                    $8,500
                  </div>
                  <p className="text-gray-300">
                    Average loss from moving scams
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">
                    47%
                  </div>
                  <p className="text-gray-300">Experience unexpected fees</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">
                    15,000+
                  </div>
                  <p className="text-gray-300">Moving scams reported in 2024</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Don't Risk Your Move
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                For less than 1% of your moving budget, get complete peace of
                mind with our comprehensive verification report. Don't wait
                until it's too late.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/search">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Search className="w-5 h-5 mr-2" />
                    Verify a Moving Company
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    View Report Samples
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Report Section */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                See What's Inside Our Reports
              </h2>
              <p className="text-xl text-gray-600">
                Get instant access to comprehensive data and AI analysis
              </p>
            </div>

            {/* Interactive Report Demo */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
              {/* Report Header */}
              <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-lg">
                      <Shield className="w-8 h-8 text-blue-900" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">
                        {sampleCompany.name}
                      </h3>
                      <p className="text-blue-200">
                        Official Verification Report
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-blue-200">DOT Number</div>
                    <div className="font-mono bg-blue-800 px-4 py-2 rounded-lg">
                      {sampleCompany.dot}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between text-sm text-blue-200 gap-4">
                  <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        Generated on {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="w-4 h-4" />
                      <span>Official Record</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    <span>Data verified by multiple sources</span>
                  </div>
                </div>
              </div>

              {/* Broker Status Banner */}
              {sampleCompany.is_broker && (
                <div className="bg-amber-500 text-white py-3">
                  <div className="px-8 flex items-center justify-center gap-2">
                    <Building2 className="w-5 h-5" />
                    <span className="font-semibold">
                      BROKER ALERT: This company is a broker, not a direct
                      moving service provider
                    </span>
                  </div>
                </div>
              )}

              {/* Report Navigation */}
              <div className="border-b border-gray-200">
                <div className="flex flex-wrap">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'overview'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Company Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('verification')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'verification'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Verification Status
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'reviews'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Review Analysis
                  </button>
                </div>
              </div>

              {/* Report Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <h4 className="text-xl font-bold text-gray-900">
                          Company Details
                        </h4>
                        {sampleCompany.is_broker && (
                          <div className="flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-lg">
                            <Building2 className="w-5 h-5" />
                            <div>
                              <span className="font-semibold">Broker</span>
                              <p className="text-xs mt-0.5">
                                Not a direct service provider
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                          <User className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-500">Owner</div>
                            <div className="font-medium">
                              {sampleCompany.owner}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                          <HomeIcon className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-500">Address</div>
                            <div className="font-medium">
                              {sampleCompany.address.street},{' '}
                              {sampleCompany.address.city},{' '}
                              {sampleCompany.address.state}{' '}
                              {sampleCompany.address.zip}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-500">
                              Established
                            </div>
                            <div className="font-medium">
                              {sampleCompany.operating.established}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                          <Lock className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-500">
                              Insurance Coverage
                            </div>
                            <div className="font-medium">
                              $
                              {sampleCompany.insurance.coverage.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>

                      {sampleCompany.is_broker && (
                        <div className="mt-6 bg-amber-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-amber-900 mb-3">
                            Broker Information
                          </h5>
                          <div className="space-y-2">
                            <div className="flex justify-between text-amber-800">
                              <span>Contracted Carriers</span>
                              <span className="font-medium">
                                {sampleCompany.broker_info.carriers}
                              </span>
                            </div>
                            <div className="flex justify-between text-amber-800">
                              <span>Average Carrier Rating</span>
                              <span className="font-medium">
                                {sampleCompany.broker_info.avg_carrier_rating}/5
                              </span>
                            </div>
                            <div className="flex justify-between text-amber-800">
                              <span>Carrier Complaints</span>
                              <span className="font-medium">
                                {sampleCompany.broker_info.carrier_complaints}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-6">
                        <h5 className="font-semibold text-gray-900 mb-3">
                          Operating Authority
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {sampleCompany.operating.authorities.map(
                            (authority) => (
                              <span
                                key={authority}
                                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                              >
                                {authority}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Gauge className="w-6 h-6 text-blue-600" />
                            <span className="font-semibold text-gray-900">
                              Risk Assessment
                            </span>
                          </div>
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-600">
                            High Risk
                          </span>
                        </div>
                        <RiskMeter score={7.8} />
                        <div className="mt-6 space-y-4">
                          <div className="flex items-start gap-3 text-red-600">
                            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium">
                                Multiple Business Names
                              </p>
                              <p className="text-sm text-red-700">
                                Previously operated as:{' '}
                                {sampleCompany.history.previousNames.join(', ')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 text-red-600">
                            <FileWarning className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium">Recent Penalties</p>
                              <p className="text-sm text-red-700">
                                $
                                {sampleCompany.history.penalties[0].amount.toLocaleString()}{' '}
                                -{' '}
                                {sampleCompany.history.penalties[0].description}
                              </p>
                            </div>
                          </div>
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
                              {sampleCompany.bond.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-blue-800">Bond Amount</span>
                            <span className="font-medium text-blue-900">
                              ${sampleCompany.bond.amount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'verification' && (
                  <div className="space-y-8">
                    {/* FMCSA Information */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        FMCSA Information
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="w-5 h-5 text-blue-600" />
                            <h5 className="font-medium text-gray-900">
                              Safety Rating
                            </h5>
                          </div>
                          <div className="text-2xl font-bold text-center my-4">
                            {sampleCompany.safety}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Warehouse className="w-5 h-5 text-blue-600" />
                            <h5 className="font-medium text-gray-900">
                              Fleet Size
                            </h5>
                          </div>
                          <div className="text-2xl font-bold text-center my-4">
                            {sampleCompany.fleet} Trucks
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="w-5 h-5 text-blue-600" />
                            <h5 className="font-medium text-gray-900">
                              DOT Complaints
                            </h5>
                          </div>
                          <div className="text-2xl font-bold text-center my-4">
                            {sampleCompany.complaints}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Insurance Information */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Insurance Details
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <div className="flex items-center gap-2 mb-4">
                            <Lock className="w-5 h-5 text-blue-600" />
                            <h5 className="font-medium text-gray-900">
                              Coverage Information
                            </h5>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Coverage Amount
                              </span>
                              <span className="font-medium">
                                $
                                {sampleCompany.insurance.coverage.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Expiry Date</span>
                              <span className="font-medium">
                                {sampleCompany.insurance.expiry}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Provider</span>
                              <span className="font-medium">
                                {sampleCompany.insurance.provider}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                          <div className="flex items-center gap-2 mb-4">
                            <DollarSign className="w-5 h-5 text-blue-600" />
                            <h5 className="font-medium text-gray-900">
                              Bond Information
                            </h5>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Bond Status</span>
                              <span className="font-medium">
                                {sampleCompany.bond.status}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Bond Amount</span>
                              <span className="font-medium">
                                ${sampleCompany.bond.amount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Operating History */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Operating History
                      </h4>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Building2 className="w-5 h-5 text-blue-600 mt-1" />
                            <div>
                              <p className="font-medium text-gray-900">
                                Previous Business Names
                              </p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {sampleCompany.history.previousNames.map(
                                  (name) => (
                                    <span
                                      key={name}
                                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                    >
                                      {name}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <FileWarning className="w-5 h-5 text-blue-600 mt-1" />
                            <div>
                              <p className="font-medium text-gray-900">
                                Recent Penalties
                              </p>
                              <div className="mt-2">
                                {sampleCompany.history.penalties.map(
                                  (penalty) => (
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
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Review Analysis
                      </h4>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="text-4xl font-bold text-gray-900">
                              {sampleCompany.ratings.raw}
                            </div>
                            <div>
                              <StarRating rating={sampleCompany.ratings.raw} />
                              <div className="text-sm text-gray-500 mt-1">
                                Published Rating
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map((rating) => (
                              <div
                                key={rating}
                                className="flex items-center gap-2"
                              >
                                <span className="text-sm text-gray-600 w-3">
                                  {rating}
                                </span>
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-yellow-400"
                                    style={{
                                      width:
                                        rating === 5
                                          ? '85%'
                                          : rating === 4
                                          ? '10%'
                                          : '2%',
                                    }}
                                  />
                                </div>
                                <span className="text-sm text-gray-600">
                                  {rating === 5
                                    ? '85%'
                                    : rating === 4
                                    ? '10%'
                                    : '2%'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-red-50 rounded-lg p-4">
                          <h5 className="font-semibold text-red-900 mb-3">
                            AI Review Analysis
                          </h5>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-red-800">
                                AI-Adjusted Rating
                              </span>
                              <div className="flex items-center gap-2">
                                <StarRating
                                  rating={sampleCompany.ratings.adjusted}
                                />
                                <span className="font-medium text-red-900">
                                  {sampleCompany.ratings.adjusted}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-red-800">
                                Suspicious Reviews
                              </span>
                              <span className="font-medium text-red-900">
                                32%
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-red-800">
                                Review Pattern Match
                              </span>
                              <span className="font-medium text-red-900">
                                High
                              </span>
                            </div>
                            <div className="mt-4 text-sm text-red-800">
                              Our AI has detected a high number of potentially
                              fake or manipulated reviews. Exercise caution when
                              evaluating review scores.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Report Preview Footer */}
              <div className="bg-gray-50 p-6 text-center">
                <p className="text-gray-600 mb-4">
                  This is a preview of our comprehensive report
                </p>
                <Link to="/signup">
                  <Button>Get Full Report Access</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-blue-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Don't Risk Your Move
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get instant access to our AI-powered moving company reports. Protect
            yourself from fraud, hidden fees, and unreliable movers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/search">
              <Button variant="secondary" size="lg">
                Start Your Search
              </Button>
            </Link>
            <CheckoutButton
              priceId={products.singleReport.id}
              className="bg-transparent text-white border-white hover:bg-white hover:text-blue-900"
            >
              Buy Single Report
            </CheckoutButton>
          </div>
        </div>
      </section>
    </div>
  );
}
