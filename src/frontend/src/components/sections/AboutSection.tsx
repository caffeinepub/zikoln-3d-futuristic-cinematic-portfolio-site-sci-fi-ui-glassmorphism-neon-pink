import GlassPanel from '../visual/GlassPanel';
import OrbitingChips from '../visual/OrbitingChips';

export default function AboutSection() {
  return (
    <section className="py-32 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          <OrbitingChips />
          <GlassPanel className="p-12 max-w-3xl mx-auto relative z-10" neonColor="magenta">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-48 h-48 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse" />
                <img
                  src="/assets/generated/avatar-holo-frame.dim_1024x1024.png"
                  alt="ZIKOLN Avatar"
                  className="relative w-full h-full object-cover rounded-full border-4 border-pink-400/50 shadow-[0_0_40px_rgba(236,72,153,0.5)]"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  About Me
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  I'm a graphic and motion designer with over 1 year of experience. I love being creative and paying close attention to details.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  I specialize in making cool designs for different clients and projects, like Logos & Branding, Typography & Social Media Design, and Motion Graphics.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  I have mastered design tools such as Adobe Creative Suite to bring my ideas to life.
                </p>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
