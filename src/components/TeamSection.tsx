import React from 'react';
import aimaImg from '../assets/images/nexus_team_aima_1790868519093.jpg';
import mahnoorImg from '../assets/images/nexus_team_mahnoor_1790868530150.jpg';
import hamnaImg from '../assets/images/nexus_team_hamna_1790868541871.jpg';

const teamMembers = [
  {
    name: 'AIMA',
    role: 'FOUNDER & CREATIVE STRATEGIST',
    quote: 'Vision, strategy and creative direction behind NEXUS AI.',
    accentColor: '#0066FF',
    image: aimaImg,
  },
  {
    name: 'MAHNOOR',
    role: 'PARTNER',
    quote: 'Building ideas, campaigns and experiences that move brands forward.',
    accentColor: '#FF00D4',
    image: mahnoorImg,
  },
  {
    name: 'HAMNA',
    role: 'PARTNER',
    quote: 'Turning strategy and creativity into systems designed for growth.',
    accentColor: '#FF8A00',
    image: hamnaImg,
  },
];

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="relative py-12 md:py-16 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Compact Section Header */}
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
            Creative vision, brand strategy, and growth systems engineered by partners.
          </p>
        </div>

        {/* 3 Visible Picture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="glass-chrome rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Picture Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
                <img
                  src={member.image}
                  alt={`${member.name} — ${member.role}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080A12] via-transparent to-transparent opacity-90" />

                <div className="absolute top-3 left-3 text-[10px] font-mono-tech uppercase tracking-widest text-slate-300 bg-black/75 px-2 py-0.5 rounded backdrop-blur-md border border-white/10">
                  NEXUS PARTNER
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 pt-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black font-display text-white tracking-wide mb-0.5">
                    {member.name}
                  </h3>
                  <div
                    className="text-[11px] font-bold font-mono-tech tracking-wider uppercase mb-2"
                    style={{ color: member.accentColor }}
                  >
                    {member.role}
                  </div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    &ldquo;{member.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono-tech text-slate-400">
                  <span>STRATEGY &amp; GROWTH</span>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: member.accentColor }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
