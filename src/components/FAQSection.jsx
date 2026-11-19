import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: 'What is WalletWise?',
      answer: 'WalletWise is a modern student expense tracking and budgeting web application. It helps college and university students record daily expenses, set realistic monthly category budgets, and understand their spending habits with zero unnecessary complexity.'
    },
    {
      question: 'Who can use WalletWise?',
      answer: 'WalletWise is primarily designed for students—undergraduates, postgraduates, and campus scholars—managing their allowances or part-time earnings. Anyone looking for a straightforward, clutter-free budgeting tool can also benefit from it.'
    },
    {
      question: 'Can I track daily expenses?',
      answer: 'Yes! You can record your daily purchases in seconds—from quick coffee or tea and canteen meals to textbooks, printouts, and auto rides—and categorize each transaction cleanly.'
    },
    {
      question: 'Can I create monthly budgets?',
      answer: 'Yes. WalletWise allows you to establish total monthly spending limits as well as specific allowances for categories like Food, Books & Academics, Transit, and Leisure, complete with pacing indicators to help you stay on track.'
    },
    {
      question: 'Can I view spending reports?',
      answer: 'Yes. WalletWise provides visual charts and monthly summaries showing where your money goes, highlighting peak spending days and category allocations so you can spot recurring leaks.'
    },
    {
      question: 'Is WalletWise designed for students?',
      answer: 'Absolutely. Unlike complex corporate accounting software or banking apps packed with ads and loans, WalletWise focuses exclusively on the needs of students: fast logging, relatable categories, and actionable spending awareness.'
    }
  ]

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx)
  }

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" style={{ background: '#0D1424' }}>
      <div className="absolute top-1/3 right-0 w-[400px] h-[300px] bg-radial-violet opacity-30 -z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider"
            style={{ background: 'rgba(167, 139, 250, 0.08)', border: '1px solid rgba(167, 139, 250, 0.15)', color: '#A78BFA' }}
          >
            Got Questions?
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
            Frequently Asked Questions
          </h2>

          <p className="text-base sm:text-lg text-text-secondary max-w-xl mx-auto">
            Everything you need to know about the WalletWise student expense platform.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  background: isOpen ? 'rgba(255,255,255,0.055)' : 'rgba(255,255,255,0.035)',
                  border: `1px solid ${isOpen ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)'}`,
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold text-text-primary">
                    {faq.question}
                  </span>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      background: isOpen ? '#2563EB' : 'rgba(255,255,255,0.06)',
                    }}
                  >
                    <ChevronDown className={`w-4 h-4 stroke-[2.5] ${isOpen ? 'text-white' : 'text-text-muted'}`} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-text-secondary leading-relaxed"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                  >
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
