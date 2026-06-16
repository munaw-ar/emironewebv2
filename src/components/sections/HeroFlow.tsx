import { useEffect, useRef } from 'react';

/**
 * The hero's signature background motion: the journey from cold emails to
 * booked calls. Faint, semi-transparent "email" particles stream out from
 * behind the stat row, converge into the story panel (the system), and emerge
 * from its far side as bright green "booked calls" that collect on a calendar
 * node with a live counter.
 *
 * It measures the live DOM (the [data-flow-source] stats block and the
 * [data-flow-system] panel) so the composition adapts to any layout. On narrow
 * screens (or any layout where the panel sits below the text) it falls back to
 * a calm "ambient" drift so it never looks broken. It renders nothing for
 * prefers-reduced-motion users and pauses while the tab is hidden.
 *
 * Pure canvas, GPU-light, pointer-events: none. No layout impact.
 */

type Props = {
  /** 'auto' = flow on wide 2-column layouts, ambient otherwise. 'ambient' forces the calm variant. */
  variant?: 'auto' | 'ambient';
};

const GREEN = '#0D5C38';
const MINT = '#34D399';

export default function HeroFlow({ variant = 'auto' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement as HTMLElement | null;
    const ctx = canvas.getContext('2d');
    if (!parent || !ctx) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Resolved fresh on every measure() so the backing store tracks the live
    // device pixel ratio. Browser zoom changes devicePixelRatio, so a value
    // captured once would leave us upscaling a stale low-res bitmap (the blur).
    // Ceiling of 3 keeps Retina + moderate zoom razor-sharp without paying for
    // the quadratic pixel cost of unbounded ratios.
    const dprOf = () => Math.min(window.devicePixelRatio || 1, 3);
    let W = 0;
    let H = 0;
    let mode: 'flow' | 'ambient' = 'ambient';
    let geo: {
      srcXa: number; srcXb: number; srcYa: number; srcYb: number;
      inX: number; outX: number; midY: number;
      bookX: number; bookY: number;
    } | null = null;

    type Dot = { x: number; y: number; r: number; sp: number; life: number; conv?: boolean; dead?: boolean; counted?: boolean };
    let emails: Dot[] = [];
    let booked: Dot[] = [];
    let rings: { x: number; y: number; r: number; a: number }[] = [];
    let count = 0; // true arrivals
    let shown = 0; // displayed count, eased toward `count` one tick at a time
    let lastTick = 0;
    let raf = 0;
    let last = performance.now();
    let acc = 0;

    const rr = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };

    function pickMode() {
      // Flow only where there's genuine room for panel + booked-output zone
      // (large laptops and up). Everything else gets the clean ambient drift.
      const wide = window.matchMedia('(min-width: 1240px)').matches;
      mode = variant === 'ambient' || !wide ? 'ambient' : 'flow';
    }

    function measure() {
      pickMode();
      const pr = parent!.getBoundingClientRect();
      W = pr.width;
      H = pr.height;
      const dpr = dprOf();
      canvas!.width = Math.max(1, Math.round(W * dpr));
      canvas!.height = Math.max(1, Math.round(H * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (mode === 'flow') {
        const srcEl = document.querySelector('[data-flow-source]');
        const sysEl = document.querySelector('[data-flow-system]');
        const src = srcEl?.getBoundingClientRect();
        const sys = sysEl?.getBoundingClientRect();
        if (src && sys && sys.width > 0) {
          const midY = (sys.top + sys.bottom) / 2 - pr.top;
          const inX = sys.left - pr.left; // panel left edge (intake)
          // emails originate from a band on the LEFT of the stat row and stream
          // rightward into the panel; clamp the band so it always sits left of intake.
          const srcLeft = src.left - pr.left;
          let srcXa = srcLeft + src.width * 0.04;
          let srcXb = srcLeft + src.width * 0.32;
          srcXb = Math.min(srcXb, inX - 60);
          srcXa = Math.min(srcXa, srcXb - 40);
          geo = {
            srcXa,
            srcXb,
            srcYa: src.top - pr.top - 6,
            srcYb: src.bottom - pr.top + 6,
            inX,
            outX: sys.right - pr.left, // panel right edge (output)
            midY,
            bookX: Math.min(W - 34, sys.right - pr.left + 92),
            bookY: midY,
          };
        } else {
          mode = 'ambient';
          geo = null;
        }
      } else {
        geo = null;
      }
    }

    // ---- flow composition ----
    function stepFlow(dt: number) {
      if (!geo) return;
      acc += dt;
      while (acc > 95) {
        const y = geo.srcYa + Math.random() * (geo.srcYb - geo.srcYa);
        const x = geo.srcXa + Math.random() * (geo.srcXb - geo.srcXa);
        emails.push({ x, y, r: 1.4 + Math.random() * 1, sp: 0.5 + Math.random() * 0.45, life: 1 });
        acc -= 95;
      }
      ctx!.clearRect(0, 0, W, H);

      // faint intake guide (funnel toward the panel)
      const srcXc = (geo.srcXa + geo.srcXb) / 2;
      ctx!.strokeStyle = 'rgba(13,92,56,0.04)';
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(srcXc, geo.srcYa);
      ctx!.lineTo(geo.inX, geo.midY);
      ctx!.moveTo(srcXc, geo.srcYb);
      ctx!.lineTo(geo.inX, geo.midY);
      ctx!.stroke();

      // emails: stats -> panel intake
      for (const e of emails) {
        const prog = (e.x - geo.srcXa) / Math.max(geo.inX - geo.srcXa, 1);
        const aimY = geo.midY + (e.y - geo.midY) * Math.min(Math.max(1 - prog, 0), 1) * 0.85;
        e.y += (aimY - e.y) * 0.05;
        e.x += e.sp * dt * 0.12;
        if (e.x >= geo.inX - 2) {
          if (Math.random() < 0.24) booked.push({ x: geo.outX, y: geo.midY + (Math.random() * 22 - 11), r: 2.1, sp: 0, life: 1 });
          e.dead = true;
        }
        ctx!.globalAlpha = Math.max(e.life, 0) * 0.36;
        ctx!.fillStyle = 'rgba(70,90,80,1)';
        ctx!.beginPath();
        ctx!.arc(e.x, e.y, e.r, 0, 7);
        ctx!.fill();
      }
      emails = emails.filter((e) => !e.dead && e.x < geo!.inX + 4);

      // intake glow
      const g = ctx!.createRadialGradient(geo.inX, geo.midY, 0, geo.inX, geo.midY, 24);
      g.addColorStop(0, 'rgba(52,211,153,0.16)');
      g.addColorStop(1, 'rgba(52,211,153,0)');
      ctx!.globalAlpha = 1;
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.arc(geo.inX, geo.midY, 24, 0, 7);
      ctx!.fill();

      // booked: panel output -> calendar node
      for (const b of booked) {
        b.x += (geo.bookX - b.x) * 0.05;
        b.y += (geo.bookY - b.y) * 0.05;
        if (!b.counted && Math.abs(b.x - geo.bookX) < 4 && Math.abs(b.y - geo.bookY) < 4) {
          b.counted = true;
          b.dead = true;
          count++;
          rings.push({ x: geo.bookX, y: geo.bookY, r: 4, a: 0.85 });
        }
        ctx!.globalAlpha = 0.9;
        ctx!.fillStyle = MINT;
        ctx!.beginPath();
        ctx!.arc(b.x, b.y, b.r, 0, 7);
        ctx!.fill();
        ctx!.globalAlpha = 0.25;
        ctx!.beginPath();
        ctx!.arc(b.x, b.y, b.r + 3, 0, 7);
        ctx!.fill();
      }
      booked = booked.filter((b) => !b.dead);

      drawBookedNode(geo.bookX, geo.bookY, true);
    }

    // ---- ambient composition (narrow screens): purely atmospheric ----
    // Faint motes drift up across the hero; a few turn green and dissolve, a
    // quiet echo of the email→booked story. No node or counter that could
    // collide with the dense mobile text.
    function stepAmbient(dt: number) {
      acc += dt;
      while (acc > 340) {
        emails.push({ x: Math.random() * W, y: H + 8, r: 1.1 + Math.random() * 0.9, sp: 0.4 + Math.random() * 0.4, life: 1 });
        acc -= 340;
      }
      ctx!.clearRect(0, 0, W, H);
      for (const e of emails) {
        e.x += e.sp * dt * 0.04; // gentle drift right
        e.y -= e.sp * dt * 0.06; // rise
        if (!e.conv && e.y < H * 0.5 && Math.random() < 0.008) e.conv = true;
        if (e.conv) e.life -= 0.012; // green ones quietly fade out
        ctx!.globalAlpha = Math.max(e.life, 0) * (e.conv ? 0.5 : 0.16);
        ctx!.fillStyle = e.conv ? MINT : 'rgba(80,100,90,1)';
        ctx!.beginPath();
        ctx!.arc(e.x, e.y, e.r, 0, 7);
        ctx!.fill();
      }
      emails = emails.filter((e) => e.life > 0 && e.y > -10 && e.x < W + 10);
    }

    function drawBookedNode(bx: number, by: number, label: boolean) {
      ctx!.globalAlpha = 1;
      ctx!.strokeStyle = GREEN;
      ctx!.lineWidth = 1.5;
      rr(bx - 12, by - 11, 24, 22, 4);
      ctx!.stroke();
      ctx!.strokeStyle = MINT;
      ctx!.beginPath();
      ctx!.moveTo(bx - 5.5, by - 11);
      ctx!.lineTo(bx - 5.5, by - 15);
      ctx!.moveTo(bx + 5.5, by - 11);
      ctx!.lineTo(bx + 5.5, by - 15);
      ctx!.stroke();
      for (const k of rings) {
        k.r += 1.5;
        k.a -= 0.03;
        ctx!.globalAlpha = Math.max(k.a, 0);
        ctx!.strokeStyle = MINT;
        ctx!.lineWidth = 1.2;
        ctx!.beginPath();
        ctx!.arc(k.x, k.y, k.r, 0, 7);
        ctx!.stroke();
      }
      rings = rings.filter((k) => k.a > 0);
      ctx!.globalAlpha = 1;
      ctx!.fillStyle = GREEN;
      ctx!.textAlign = 'center';
      ctx!.font = '600 11px "JetBrains Mono", monospace';
      ctx!.fillText((shown % 99).toString().padStart(2, '0'), bx, by + 27);
      if (label) {
        ctx!.font = '500 8.5px "JetBrains Mono", monospace';
        ctx!.fillText('CALLS BOOKED', bx, by + 38);
      }
    }

    function frame(now: number) {
      const dt = Math.min(now - last, 40);
      last = now;
      // ease the displayed count up one at a time, no faster than ~1 / 700ms,
      // so it reads as a deliberate, believable tally rather than a racing number.
      if (shown < count && now - lastTick > 700) {
        shown++;
        lastTick = now;
      }
      if (mode === 'flow') stepFlow(dt);
      else stepAmbient(dt);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    measure();
    start();

    const ro = new ResizeObserver(() => measure());
    ro.observe(parent);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);

    // Re-measure the instant the device pixel ratio changes (browser zoom, or
    // the window moving between a Retina and a standard display). matchMedia on
    // the current resolution fires once when it stops matching; we re-arm it
    // each time so the backing store is always rebuilt at full sharpness.
    let dprMql: MediaQueryList | null = null;
    const onDprChange = () => {
      measure();
      watchDpr();
    };
    function watchDpr() {
      dprMql = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      dprMql.addEventListener('change', onDprChange, { once: true });
    }
    watchDpr();

    return () => {
      stop();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      dprMql?.removeEventListener('change', onDprChange);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      // z-index:-1 paints above the section's background glow but behind page
      // content, so no host page needs its content re-stacked.
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}
    />
  );
}
