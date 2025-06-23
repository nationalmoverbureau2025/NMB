import React from 'react';
import { Shield } from 'lucide-react';

export function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: March 6, 2025</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 mb-4">
                National Mover Bureau ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">2.1 Information You Provide</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Account information (email, password)</li>
                  <li>Contact information when using our services</li>
                  <li>Payment information for purchases</li>
                  <li>Communication preferences</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-900">2.2 Automatically Collected Information</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Device information</li>
                  <li>Usage data and analytics</li>
                  <li>IP address and location data</li>
                  <li>Cookies and similar technologies</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>To provide and maintain our services</li>
                <li>To process your transactions</li>
                <li>To send you service-related communications</li>
                <li>To improve our services and user experience</li>
                <li>To protect against fraud and abuse</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing</h2>
              <p className="text-gray-600 mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Service providers who assist in operating our platform</li>
                <li>Law enforcement when required by law</li>
                <li>Other parties with your explicit consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate technical and organizational security measures to protect your information. However, no system is completely secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-600 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to certain processing of your information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
              <p className="text-gray-600">
                If you have questions about this Privacy Policy, please contact us at:{' '}
                <a href="mailto:privacy@nationalmoverbureau.org" className="text-blue-600 hover:text-blue-500">
                  privacy@nationalmoverbureau.org
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}