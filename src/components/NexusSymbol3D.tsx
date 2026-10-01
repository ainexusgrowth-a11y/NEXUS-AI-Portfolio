import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface NexusSymbol3DProps {
  className?: string;
  scrollY?: number;
}

export const NexusSymbol3D: React.FC<NexusSymbol3DProps> = ({ className = '', scrollY = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const coreGroupRef = useRef<THREE.Group | null>(null);
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    // WebGL Renderer with transparency & high pixel ratio
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
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
      metalness: 0.96,
      roughness: 0.12,
      envMapIntensity: 1.5,
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

    // 2. Intersecting Nexus Rings (Torus)
    const ring1Geo = new THREE.TorusGeometry(2.1, 0.045, 32, 120);
    const ring1 = new THREE.Mesh(ring1Geo, chromeMaterial);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.35, 0.04, 32, 120);
    const ring2 = new THREE.Mesh(ring2Geo, darkTitaniumMaterial);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 3;
    coreGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(2.6, 0.035, 32, 120);
    const ring3 = new THREE.Mesh(ring3Geo, chromeMaterial);
    ring3.rotation.y = Math.PI / 2.5;
    ring3.rotation.x = Math.PI / 5;
    coreGroup.add(ring3);

    // 3. Orbiting Nodes (The Nexus Vertices)
    const nodeGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const nodeColors = [0x0066ff, 0x7c3aed, 0xff00d4, 0xff8a00, 0xffd700];
    const nodes: THREE.Mesh[] = [];

    nodeColors.forEach((color, i) => {
      const nodeMat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.8,
        metalness: 0.8,
        roughness: 0.2,
      });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (i / nodeColors.length) * Math.PI * 2;
      node.position.set(Math.cos(angle) * 2.1, Math.sin(angle) * 2.1, 0);
      ring1.add(node);
      nodes.push(node);
    });

    // 4. Stardust Particles around the Core
    const particleCount = 200;
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
      const radius = 2.4 + Math.random() * 2.2;
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
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    // 5. Signature Lighting System
    const ambientLight = new THREE.AmbientLight(0x0a0c16, 2.5);
    scene.add(ambientLight);

    // Electric Blue Key Light
    const blueLight = new THREE.PointLight(0x0066ff, 12, 20);
    blueLight.position.set(4, 3, 4);
    scene.add(blueLight);

    // Violet Accent Light
    const violetLight = new THREE.PointLight(0x7c3aed, 10, 20);
    violetLight.position.set(-4, -2, 3);
    scene.add(violetLight);

    // Magenta Rim Light
    const magentaLight = new THREE.PointLight(0xff00d4, 9, 20);
    magentaLight.position.set(0, 4, -3);
    scene.add(magentaLight);

    // Gold/Orange Specular Light
    const goldLight = new THREE.PointLight(0xff8a00, 8, 20);
    goldLight.position.set(3, -4, 2);
    scene.add(goldLight);

    // Subtle white directional rim
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(0, 5, 5);
    scene.add(dirLight);

    // Mouse interaction listener
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x, y };
      targetRotationRef.current = {
        x: y * 0.45,
        y: x * 0.45,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

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

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous subtle ambient spin
      if (coreGroup) {
        coreGroup.rotation.y += 0.004;
        coreGroup.rotation.x = Math.sin(elapsedTime * 0.4) * 0.08 + targetRotationRef.current.x * 0.3;
        coreGroup.rotation.z = Math.cos(elapsedTime * 0.3) * 0.05;

        // Interactive mouse ease
        coreGroup.rotation.y += targetRotationRef.current.y * 0.015;

        // Individual orbital ring speeds
        ring1.rotation.z += 0.006;
        ring2.rotation.y -= 0.007;
        ring3.rotation.x += 0.005;

        // Core facet shimmer
        coreMesh.rotation.y -= 0.002;
        coreMesh.rotation.x += 0.003;
        wireMesh.rotation.y += 0.005;

        // Stardust slow breath
        particles.rotation.y = elapsedTime * 0.03;
        particles.rotation.z = Math.sin(elapsedTime * 0.2) * 0.1;

        // Orbiting lights motion
        blueLight.position.x = Math.sin(elapsedTime * 0.8) * 4.5;
        blueLight.position.z = Math.cos(elapsedTime * 0.8) * 4.5;
        magentaLight.position.y = Math.cos(elapsedTime * 0.6) * 4;
        goldLight.position.x = Math.cos(elapsedTime * 0.7) * 4;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update rotation based on scroll depth
  useEffect(() => {
    if (coreGroupRef.current) {
      const scrollFactor = scrollY * 0.002;
      coreGroupRef.current.position.y = -scrollY * 0.0008;
      coreGroupRef.current.rotation.y += scrollFactor * 0.05;
      coreGroupRef.current.scale.setScalar(Math.max(0.7, 1 - scrollY * 0.0003));
    }
  }, [scrollY]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none pointer-events-auto ${className}`}
      aria-label="Interactive 3D Metallic NEXUS AI Core Symbol"
    />
  );
};
