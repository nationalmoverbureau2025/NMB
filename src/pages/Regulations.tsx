import React from 'react';
import { Scale, FileText, AlertTriangle, Shield, Truck, DollarSign, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export function Regulations() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Scale className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Moving Industry Regulations</h1>
            <p className="text-xl text-gray-600">
              Understanding the key regulations and requirements for moving companies
            </p>
          </div>

          {/* Alert Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-900">
                Important Notice
              </p>
              <p className="text-amber-800 text-sm mt-1">
                This guide provides general information about moving regulations. For the most current and detailed requirements, always refer to official FMCSA documentation and consult with qualified legal professionals.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Federal Requirements */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">Federal Requirements</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">USDOT Number</h3>
                  <p className="text-gray-600">
                    All interstate moving companies must have a valid USDOT number issued by the Federal Motor Carrier Safety Administration (FMCSA). This unique identifier helps monitor a company's safety information and compliance with federal regulations.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Motor Carrier (MC) Number</h3>
                  <p className="text-gray-600">
                    Required for companies transporting household goods across state lines. The MC number indicates authority to operate as a for-hire carrier in interstate commerce.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Insurance Requirements</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Public liability insurance: Minimum $750,000 coverage</li>
                    <li>Cargo insurance: Based on vehicle weight and cargo type</li>
                    <li>Workers' compensation insurance (varies by state)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Operating Requirements */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">Operating Requirements</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Safety Regulations</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Regular vehicle maintenance and inspection records</li>
                    <li>Driver qualification files and drug testing programs</li>
                    <li>Hours of Service (HOS) compliance for drivers</li>
                    <li>Safety ratings and compliance reviews</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Equipment Standards</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Vehicle safety standards and inspections</li>
                    <li>Proper cargo securing equipment</li>
                    <li>Required safety equipment and markings</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Consumer Protection */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">Consumer Protection Requirements</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Required Documentation</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Written estimates (binding and non-binding)</li>
                    <li>Bill of lading</li>
                    <li>Inventory list</li>
                    <li>Rights and responsibilities booklet</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Pricing Regulations</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>110% rule for non-binding estimates</li>
                    <li>Transparent pricing and fees disclosure</li>
                    <li>Proper weighing procedures</li>
                    <li>Storage-in-transit charges</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Claims and Liability</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Minimum liability coverage of $0.60 per pound</li>
                    <li>Full value protection options</li>
                    <li>9-month claim filing period</li>
                    <li>Dispute resolution procedures</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* State Requirements */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <ClipboardCheck className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">State-Specific Requirements</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">
                  In addition to federal regulations, moving companies must comply with state-specific requirements, which may include:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>State licensing and registration</li>
                  <li>Additional insurance requirements</li>
                  <li>State-specific consumer protection laws</li>
                  <li>Local business permits and regulations</li>
                </ul>
                <p className="text-gray-600">
                  Requirements vary by state. Contact your state's transportation department for specific requirements.
                </p>
              </div>
            </section>

            {/* Penalties Section */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">Non-Compliance Penalties</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Failure to comply with federal and state regulations can result in:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Civil penalties up to $11,000 per violation</li>
                  <li>License suspension or revocation</li>
                  <li>Forced shutdown of operations</li>
                  <li>Criminal penalties for serious violations</li>
                </ul>
              </div>
            </section>

            {/* CTA Section */}
            <div className="bg-blue-900 text-white rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Verify Your Moving Company</h2>
              <p className="text-blue-100 mb-6">
                Ensure your moving company complies with all necessary regulations. Get a comprehensive verification report today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/search">
                  <Button variant="secondary" size="lg">
                    Search Companies
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="bg-transparent text-white border-white hover:bg-white hover:text-blue-900"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}