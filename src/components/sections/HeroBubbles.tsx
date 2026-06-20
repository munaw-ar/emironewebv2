import type { CSSProperties } from 'react';

/**
 * Deep background layer of clear refractive "glass bubbles" for the hero —
 * the monopo Saigon atmospheric mood, adapted to Emir One's green-on-paper
 * scheme (no dark frame, no new colors; only mint/green tints already in the
 * palette). Sits behind the HeroFlow particle canvas (z-index -2 vs -1).
 *
 * Pure CSS transform animation (compositor-driven, no backdrop-filter / no
 * animated blur), so it adds effectively zero main-thread cost and stays
 * buttery. Static under prefers-reduced-motion (handled in index.css).
 * Decorative only: aria-hidden, pointer-events: none, clipped by the hero.
 */

type Bubble = { left: string; top: string; size: number; dx: string; dy: string; dur: string; delay: string };

// Curated, desynced field — varied size/position/drift; negative delays start
// each bubble mid-cycle so they never pulse in unison.
const BUBBLES: Bubble[] = [
  { left: '6%',  top: '20%', size: 230, dx: '-26px', dy: '48px',  dur: '31s', delay: '0s'   },
  { left: '72%', top: '10%', size: 165, dx: '20px',  dy: '40px',  dur: '27s', delay: '-6s'  },
  { left: '42%', top: '58%', size: 290, dx: '32px',  dy: '-52px', dur: '35s', delay: '-13s' },
  { left: '86%', top: '54%', size: 125, dx: '-18px', dy: '-36px', dur: '23s', delay: '-3s'  },
  { left: '16%', top: '74%', size: 105, dx: '24px',  dy: '-30px', dur: '25s', delay: '-9s'  },
  { left: '56%', top: '28%', size: 92,  dx: '-22px', dy: '32px',  dur: '21s', delay: '-16s' },
  { left: '30%', top: '38%', size: 72,  dx: '16px',  dy: '-24px', dur: '19s', delay: '-7s'  },
];

export default function HeroBubbles() {
  return (
    <div className="hero-bubbles" aria-hidden="true">
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="hero-bubble"
          style={{
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
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
