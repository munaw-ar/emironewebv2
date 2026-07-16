import { useEffect, useRef } from 'react';
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

// Green-family blobs spanning a wide hue range (spring-green → teal/cyan →
// light emerald → deep forest) so overlap produces a dramatic colour shift.
// Fast, wide, desynced drift; lower opacity keeps the field airy and the
// headline readable.
const BLOBS: Blob[] = [
  { color: 'rgba(74,222,128,0.30)',  left: '-10%', top: '-18%', size: '62vw', dx: '22vw',  dy: '22vh',  dur: '8s',  delay: '0s'   }, // spring green
  { color: 'rgba(20,184,166,0.28)',  left: '52%',  top: '-22%', size: '58vw', dx: '-24vw', dy: '24vh',  dur: '10s', delay: '-3s'  }, // teal / cyan
  { color: 'rgba(110,231,183,0.26)', left: '18%',  top: '34%',  size: '52vw', dx: '26vw',  dy: '-20vh', dur: '11s', delay: '-6s'  }, // light emerald
  { color: 'rgba(6,78,59,0.16)',     left: '68%',  top: '38%',  size: '46vw', dx: '-22vw', dy: '-24vh', dur: '9s',  delay: '-8s'  }, // deep forest
];

export default function HeroMesh() {
  const root = useRef<HTMLDivElement>(null);

  // Only animate while the hero is on screen. Left running, four blurred layers
  // keep drifting (and stay GPU-promoted) long after they've scrolled away —
  // pure cost for something nobody can see. HeroFlow already does this.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.setAttribute('data-active', '');
        else el.removeAttribute('data-active');
      },
      { rootMargin: '120px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="hero-mesh" aria-hidden="true" ref={root}>
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
