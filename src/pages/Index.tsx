import { useScrollReveal } from '@/hooks/useScrollReveal';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import StorySection from '@/components/sections/StorySection';
import SectionEthics from '@/components/sections/SectionEthics';
import SectionOffer from '@/components/sections/SectionOffer';
import SectionDistinction from '@/components/sections/SectionDistinction';
import SectionProof from '@/components/sections/SectionProof';
import SectionCTA from '@/components/sections/SectionCTA';

export default function Index() {
  useScrollReveal();

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navigation />
      <main id="main">
        <Hero />
        <Marquee />
        <StorySection />
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
