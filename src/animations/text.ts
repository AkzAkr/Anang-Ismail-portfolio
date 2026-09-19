export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Bungkus kata demi kata ke dalam mask (tanpa library SplitText).
 * Teks tetap utuh di DOM; aria-label dipertahankan untuk screen reader.
 */
export function splitIntoWords(el: HTMLElement) {
  if (el.dataset.masked === "1") return;
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text.trim());
  const words = text.split(/\s+/).filter(Boolean);
  el.textContent = "";
  words.forEach((word, i) => {
    const wrap = document.createElement("span");
    wrap.className = "mask";
    wrap.setAttribute("aria-hidden", "true");
    const inner = document.createElement("span");
    inner.className = "mask-inner";
    inner.textContent = word;
    wrap.appendChild(inner);
    el.appendChild(wrap);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
  });
  el.dataset.masked = "1";
}

/**
 * Bungkus huruf demi huruf ke dalam mask (untuk judul hero — cascade
 * sinematik per-huruf, bukan per-kata). Spasi dipertahankan sebagai
 * text node agar wrapping alami tetap bekerja.
 */
export function splitIntoChars(el: HTMLElement) {
  if (el.dataset.masked === "1") return;
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text.trim());
  el.textContent = "";
  [...text].forEach((ch) => {
    if (ch === " " || ch === "\n" || ch === "\t") {
      el.appendChild(document.createTextNode(" "));
      return;
    }
    const wrap = document.createElement("span");
    wrap.className = "mask";
    wrap.setAttribute("aria-hidden", "true");
    const inner = document.createElement("span");
    inner.className = "mask-inner";
    inner.textContent = ch;
    wrap.appendChild(inner);
    el.appendChild(wrap);
  });
  el.dataset.masked = "1";
}