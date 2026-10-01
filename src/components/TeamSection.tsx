import React from 'react';

const teamMembers = [
  {
    name: 'AIMA',
    role: 'FOUNDER & CREATIVE STRATEGIST',
    quote: 'Vision, strategy and creative direction behind NEXUS AI.',
    accentColor: '#0066FF',
    initial: 'A',
  },
  {
    name: 'MAHNOOR',
    role: 'PARTNER',
    quote: 'Building ideas, campaigns and experiences that move brands forward.',
    accentColor: '#FF00D4',
    initial: 'M',
  },
  {
    name: 'HAMNA',
    role: 'PARTNER',
    quote: 'Turning strategy and creativity into systems designed for growth.',
    accentColor: '#FF8A00',
    initial: 'H',
  },
];

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="relative py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-white/[0.08]">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] font-mono-tech text-slate-300 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
              <span>LEADERSHIP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
              THE MINDS BEHIND <span className="text-metallic">THE MACHINE</span>
            </h2>
          </div>
          <p className="mt-2 sm:mt-0 text-xs text-[#A0A0AF] max-w-sm">
            Creative vision, marketing intelligence, and growth systems engineered by partners.
          </p>
        </div>

        {/* Compact Typographic Cards — No Pictures */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="relative glass-chrome rounded-2xl p-6 border border-white/10 hover:border-white/25 transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Metallic Monogram Badge */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-display font-black text-lg text-white border transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: `${member.accentColor}15`,
                      borderColor: `${member.accentColor}40`,
                      boxShadow: `0 0 15px ${member.accentColor}20`,
                    }}
                  >
                    {member.initial}
                  </div>
                  <span className="text-[10px] font-mono-tech uppercase tracking-widest text-slate-300">
                    PARTNER
                  </span>
                </div>

                <h3 className="text-2xl font-black font-display text-white tracking-wide mb-1">
                  {member.name}
                </h3>
                <div
                  className="text-xs font-bold font-mono-tech tracking-wider uppercase mb-3"
                  style={{ color: member.accentColor }}
                >
                  {member.role}
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  &ldquo;{member.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[10px] font-mono-tech text-slate-300 uppercase">NEXUS AI</span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: member.accentColor }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
