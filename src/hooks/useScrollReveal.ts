import { useEffect } from 'react';

/**
 * Single shared scroll-reveal mechanism. Adds `is-visible` to every `.reveal`
 * element when it enters the viewport (fires once). Elements already on screen
 * at mount are revealed immediately so nothing flashes blank.
 *
 * Honors prefers-reduced-motion (CSS forces .reveal visible there anyway).
 * Call once per page, after content mounts.
 */
export function useScrollReveal() {
  useEffect(() => {
    const reveal = (el: Element) => el.classList.add('is-visible');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll<Element>('.reveal').forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) {
            reveal(e.target);
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -12% 0px' }
    );

    document.querySelectorAll<Element>('.reveal').forEach(el => {
      const { top, bottom } = el.getBoundingClientRect();
      if (top < window.innerHeight && bottom > 0) {
        reveal(el);
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);
}
