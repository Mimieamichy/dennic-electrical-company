import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@tanstack/react-router";
import {
  Zap, Cable, Factory, Building2, SunMedium, Wrench, ShieldCheck,
  ArrowUpRight, Gauge, CheckCircle2, Send, X, ChevronLeft, ChevronRight,
  Linkedin, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin,
} from "lucide-react";
import { Logo } from "./Logo";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Section header ---------- */
function SectionHead({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="mb-10 max-w-3xl md:mb-14">
      <div className="mono mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-[color:var(--volt)] sm:text-[11px] md:mb-4">
        <span className="h-px w-6 bg-[color:var(--volt)] sm:w-8" />
        {kicker}
      </div>
      <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {sub && <p className="mt-4 max-w-2xl text-sm text-white/60 sm:mt-5 md:text-lg">{sub}</p>}
    </div>
  );
}

/* ---------- Reveal wrapper ---------- */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============ About ============ */
export function About() {
  return (
    <section id="about" className="relative border-t border-white/5 bg-[color:var(--navy-deep)] py-16 sm:py-24 md:py-32">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <SectionHead
          kicker="About Dennic"
          title="Two decades of engineering the systems that keep industry moving."
          sub="We design, construct and commission mission-critical electrical infrastructure for utilities, industry and renewable operators across the region."
        />
        <div className="grid gap-10 md:grid-cols-3">
          {[
            { k: "24", v: "Years operating", d: "Delivering high-voltage projects across four countries." },
            { k: "1.4 GW", v: "Installed capacity", d: "From 400 V distribution up to 220 kV substations." },
            { k: "0", v: "Lost-time incidents", d: "Last 1,800 days on active construction sites." },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.1} className="hairline rounded-xl bg-white/[0.02] p-8 backdrop-blur">
              <div className="mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--volt)]">{s.v}</div>
              <div className="mt-3 font-display text-5xl font-bold tracking-tight text-white">{s.k}</div>
              <p className="mt-4 text-sm text-white/60">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Services ============ */
const SERVICES = [
  { icon: Cable, title: "Electrical Construction", desc: "Turnkey installation of cable systems, containment and terminations to IEC standards." },
  { icon: Zap, title: "High Voltage Installations", desc: "Substations, switchyards and transformer works from 11 kV to 220 kV." },
  { icon: Factory, title: "Industrial Electrical Systems", desc: "MCCs, VFDs, PLC integration and process electrification for heavy industry." },
  { icon: Building2, title: "Commercial Projects", desc: "Full electrical fit-out for data centres, campuses and mixed-use developments." },
  { icon: SunMedium, title: "Renewable Energy Integration", desc: "Solar farms, wind interconnection and BESS balance-of-plant." },
  { icon: Wrench, title: "Maintenance & Testing", desc: "Predictive maintenance, thermography, protection relay testing and commissioning." },
];

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cards = ref.current?.querySelectorAll<HTMLElement>("[data-card]");
    if (!cards) return;
    cards.forEach((c) => {
      const onMove = (e: MouseEvent) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        c.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      };
      c.addEventListener("mousemove", onMove);
    });
  }, []);

  return (
    <section id="services" className="relative border-t border-white/5 bg-[color:var(--navy)] py-16 sm:py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10" ref={ref}>
        <SectionHead
          kicker="Our Services"
          title="Full-lifecycle capability, from single line to switch-on."
          sub="Six integrated disciplines under one accountable delivery team."
        />
        <div className="grid gap-px overflow-hidden rounded-xl bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={i}
              data-card
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group relative overflow-hidden bg-[color:var(--navy-deep)] p-8 transition"
              style={{
                backgroundImage:
                  "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(244,196,48,0.10), transparent 40%)",
              }}
            >
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-md bg-[color:var(--volt)]/10 text-[color:var(--volt)] ring-1 ring-[color:var(--volt)]/30">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{s.desc}</p>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--volt)]/60 to-transparent opacity-0 transition group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Projects with Modal ============ */
type Project = {
  n: string;
  name: string;
  tag: string;
  stat: string;
  client: string;
  location: string;
  year: string;
  duration: string;
  summary: string;
  scope: string[];
  images: string[];
};

const PROJECTS: Project[] = [
  {
    n: "01",
    name: "Meridian 220 kV Substation",
    tag: "Utility · Transmission",
    stat: "220 kV / 300 MVA",
    client: "Meridian Grid Authority",
    location: "Northern Corridor",
    year: "2024",
    duration: "18 months",
    summary:
      "Design, construct and commission a greenfield 220/33 kV air-insulated substation feeding a new regional load pocket. Delivered on an accelerated programme with zero lost-time incidents across 240,000 site hours.",
    scope: [
      "Primary plant: 2 × 150 MVA transformers, 220 kV GIS bay",
      "Civil works: control building, foundations, cable trenches",
      "Protection & control panels with IEC 61850 station bus",
      "SCADA integration and remote telemetry",
      "Full commissioning, energization and grid-code compliance",
    ],
    images: [
      "https://images.unsplash.com/photo-1509390144018-eeaf6b7ec4a2?w=1600&q=80",
      "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=1600&q=80",
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&q=80",
    ],
  },
  {
    n: "02",
    name: "Halstead Data Campus Phase III",
    tag: "Commercial · Mission-Critical",
    stat: "48 MW IT Load",
    client: "Halstead Digital Infrastructure",
    location: "Halstead Metro",
    year: "2025",
    duration: "24 months",
    summary:
      "Full electrical fit-out for a Tier III data campus expansion — from 33 kV intake through to white-space PDUs. Concurrently maintainable topology with N+1 redundancy across all critical distribution.",
    scope: [
      "33/11 kV intake substation and ring main units",
      "12 × 2.5 MVA package substations",
      "Diesel rotary UPS integration",
      "Busway distribution to 16 data halls",
      "EPMS and BMS integration",
    ],
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80",
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
    ],
  },
  {
    n: "03",
    name: "Kolwezi Copper Smelter Electrification",
    tag: "Industrial · Process",
    stat: "132 kV Intake",
    client: "Kolwezi Copper",
    location: "Katanga",
    year: "2023",
    duration: "22 months",
    summary:
      "Turnkey electrical package for a copper smelter expansion including 132 kV intake, MV reticulation and process electrification. Delivered two weeks ahead of programme and first-time commissioned.",
    scope: [
      "132/11 kV outdoor substation",
      "Furnace transformers and rectifier feeds",
      "MCCs, VFDs and process motor installation",
      "PLC and DCS integration",
      "Earthing, lightning protection and cathodic systems",
    ],
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1600&q=80",
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1600&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=1600&q=80",
    ],
  },
  {
    n: "04",
    name: "Sundial Solar + BESS",
    tag: "Renewables · Storage",
    stat: "180 MWp · 90 MWh",
    client: "Sundial Renewables",
    location: "Southern Plateau",
    year: "2025",
    duration: "14 months",
    summary:
      "Balance-of-plant electrical works for a 180 MWp PV plant co-located with a 90 MWh battery energy storage system. Grid interconnection at 132 kV with full reactive power and grid-code compliance.",
    scope: [
      "MV collector system and inverter stations",
      "BESS DC and AC integration",
      "132 kV grid-interconnection substation",
      "Plant SCADA and power plant controller",
      "Grid-code compliance testing and energization",
    ],
    images: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1600&q=80",
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1600&q=80",
    ],
  },
];

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative border-t border-white/5 bg-[color:var(--navy-deep)] py-16 sm:py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <SectionHead
          kicker="Featured Projects"
          title="Selected work from the field."
          sub="A snapshot of recent turnkey deliveries across utility, industrial and renewables sectors."
        />
        <div className="space-y-px overflow-hidden rounded-xl border border-white/10">
          {PROJECTS.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <button
                type="button"
                onClick={() => setActive(p)}
                className="group grid w-full grid-cols-12 items-center gap-4 bg-[color:var(--navy)] px-4 py-5 text-left transition hover:bg-[color:var(--navy-light)]/40 sm:gap-6 sm:px-6 sm:py-6 md:px-10 md:py-8"
              >
                <div className="col-span-2 mono text-xs uppercase tracking-[0.3em] text-[color:var(--volt)]">{p.n}</div>
                <div className="col-span-10 min-w-0 md:col-span-5">
                  <div className="font-display text-lg font-semibold text-white sm:text-xl md:text-2xl">{p.name}</div>
                  <div className="mt-1 text-xs text-white/50">{p.tag}</div>
                </div>
                <div className="col-span-12 mono text-xs text-white/60 md:col-span-3">{p.stat}</div>
                <div className="col-span-12 flex items-center justify-end gap-2 mono text-[11px] uppercase tracking-[0.3em] text-white/40 transition group-hover:text-[color:var(--volt)] md:col-span-2">
                  Case study
                  <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % project.images.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + project.images.length) % project.images.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project.images.length, onClose]);

  const next = () => setIdx((i) => (i + 1) % project.images.length);
  const prev = () => setIdx((i) => (i - 1 + project.images.length) % project.images.length);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6" onClick={onClose}>
      <div
        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--navy-deep)] shadow-2xl lg:grid lg:grid-cols-[1.2fr_1fr]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-[color:var(--volt)] hover:text-[color:var(--navy-deep)]"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Carousel */}
        <div className="relative aspect-[16/9] w-full shrink-0 bg-black lg:h-full lg:aspect-auto">
          <img
            src={project.images[idx]}
            alt={`${project.name} — image ${idx + 1}`}
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)] via-transparent to-transparent" />

          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-[color:var(--volt)] hover:text-[color:var(--navy-deep)]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-[color:var(--volt)] hover:text-[color:var(--navy-deep)]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {project.images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? "w-8 bg-[color:var(--volt)]" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 min-h-0 overflow-y-auto p-6 sm:p-10 lg:p-12 lg:h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--volt)]">
            {project.n} · {project.tag}
          </div>
          <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
            {project.name}
          </h3>

          <div className="mt-10 flex flex-col gap-10">
            <div>
              <div className="mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--volt)]">Overview</div>
              <p className="mt-3 text-[15px] leading-relaxed text-white/75">{project.summary}</p>
            </div>

            <div>
              <div className="mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--volt)]">Scope of Works</div>
              <ul className="mt-4 space-y-3">
                {project.scope.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-[15px] text-white/75">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--volt)]" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {[
                { k: "Client", v: project.client },
                { k: "Location", v: project.location },
                { k: "Year", v: project.year },
                { k: "Duration", v: project.duration },
                { k: "Stat", v: project.stat },
              ].map((it) => (
                <div key={it.k}>
                  <div className="mono text-[9px] uppercase tracking-[0.28em] text-white/40">{it.k}</div>
                  <div className="mt-1.5 text-sm font-medium text-white/90">{it.v}</div>
                </div>
              ))}
            </aside>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
            <Link
              to="/contact"
              onClick={onClose}
              className="ml-auto inline-flex items-center gap-2 rounded-full bg-[color:var(--volt)] px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-[color:var(--navy-deep)] transition hover:brightness-110"
            >
              Discuss a similar project <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ Safety & Why choose us ============ */
export function Safety() {
  const stats = [
    { k: "ISO 45001", v: "Occupational Health & Safety" },
    { k: "ISO 9001", v: "Quality Management" },
    { k: "ISO 14001", v: "Environmental Management" },
    { k: "NFPA 70E", v: "Electrical Safety Compliance" },
  ];
  return (
    <section id="safety" className="relative border-t border-white/5 bg-[color:var(--navy-deep)] py-16 sm:py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10 grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHead
            kicker="Safety & Compliance"
            title="Zero-harm is the only acceptable outcome."
            sub="Every technician, every switching sequence, every torque check — logged, verified and audited against international standards."
          />
          <ul className="space-y-4">
            {[
              "Documented Job Safety Analysis for every task",
              "Live/dead/live testing on every isolation",
              "Two-person authorization on all HV operations",
              "Digital permit-to-work with audit trail",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-white/75">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--volt)]" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2">
          {stats.map((s, i) => (
            <Reveal key={i} className="bg-[color:var(--navy)] p-8">
              <ShieldCheck className="h-6 w-6 text-[color:var(--volt)]" />
              <div className="mt-4 font-display text-2xl font-semibold text-white">{s.k}</div>
              <div className="mt-1 text-xs text-white/50">{s.v}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  const rows = [
    { k: "Engineer-led delivery", v: "Chartered engineers own every project from tender to commissioning." },
    { k: "Self-perform crews", v: "In-house HV, MV and LV teams — no subcontractor drift." },
    { k: "Digital-first execution", v: "BIM coordination, digital as-builts, live power quality telemetry." },
    { k: "24/7 response", v: "Regional service hubs with two-hour emergency callout." },
  ];
  return (
    <section className="relative border-t border-white/5 bg-[color:var(--navy)] py-16 sm:py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <SectionHead kicker="Why Choose Us" title="Precision, accountability, and the discipline power work demands." />
        <div className="divide-y divide-white/10 border-y border-white/10">
          {rows.map((r, i) => (
            <Reveal key={i} className="grid grid-cols-12 gap-6 py-8 md:py-10">
              <div className="col-span-2 mono text-xs text-white/40">0{i + 1}</div>
              <div className="col-span-10 md:col-span-4 font-display text-xl font-semibold text-white">{r.k}</div>
              <div className="col-span-12 md:col-span-6 text-white/60">{r.v}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Testimonials (dual marquee) ============ */
const QUOTES = [
  { q: "Dennic delivered our 132 kV intake two weeks early and hit every commissioning milestone first-time. That is a rare thing on a project this complex.", a: "Head of Infrastructure, Kolwezi Copper" },
  { q: "Their engineering-led approach and safety culture made them the obvious partner for our Tier III data campus.", a: "Project Director, Halstead" },
  { q: "From feasibility through to grid-code compliance, one team, one accountable point of contact.", a: "Development Manager, Sundial Renewables" },
  { q: "The Dennic crews mobilized within days of award and hit every milestone. Total professionals.", a: "Operations Manager, Meridian Grid" },
  { q: "Engineered documentation, immaculate as-builts, and zero rework at commissioning. Best in class.", a: "Owner's Engineer, Northern Utilities" },
  { q: "A rare mix of technical depth and site discipline. We would work with Dennic on any critical delivery.", a: "CTO, Halstead Digital Infrastructure" },
];

function TestimonialCard({ q, a }: { q: string; a: string }) {
  return (
    <div className="mx-3 w-[300px] shrink-0 rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:mx-4 sm:w-[380px] sm:p-8">
      <p className="text-sm leading-relaxed text-white/80 sm:text-[15px]">"{q}"</p>
      <div className="mt-6 mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--volt)]">{a}</div>
    </div>
  );
}

function Marquee({ items, direction = "left" }: { items: typeof QUOTES; direction?: "left" | "right" }) {
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex w-max ${direction === "left" ? "marquee-left" : "marquee-right"}`}
        style={{ animationPlayState: "running" }}
      >
        {[...items, ...items].map((q, i) => (
          <TestimonialCard key={`${direction}-${i}`} q={q.q} a={q.a} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const first = QUOTES.slice(0, 3);
  const second = QUOTES.slice(3);
  return (
    <section className="relative border-t border-white/5 bg-[color:var(--navy-deep)] py-16 sm:py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <SectionHead kicker="Clients" title="What our clients say." />
      </div>
      <div className="space-y-5">
        <Marquee items={first} direction="left" />
        <Marquee items={second} direction="right" />
      </div>
    </section>
  );
}

/* ============ CTA + Contact ============ */
export function Contact() {
  return (
    <section id="contact" className="relative border-t border-white/5 bg-[color:var(--navy)] py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[color:var(--volt)]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10 grid gap-16 lg:grid-cols-2">
        <div>
          <SectionHead
            kicker="Request a Quote"
            title="Have a project? Let's engineer the power behind it."
            sub="Tell us about your site, load profile and timeline. A senior engineer will respond within one business day."
          />
          <div className="space-y-3 mono text-sm text-white/60">
            <div><span className="text-white/40 uppercase tracking-[0.24em] text-[10px] mr-3">Email</span> engineering@dennic.co</div>
            <div><span className="text-white/40 uppercase tracking-[0.24em] text-[10px] mr-3">Phone</span> +1 (555) 013-2200</div>
            <div><span className="text-white/40 uppercase tracking-[0.24em] text-[10px] mr-3">Ops</span> 24/7 Emergency Callout</div>
          </div>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); alert("Thank you — our engineering team will be in touch."); }}
          className="hairline rounded-xl bg-[color:var(--navy-deep)]/60 p-8 backdrop-blur"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" />
            <Field label="Company" name="company" />
            <Field label="Email" name="email" type="email" />
            <Field label="Phone" name="phone" />
            <div className="sm:col-span-2">
              <Field label="Project type" name="type" placeholder="e.g. 33 kV substation, industrial fit-out" />
            </div>
            <div className="sm:col-span-2">
              <label className="mono text-[10px] uppercase tracking-[0.28em] text-white/50">Brief</label>
              <textarea
                rows={4}
                className="mt-2 w-full resize-none rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-[color:var(--volt)] focus:bg-white/[0.05]"
              />
            </div>
          </div>
          <button
            type="submit"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--volt)] px-6 py-3 text-sm font-semibold text-[color:var(--navy-deep)] transition hover:brightness-110 glow-volt"
          >
            Send request
            <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="mono text-[10px] uppercase tracking-[0.28em] text-white/50">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-[color:var(--volt)] focus:bg-white/[0.05]"
      />
    </div>
  );
}

/* ============ Footer ============ */
const QUICK_LINKS = [
  { to: "/" as const, label: "Home" },
  { to: "/services" as const, label: "Services" },
  { to: "/projects" as const, label: "Projects" },
  { to: "/about" as const, label: "About" },
  { to: "/contact" as const, label: "Contact" },
];

const SERVICES_LINKS = [
  "Electrical Construction",
  "High Voltage Installations",
  "Industrial Systems",
  "Renewable Integration",
  "Maintenance & Testing",
];

const SOCIALS = [
  { icon: Linkedin, href: "https://www.linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://www.twitter.com", label: "Twitter" },
  { icon: Facebook, href: "https://www.facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[color:var(--navy-deep)] px-4 pt-14 pb-10 sm:px-6 md:px-10 md:pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Dennic Electrical Construction Company designs, constructs and commissions
              high-voltage electrical infrastructure for utilities, industry and renewables.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition hover:border-[color:var(--volt)]/60 hover:bg-[color:var(--volt)]/10 hover:text-[color:var(--volt)]"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="col-span-1 md:col-span-2">
            <div className="mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--volt)]">
              Quick Links
            </div>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-white/70 transition hover:text-[color:var(--volt)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1 md:col-span-3">
            <div className="mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--volt)]">
              Services
            </div>
            <ul className="mt-5 space-y-3">
              {SERVICES_LINKS.map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-sm text-white/70 transition hover:text-[color:var(--volt)]"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-3">
            <div className="mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--volt)]">
              Get In Touch
            </div>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--volt)]" />
                <a href="mailto:engineering@dennic.co" className="transition hover:text-[color:var(--volt)]">
                  engineering@dennic.co
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--volt)]" />
                <a href="tel:+15550132200" className="transition hover:text-[color:var(--volt)]">
                  +1 (555) 013-2200
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--volt)]" />
                <span>Regional service hubs · 24/7 Callout</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center">
          <div className="mono text-[11px] uppercase tracking-[0.28em] text-white/40">
            © {new Date().getFullYear()} Dennic Electrical Construction Company · All rights reserved
          </div>
          <div className="flex items-center gap-6 mono text-[11px] uppercase tracking-[0.24em] text-white/50">
            <a href="#" className="transition hover:text-[color:var(--volt)]">Privacy</a>
            <a href="#" className="transition hover:text-[color:var(--volt)]">Terms</a>
            <a href="#" className="transition hover:text-[color:var(--volt)]">Careers</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============ Grid stats strip ============ */
export function GridStrip() {
  const items = [
    { i: Gauge, k: "99.998%", v: "Uptime commissioned" },
    { i: Zap, k: "220 kV", v: "Max voltage class" },
    { i: Cable, k: "3,400 km", v: "Cable installed" },
    { i: ShieldCheck, k: "0", v: "LTIs · 1,800 days" },
  ];
  return (
    <section className="border-t border-white/5 bg-[color:var(--navy-deep)]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-6 md:grid-cols-4 md:px-10">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-4 py-8 first:pl-0 md:pl-8">
            <it.i className="h-5 w-5 text-[color:var(--volt)]" />
            <div>
              <div className="font-display text-2xl font-semibold text-white">{it.k}</div>
              <div className="mono text-[10px] uppercase tracking-[0.24em] text-white/50">{it.v}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
