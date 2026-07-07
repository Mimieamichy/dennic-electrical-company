import { useEffect, useRef } from "react";

export function SparkCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const canvas = trailRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    const sparks: { x: number; y: number; vx: number; vy: number; life: number }[] = [];

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
      if (Math.random() > 0.6) {
        for (let i = 0; i < 2; i++) {
          sparks.push({
            x: mx, y: my,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            life: 1,
          });
        }
      }
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx; s.y += s.vy; s.life -= 0.04;
        if (s.life <= 0) { sparks.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.life * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 196, 48, ${s.life})`;
        ctx.shadowColor = "rgba(244,196,48,0.9)";
        ctx.shadowBlur = 12;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <canvas ref={trailRef} className="pointer-events-none fixed inset-0 z-[60]" />
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[61] h-1.5 w-1.5 rounded-full bg-[color:var(--volt)] shadow-[0_0_10px_var(--volt)]" />
      <div ref={ringRef} className="pointer-events-none fixed left-0 top-0 z-[61] h-9 w-9 rounded-full border border-[color:var(--volt)]/60" />
    </>
  );
}
