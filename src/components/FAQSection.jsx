import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: 'What is WalletWise?',
      answer: 'WalletWise is a modern personal finance and expense tracking application designed specifically for students. It enables you to record daily expenditures, maintain monthly category limits, allocate savings for milestones, and review your spending analytics with zero bookkeeping hassle.'
    },
    {
      question: 'How does monthly budget pacing work?',
      answer: 'WalletWise computes your monthly allowance against the current day of the month. It calculates your safe daily burn rate and provides warnings if your spending pace exceeds timeline targets, helping you avoid running out of funds before the 25th.'
    },
    {
      question: 'Can I export my financial data?',
      answer: 'Yes. WalletWise supports instant one-click CSV exports of your filtered transactions and comprehensive monthly analytics reports, giving you complete ownership of your personal financial records.'
    },
    {
      question: 'Can I track savings goals for specific milestones?',
      answer: 'Yes. You can create dedicated goals for semester tuition fees, laptop upgrades, academic certifications, travel, or an emergency buffer. Track funded percentages and make incremental deposits at any time.'
    },
    {
      question: 'Is my data private and secure?',
      answer: 'Yes. Your financial information is linked exclusively to your authenticated user account. WalletWise does not sell your data or serve third-party financial loan advertisements.'
    }
  ]

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx)
  }

  return (
    <section id="faq" className="py-20 sm:py-28 bg-dark relative border-t border-dark-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            Common Questions
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
            Frequently Asked Questions
          </h2>

          <p className="text-base sm:text-lg text-text-secondary max-w-xl mx-auto">
            Everything you need to know about the WalletWise financial ledger.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className={`rounded-lg overflow-hidden transition-all duration-150 border ${
                  isOpen
                    ? 'bg-dark-card border-emerald-500/30'
                    : 'bg-dark-card/60 border-dark-border hover:border-dark-border'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-base font-bold text-text-main">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-emerald-500/10 text-emerald-400' : 'bg-dark-secondary text-text-muted'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-dark-border/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
