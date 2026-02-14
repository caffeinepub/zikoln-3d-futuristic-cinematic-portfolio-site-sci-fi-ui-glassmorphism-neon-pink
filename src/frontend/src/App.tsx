import { Suspense, lazy } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import GlobalBackground from './components/visual/GlobalBackground';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ServicesSection from './components/sections/ServicesSection';
import PortfolioSection from './components/sections/PortfolioSection';
import FeaturedProjectsSection from './components/sections/FeaturedProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import ContactSection from './components/sections/ContactSection';
import FooterSection from './components/sections/FooterSection';

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-cyan-400 text-xl animate-pulse">Loading...</div>
  </div>
);

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
      <div className="relative min-h-screen overflow-x-hidden">
        <GlobalBackground />
        <Suspense fallback={<LoadingFallback />}>
          <main className="relative z-10 pointer-events-auto">
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <PortfolioSection />
            <FeaturedProjectsSection />
            <SkillsSection />
            <ContactSection />
            <FooterSection />
          </main>
        </Suspense>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
