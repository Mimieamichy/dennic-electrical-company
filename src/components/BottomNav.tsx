import { Link } from "@tanstack/react-router";
import { Home, Wrench, Zap, Briefcase, Info } from "lucide-react";

const ITEMS = [
  { to: "/" as const, label: "Home", icon: Home, exact: true },
  { to: "/services" as const, label: "Services", icon: Wrench },
  { to: "/projects" as const, label: "Projects", icon: Briefcase },
  { to: "/about" as const, label: "About", icon: Info },
];

export function BottomNav() {
  return (
    <>
      {/* Spacer so page content isn't hidden behind the nav */}
      <div className="h-24 lg:hidden" aria-hidden />
      <nav className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <div className="mx-auto max-w-md px-3 pb-3">
          <div className="relative flex items-end justify-between rounded-2xl border border-navy/10 bg-white/95 px-2 py-2 shadow-[0_-8px_24px_rgba(0,0,0,0.35)] backdrop-blur">
            <NavItem item={ITEMS[0]} />
            <NavItem item={ITEMS[1]} />

            {/* Center CTA */}
            <div className="-mt-8 flex flex-1 justify-center">
              <Link
                to="/contact"
                aria-label="Request Quote"
                className="group flex h-16 w-16 flex-col items-center justify-center rounded-full bg-[color:var(--crimson)] text-white shadow-[0_0_24px_var(--crimson)] ring-4 ring-[color:var(--navy-deep)] transition active:scale-95"
              >
                <Zap className="h-6 w-6" strokeWidth={2.5} />
                <span className="mono mt-0.5 text-[8px] font-bold uppercase tracking-[0.15em]">
                  Quote
                </span>
              </Link>
            </div>

            <NavItem item={ITEMS[2]} />
            <NavItem item={ITEMS[3]} />
          </div>
        </div>
      </nav>
    </>
  );
}

function NavItem({ item }: { item: (typeof ITEMS)[number] }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      activeOptions={item.exact ? { exact: true } : undefined}
      className="flex min-w-0 flex-1 flex-col items-center gap-1 px-1 py-2 text-navy transition hover:text-navy"
      activeProps={{ className: "text-[color:var(--crimson)]" }}
    >
      <Icon className="h-5 w-5" />
      <span className="mono text-[9px] font-semibold uppercase tracking-[0.18em]">
        {item.label}
      </span>
    </Link>
  );
}
