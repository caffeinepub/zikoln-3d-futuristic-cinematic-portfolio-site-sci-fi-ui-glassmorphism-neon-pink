import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useReducedMotion } from '../../utils/reducedMotion';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="absolute w-[600px] h-[600px] opacity-30"
          style={{
            transform: reducedMotion ? 'none' : `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <img
            src="/assets/generated/hero-shapes.dim_1920x1080.png"
            alt=""
            className="w-full h-full object-contain animate-[spin_20s_linear_infinite]"
            style={{ animationPlayState: reducedMotion ? 'paused' : 'running' }}
          />
        </div>
        <div
          className="absolute w-[800px] h-[800px] opacity-20"
          style={{
            transform: reducedMotion ? 'none' : `translate(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <img
            src="/assets/generated/holo-grid.dim_2048x2048.png"
            alt=""
            className="w-full h-full object-contain animate-[spin_30s_linear_infinite_reverse]"
            style={{ animationPlayState: reducedMotion ? 'paused' : 'running' }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-[float_3s_ease-in-out_infinite]">
          ZIKOLN
        </h1>
        <p className="text-3xl md:text-4xl font-semibold text-pink-300 mb-4">
          Graphic Designer
        </p>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Graphic Design × Motion × Visual Storytelling
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            onClick={scrollToPortfolio}
            size="lg"
            className="relative px-8 py-6 text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:shadow-[0_0_50px_rgba(236,72,153,0.8)] transition-all duration-300 animate-[float_2s_ease-in-out_infinite]"
          >
            Explore Portfolio
          </Button>
          <Button
            onClick={scrollToContact}
            size="lg"
            variant="outline"
            className="relative px-8 py-6 text-lg border-2 border-pink-400 text-pink-300 hover:bg-pink-500/20 shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] transition-all duration-300 animate-[float_2.5s_ease-in-out_infinite]"
          >
            Hire Me
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-pink-400/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-pink-400 rounded-full animate-[scroll_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
