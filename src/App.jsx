import React, { useState } from 'react'
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

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-dark text-text-primary flex flex-col font-sans">
      {/* 1. Navigation */}
      <Navbar onGetStarted={handleOpenModal} />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero onGetStarted={handleOpenModal} />

        {/* 3. The Problem Section */}
        <ProblemSection />

        {/* 4. The WalletWise Solution */}
        <SolutionSection onGetStarted={handleOpenModal} />

        {/* 5. Features Section */}
        <Features />

        {/* 6. Product Showcase */}
        <ProductShowcase onGetStarted={handleOpenModal} />

        {/* 7. How It Works */}
        <HowItWorks onGetStarted={handleOpenModal} />

        {/* 8. Benefits Section */}
        <BenefitsSection />

        {/* 9. FAQ Section */}
        <FAQSection />

        {/* 10. Final Call To Action */}
        <CTA onGetStarted={handleOpenModal} />
      </main>

      {/* 11. Footer */}
      <Footer onGetStarted={handleOpenModal} />

      {/* Interactive Modal */}
      <GetStartedModal isOpen={modalOpen} onClose={handleCloseModal} />
    </div>
  )
}
