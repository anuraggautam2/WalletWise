import React, { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { TransactionProvider } from './context/TransactionContext'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import SolutionSection from './components/SolutionSection'
import Features from './components/Features'
import ProductShowcase from './components/ProductShowcase'
import HowItWorks from './components/HowItWorks'
import BenefitsSection from './components/BenefitsSection'
import FAQSection from './components/FAQSection'
import CTA from './components/CTA'
import Footer from './components/Footer'
import GetStartedModal from './components/GetStartedModal'

import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'
import ForgotPasswordPage from './components/auth/ForgotPasswordPage'
import ResetPasswordPage from './components/auth/ResetPasswordPage'
import DashboardLayout from './components/dashboard/DashboardLayout'

function WalletWiseApp() {
  const { isAuthenticated, loading } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)
  const [resetToken, setResetToken] = useState('')

  const getInitialView = () => {
    if (typeof window === 'undefined') return 'landing'
    const path = window.location.pathname.replace(/^\/+/, '').toLowerCase()
    if (path === 'login') return 'login'
    if (path === 'register') return 'register'
    if (path === 'dashboard') return 'dashboard'
    if (path === 'forgot-password') return 'forgot-password'
    if (path.startsWith('reset-password')) return 'reset-password'
    return 'landing'
  }

  const [currentView, setCurrentView] = useState(getInitialView)

  // Sync with browser Back and Forward history buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getInitialView())
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Push state and update active screen
  const navigate = (view, extra = {}) => {
    if (extra?.token) {
      setResetToken(extra.token)
    }
    setCurrentView(view)
    const targetPath = view === 'landing' || view === 'home' ? '/' : `/${view}`
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Route protection: If logged out and on dashboard, take to login
  useEffect(() => {
    if (!loading && !isAuthenticated && currentView === 'dashboard') {
      navigate('login')
    }
  }, [isAuthenticated, loading, currentView])

  const handleOpenModal = () => setModalOpen(true)
  const handleCloseModal = () => setModalOpen(false)

  // Auth & Dashboard Views
  if (currentView === 'login') {
    return (
      <LoginPage
        onNavigate={navigate}
        onLoginSuccess={() => navigate('dashboard')}
      />
    )
  }

  if (currentView === 'register') {
    return (
      <RegisterPage
        onNavigate={navigate}
        onRegisterSuccess={() => navigate('dashboard')}
      />
    )
  }

  if (currentView === 'forgot-password') {
    return (
      <ForgotPasswordPage
        onNavigate={navigate}
        onTokenGenerated={(token) => {
          setResetToken(token)
          navigate('reset-password', { token })
        }}
      />
    )
  }

  if (currentView === 'reset-password') {
    return (
      <ResetPasswordPage
        token={resetToken}
        onNavigate={navigate}
      />
    )
  }

  if (currentView === 'dashboard') {
    return (
      <DashboardLayout
        onNavigate={navigate}
      />
    )
  }

  // Default: Landing Page View
  return (
    <div className="min-h-screen bg-dark text-text-primary flex flex-col font-sans">
      {/* 1. Navigation */}
      <Navbar onGetStarted={handleOpenModal} onNavigate={navigate} />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero onGetStarted={handleOpenModal} onNavigate={navigate} />

        {/* 3. The Problem Section */}
        <ProblemSection />

        {/* 4. The WalletWise Solution */}
        <SolutionSection onGetStarted={handleOpenModal} onNavigate={navigate} />

        {/* 5. Features Section */}
        <Features />

        {/* 6. Product Showcase */}
        <ProductShowcase onGetStarted={handleOpenModal} onNavigate={navigate} />

        {/* 7. How It Works */}
        <HowItWorks onGetStarted={handleOpenModal} />

        {/* 8. Benefits Section */}
        <BenefitsSection />

        {/* 9. FAQ Section */}
        <FAQSection />

        {/* 10. Final Call To Action */}
        <CTA onGetStarted={handleOpenModal} onNavigate={navigate} />
      </main>

      {/* 11. Footer */}
      <Footer onGetStarted={handleOpenModal} onNavigate={navigate} />

      {/* Interactive Modal */}
      <GetStartedModal isOpen={modalOpen} onClose={handleCloseModal} />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <WalletWiseApp />
      </TransactionProvider>
    </AuthProvider>
  )
}
