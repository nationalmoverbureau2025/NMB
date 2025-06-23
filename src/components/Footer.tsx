import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-blue-900" />
              <div>
                <span className="text-lg sm:text-xl font-bold text-blue-900">National Mover Bureau</span>
                <span className="text-xs block text-gray-600">Official Verification Database</span>
              </div>
            </Link>
            <p className="mt-4 text-gray-600">
              Official database for moving company verification and fraud prevention.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Contact us: <a href="mailto:info@nationalmoverbureau.org" className="text-blue-600 hover:text-blue-500">info@nationalmoverbureau.org</a>
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Verification Tools</h3>
            <ul className="space-y-2">
              <li><Link to="/search" className="text-gray-600 hover:text-blue-900">Company Search</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-blue-900">Access Reports</Link></li>
              <li><Link to="/verify" className="text-gray-600 hover:text-blue-900">License Verification</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://safer.fmcsa.dot.gov" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-blue-900 flex items-center"
                >
                  FMCSA Database
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.bbb.org/search" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-blue-900 flex items-center"
                >
                  BBB Records
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </li>
              <li><Link to="/regulations" className="text-gray-600 hover:text-blue-900">Moving Regulations</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-600 hover:text-blue-900">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-blue-900">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="text-gray-600 hover:text-blue-900">Official Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} National Mover Bureau. All rights reserved.
            </p>
            <p className="text-gray-600 text-sm md:text-right">
              An independent verification service. Not affiliated with any government agency.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}