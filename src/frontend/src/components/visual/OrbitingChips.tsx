import { useReducedMotion } from '../../utils/reducedMotion';

const skills = ['Photoshop', 'Illustrator', 'After Effects', 'Figma', 'Cinema 4D', 'Blender'];

export default function OrbitingChips() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 pointer-events-none">
      {skills.map((skill, index) => {
        const angle = (index / skills.length) * 360;
        const radius = 180;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <div
            key={skill}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              animation: reducedMotion ? 'none' : `float ${3 + index * 0.5}s ease-in-out infinite`,
              animationDelay: `${index * 0.2}s`,
            }}
          >
            <div className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-sm">
              <span className="text-cyan-300 text-sm font-medium">{skill}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
