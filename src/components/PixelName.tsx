/*
 * The TONYD lettering from Tony's pixel avatar, rebuilt on an 8-row grid.
 * In the hero the avatar itself takes the place of the O.
 */
const LETTERS: Record<string, string[]> = {
  T: [
    "########",
    "########",
    "...##...",
    "...##...",
    "...##...",
    "...##...",
    "...##...",
    "...##...",
  ],
  O: [
    ".######.",
    "########",
    "##....##",
    "##....##",
    "##....##",
    "##....##",
    "########",
    ".######.",
  ],
  N: [
    "##....##",
    "###...##",
    "####..##",
    "##.##.##",
    "##..####",
    "##...###",
    "##....##",
    "##....##",
  ],
  Y: [
    "##....##",
    "##....##",
    ".##..##.",
    "..####..",
    "...##...",
    "...##...",
    "...##...",
    "...##...",
  ],
  D: [
    "######..",
    "#######.",
    "##...###",
    "##....##",
    "##....##",
    "##...###",
    "#######.",
    "######..",
  ],
};

const WORD = "TONYD";
const GAP = 1;
const SIZE = 8;
const WIDTH = WORD.length * SIZE + (WORD.length - 1) * GAP;

/* Horizontal runs keep the SVG small: one rect per run of filled cells. */
function runs(letter: string, offset: number) {
  const rects: { x: number; y: number; w: number }[] = [];
  LETTERS[letter].forEach((row, y) => {
    let start = -1;
    for (let x = 0; x <= row.length; x++) {
      if (row[x] === "#" && start < 0) start = x;
      if (row[x] !== "#" && start >= 0) {
        rects.push({ x: offset + start, y, w: x - start });
        start = -1;
      }
    }
  });
  return rects;
}

export function PixelName({
  withAvatar = false,
  className,
}: {
  withAvatar?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${WIDTH} ${SIZE}`}
      aria-hidden="true"
      focusable="false"
      shapeRendering="crispEdges"
      preserveAspectRatio="xMidYMid meet"
    >
      {WORD.split("").map((letter, index) => {
        const offset = index * (SIZE + GAP);
        if (letter === "O" && withAvatar)
          return (
            <image
              key={index}
              className="pixel-avatar"
              href="./images/avatar.webp"
              x={offset}
              y={0}
              width={SIZE}
              height={SIZE}
              preserveAspectRatio="xMidYMid slice"
            />
          );
        return (
          <g key={index} className="pixel-letter" style={{ ["--i" as string]: index }}>
            {runs(letter, offset).map((rect) => (
              <rect
                key={`${rect.x}-${rect.y}`}
                x={rect.x}
                y={rect.y}
                width={rect.w}
                height={1}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}
