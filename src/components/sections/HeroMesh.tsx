import type { CSSProperties } from 'react';

/**
 * Hero mesh gradient — the monopo "Mercury Flow" living-gradient effect kept in
 * Emir One's green family. Several large, soft, green-tinted radial blobs drift
 * and cross-fade so the background reads as a slowly colour-shifting field
 * (mint → emerald → teal → sage). Transform-only animation behind a one-time
 * blur ⇒ the layer is rasterised once and GPU-composited, so it adds no real
 * main-thread cost and keeps scrolling buttery. Sits behind the particle flow
 * (z-index -2). Decorative: aria-hidden, pointer-events none, clipped by hero.
 * Static under prefers-reduced-motion (handled in index.css).
 */

type Blob = { color: string; left: string; top: string; size: string; dx: string; dy: string; dur: string; delay: string };

// Green-family blobs, desynced so the field never pulses in unison. Drift is
// brisk and wide enough that the colour shift reads clearly (not a slow creep).
const BLOBS: Blob[] = [
  { color: 'rgba(52,211,153,0.44)',  left: '-10%', top: '-18%', size: '62vw', dx: '16vw',  dy: '18vh',  dur: '15s', delay: '0s'   }, // mint
  { color: 'rgba(45,212,191,0.38)',  left: '52%',  top: '-22%', size: '58vw', dx: '-18vw', dy: '20vh',  dur: '18s', delay: '-5s'  }, // teal
  { color: 'rgba(110,231,183,0.34)', left: '18%',  top: '34%',  size: '52vw', dx: '20vw',  dy: '-15vh', dur: '21s', delay: '-9s'  }, // light emerald
  { color: 'rgba(13,92,56,0.20)',    left: '68%',  top: '38%',  size: '46vw', dx: '-16vw', dy: '-18vh', dur: '17s', delay: '-13s' }, // deep emerald
];

export default function HeroMesh() {
  return (
    <div className="hero-mesh" aria-hidden="true">
      {BLOBS.map((b, i) => (
        <span
          key={i}
          className="hero-mesh-blob"
          style={{
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle at center, ${b.color} 0%, transparent 70%)`,
            '--dx': b.dx,
            '--dy': b.dy,
            '--dur': b.dur,
            '--delay': b.delay,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
