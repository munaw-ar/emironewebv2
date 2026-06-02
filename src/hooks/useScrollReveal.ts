import { useEffect } from 'react';

/**
 * Single shared scroll-reveal mechanism. Adds `is-visible` to every `.reveal`
 * element when it enters the viewport (fires once). Elements already on screen
 * are revealed immediately so nothing flashes blank.
 *
 * Handles content that mounts AFTER the hook runs (async/data-fetched pages)
 * via a MutationObserver, so reveal elements are never left stuck at opacity 0.
 *
 * Honors prefers-reduced-motion. Call once per page, after content mounts.
 */
export function useScrollReveal() {
  useEffect(() => {
    const reveal = (el: Element) => el.classList.add('is-visible');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      const showAll = () =>
        document.querySelectorAll('.reveal:not(.is-visible)').forEach(reveal);
      showAll();
      const mo = new MutationObserver(showAll);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -12% 0px' }
    );

    const seen = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll<Element>('.reveal:not(.is-visible)').forEach(el => {
        if (seen.has(el)) return;
        seen.add(el);
        const { top, bottom } = el.getBoundingClientRect();
        if (top < window.innerHeight && bottom > 0) reveal(el);
        else io.observe(el);
      });
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
}
