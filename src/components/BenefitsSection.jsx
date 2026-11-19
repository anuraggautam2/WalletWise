import React from 'react'
import { Eye, Zap, Compass, FolderCheck, CheckCircle2 } from 'lucide-react'

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Eye,
      title: 'Better financial awareness.',
      description: 'Know exactly where your allowance is flowing and eliminate month-end surprises before your balance hits zero.'
    },
    {
      icon: Zap,
      title: 'Easier expense tracking.',
      description: 'Log any purchase in seconds right from your phone or laptop without tedious forms or complicated accounting terms.'
    },
    {
      icon: Compass,
      title: 'Improved budgeting habits.',
      description: 'Develop healthy monetary discipline and sustainable spending confidence that prepares you for life beyond campus.'
    },
    {
      icon: FolderCheck,
      title: 'More organized financial records.',
      description: 'Keep clean, instant archives of semester tuition fees, hostel rent, course equipment, and everyday transactions.'
    }
  ]

  return (
    <section id="about" className="relative py-20 sm:py-28 overflow-hidden" style={{ background: '#101A2D' }}>
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-radial-blue opacity-30 -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Benefits */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider"
              style={{ background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.2)', color: '#60A5FA' }}
            >
              Student-First Benefits
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary leading-tight">
              Built around the way <span className="text-text-accent">students spend</span>.
            </h2>

            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              We cut through the noise of traditional banking tools. WalletWise gives you focused instruments to build strong financial foundations early.
            </p>

            <div className="pt-4 space-y-3">
              {benefits.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="flex items-start gap-4 p-3.5 rounded-2xl transition-colors hover:bg-dark-card">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(37, 99, 235, 0.12)' }}
                    >
                      <Icon className="w-5 h-5 text-text-accent stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-text-primary">{item.title}</h3>
                      <p className="text-sm text-text-secondary mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Photo */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-elevated"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                alt="University students collaborating and discussing plans over laptop"
                className="w-full h-[420px] sm:h-[480px] object-cover object-center"
                loading="lazy"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-dark/40 to-transparent pointer-events-none" />

              {/* Bottom caption */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl flex items-center gap-3"
                style={{
                  background: 'rgba(13, 20, 36, 0.85)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <p className="text-xs text-text-secondary font-medium">
                  Designed for students, roommates, and young campus scholars navigating personal budgeting.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
