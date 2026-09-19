import Link from "next/link";
import { SITE, CONTACT } from "@/data/data";

/**
 * Top-bar minimal untuk halaman /projects — kembali ke dunia utama,
 * tanpa preloader/nav full (arsip bukan "adegan pembuka").
 */
export function ArchiveNav() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-[70] flex items-center justify-between px-[96px] py-[14px] max-md:px-6">
      <Link
        href="/"
        className="flex items-center gap-2.5 text-ink no-underline"
      >
        <span className="block h-[18px] w-[18px] border-[3px] border-ink bg-accent-yellow" />
        <span className="font-pixel text-[16px] font-bold">{SITE.brand}</span>
      </Link>
      <div className="font-pixel flex items-center gap-7 text-[10px] tracking-wide text-ink max-md:hidden">
        <Link href="/" className="font-bold uppercase opacity-80 transition-opacity hover:opacity-100">
          ← Kembali
        </Link>
        <a
          href={CONTACT.links[0].href}
          className="font-bold uppercase opacity-80 transition-opacity hover:opacity-100"
        >
          Say Hi
        </a>
      </div>
    </nav>
  );
}