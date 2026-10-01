import { useState, useEffect } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import { CursorGlow } from './components/CursorGlow';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { NexusStatement } from './components/NexusStatement';
import { NexusEngineServices } from './components/NexusEngineServices';
import { CaseStudies } from './components/CaseStudies';
import { LeadershipSection } from './components/LeadershipSection';
import { ProcessTimeline } from './components/ProcessTimeline';
import { BrandPhilosophy } from './components/BrandPhilosophy';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { useScrollVelocity } from './hooks/useScrollVelocity';

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Cinematic scroll velocity reaction hook
  const { skewY, scaleY } = useScrollVelocity({
    maxSkew: 1.1,
    maxStretch: 0.012,
    intensity: 0.03,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050509] text-[#A0A0AF] overflow-x-hidden selection:bg-[#7C3AED]/40 selection:text-white">
      {/* Living Cosmic Parallax Background */}
      <CosmicBackground scrollY={scrollY} />

      {/* Futuristic Trailing Cursor Glow */}
      <CursorGlow />

      {/* Fixed Top Navigation Bar */}
      <Navbar onOpenProjectModal={() => setIsProjectModalOpen(true)} />

      {/* Main Streamlined Experience with Dynamic Cinematic Motion Velocity */}
      <main
        className="relative z-10 origin-center transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(0, 0, 0) skewY(${skewY}deg) scaleY(${scaleY})`,
        }}
      >
        {/* 01 — Cinematic Hero with 3D Metallic Nexus Core */}
        <HeroSection 
          scrollY={scrollY} 
          onOpenProjectModal={() => setIsProjectModalOpen(true)} 
        />

        {/* 02 — The Nexus Statement & Pillars */}
        <NexusStatement scrollY={scrollY} />

        {/* 03 — The Nexus Engine (Orbiting Services) */}
        <NexusEngineServices 
          scrollY={scrollY}
          onOpenProjectModal={() => setIsProjectModalOpen(true)}
        />

        {/* 04 — Selected Archive / Case Studies (Compact Tabbed Showcase) */}
        <CaseStudies />

        {/* 05 — Leadership (Founder Aima, Partners Mahnoor & Hamna — No Pictures) */}
        <LeadershipSection />

        {/* 06 — Process Timeline (Idea to Impact) */}
        <ProcessTimeline />

        {/* 07 — Brand Philosophy */}
        <BrandPhilosophy />

        {/* 08 — Contact / Initiation */}
        <ContactSection />
      </main>

      {/* 09 — Global Footer */}
      <Footer />

      {/* Interactive Project Intake Drawer / Modal */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </div>
  );
}
