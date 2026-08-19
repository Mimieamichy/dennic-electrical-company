import { createFileRoute } from '@tanstack/react-router'
import { PageHero } from '../components/PageHero'
import { Header } from '../components/Header'
import { Footer } from '../components/Sections'
import { ChevronRight, Briefcase } from 'lucide-react'

export const Route = createFileRoute('/careers')({
  component: CareersComponent,
})

const ROLES = [
  "Manager",
  "Secretary",
  "Technician",
  "Sales Representative",
  "Driver",
  "Admin Officer",
  "Truck Driver",
  "Electricians"
]

function CareersComponent() {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="solid" />
      <PageHero 
        kicker="Careers"
        title="Join Our Team"
        sub="We are always looking for driven, disciplined individuals to join our growing operations."
      />
      
      <section className="py-16 sm:py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-10">
          <div className="mb-10 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--crimson)]/10 text-[color:var(--crimson)] ring-1 ring-[color:var(--crimson)]/30">
              <Briefcase className="h-6 w-6" />
            </div>
            <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">Open Vacancies</h2>
          </div>
          
          <div className="grid gap-3 sm:grid-cols-2">
            {ROLES.map((role) => (
              <button key={role} className="group flex w-full items-center justify-between rounded-xl border border-navy/10 bg-white p-5 transition hover:border-[color:var(--crimson)]/30 hover:bg-navy/5">
                <span className="font-display text-lg font-semibold text-navy">{role}</span>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--crimson)] text-white transition group-hover:scale-110">
                  <ChevronRight className="h-4 w-4" />
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-16 rounded-xl bg-navy/5 p-8 text-center sm:p-12">
            <h3 className="font-display text-xl font-bold text-navy">Don't see your role?</h3>
            <p className="mt-3 text-sm text-navy">Send your resume to <a href="mailto:dan.ntukokwu@gmail.com" className="font-medium text-[color:var(--crimson)] hover:underline">dan.ntukokwu@gmail.com</a> and we'll keep it on file.</p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
