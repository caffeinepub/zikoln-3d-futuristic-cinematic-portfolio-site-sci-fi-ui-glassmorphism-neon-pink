import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../utils/reducedMotion';

export default function GlobalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: { x: number; y: number; size: number; speed: number }[] = [];
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
      });
    }

    let animationId: number;

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        ctx.fillStyle = `rgba(100, 200, 255, ${Math.random() * 0.5 + 0.3})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion]);

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-b from-[#000000] via-[#0a0a1a] to-[#000814] -z-10" />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 opacity-60"
        style={{ pointerEvents: 'none' }}
      />
      <div className="fixed inset-0 bg-[url('/assets/generated/bg-starfield-grid.dim_3840x2160.png')] bg-cover bg-center opacity-10 -z-10" />
    </>
  );
}
