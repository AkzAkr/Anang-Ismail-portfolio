// =============================================================
// data.ts — SUMBER DATA TUNGGAL PORTFOLIO
// Isi/edit semua konten di sini. Komponen otomatis mengikutinya.
// =============================================================

export const SITE = {
  /** Nama brand/logo di navigasi & preloader */
  brand: "ANANG ISMAIL",
  /** Domain portofolio (sementara: konvensi lowercase Vercel; koreksi setelah deploy) */
  url: "https://anang-ismail-portfolio.vercel.app",
  /** Title tab browser */
  title: "Anang Ismail — Sky Pixel Portfolio",
} as const;

// ── Profil ────────────────────────────────────────────────────
export const PROFILE = {
  name: "Anang Ismail",
  role: "Creative Developer & Game Programmer",
  /** Foto profil About — kosongkan ("") untuk memakai avatar pixel bawaan */
  photo: "/profile.jpeg",
  /** Tagline di Hero (deskripsi dalam Bahasa Indonesia; nama/label tetap Inggris) */
  tagline:
    "Mahasiswa Teknik Informatika yang membangun antarmuka interaktif, merancang sistem game Roblox, dan menelusuri dunia Data Science.",
  /** Paragraf di section About — satu string per paragraf */
  bio: [
    "Sebagai mahasiswa Teknik Informatika, saya fokus merancang antarmuka yang intuitif dan ekspresif — mengubah ide menjadi pengalaman digital interaktif dengan penekanan pada kejelasan, emosi, dan kemudahan penggunaan.",
    "Pekerjaan saya membentang dari pengembangan front-end, desain sistem game Roblox dengan Luau, hingga proyek eksplorasi Data Science. Saya senang membangun sistem yang bukan hanya fungsional, tetapi juga menarik dan bermakna untuk diinteraksikan — memadukan logika teknis dengan penceritaan yang kreatif.",
  ],
} as const;

// ── Skills — 3 kartu (referensi): title + desc + tags ─────────────
export const SKILL_GROUPS = [
  {
    title: "Front-End Dev",
    desc: "Interfaces that feel alive and intentional.",
    tags: ["React JS", "Tailwind CSS", "HTML / CSS"],
  },
  {
    title: "Game Worlds · Roblox",
    desc: "Game worlds engineered from scratch.",
    tags: ["Luau", "Roblox Studio", "DataStore"],
  },
  {
    title: "Data Science",
    desc: "Turning raw data into meaningful patterns.",
    tags: ["Python", "Pandas / NumPy", "Machine Learning"],
  },
] as const;

// ── Pengalaman ────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    role: "Roblox Games & Interactive Web",
    meta: "2026",
    desc: "Menerbitkan beberapa game Roblox sambil terus mengembangkan situs web interaktif modern dengan konsep UI futuristik, sistem animasi, dan pengalaman pengguna eksperimental.",
  },
  {
    role: "AI Analysis Project & First Websites",
    meta: "2025",
    desc: "Mulai membangun proyek AI berbasis Python berfokus pada analisis lari atlet. Mengembangkan website awal, termasuk proyek edukasi seputar tanaman bunga matahari dan layout web interaktif.",
  },
  {
    role: "IoT Fish Feeding Automation",
    meta: "2024",
    desc: "Mengembangkan sistem pakan ikan otomatis berbasis komunikasi IoT MQTT — integrasi sensor, logika penjadwalan, dan pemantauan perangkat real-time untuk riset akademik.",
  },
] as const;

export interface Project {
  id: string;
  kind: "game" | "general";
  title: string;
  category: string;
  description: string;
  technologies: string[];
  /** URL gambar visual — kosongkan ("") untuk placeholder grid + nomor */
  image: string;
  /** Link detail/demo — kosongkan ("") bila belum ada */
  href: string;
  /** featured = tampil di Home + halaman /projects; false = hanya di /projects */
  featured: boolean;
}

export const projects: Project[] = [
  // ══════════════════ ZONA GAME ══════════════════
  {
    id: "project-01",
    kind: "game",
    title: "Terminal Hacker",
    category: "Game Development",
    description:
      "Simulasi cyber security di Roblox dengan interaksi ala terminal dan sistem modular — gameplay terinspirasi reconnaissance, privilege escalation, encryption, dan vulnerability analysis.",
    technologies: ["Luau", "DataStore", "GUI System", "OOP"],
    image:
      "https://tr.rbxcdn.com/180DAY-670d033741a01b5ad07b1e8672be64ce/768/432/Image/Png/noFilter",
    href: "https://www.roblox.com/id/games/105731922583962/Terminal-Hacker",
    featured: true,
  },
  {
    id: "project-02",
    kind: "game",
    title: "Test Typing",
    category: "Game Development",
    description:
      "Prototipe permainan ketik di Roblox — fokus pada typing flow, feedback sistem, dan polishing mekanik. Status: BETA.",
    technologies: ["Luau", "Roblox Studio"],
    image: "",
    href: "",
    featured: true,
  },
  // ══════════════════ ZONA UMUM ══════════════════
  {
    id: "project-03",
    kind: "general",
    title: "FloraID",
    category: "AI · Web App",
    description:
      "Aplikasi identifikasi bunga berbasis AI untuk klasifikasi 102 spesies bunga Oxford dari gambar yang diunggah — confidence scores, alternatif prediksi, visualisasi GradCAM, galeri spesies, favorit, riwayat prediksi, dan UI bilingual.",
    technologies: ["Next.js", "TypeScript", "TensorFlow", "FastAPI"],
    image: "https://personal-portofolio-tan-ten.vercel.app/asset/floraid.png",
    href: "https://floraid.vercel.app/",
    featured: true,
  },
  {
    id: "project-04",
    kind: "general",
    title: "FSA Atom Notation Simulator",
    category: "Tools · Science",
    description:
      "Simulator finite state automaton untuk validasi notasi atom dan rumus senyawa — transisi state bertahap, character tape, tabel transisi, validasi isotop, tabel periodik, visualisasi model atom Bohr, sketsa molekul 2D, batch validation, riwayat, dan dark mode.",
    technologies: ["HTML", "CSS", "JavaScript", "FSA"],
    image: "https://personal-portofolio-tan-ten.vercel.app/asset/fsa-atom.png",
    href: "https://fsa-atom-notation-simulator.vercel.app/",
    featured: false,
  },
  {
    id: "project-05",
    kind: "general",
    title: "The Flowers",
    category: "Interactive Story",
    description:
      "Pengalaman web storytelling slice-of-life interaktif dengan desain karakter, pemetaan hubungan, dan antarmuka frontend yang imersif.",
    technologies: ["HTML5", "CSS3", "Vanilla JS"],
    image:
      "https://personal-portofolio-tan-ten.vercel.app/asset/TheFlowers.png",
    href: "https://the-flowers-story.vercel.app/",
    featured: false,
  },
  {
    id: "project-06",
    kind: "general",
    title: "Sunflower Balance",
    category: "Dashboard",
    // TODO: ganti "" dengan URL screenshot asli bila sudah ada.
    description:
      "Dashboard analisis irigasi interaktif untuk tanaman bunga matahari — pemantauan neraca air, analisis stres, dan visualisasi data yang responsif.",
    technologies: ["HTML", "Tailwind CSS", "JavaScript"],
    image: "",
    href: "https://sunflower-balance.vercel.app/",
    featured: true,
  },
  {
    id: "project-07", // sesuaikan urutan id di portofolio kamu
    kind: "general",
    title: "KKN Rancamanyar",
    category: "Website",
    description:
      "Website profil kelompok KKN di Rancamanyar — menampilkan informasi kegiatan dan dokumentasi program kerja, dilengkapi admin panel untuk mengelola konten secara real-time.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    image: "",
    href: "https://kkn-rancamanyar.vercel.app/",
    featured: false,
  },
  {
    id: "project-08", // sesuaikan urutan id di portofolio kamu
    kind: "general",
    title: "Perelek RW",
    category: "Dashboard",
    description:
      "Website digitalisasi kas warga untuk program perelek (gotong-royong mingguan) tingkat RW — dashboard transparansi publik real-time dan panel admin untuk mencatat pengumpulan, penjualan beras, dan pengeluaran per RT.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    image: "",
    href: "https://perelek.vercel.app/",
    featured: true,
  },
  {
    id: "project-09", // sesuaikan urutan id di portofolio kamu
    kind: "general",
    title: "TwoMate Studio",
    category: "Company Profile",
    description:
      "Website company profile bertema pixel art/retro untuk studio game development — menampilkan portofolio game, profil tim, lowongan kerja, dan kontak, dengan animasi scroll interaktif ala arcade.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    image: "",
    href: "https://website-twomate.vercel.app/",
    featured: true,
  },
];

// ── Kontak ────────────────────────────────────────────────────
export const CONTACT = {
  email: "anangismail57@gmail.com",
  /** { label, href } — href "#" bila belum punya link */
  links: [
    { label: "EMAIL", href: "mailto:anangismail57@gmail.com" },
    { label: "GITHUB", href: "https://github.com/AkzAkr" },
    {
      label: "LINKEDIN",
      href: "https://www.linkedin.com/in/anang-ismail-2b326a409",
    },
    {
      label: "ROBLOX",
      href: "https://www.roblox.com/users/9690392018/profile",
    },
  ],
  /** Teks footer */
  footer: "© 2026 Anang Ismail — Dibuat di dalam dunia piksel ini.",
} as const;
