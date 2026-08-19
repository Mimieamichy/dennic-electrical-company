import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const NAV = [
  { label: "Home", to: "/" as const },
  { label: "Services", to: "/services" as const },
  { label: "Projects", to: "/projects" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

export function Header({ variant = "overlay" }: { variant?: "overlay" | "solid" }) {
  const wrapperClass =
    variant === "overlay"
      ? "fixed inset-x-0 top-0 z-40 bg-white/60 backdrop-blur-md"
      : "fixed inset-x-0 top-0 z-40 border-b border-navy/10 bg-white/90 backdrop-blur";

  return (
    <header className={wrapperClass}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-10 md:py-5">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="mono text-[11px] uppercase tracking-[0.24em] text-navy transition-colors hover:text-[color:var(--crimson)]"
              activeProps={{ className: "text-[color:var(--crimson)]" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden rounded-full border border-[color:var(--crimson)]/60 bg-[color:var(--crimson)]/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[color:var(--crimson)] transition hover:bg-[color:var(--crimson)] hover:text-white lg:inline-block"
        >
          Request Quote
        </Link>
      </div>
    </header>
  );
}
