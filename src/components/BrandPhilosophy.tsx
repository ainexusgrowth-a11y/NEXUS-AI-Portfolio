import React from 'react';

export const BrandPhilosophy: React.FC = () => {
  return (
    <section className="relative py-16 md:py-20 px-6 overflow-hidden bg-gradient-to-b from-[#050509] via-[#080A14] to-[#050509]">
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-gradient-to-r from-[#0066FF]/15 via-[#FF00D4]/15 to-[#FF8A00]/15 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <div className="text-xs uppercase tracking-[0.3em] font-mono-tech text-slate-300 mb-4 inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />
          <span>PHILOSOPHY</span>
        </div>

        {/* Dramatic Kinetic Typography */}
        <div className="space-y-3">
          <div className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white/40 leading-none">
            WE DON&apos;T DO <span className="text-white">AVERAGE.</span>
          </div>

          <div className="w-16 h-0.5 mx-auto bg-gradient-to-r from-[#0066FF] via-[#7C3AED] via-[#FF00D4] to-[#FF8A00] rounded-full my-4" />

          <div className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight leading-none">
            WE BUILD <span className="text-metallic-nexus">GROWTH ENGINES.</span>
          </div>
        </div>

        <p className="mt-6 text-sm text-[#A0A0AF] max-w-xl mx-auto font-light leading-relaxed">
          NEXUS AI engineers technological and creative advantage for ambitious founders.
        </p>
      </div>
    </section>
  );
};
