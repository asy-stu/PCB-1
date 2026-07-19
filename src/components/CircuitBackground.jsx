const NODES = [
  [40, 60], [180, 40], [320, 90], [60, 220], [140, 260], [260, 210],
  [380, 240], [420, 60], [500, 140], [560, 60], [520, 260], [40, 340],
];
const LINES = [
  [0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [2, 5], [5, 6], [2, 7], [7, 8], [8, 9], [8, 10], [3, 11],
];

export default function CircuitBackground({ className = "", opacity = 0.35 }) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      aria-hidden="true"
    >
      {LINES.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]}
          stroke="var(--site-accent)" strokeWidth="1.2" strokeOpacity="0.55"
        />
      ))}
      {NODES.map(([x, y], i) => (
        <circle
          key={i} cx={x} cy={y} r={i % 3 === 0 ? 5 : 3.5}
          fill="var(--site-bg)" stroke="var(--site-accent)" strokeWidth="1.6"
          className={i % 2 === 0 ? "pulse-node" : ""}
        />
      ))}
    </svg>
  );
}
