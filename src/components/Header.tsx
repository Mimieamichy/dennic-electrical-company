import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";

const NAV = [
  { label: "Home", to: "/" as const },
  { label: "Services", to: "/services" as const },
  { label: "Projects", to: "/projects" as const },
  { label: "About", to: "/about" as const },
  { label: "Store", to: "/store" as const },
  { label: "Contact", to: "/contact" as const },
];

export function Header({ variant = "overlay" }: { variant?: "overlay" | "solid" }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const wrapperClass =
    variant === "overlay"
      ? "fixed inset-x-0 top-0 z-[100] bg-white/60 backdrop-blur-md"
      : "fixed inset-x-0 top-0 z-[100] border-b border-navy/10 bg-white/90 backdrop-blur";

  const menuVariants = {
    closed: {
      clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)",
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    },
  };

  const linkContainerVariants = {
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const linkVariants = {
    closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } },
    open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
  };

  return (
    <>
      <header className={wrapperClass}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-10 md:py-5">
          <Link to="/" className="shrink-0 relative z-50">
            <Logo />
          </Link>

          {/* Desktop Nav */}
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

          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/contact"
              className="rounded-full border border-[color:var(--crimson)]/60 bg-[color:var(--crimson)]/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[color:var(--crimson)] transition hover:bg-[color:var(--crimson)] hover:text-white"
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group relative z-50 flex h-10 w-10 items-center justify-center rounded-full bg-navy/5 transition-colors hover:bg-navy/10 lg:hidden"
            aria-label="Toggle Menu"
          >
            <div className="relative flex h-4 w-5 flex-col justify-between">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="h-[2px] w-full origin-center rounded-full bg-navy transition-all"
              />
              <motion.span
                animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                className="h-[2px] w-full rounded-full bg-navy transition-all"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="h-[2px] w-full origin-center rounded-full bg-navy transition-all"
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[90] flex flex-col justify-center bg-white px-6 pb-20 pt-24 lg:hidden"
          >
            <motion.nav
              variants={linkContainerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col gap-6"
            >
              {NAV.map((l) => (
                <motion.div key={l.to} variants={linkVariants} className="overflow-hidden">
                  <Link
                    to={l.to}
                    className="font-display text-4xl font-bold tracking-tight text-navy hover:text-[color:var(--crimson)]"
                    activeProps={{ className: "text-[color:var(--crimson)]" }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div variants={linkVariants} className="mt-8 pt-8 border-t border-navy/10">
                <Link
                  to="/contact"
                  className="inline-flex rounded-full bg-[color:var(--crimson)] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-navy"
                >
                  Request Quote
                </Link>
              </motion.div>
            </motion.nav>
            
            {/* Background decorative text */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="pointer-events-none absolute bottom-4 right-4 -z-10 opacity-5"
            >
              <span className="font-display text-8xl font-black tracking-tighter text-navy">DENNIC</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
