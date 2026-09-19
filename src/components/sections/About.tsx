import Image from "next/image";
import { PROFILE } from "@/data/data";

const PIX: Array<[number, number, number, number, string]> = [
  // rambut (ink)
  [5, 0, 6, 1, "#10264a"],
  [4, 1, 8, 1, "#10264a"],
  [4, 2, 8, 1, "#10264a"],
  [3, 3, 2, 1, "#10264a"],
  [11, 3, 2, 1, "#10264a"],
  // wajah
  [5, 3, 6, 1, "#ffd9b3"],
  [5, 4, 6, 1, "#ffd9b3"],
  [5, 5, 6, 1, "#ffd9b3"],
  // mata
  [5, 4, 1, 1, "#10264a"],
  [10, 4, 1, 1, "#10264a"],
  // senyum
  [6, 6, 4, 1, "#10264a"],
  // baju (akcent yellow)
  [4, 7, 8, 1, "#ffd36a"],
  [3, 8, 10, 1, "#ffd36a"],
  [4, 9, 8, 1, "#ffd36a"],
  // celana (ink-soft)
  [4, 10, 3, 2, "#365274"],
  [9, 10, 3, 2, "#365274"],
  // sepatu (ink)
  [3, 12, 4, 1, "#10264a"],
  [9, 12, 4, 1, "#10264a"],
  // tangan
  [2, 8, 1, 3, "#ffd9b3"],
  [13, 8, 1, 3, "#ffd9b3"],
];

export function About() {
  return (
      <section
        id="about"
        className="relative z-10 flex min-h-screen items-center gap-24 px-[96px] py-[120px] max-md:flex-col max-md:px-6 2xl:mx-auto 2xl:w-full 2xl:max-w-[1600px]"
      >
      <div
        data-parallax="7"
        className="avatar-island h-[470px] w-[420px] flex-shrink-0 max-md:h-[300px] max-md:w-full max-md:max-w-[360px]"
      >
        <div className="avatar-frame relative h-[340px] w-[300px] max-md:h-[240px] max-md:w-[220px]">
          {PROFILE.photo ? (
            <Image
              src={PROFILE.photo}
              alt={`Foto ${PROFILE.name}`}
              fill
              sizes="(max-width: 768px) 220px, 300px"
              className="h-full w-full object-cover"
              priority={false}
            />
          ) : (
            <svg viewBox="0 0 16 16" className="pixel-art h-full w-full" aria-hidden="true">
              {PIX.map(([x, y, w, h, c], i) => (
                <rect key={i} x={x} y={y} width={w} height={h} fill={c} />
              ))}
            </svg>
          )}
        </div>
      </div>

      <div className="panel-body pixel-panel reveal-panel max-w-[660px] flex-[1_1_50%] p-[38px] 2xl:max-w-[800px]">
        <div>
          <p className="eyebrow mb-4 text-ink-soft">WORLD Y / 01800</p>
          <p className="section-title text-ink">Tentang Saya</p>
        </div>
        <p className="about-lead mt-6 text-[20px] leading-[1.55] font-semibold">
          {PROFILE.bio[0]}
        </p>
        <p className="about-body mt-4 text-[15px] leading-[1.7] text-ink-soft">
          {PROFILE.bio[1]}
        </p>
        <div className="font-pixel mt-8 flex gap-7 text-[10px] font-bold text-[#3f74c8]">
          <span>BASE / REMOTE</span>
          <span>FOCUS / PLAY</span>
        </div>
      </div>
    </section>
  );
}