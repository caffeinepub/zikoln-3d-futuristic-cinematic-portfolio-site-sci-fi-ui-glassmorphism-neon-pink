import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  neonColor?: 'cyan' | 'purple' | 'magenta';
}

export default function GlassPanel({ children, className, neonColor = 'cyan' }: GlassPanelProps) {
  const neonColors = {
    cyan: 'shadow-[0_0_30px_rgba(0,255,255,0.3)] border-cyan-400/30',
    purple: 'shadow-[0_0_30px_rgba(168,85,247,0.3)] border-purple-400/30',
    magenta: 'shadow-[0_0_30px_rgba(236,72,153,0.3)] border-pink-400/30',
  };

  return (
    <div
      className={cn(
        'relative backdrop-blur-xl bg-white/5 border rounded-2xl',
        'before:absolute before:inset-0 before:rounded-2xl before:p-[1px]',
        'before:bg-gradient-to-br before:from-white/20 before:to-transparent',
        'before:-z-10',
        neonColors[neonColor],
        className
      )}
    >
      {children}
    </div>
  );
}
