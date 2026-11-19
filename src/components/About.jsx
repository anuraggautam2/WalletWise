import React from 'react'
import { Check, Target, Compass, Award } from 'lucide-react'

export default function About() {
  const highlights = [
    {
      title: 'Built for Student Life',
      text: 'Designed specifically around student spending patterns, campus lifestyles, and tight monthly allowances.'
    },
    {
      title: 'Frictionless Recording',
      text: 'Log your coffee, textbooks, and groceries in seconds without cumbersome spreadsheets or complex setups.'
    },
    {
      title: 'Habit-Forming Clarity',
      text: 'Build lifelong financial mindfulness with clean visualizations that put you in total control.'
    }
  ]

  return (
    <section id="about" className="py-20 sm:py-28 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading and Editorial Description */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-700">
              About WalletWise
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy-900 leading-tight">
              Money management, made simple.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Managing money as a student can be challenging. WalletWise makes it easier to record expenses, understand spending patterns and stay within budget.
            </p>

            {/* Core Values / Highlights */}
            <div className="pt-4 space-y-4">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-brand-blue flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-navy-900">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-normal mt-0.5">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Real Professional Photograph */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-card">
              <img
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80"
                alt="Personal financial planning, organizing expenses on laptop and notebook"
                className="w-full h-[360px] sm:h-[420px] object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
