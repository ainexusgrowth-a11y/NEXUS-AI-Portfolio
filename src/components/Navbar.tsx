import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  onOpenProjectModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenProjectModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Philosophy', href: '#statement' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  // Subtle web audio ambient chime generator on sound toggle
  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, ctx.currentTime); // 432Hz harmonic tone
        osc.frequency.exponentialRampToValueAtTime(864, ctx.currentTime + 0.6);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.3);
      } catch {
        // audio context fallback
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050509]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="group relative flex items-center gap-2 text-xl font-extrabold tracking-wider font-display"
        >
          <span className="text-white group-hover:text-white transition-colors">NEXUS</span>
          <span className="text-metallic-nexus font-light">AI</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF] shadow-[0_0_8px_#0066FF] animate-pulse" />
        </a>

        {/* Zone 2: 4–6 nav links, 1–2 word labels */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#A0A0AF] hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gradient-to-r after:from-[#0066FF] after:via-[#7C3AED] after:to-[#FF8A00] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1–2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Ambient sound toggle */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Turn on subtle ambient sound' : 'Mute ambient sound'}
            className="p-2.5 text-[#A0A0AF] hover:text-white rounded-lg transition-colors border border-white/5 hover:border-white/15 bg-white/[0.02]"
            title={isMuted ? 'Cosmic Frequency: Muted' : 'Cosmic Frequency: 432Hz Active'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#0066FF]" />}
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenProjectModal}
            className="relative group overflow-hidden px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white rounded-lg bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#FF00D4] p-[1px] transition-all duration-300 hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] whitespace-nowrap shrink-0"
          >
            <span className="block px-4 py-2 rounded-[7px] bg-[#080A12] transition-colors group-hover:bg-transparent">
              <span className="flex items-center gap-1.5">
                Start a Project
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#0066FF] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080A12]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4 text-base">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/80 hover:text-white py-2 border-b border-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-white py-2 border-b border-white/5 transition-colors"
            >
              Contact
            </a>
          </nav>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenProjectModal();
            }}
            className="w-full py-3.5 text-center text-xs font-semibold tracking-wider uppercase text-white rounded-lg bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#FF8A00]"
          >
            Start a Project
          </button>
        </div>
      )}
    </header>
  );
};
