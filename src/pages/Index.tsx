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
    // Mark body ready so .reveal CSS kicks in only after JS is running
    document.body.classList.add('js-reveal-ready');

    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => {
      observer.disconnect();
      document.body.classList.remove('js-reveal-ready');
    };
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
