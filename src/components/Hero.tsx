import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { HeroScene } from "./HeroScene";
import { Header } from "./Header";

gsap.registerPlugin(ScrollTrigger);

const SCENES = [
  {
    kicker: "Chapter 01 · Engineering",
    title: "Engineering Reliable Power Solutions",
    body: "Blueprints, load calculations, and single-line diagrams become the foundation of every megawatt we deliver.",
  },
  {
    kicker: "Chapter 02 · Infrastructure",
    title: "Building the Backbone of the Grid",
    body: "Foundations, steel, conduits and cable trenches — heavy civil works engineered for a lifetime of uptime.",
  },
  {
    kicker: "Chapter 03 · Installation",
    title: "Precision at High Voltage",
    body: "Switchgear, transformers, busbars and control cabinets — installed, torqued and tested to spec.",
  },
  {
    kicker: "Chapter 04 · Energization",
    title: "The Moment Power Flows",
    body: "First-fire commissioning: pulses ripple through the system as protection settles and the grid awakens.",
  },
  {
    kicker: "Chapter 05 · Smart Network",
    title: "An Intelligent Energy Network",
    body: "Substations, renewables and storage — orchestrated in real time by digital control and telemetry.",
  },
  {
    kicker: "Chapter 06 · Delivered",
    title: "Building the Future of Reliable Power",
    body: "From first drawing to fully energized facility — engineered, constructed and commissioned by Dennic Electrical Construction Company.",
  },
];

export function Hero({ onComplete }: { onComplete?: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    const st = ScrollTrigger.create({
      trigger: wrapRef.current!,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
        const idx = Math.min(SCENES.length - 1, Math.floor(self.progress * SCENES.length));
        setActive(idx);
      },
    });

    return () => { st.kill(); lenis.destroy(); };
  }, []);

  return (
    <div ref={wrapRef} className="relative" style={{ height: `${SCENES.length * 100}vh` }}>
      {/* fixed 3D layer */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <HeroScene progressRef={progress} />
        {/* vignette + noise */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence baseFrequency=%22.9%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
        {/* top nav */}
        <Header variant="overlay" />

        {/* HUD side rail */}
        <div className="pointer-events-none absolute inset-y-0 left-6 z-20 hidden flex-col justify-center gap-3 md:flex">
          {SCENES.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className={`h-px transition-all ${i === active ? "w-10 bg-[color:var(--volt)]" : "w-4 bg-white/30"}`} />
              <span className={`mono text-[10px] uppercase tracking-[0.3em] transition ${i === active ? "text-[color:var(--volt)]" : "text-white/40"}`}>
                0{i + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Corner HUD readouts */}
        <div className="pointer-events-none absolute right-6 top-24 z-20 hidden text-right md:block">
          <div className="mono text-[10px] uppercase tracking-[0.3em] text-white/50">System Status</div>
          <div className="mt-1 flex items-center justify-end gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--volt)] animate-pulse-volt" />
            <span className="mono text-[11px] text-white/80">
              {active < 3 ? "BUILD MODE" : active < 4 ? "ENERGIZING" : "GRID ONLINE"}
            </span>
          </div>
          <div className="mt-3 mono text-[10px] text-white/40">
            LOAD {Math.round((active + 1) * 16.6)}%<br />
            VOLT 13.8 kV · 50 Hz
          </div>
        </div>

        {/* Scene text */}
        <div className="absolute inset-x-0 bottom-0 z-50 px-4 pb-24 sm:px-6 sm:pb-28 md:px-14 md:pb-24 lg:pb-12">
          <div className="max-w-2xl grid">
            {SCENES.map((s, i) => (
              <div
                key={i}
                className="transition-all duration-500 ease-out col-start-1 row-start-1"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform: `translateY(${i === active ? 0 : 12}px)`,
                  pointerEvents: i === active ? "auto" : "none",
                }}
              >
                <div className="mono mb-2 text-[10px] uppercase tracking-[0.32em] text-[color:var(--volt)] sm:mb-3 sm:text-[11px]">
                  {s.kicker}
                </div>
                <h1 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-6xl lg:text-7xl">
                  {s.title}
                </h1>
                <p className="mt-3 max-w-xl text-xs text-white/70 sm:mt-5 sm:text-sm md:text-base">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
          {/* progress bar */}
          <div className="mt-6 flex items-center gap-4 sm:mt-8">
            <div className="relative h-px flex-1 overflow-hidden bg-white/10">
              <div className="absolute inset-y-0 left-0 bg-[color:var(--volt)] shadow-[0_0_12px_var(--volt)]" style={{ width: `${((active + 1) / SCENES.length) * 100}%` }} />
            </div>
            <span className="mono text-[10px] uppercase tracking-[0.3em] text-white/50">
              {String(active + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
