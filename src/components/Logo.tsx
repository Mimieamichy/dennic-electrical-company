import logoAsset from "@/assets/logo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={logoAsset}
        alt="Dennic Electrical Construction Company"
        className="h-9 w-9 shrink-0 object-contain"
      />
      <div className="leading-tight">
        <div className="font-display text-[13px] sm:text-[15px] font-bold tracking-tight text-navy">
          DENNIC
        </div>
        <div className="mono text-[8px] sm:text-[9px] uppercase tracking-[0.24em] text-[color:var(--crimson)]/80">
          Electrical Construction Co.
        </div>
      </div>
    </div>
  );
}
