import React from 'react';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { NexusSymbol3D } from './NexusSymbol3D';

interface HeroSectionProps {
  scrollY: number;
  onOpenProjectModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ scrollY, onOpenProjectModal }) => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* 3D Metallic Nexus AI floating in space */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none lg:justify-end lg:pr-12 xl:pr-24">
        <div className="w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] lg:w-[640px] lg:h-[640px] xl:w-[720px] xl:h-[720px] opacity-80 lg:opacity-100 pointer-events-auto transition-transform duration-700 ease-out">
          <NexusSymbol3D scrollY={scrollY} />
        </div>
      </div>

      {/* Atmospheric ambient lighting backdrop */}
      <div 
        className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#0066FF]/10 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-[#7C3AED]/12 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl lg:max-w-2xl xl:max-w-3xl">
          {/* Subtle high-tech metadata indicator without pill box */}
          <div className="inline-flex items-center gap-3 mb-6 text-xs uppercase tracking-[0.3em] font-mono-tech text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#0066FF] shadow-[0_0_10px_#0066FF]" />
            <span className="text-white font-medium">AI-POWERED GROWTH</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">NEXT-GEN SYSTEMS</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white leading-tight mb-5 [text-wrap:balance]">
            WE DON&apos;T FOLLOW <br />
            <span className="text-metallic">THE FUTURE.</span> <br />
            <span className="text-metallic-nexus">WE BUILD IT.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-[#A0A0AF] font-light max-w-lg mb-8 leading-relaxed [text-wrap:balance]">
            AI-powered marketing systems designed to turn attention into measurable, exponential growth.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
            <a
              href="#statement"
              className="relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#FF00D4] hover:shadow-[0_0_35px_rgba(0,102,255,0.45)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
            >
              <span>EXPLORE NEXUS AI</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenProjectModal}
              className="relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-semibold tracking-wide text-white bg-[#0A0C16] border border-white/15 hover:border-white/30 hover:bg-white/[0.04] transition-all duration-300 transform hover:-translate-y-0.5 text-center"
            >
              <Sparkles className="w-4 h-4 text-[#FFD700]" />
              <span>START A PROJECT</span>
            </button>
          </div>

          {/* Quiet Trust Anchors */}
          <div className="mt-16 pt-8 border-t border-white/[0.08] grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <div className="text-xl sm:text-2xl font-bold font-display text-white tabular-nums">99.4%</div>
              <div className="text-xs text-slate-400 mt-1 font-mono-tech">AI Precision Engine</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-display text-white tabular-nums">$180M+</div>
              <div className="text-xs text-slate-400 mt-1 font-mono-tech">Pipeline Unlocked</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-display text-white tabular-nums">3.8x</div>
              <div className="text-xs text-slate-400 mt-1 font-mono-tech">Avg Return on Attention</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator prompt */}
      <a
        href="#statement"
        aria-label="Scroll down to Nexus Statement"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs tracking-widest text-slate-300 hover:text-white transition-colors uppercase font-mono-tech"
      >
        <span>SCROLL TO ENTER</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#0066FF]" />
      </a>
    </section>
  );
};
