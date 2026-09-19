/**
 * DEBUG MODE (CONTEXT #39).
 * Aktif dengan parameter URL: http://localhost:3000/?debug
 * Menyalakan ScrollTrigger markers + overlay koordinat dunia.
 * Produksi (tanpa ?debug) tidak terpengaruh sama sekali.
 */
export const DEBUG =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("debug");

export function initDebugOverlay() {
  if (!DEBUG) return () => {};

  const el = document.createElement("div");
  el.id = "debug-overlay";
  el.style.cssText =
    "position:fixed;bottom:12px;left:12px;z-index:9999;font:11px/1.6 ui-monospace,monospace;color:#8cffab;background:rgba(0,0,0,0.78);padding:8px 10px;border:1px solid #8cffab;pointer-events:none;white-space:pre;";
  document.body.appendChild(el);

  const update = () => {
    const max = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );
    const p = (window.scrollY / max) * 100;
    el.textContent = [
      `scroll ${Math.round(window.scrollY)}px (${p.toFixed(1)}%)`,
      `world ${document.documentElement.scrollHeight}px`,
    ].join("\n");
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);

  return () => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
    el.remove();
  };
}