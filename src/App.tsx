import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Dashboard } from './pages/Dashboard'
import { Pricing } from './pages/Pricing'
import { Search } from './pages/Search'
import { Contact } from './pages/Contact'
import { Privacy } from './pages/Privacy'
import { Terms } from './pages/Terms'
import { Disclaimer } from './pages/Disclaimer'
import { Regulations } from './pages/Regulations'
import { CheckoutSuccess } from './pages/CheckoutSuccess'
import { AuthCallback } from './pages/AuthCallback'
import { ForgotPassword } from './pages/ForgotPassword'
import { ForgotUsername } from './pages/ForgotUsername'
import { ResetPassword } from './pages/ResetPassword'
import { AuthProvider } from './context/AuthContext'
import { queryClient } from './lib/query'
import { useScrollToTop } from './hooks/useScrollToTop'
import { CompanyReport } from './pages/CompanyReport'
import { ReportsList } from './pages/ReportsList'
import {IntercomChat} from './components/IntercomChat'

function ScrollToTop() {
  useScrollToTop()
  return null
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/forgot-username" element={<ForgotUsername />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/search" element={<Search />} />
                <Route path="/report/:id" element={<CompanyReport />} />
                <Route path="/reports" element={<ReportsList />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/regulations" element={<Regulations />} />
                <Route path="/checkout/success" element={<CheckoutSuccess />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
              </Routes>
              <IntercomChat />
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
