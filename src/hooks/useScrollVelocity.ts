import { useState, useEffect, useRef } from 'react';

interface ScrollVelocityOptions {
  /** Decay rate of velocity toward 0 (0 to 1). Higher = longer glide. Default: 0.9 */
  decay?: number;
  /** Max degrees for vertical skew. Default: 1.2 deg */
  maxSkew?: number;
  /** Max vertical scale stretch/compression. Default: 0.02 (1.02 to 0.98) */
  maxStretch?: number;
  /** Sensitivity multiplier for raw velocity. Default: 0.04 */
  intensity?: number;
}

export function useScrollVelocity({
  decay = 0.88,
  maxSkew = 1.2,
  maxStretch = 0.015,
  intensity = 0.035,
}: ScrollVelocityOptions = {}) {
  const [motionStyle, setMotionStyle] = useState<{
    skewY: number;
    scaleY: number;
  }>({ skewY: 0, scaleY: 1 });

  const lastScrollY = useRef(0);
  const lastTime = useRef(0);
  const currentVelocity = useRef(0);
  const targetVelocity = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Respect user's accessibility reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    lastScrollY.current = window.scrollY;
    lastTime.current = performance.now();

    const handleScroll = () => {
      const now = performance.now();
      const currentY = window.scrollY;
      const dt = Math.max(1, now - lastTime.current);
      const deltaY = currentY - lastScrollY.current;

      // Calculate instantaneous velocity in px/ms
      const v = (deltaY / dt) * 16.67; // normalized to ~60fps frame delta
      targetVelocity.current = v;

      lastScrollY.current = currentY;
      lastTime.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth physics loop
    const updatePhysics = () => {
      // Lerp current velocity toward target velocity, and decay target velocity toward 0
      currentVelocity.current += (targetVelocity.current - currentVelocity.current) * 0.25;
      targetVelocity.current *= decay;

      // Snap to 0 when near rest
      if (Math.abs(currentVelocity.current) < 0.01 && Math.abs(targetVelocity.current) < 0.01) {
        currentVelocity.current = 0;
        targetVelocity.current = 0;
      }

      // Calculate subtle cinematic skew & scale stretch
      const rawSkew = currentVelocity.current * intensity;
      const clampedSkew = Math.max(-maxSkew, Math.min(maxSkew, rawSkew));

      const rawStretch = 1 + Math.abs(currentVelocity.current) * (intensity * 0.4);
      const clampedStretch = Math.max(1 - maxStretch, Math.min(1 + maxStretch, rawStretch));

      setMotionStyle((prev) => {
        // Prevent unnecessary state updates if values are almost identical
        if (
          Math.abs(prev.skewY - clampedSkew) < 0.01 &&
          Math.abs(prev.scaleY - clampedStretch) < 0.001 &&
          clampedSkew === 0
        ) {
          return prev;
        }
        return {
          skewY: Number(clampedSkew.toFixed(3)),
          scaleY: Number(clampedStretch.toFixed(4)),
        };
      });

      rafId.current = requestAnimationFrame(updatePhysics);
    };

    rafId.current = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [decay, maxSkew, maxStretch, intensity]);

  return motionStyle;
}
