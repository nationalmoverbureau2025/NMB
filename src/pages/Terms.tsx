import React from 'react';
import { Scale } from 'lucide-react';

export function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Scale className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-600">Last updated: March 6, 2025</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-600">
                By accessing or using National Mover Bureau's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Permission is granted to temporarily access our services for personal, non-commercial use. This license does not include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Modifying or copying our materials</li>
                  <li>Using materials for commercial purposes</li>
                  <li>Attempting to reverse engineer any software</li>
                  <li>Removing any copyright or proprietary notations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Service Description</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  We provide moving company verification services and reports. Our services include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Company verification reports</li>
                  <li>Risk assessment analysis</li>
                  <li>Complaint history verification</li>
                  <li>Review authenticity analysis</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment Terms</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Certain services require payment. By purchasing our services, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate billing information</li>
                  <li>Pay all charges at the prices in effect</li>
                  <li>Pay applicable taxes</li>
                </ul>
                <p>
                  Subscription services will automatically renew unless cancelled. Refunds are subject to our refund policy.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. User Responsibilities</h2>
              <div className="space-y-4 text-gray-600">
                <p>You agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate information</li>
                  <li>Maintain the security of your account</li>
                  <li>Not share account credentials</li>
                  <li>Use services in compliance with laws</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Disclaimer of Warranties</h2>
              <p className="text-gray-600">
                Our services are provided "as is" without warranties of any kind, either express or implied. We do not guarantee the accuracy, completeness, or reliability of any information provided through our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-600">
                We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to Terms</h2>
              <p className="text-gray-600">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of our services constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Information</h2>
              <p className="text-gray-600">
                Questions about the Terms of Service should be sent to:{' '}
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