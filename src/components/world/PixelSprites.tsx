"use client";

const CELL = 8;

/** Burung pixel 2-frame (sayap atas / bawah). Flap via cross-fade opacity. */
export function PixelBird({ color = "#6f61b3" }: { color?: string }) {
  const wingUp = [
    "....X...",
    "...XXX.",
    ".XXXXXX",
    "...X...",
  ];
  const wingDown = [
    "...X...",
    ".XXXXXX",
    "...XXX.",
    "....X...",
  ];

  const render = (rows: string[]) => (
    <g fill={color}>
      {rows.map((row, y) =>
        row.split("").map((c, x) =>
          c === "X" ? (
            <rect key={`${y}-${x}`} x={x * CELL} y={y * CELL} width={CELL} height={CELL} />
          ) : null
        )
      )}
    </g>
  );

  return (
    <svg
      viewBox={`0 0 ${7 * CELL} ${4 * CELL}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <g className="bird-frame-up">{render(wingUp)}</g>
      <g className="bird-frame-down" opacity={0}>
        {render(wingDown)}
      </g>
    </svg>
  );
}