"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Partikel dalam koordinat DUNIA (absolute di dalam main),
 * bukan fixed viewport — fix bug legacy yang menempel di layar.
 * Hanya transform + opacity.
 * Mobile (≤768px): jumlah dikurangi (26 → 10) agar ringan.
 */
export function ParticleLayer({ count = 26 }: { count?: number }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const effective = isMobile ? Math.min(count, 10) : count;
  const particles = useMemo(
    () =>
      Array.from({ length: effective }, (_, i) => ({
        id: `p-${i}`,
        left: (i * 37.7 + 11) % 100,
        top: (i * 53.3 + 7) % 100,
        opacity: 0.2 + ((i * 13) % 50) / 100,
        size: i % 3 === 0 ? 4 : 3,
      })),
    [effective]
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-[4]">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle absolute bg-paper"
          data-particle
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            background: "#f7f7f2",
          }}
        />
      ))}
    </div>
  );
}
