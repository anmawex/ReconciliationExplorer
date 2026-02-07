import { useCallback } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { HighlightsSection } from '../components/HighlightsSection';
import { PricingSection } from '../components/PricingSection';
import { Footer } from '../components/Footer';

export function LandingPage() {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64; // Height of the fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onScrollTo={scrollToSection} />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HighlightsSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
