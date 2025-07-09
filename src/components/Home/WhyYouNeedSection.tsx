import { Link } from 'react-router-dom'
import { Button } from '../Button'
import {
  Shield,
  AlertTriangle,
  Search,
  FileText,
  XCircle,
  Lock,
} from 'lucide-react'

export const WhyYouNeedSection = () => (
  <section className="py-20 bg-white border-y border-gray-100">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why You Need a Verification Report
          </h2>
          <p className="text-xl text-gray-600">
            Moving is stressful enough without worrying about scams. Don't risk
            your belongings with basic online reviews—get the full picture
            before it's too late.
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
                    complaints. A license alone doesn't guarantee reliability.
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
                    Many scammers operate sophisticated front operations. Phone
                    manner isn't a reliable indicator of legitimacy.
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
                    Instantly identify if you're dealing with a broker or actual
                    moving company—a crucial distinction that affects your move.
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
                    Verify active insurance coverage and bond status to ensure
                    your belongings are protected during transit.
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
              <div className="text-3xl font-bold text-red-400 mb-2">$8,500</div>
              <p className="text-gray-300">Average loss from moving scams</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">47%</div>
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
            For less than 1% of your moving budget, get complete peace of mind
            with our comprehensive verification report. Don't wait until it's
            too late.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/search">
              <Button size="lg" className="w-full sm:w-auto">
                <Search className="w-5 h-5 mr-2" />
                Verify a Moving Company
              </Button>
            </Link>
            <a href="#reports">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <FileText className="w-5 h-5 mr-2" />
                View Report Samples
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
)
