import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { GridStrip, Testimonials, Footer } from "@/components/Sections";
import { SparkCursor } from "@/components/Cursor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dennic Electrical Construction Company · Home" },
      { name: "description", content: "Dennic Electrical Construction Company designs, constructs and commissions high-voltage electrical infrastructure — from 220 kV substations to industrial and renewable power systems." },
      { property: "og:title", content: "Dennic Electrical Construction Company" },
      { property: "og:description", content: "Engineer-led electrical construction: substations, HV installations, industrial systems and renewable integration." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-[color:var(--navy-deep)] text-white">
      <SparkCursor />
      <Hero />
      <GridStrip />
      <ExploreStrip />
      <Testimonials />
      <Footer />
    </main>
  );
}

function ExploreStrip() {
  const cards = [
    { to: "/services" as const, label: "Services", desc: "Full-lifecycle electrical delivery from design to switch-on." },
    { to: "/projects" as const, label: "Projects", desc: "Selected turnkey deliveries across utility, industry and renewables." },
    { to: "/about" as const, label: "About", desc: "Two decades of engineering the systems that keep industry moving." },
    { to: "/contact" as const, label: "Contact", desc: "Talk to a senior engineer — response within one business day." },
  ];
  return (
    <section className="relative border-t border-white/5 bg-[color:var(--navy)] py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="mb-10 max-w-3xl md:mb-14">
          <div className="mono mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-[color:var(--volt)] sm:text-[11px]">
            <span className="h-px w-6 bg-[color:var(--volt)] sm:w-8" />
            Explore
          </div>
          <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
            Discover what we build.
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group flex flex-col justify-between bg-[color:var(--navy-deep)] p-6 transition hover:bg-[color:var(--navy-light)]/30 sm:p-8"
            >
              <div>
                <div className="mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--volt)]">
                  {c.label}
                </div>
                <p className="mt-4 text-sm text-white/70">{c.desc}</p>
              </div>
              <div className="mt-8 flex items-center gap-2 mono text-[11px] uppercase tracking-[0.28em] text-white/50 transition group-hover:text-[color:var(--volt)]">
                Explore <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
