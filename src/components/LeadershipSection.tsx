import React from 'react';

const leaders = [
  {
    name: 'AIMA',
    role: 'FOUNDER & CREATIVE STRATEGIST',
    quote: 'Vision, strategy and creative direction behind NEXUS AI.',
    accentColor: '#0066FF',
    badge: 'FOUNDER',
    initial: 'A',
  },
  {
    name: 'MAHNOOR',
    role: 'PARTNER',
    quote: 'Building ideas, campaigns and experiences that move brands forward.',
    accentColor: '#FF00D4',
    badge: 'PARTNER',
    initial: 'M',
  },
  {
    name: 'HAMNA',
    role: 'PARTNER',
    quote: 'Turning strategy and creativity into systems designed for growth.',
    accentColor: '#FF8A00',
    badge: 'PARTNER',
    initial: 'H',
  },
];

export const LeadershipSection: React.FC = () => {
  return (
    <section id="leadership" className="relative py-12 md:py-16 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-white/[0.08]">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] font-mono-tech text-slate-300 mb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
              <span>LEADERSHIP</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white">
              THE MINDS BEHIND <span className="text-metallic">THE MACHINE</span>
            </h2>
          </div>
          <p className="mt-2 sm:mt-0 text-xs text-[#A0A0AF] max-w-sm">
            Founder and partners connecting artificial intelligence, creative strategy, and scalable growth.
          </p>
        </div>

        {/* 3 Pure Typographic Cards — No Pictures */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className="relative glass-chrome rounded-2xl p-6 border border-white/10 hover:border-white/25 transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Metallic Monogram Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-base text-white border transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: `${leader.accentColor}15`,
                      borderColor: `${leader.accentColor}40`,
                      boxShadow: `0 0 15px ${leader.accentColor}20`,
                    }}
                  >
                    {leader.initial}
                  </div>
                  <span
                    className="text-[10px] font-mono-tech uppercase tracking-widest px-2 py-0.5 rounded border"
                    style={{
                      borderColor: `${leader.accentColor}30`,
                      color: leader.accentColor,
                      backgroundColor: `${leader.accentColor}10`,
                    }}
                  >
                    {leader.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-black font-display text-white tracking-wide mb-1">
                  {leader.name}
                </h3>
                <div
                  className="text-xs font-bold font-mono-tech tracking-wider uppercase mb-3"
                  style={{ color: leader.accentColor }}
                >
                  {leader.role}
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  &ldquo;{leader.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono-tech text-slate-400">
                <span>NEXUS AI LEADERSHIP</span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: leader.accentColor }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
