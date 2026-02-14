import { useInViewOnce } from '../../hooks/useInViewOnce';
import { useReducedMotion } from '../../utils/reducedMotion';
import { Progress } from '@/components/ui/progress';

const skills = [
  { name: 'Photoshop', level: 95 },
  { name: 'Illustrator', level: 90 },
  { name: 'After Effects', level: 85 },
  { name: 'Branding', level: 88 },
  { name: 'Typography', level: 92 },
];

export default function SkillsSection() {
  const { ref, isInView } = useInViewOnce();
  const reducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Skills
        </h2>

        <div className="space-y-8">
          {skills.map((skill, index) => (
            <div key={skill.name} className="group">
              <div className="flex justify-between mb-3">
                <span className="text-xl font-semibold text-white">{skill.name}</span>
                <span className="text-cyan-400 font-bold">{skill.level}%</span>
              </div>
              <div className="relative h-4 bg-white/5 rounded-full overflow-hidden border border-cyan-400/20">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full shadow-[0_0_20px_rgba(0,255,255,0.6)] transition-all duration-1000 ease-out"
                  style={{
                    width: isInView && !reducedMotion ? `${skill.level}%` : '0%',
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
