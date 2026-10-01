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
  blinkSpeed: number;
  color: string;
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ scrollY }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

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

    const starCount = Math.min(220, Math.floor((width * height) / 7000));
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 3 + 0.5, // Parallax depth layer
      size: Math.random() * 1.8 + 0.4,
      baseAlpha: Math.random() * 0.7 + 0.3,
      blinkSpeed: Math.random() * 0.03 + 0.008,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }));

    let animationId: number;
    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Deep space base
      ctx.fillStyle = '#050509';
      ctx.fillRect(0, 0, width, height);

      // Dynamic Nebula Cloud Layers based on scroll & time
      // Darkness (top) -> Electric Blue -> Violet -> Magenta -> Orange/Gold
      const scrollProgress = Math.min(1, Math.max(0, scrollY / (document.body.scrollHeight - height || 4000)));

      // Primary shifting nebula 1
      const neb1X = width * 0.25 + Math.sin(time * 0.4) * 80;
      const neb1Y = height * 0.35 + Math.cos(time * 0.3) * 60;
      const grad1 = ctx.createRadialGradient(neb1X, neb1Y, 10, neb1X, neb1Y, width * 0.55);

      // Color shifts: Blue -> Violet -> Magenta
      const r1 = Math.round(0 + scrollProgress * 180);
      const g1 = Math.round(102 - scrollProgress * 70);
      const b1 = Math.round(255 - scrollProgress * 40);
      grad1.addColorStop(0, `rgba(${r1}, ${g1}, ${b1}, ${0.12 + Math.sin(time * 0.5) * 0.03})`);
      grad1.addColorStop(0.6, 'rgba(124, 58, 237, 0.04)');
      grad1.addColorStop(1, 'rgba(5, 5, 9, 0)');

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Secondary shifting nebula 2 (Right/Bottom)
      const neb2X = width * 0.75 + Math.cos(time * 0.35) * 90;
      const neb2Y = height * 0.65 + Math.sin(time * 0.45) * 70;
      const grad2 = ctx.createRadialGradient(neb2X, neb2Y, 20, neb2X, neb2Y, width * 0.6);

      // Color shifts toward Magenta & Gold
      const r2 = Math.round(124 + scrollProgress * 131);
      const g2 = Math.round(58 + scrollProgress * 80);
      const b2 = Math.round(237 - scrollProgress * 150);
      grad2.addColorStop(0, `rgba(${r2}, ${g2}, ${b2}, ${0.09 + Math.cos(time * 0.4) * 0.02})`);
      grad2.addColorStop(0.5, 'rgba(255, 0, 212, 0.03)');
      grad2.addColorStop(1, 'rgba(5, 5, 9, 0)');

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Subtle dynamic cosmic energy trail across center
      const trailGrad = ctx.createLinearGradient(0, height * 0.5, width, height * 0.5);
      trailGrad.addColorStop(0, 'rgba(0, 102, 255, 0.015)');
      trailGrad.addColorStop(0.35, 'rgba(124, 58, 237, 0.035)');
      trailGrad.addColorStop(0.7, 'rgba(255, 0, 212, 0.035)');
      trailGrad.addColorStop(1, 'rgba(255, 138, 0, 0.02)');
      ctx.fillStyle = trailGrad;
      ctx.fillRect(0, height * 0.2, width, height * 0.6);

      // Draw Parallax Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Parallax scroll reaction: depth z controls vertical speed
        const parallaxY = (star.y - (scrollY * 0.15) / star.z) % height;
        const finalY = parallaxY < 0 ? parallaxY + height : parallaxY;

        // Gentle horizontal drift
        const finalX = (star.x + time * (1 / star.z) * 3) % width;

        // Twinkle
        const alpha = Math.max(0.1, star.baseAlpha + Math.sin(time * 2 + i) * 0.25);

        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(finalX, finalY, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Extra delicate diffraction spike on brighter larger stars
        if (star.size > 1.6) {
          ctx.strokeStyle = star.color;
          ctx.globalAlpha = alpha * 0.25;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(finalX - star.size * 2.5, finalY);
          ctx.lineTo(finalX + star.size * 2.5, finalY);
          ctx.moveTo(finalX, finalY - star.size * 2.5);
          ctx.lineTo(finalX, finalY + star.size * 2.5);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Subtle fine cosmic grain overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />
    </div>
  );
};
