import React from 'react';
import { 
  Instagram, 
  Youtube, 
  Twitter, 
  Facebook, 
  Share2, 
  Flame,
  ArrowUp
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#statement' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/ai.nexusgrowth/' },
    { name: 'X / Twitter', icon: Twitter, href: 'https://x.com/nexusaigrowth' },
    { name: 'TikTok', icon: Flame, href: 'https://www.tiktok.com/@nexus.ai25?_r=1&_t=ZS-99oQVO87Eqz' },
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61594229692744' },
  ];

  return (
    <footer className="relative bg-[#050509] border-t border-white/[0.08] pt-20 pb-12 px-6 overflow-hidden">
      {/* Background ambient glow */}
      <div 
        className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-[#0066FF]/5 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black font-display tracking-wider text-white">
                NEXUS
              </span>
              <span className="text-2xl font-light text-metallic-nexus font-display">AI</span>
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-slate-300 border-l border-white/20 pl-3 py-0.5">
                MARKETING AGENCY
              </span>
            </div>

            <p className="text-sm font-light text-slate-300 tracking-wide font-display max-w-sm">
              CONNECTING INTELLIGENCE. DRIVING GROWTH.
            </p>

            <p className="text-xs text-[#A0A0AF] leading-relaxed max-w-md pt-2">
              Next-generation marketing systems engineering attention, creative resonance, and algorithmic growth for tomorrow&apos;s market leaders.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono-tech uppercase tracking-widest text-slate-300 mb-4">
              DIRECTORY
            </div>
            <ul className="space-y-2.5 text-xs text-[#A0A0AF]">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors hover:translate-x-1 inline-block duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Icons Column */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-mono-tech uppercase tracking-widest text-slate-300">
              GLOBAL PRESENCE
            </div>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#0066FF] hover:bg-gradient-to-tr hover:from-[#0066FF]/20 hover:to-[#FF00D4]/20 transition-all duration-300 group"
                >
                  <social.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>

            <div className="pt-2 text-xs font-mono-tech text-slate-300">
              DIRECT: ai.nexusgrowth@gmail.com
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-slate-300">
          <div>
            © 2026 NEXUS AI. ALL RIGHTS RESERVED.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors group"
          >
            <span>BACK TO APEX</span>
            <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
