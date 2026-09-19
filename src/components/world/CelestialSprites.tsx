"use client";

/** Blok pixel: [x, y, width, height, fill, opacity?] di grid 0..16 */
type Bloc = [number, number, number, number, string, number?];

function Grid({ blocs }: { blocs: Bloc[] }) {
  return (
    <g>
      {blocs.map(([x, y, w, h, fill, opacity], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={w}
          height={h}
          fill={fill}
          opacity={opacity ?? 1}
        />
      ))}
    </g>
  );
}

/** Matahari pixel stepped: piringan + 8 sinar. Menemani fase day. */
export function PixelSun() {
  const CORE = "#ffd36a";
  const HI = "#ffe28a";
  const RAY = "#ffb84d";
  return (
    <svg
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <Grid
        blocs={[
          [7, 2, 2, 2, RAY],
          [7, 12, 2, 2, RAY],
          [2, 7, 2, 2, RAY],
          [12, 7, 2, 2, RAY],
          [3, 3, 2, 2, RAY],
          [11, 3, 2, 2, RAY],
          [3, 11, 2, 2, RAY],
          [11, 11, 2, 2, RAY],
          [4, 5, 8, 6, CORE],
          [5, 5, 3, 1, HI],
          [5, 6, 2, 2, HI],
        ]}
      />
    </svg>
  );
}

/** Bulan sabit pixel (buka ke kanan). Menemani fase night. */
export function PixelMoon() {
  const LIGHT = "#eaf2ff";
  const CRATER = "#c7d6ee";
  return (
    <svg
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <Grid
        blocs={[
          [3, 2, 4, 1, LIGHT],
          [2, 3, 6, 1, LIGHT],
          [1, 4, 7, 1, LIGHT],
          [1, 5, 7, 1, LIGHT],
          [1, 6, 7, 1, LIGHT],
          [2, 7, 6, 1, LIGHT],
          [3, 8, 4, 1, LIGHT],
          [2, 5, 1, 1, CRATER],
          [4, 6, 1, 1, CRATER],
        ]}
      />
    </svg>
  );
}

/**
 * Kepala meteor / bintang jatuh (tanpa ekor). Ekor dibuat dinamis oleh ghost
 * (data-ghost) yang di-stagger GSAP saat scroll — bukan gambar jadi yang digeser.
 */
export function PixelMeteor() {
  const HEAD = "#ffffff";
  const GLOW = "#d9f4ff";
  return (
    <svg
      viewBox="0 0 8 8"
      shapeRendering="crispEdges"
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <Grid
        blocs={[
          // pendar silang tipis (simetris, agar arah jatuh ditentukan x/y GSAP)
          [2, 3, 1, 1, GLOW, 0.45],
          [5, 3, 1, 1, GLOW, 0.45],
          [3, 2, 1, 1, GLOW, 0.45],
          [3, 5, 1, 1, GLOW, 0.45],
          // kepala terang
          [3, 3, 2, 2, HEAD, 1],
        ]}
      />
    </svg>
  );
}