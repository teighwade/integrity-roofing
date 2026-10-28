// A row of barrel-tile profiles: the S-curve edge of an Arizona clay tile roof, used as a section divider.
export default function TileEdge({ color = 'var(--sky)', flip = false }) {
  return (
    <div className={`tile-edge${flip ? ' tile-edge--flip' : ''}`} aria-hidden="true" style={{ '--edge': color }} />
  );
}
