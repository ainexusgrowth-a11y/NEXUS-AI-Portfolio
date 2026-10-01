import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface NexusSymbol3DProps {
  className?: string;
  scrollY?: number;
}

export const NexusSymbol3D: React.FC<NexusSymbol3DProps> = ({ className = '', scrollY = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const coreGroupRef = useRef<THREE.Group | null>(null);
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7;

    // WebGL Renderer optimized for mobile & desktop performance
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile, // Disable MSAA on mobile for speed
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    // Limit pixel ratio to 1.5 to keep GPU usage low on high-res phones
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Main Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);
    coreGroupRef.current = coreGroup;

    // Materials
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xeeeeff,
      metalness: 0.95,
      roughness: 0.15,
    });

    const darkTitaniumMaterial = new THREE.MeshStandardMaterial({
      color: 0x111322,
      metalness: 0.9,
      roughness: 0.25,
    });

    // 1. Central Faceted Crystal Core
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const coreMesh = new THREE.Mesh(coreGeo, chromeMaterial);
    coreGroup.add(coreMesh);

    // Inner wireframe glow
    const wireGeo = new THREE.IcosahedronGeometry(1.28, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // 2. Intersecting Nexus Rings
    const ring1Geo = new THREE.TorusGeometry(2.1, 0.045, 16, isMobile ? 48 : 80);
    const ring1 = new THREE.Mesh(ring1Geo, chromeMaterial);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.35, 0.04, 16, isMobile ? 48 : 80);
    const ring2 = new THREE.Mesh(ring2Geo, darkTitaniumMaterial);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 3;
    coreGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(2.6, 0.035, 16, isMobile ? 48 : 80);
    const ring3 = new THREE.Mesh(ring3Geo, chromeMaterial);
    ring3.rotation.y = Math.PI / 2.5;
    ring3.rotation.x = Math.PI / 5;
    coreGroup.add(ring3);

    // 3. Stardust Particles (reduced count on mobile)
    const particleCount = isMobile ? 60 : 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0x0066ff),
      new THREE.Color(0x7c3aed),
      new THREE.Color(0xff00d4),
      new THREE.Color(0xff8a00),
      new THREE.Color(0xffffff),
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 2.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(0x0a0c16, 2.5);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x0066ff, 10, 16);
    blueLight.position.set(4, 3, 4);
    scene.add(blueLight);

    const violetLight = new THREE.PointLight(0x7c3aed, 8, 16);
    violetLight.position.set(-4, -2, 3);
    scene.add(violetLight);

    const goldLight = new THREE.PointLight(0xff8a00, 6, 16);
    goldLight.position.set(3, -4, 2);
    scene.add(goldLight);

    // Mouse listener (desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationRef.current = {
        x: y * 0.35,
        y: x * 0.35,
      };
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Intersection Observer to PAUSE rendering when scrolled out of view
    // This provides massive battery and performance savings on phones!
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Only render if element is visible on screen!
      if (!isVisibleRef.current) return;

      const elapsedTime = clock.getElapsedTime();

      if (coreGroup) {
        coreGroup.rotation.y += 0.0035;
        coreGroup.rotation.x = Math.sin(elapsedTime * 0.4) * 0.06 + targetRotationRef.current.x * 0.2;

        ring1.rotation.z += 0.005;
        ring2.rotation.y -= 0.006;
        ring3.rotation.x += 0.004;

        coreMesh.rotation.y -= 0.002;
        wireMesh.rotation.y += 0.004;

        particles.rotation.y = elapsedTime * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update rotation based on scroll depth
  useEffect(() => {
    if (coreGroupRef.current && isVisibleRef.current) {
      const scrollFactor = scrollY * 0.0015;
      coreGroupRef.current.position.y = -scrollY * 0.0006;
      coreGroupRef.current.rotation.y += scrollFactor * 0.04;
    }
  }, [scrollY]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none pointer-events-none lg:pointer-events-auto touch-pan-y ${className}`}
      aria-label="Interactive 3D Metallic NEXUS AI Core Symbol"
    />
  );
};
