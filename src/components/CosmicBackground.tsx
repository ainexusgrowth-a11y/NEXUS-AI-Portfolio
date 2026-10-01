import React, { useEffect, useRef } from 'react';

interface CosmicBackgroundProps {
  scrollY: number;
}

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  baseAlpha: number;
  color: string;
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ scrollY }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const isMobile = width < 768;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Color palette for cosmic stars & particles
    const starColors = [
      '#ffffff',
      '#0066FF',
      '#7C3AED',
      '#FF00D4',
      '#FF8A00',
      '#FFD700',
      '#dbeafe',
    ];

    // Mobile has fewer stars for butter-smooth framerate
    const starCount = isMobile ? 45 : 120;
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 2.5 + 0.8,
      size: Math.random() * 1.5 + 0.4,
      baseAlpha: Math.random() * 0.6 + 0.3,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }));

    let animationId: number;
    let time = 0;
    let isTabVisible = true;

    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      animationId = requestAnimationFrame(render);
      if (!isTabVisible) return;

      time += 0.012;

      // Base space background
      ctx.fillStyle = '#050509';
      ctx.fillRect(0, 0, width, height);

      // Shifting Nebula Cloud Layers
      const scrollProgress = Math.min(1, Math.max(0, scrollY / 3000));

      // Nebula 1 (Blue/Violet)
      const neb1X = width * 0.3 + Math.sin(time * 0.3) * 60;
      const neb1Y = height * 0.35 + Math.cos(time * 0.25) * 50;
      const grad1 = ctx.createRadialGradient(neb1X, neb1Y, 10, neb1X, neb1Y, width * 0.5);

      const r1 = Math.round(0 + scrollProgress * 150);
      const g1 = Math.round(102 - scrollProgress * 60);
      const b1 = Math.round(255 - scrollProgress * 30);
      grad1.addColorStop(0, `rgba(${r1}, ${g1}, ${b1}, 0.09)`);
      grad1.addColorStop(0.7, 'rgba(124, 58, 237, 0.03)');
      grad1.addColorStop(1, 'rgba(5, 5, 9, 0)');

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Nebula 2 (Magenta/Gold)
      const neb2X = width * 0.75 + Math.cos(time * 0.3) * 60;
      const neb2Y = height * 0.65 + Math.sin(time * 0.35) * 50;
      const grad2 = ctx.createRadialGradient(neb2X, neb2Y, 20, neb2X, neb2Y, width * 0.55);

      grad2.addColorStop(0, 'rgba(255, 0, 212, 0.07)');
      grad2.addColorStop(0.6, 'rgba(255, 138, 0, 0.03)');
      grad2.addColorStop(1, 'rgba(5, 5, 9, 0)');

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Draw Parallax Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const parallaxY = (star.y - (scrollY * 0.12) / star.z) % height;
        const finalY = parallaxY < 0 ? parallaxY + height : parallaxY;
        const finalX = (star.x + time * (1 / star.z) * 2.5) % width;
        const alpha = Math.max(0.15, star.baseAlpha + Math.sin(time * 1.5 + i) * 0.2);

        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(finalX, finalY, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [scrollY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
