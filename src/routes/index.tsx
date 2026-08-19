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
      { name: "description", content: "Dennic Electrical Construction Company designs, constructs and commissions high-crimsonage electrical infrastructure — from 220 kV substations to industrial and renewable power systems." },
      { property: "og:title", content: "Dennic Electrical Construction Company" },
      { property: "og:description", content: "Engineer-led electrical construction: substations, HV installations, industrial systems and renewable integration." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/90632969-1feb-438e-95fe-2dbea5b9d6be/id-preview-f97b2533--2cbd2622-42db-4c77-9b34-9caa937c8ef8.lovable.app-1783379826842.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/90632969-1feb-438e-95fe-2dbea5b9d6be/id-preview-f97b2533--2cbd2622-42db-4c77-9b34-9caa937c8ef8.lovable.app-1783379826842.png" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-white text-navy">
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
    <section className="relative border-t border-navy/10 bg-white py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="mb-10 max-w-3xl md:mb-14">
          <div className="mono mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-[color:var(--crimson)] sm:text-[11px]">
            <span className="h-px w-6 bg-[color:var(--crimson)] sm:w-8" />
            Explore
          </div>
          <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-navy sm:text-4xl md:text-5xl">
            Discover what we build.
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-xl bg-navy/5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group flex flex-col justify-between bg-white p-6 transition hover:bg-[color:var(--navy-light)]/30 sm:p-8"
            >
              <div>
                <div className="mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--crimson)]">
                  {c.label}
                </div>
                <p className="mt-4 text-sm text-navy">{c.desc}</p>
              </div>
              <div className="mt-8 flex items-center gap-2 mono text-[11px] uppercase tracking-[0.28em] text-navy transition group-hover:text-[color:var(--crimson)]">
                Explore <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
