import React, { useEffect, useState } from 'react';

export const CursorGlow: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on devices with fine pointer (mouse/trackpad)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let reqId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const updateLoop = () => {
      // Smooth interpolation for subtle lag
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      setPosition({ x: currentX, y: currentY });
      reqId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    reqId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(reqId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-40 transition-opacity duration-300 transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      aria-hidden="true"
    >
      {/* Soft chromatic aura */}
      <div className="w-80 h-80 rounded-full bg-gradient-to-tr from-[#0066FF]/10 via-[#7C3AED]/15 to-[#FF00D4]/10 blur-3xl" />
      {/* Central pinpoint dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/70 shadow-[0_0_8px_#ffffff]" />
    </div>
  );
};
