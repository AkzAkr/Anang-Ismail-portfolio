import { EXPERIENCE } from "@/data/data";

export function Experience() {
  return (
      <section
        id="experience"
        className="relative z-10 flex min-h-screen flex-col justify-center gap-[54px] px-[96px] py-[110px] max-md:px-6 2xl:mx-auto 2xl:w-full 2xl:max-w-[1600px]"
      >
      <div>
        <p className="eyebrow text-accent-cyan">WORLD Y / 04700</p>
        <p className="section-title mt-3 text-paper" data-mask-reveal>
          Flight Log
        </p>
      </div>
      <div className="reveal-panel font-pixel max-w-[760px] 2xl:max-w-[920px]">
        {EXPERIENCE.map((item, i) => (
          <div key={item.role} className="milestone">
            <div className="marker">
              <span
                className="dot"
                style={{
                  background: i === 0 ? undefined : "rgba(247,252,255,0.4)",
                }}
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-accent-cyan">
                {item.meta}
              </p>
              <h3 className="mt-2 text-[24px] font-bold uppercase text-paper">
                {item.role}
              </h3>
              <p className="mt-3 text-[14px] leading-7 text-paper/85">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}