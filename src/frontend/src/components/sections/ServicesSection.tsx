import TiltCard from '../visual/TiltCard';
import GlassPanel from '../visual/GlassPanel';
import { Palette, FileText, Sparkles, Type, Film, Package } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Social Media Design',
    description: 'Eye-catching posts, stories, and campaigns that stop the scroll.',
    color: 'cyan',
  },
  {
    icon: FileText,
    title: 'Poster & Campaign',
    description: 'Bold event posters and marketing campaigns with cinematic impact.',
    color: 'purple',
  },
  {
    icon: Sparkles,
    title: 'Logo & Branding',
    description: 'Memorable brand identities with modern, futuristic aesthetics.',
    color: 'magenta',
  },
  {
    icon: Type,
    title: 'Typography',
    description: 'Custom lettering and type design that makes a statement.',
    color: 'cyan',
  },
  {
    icon: Film,
    title: 'Motion Graphics',
    description: 'Dynamic animations and video content that brings ideas to life.',
    color: 'purple',
  },
  {
    icon: Package,
    title: 'Packaging & Print',
    description: 'Premium packaging design and print materials that stand out.',
    color: 'magenta',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const neonColor = service.color as 'cyan' | 'purple' | 'magenta';
            return (
              <TiltCard key={index}>
                <GlassPanel
                  className="p-8 h-full hover:scale-105 transition-all duration-300 cursor-pointer group"
                  neonColor={neonColor}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                        neonColor === 'cyan'
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : neonColor === 'purple'
                            ? 'bg-purple-500/20 text-purple-400'
                            : 'bg-pink-500/20 text-pink-400'
                      } group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                    <p className="text-gray-400">{service.description}</p>
                  </div>
                </GlassPanel>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
