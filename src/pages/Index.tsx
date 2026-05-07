import { useEffect } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import SectionProblem from '@/components/sections/SectionProblem';
import SectionHowWeWork from '@/components/sections/SectionHowWeWork';
import SectionEthics from '@/components/sections/SectionEthics';
import SectionOffer from '@/components/sections/SectionOffer';
import SectionDistinction from '@/components/sections/SectionDistinction';
import SectionProof from '@/components/sections/SectionProof';
import SectionCTA from '@/components/sections/SectionCTA';

export default function Index() {
  useEffect(() => {
    const reveal = (el: Element) => el.classList.add('is-visible');

    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { reveal(e.target); observer.unobserve(e.target); }
      }),
      { threshold: 0 }
    );

    document.querySelectorAll<Element>('.reveal').forEach(el => {
      const { top, bottom } = el.getBoundingClientRect();
      // Already on screen — mark visible immediately so nothing flashes blank
      if (top < window.innerHeight && bottom > 0) {
        reveal(el);
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navigation />
      <main id="top">
        <Hero />
        <SectionProblem />
        <SectionHowWeWork />
        <SectionEthics />
        <SectionOffer />
        <SectionDistinction />
        <SectionProof />
        <SectionCTA />
      </main>
      <Footer />
    </>
  );
}
