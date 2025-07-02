import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Menu, X, LogOut, User } from 'lucide-react'
import { Button } from './Button'
import { useAuth } from '../context/AuthContext'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
    setMobileMenuOpen(false)
  }

  return (
    <header className="relative z-50">
      {/* Official Banner */}
      <div className="bg-blue-900 text-white py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          Official Moving Company Verification Database
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Shield className="w-8 h-8 text-blue-900" />
            <div>
              <span className="text-lg sm:text-xl font-bold text-blue-900">
                National Mover Bureau
              </span>
              <span className="text-xs block text-gray-600 hidden sm:block">
                Official Verification Database
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/search"
              className="text-gray-700 hover:text-blue-900 font-medium"
            >
              Verify a Company
            </Link>
            <Link
              to="/pricing"
              className="text-gray-700 hover:text-blue-900 font-medium"
            >
              Pricing
            </Link>
            <Link
              to="/regulations"
              className="text-gray-700 hover:text-blue-900 font-medium"
            >
              Regulations
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-900 font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 text-gray-700">
                  <User className="w-4 h-4" />
                  <span className="text-sm hidden xl:inline">
                    {user?.email}
                  </span>
                </div>
                <Link to="/dashboard">
                  <Button
                    variant="outline"
                    className="border-blue-900 text-blue-900 hover:bg-blue-50"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="border-blue-900 text-blue-900 hover:bg-blue-50"
                  >
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-blue-900 hover:bg-blue-800">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-blue-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity duration-200 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-200 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 overflow-y-auto h-full">
            <div className="flex items-center justify-between mb-8">
              <Link
                to="/"
                className="flex items-center space-x-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Shield className="w-8 h-8 text-blue-900" />
                <span className="text-xl font-bold text-blue-900">
                  National Mover Bureau
                </span>
              </Link>
              <button
                className="p-2 text-gray-600 hover:text-blue-900"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-6">
              <Link
                to="/search"
                className="block text-lg text-gray-700 hover:text-blue-900 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Verify a Company
              </Link>
              <Link
                to="/pricing"
                className="block text-lg text-gray-700 hover:text-blue-900 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/regulations"
                className="block text-lg text-gray-700 hover:text-blue-900 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Regulations
              </Link>
              <Link
                to="/contact"
                className="block text-lg text-gray-700 hover:text-blue-900 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>

              <div className="pt-6 border-t">
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <User className="w-4 h-4" />
                      <span className="text-sm">{user?.email}</span>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-blue-900 text-blue-900 hover:bg-blue-50"
                      >
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full border-red-600 text-red-600 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Log out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-blue-900 text-blue-900 hover:bg-blue-50"
                      >
                        Log in
                      </Button>
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block"
                    >
                      <Button className="w-full bg-blue-900 hover:bg-blue-800">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
