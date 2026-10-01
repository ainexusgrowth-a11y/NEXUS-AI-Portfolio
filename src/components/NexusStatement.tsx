import React from 'react';
import { Cpu, Flame, Target } from 'lucide-react';

interface NexusStatementProps {
  scrollY: number;
}

const pillars = [
  {
    title: 'AI FIRST',
    subtitle: 'Intelligence integrated into every layer of our workflow.',
    accentColor: '#0066FF',
    icon: Cpu,
  },
  {
    title: 'CREATIVE ALWAYS',
    subtitle: "Technology without creativity isn't enough.",
    accentColor: '#FF00D4',
    icon: Flame,
  },
  {
    title: 'GROWTH OBSESSED',
    subtitle: 'Everything connects back to meaningful business outcomes.',
    accentColor: '#FFD700',
    icon: Target,
  },
];

export const NexusStatement: React.FC<NexusStatementProps> = ({ scrollY }) => {
  const glowWidth = Math.min(100, Math.max(15, (scrollY / 900) * 100));

  return (
    <section id="statement" className="relative py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Index */}
        <div className="text-xs uppercase tracking-[0.3em] font-mono-tech text-slate-300 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
          <span>PHILOSOPHY & PILLARS</span>
        </div>

        {/* Enormous Metallic Typography */}
        <div className="mb-8">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-white leading-none">
            <span className="text-metallic">INTELLIGENCE. </span>
            <span className="text-metallic">CREATIVITY. </span>
            <span className="text-metallic-nexus">GROWTH.</span>
          </h2>
        </div>

        {/* Horizontal Glowing Scroll Tracker Line */}
        <div className="relative w-full h-[2px] bg-white/[0.08] my-8 overflow-hidden rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#0066FF] via-[#7C3AED] via-[#FF00D4] to-[#FF8A00] transition-all duration-300 ease-out shadow-[0_0_15px_#7C3AED]"
            style={{ width: `${glowWidth}%` }}
          />
        </div>

        {/* Core Statement */}
        <p className="text-lg sm:text-2xl text-slate-200 font-light leading-snug max-w-4xl mb-12 [text-wrap:balance]">
          We connect artificial intelligence, creative strategy, content and performance marketing to build growth systems for ambitious brands.
        </p>

        {/* Three Compact Metallic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="relative glass-chrome rounded-2xl p-6 border border-white/10 hover:border-white/25 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105"
                  style={{
                    backgroundColor: `${pillar.accentColor}15`,
                    borderColor: `${pillar.accentColor}40`,
                  }}
                >
                  <pillar.icon className="w-5 h-5" style={{ color: pillar.accentColor }} />
                </div>
                <span className="text-[10px] font-mono-tech text-slate-300">0{idx + 1}</span>
              </div>

              <h3 className="text-xl font-bold font-display text-white mb-1.5">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {pillar.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
