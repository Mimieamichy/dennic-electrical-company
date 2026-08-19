import type { ReactNode } from "react";

export function PageHero({
  kicker,
  title,
  sub,
  children,
}: {
  kicker: string;
  title: string;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-navy/10 bg-white pt-16 pb-16 sm:pt-24 md:pt-32 md:pb-24">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[color:var(--crimson)]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="mono mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-[color:var(--crimson)] sm:text-[11px]">
          <span className="h-px w-6 bg-[color:var(--crimson)] sm:w-8" />
          {kicker}
        </div>
        <h1 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {sub && (
          <p className="mt-4 max-w-2xl text-sm text-navy sm:mt-5 sm:text-base md:text-lg">
            {sub}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
