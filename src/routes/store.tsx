import { createFileRoute } from '@tanstack/react-router'
import { PageHero } from '../components/PageHero'
import { Header } from '../components/Header'
import { Footer, GridStrip } from '../components/Sections'

export const Route = createFileRoute('/store')({
  component: EquipmentComponent,
})

const CATEGORIES = [
  {
    title: "Electrical Equipment",
    desc: "Industrial-grade transformers, switchgears, ring main units, and advanced control panels for mission-critical applications.",
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Cables & Materials",
    desc: "High-voltage and low-voltage cables, accessories, conduits, and specialized fittings manufactured to international standards.",
    image: "https://images.unsplash.com/photo-1558227691-41ea78d1f631?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Utility Poles & Structures",
    desc: "Concrete and galvanized steel poles, pylons, and structural supports for overhead transmission lines and substations.",
    image: "https://images.unsplash.com/photo-1620300438363-22dc9b4f9810?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Safety & Testing Gear",
    desc: "PPE, testing instruments, and lockout/tagout equipment to ensure maximum safety during operations and maintenance.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=600",
  },
]

function EquipmentComponent() {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="solid" />
      <PageHero 
        kicker="Sales & Supply"
        title="Equipment, Materials & Poles"
        sub="We supply certified electrical equipment, materials, and structural poles for utility, industrial, and commercial projects."
      />
      
      <section className="py-16 sm:py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
          <div className="grid gap-6 md:grid-cols-2">
            {CATEGORIES.map((cat, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl border border-navy/10 bg-white shadow-sm transition hover:shadow-md">
                <div className="h-48 w-full overflow-hidden bg-navy/5">
                  <img src={cat.image} alt={cat.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-xl font-bold text-navy">{cat.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 rounded-xl bg-navy/5 p-8 text-center sm:p-12">
            <h3 className="font-display text-2xl font-bold text-navy">Visit Our Store</h3>
            <p className="mt-4 text-sm text-navy max-w-2xl mx-auto">
              We sell high-quality electrical equipment, materials, and poles directly to the public and contractors. Visit us in-person or contact our sales team to place an order.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 text-sm text-navy">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Address:</span> Km 2, Isuaniocha-Mgbakwu Road by Sharon Plaza, beside Palkon Hills & Hotels, Isuaniocha, Awka North L.G.A, Anambra State
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Email:</span> <a href="mailto:dennicelectricals.co@gmail.com" className="font-medium text-[color:var(--crimson)] hover:underline">dennicelectricals.co@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <GridStrip />
      <Footer />
    </div>
  )
}
