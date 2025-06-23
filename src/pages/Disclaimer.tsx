import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function Disclaimer() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <AlertTriangle className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Official Disclaimer</h1>
            <p className="text-gray-600">Last updated: March 6, 2025</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Independent Verification Service</h2>
              <p className="text-gray-600">
                National Mover Bureau is an independent verification service. We are not affiliated with, endorsed by, or connected to any government agency, including but not limited to the Federal Motor Carrier Safety Administration (FMCSA), Department of Transportation (DOT), or any state regulatory bodies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information Accuracy</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  While we strive to provide accurate and up-to-date information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All information is provided "as is" without warranty of any kind</li>
                  <li>Data may be delayed or incomplete</li>
                  <li>We cannot guarantee the accuracy of third-party information</li>
                  <li>Users should independently verify critical information</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Risk Assessment Disclaimer</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Our risk assessment and scoring system:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Is based on available data and proprietary algorithms</li>
                  <li>Should not be the sole factor in decision-making</li>
                  <li>May not reflect current company status</li>
                  <li>Is not a guarantee of company performance or reliability</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. No Legal Advice</h2>
              <p className="text-gray-600">
                The information provided through our services does not constitute legal advice and should not be relied upon as such. Consult with qualified legal professionals for specific advice regarding your situation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Third-Party Content</h2>
              <p className="text-gray-600">
                Our service includes information from third-party sources. We are not responsible for the accuracy, completeness, or reliability of third-party content. Links to external websites are provided for convenience only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. No Endorsement</h2>
              <p className="text-gray-600">
                The inclusion of any company in our database does not constitute an endorsement or recommendation. A favorable rating or review does not guarantee satisfactory service or performance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  National Mover Bureau shall not be liable for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Any decisions made based on our information</li>
                  <li>Direct, indirect, or consequential damages</li>
                  <li>Loss of business or personal property</li>
                  <li>Claims arising from the use of our services</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to Service</h2>
              <p className="text-gray-600">
                We reserve the right to modify, suspend, or discontinue any aspect of our service at any time without notice. We are not liable for any modification, suspension, or discontinuation of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Information</h2>
              <p className="text-gray-600">
                For questions about this disclaimer, contact us at:{' '}
                <a href="mailto:legal@nationalmoverbureau.org" className="text-blue-600 hover:text-blue-500">
                  legal@nationalmoverbureau.org
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}