import React, { useState, useEffect } from 'react'
import { Wallet, Menu, X, ArrowRight, UserCheck, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from './ui/Button'

export default function Navbar({ onGetStarted, onNavigate }) {
  const { isAuthenticated, user } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Product', href: '#product' },
    { name: 'FAQ', href: '#faq' },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled ? 'py-2.5' : 'py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-xl px-5 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between transition-all duration-200"
          style={{
            background: 'rgba(9, 10, 15, 0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Logo & Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <Wallet className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-text-main group-hover:text-emerald-400 transition-colors">
                WalletWise
              </span>
              <span className="text-[9px] uppercase font-semibold tracking-[0.2em] text-text-muted -mt-0.5 hidden sm:block">
                Financial Ledger
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs sm:text-sm font-medium text-text-secondary hover:text-text-main transition-colors relative py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action: Sign In & Get Started / Go to Dashboard */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigate('dashboard')}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Open Dashboard</span>
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('login')}
                  className="text-text-secondary hover:text-text-main"
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onNavigate('register')}
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-text-secondary hover:text-text-main hover:bg-dark-secondary border border-dark-border transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div
            className="md:hidden mt-2 rounded-xl px-4 pt-3 pb-5 space-y-3"
            style={{
              background: 'rgba(9, 10, 15, 0.96)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-main hover:bg-dark-secondary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-dark-border flex flex-col gap-2">
              {isAuthenticated ? (
                <Button
                  variant="primary"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onNavigate('dashboard')
                  }}
                  className="w-full justify-center"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Open Dashboard</span>
                </Button>
              ) : (
                <>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      onNavigate('login')
                    }}
                    className="w-full justify-center"
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      onNavigate('register')
                    }}
                    className="w-full justify-center"
                  >
                    Get Started Free
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
