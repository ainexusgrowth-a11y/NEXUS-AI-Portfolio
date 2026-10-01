import React, { useState } from 'react';
import { Search, Compass, Palette, Cpu, Rocket } from 'lucide-react';

interface Step {
  num: string;
  title: string;
  headline: string;
  summary: string;
  accentColor: string;
  icon: React.ElementType;
}

const steps: Step[] = [
  {
    num: '01',
    title: 'DISCOVER',
    headline: 'Understand the brand.',
    summary: 'Auditing positioning, data, audience intent, unit economics, and competitive whitespace.',
    accentColor: '#0066FF',
    icon: Search,
  },
  {
    num: '02',
    title: 'STRATEGIZE',
    headline: 'Build the growth strategy.',
    summary: 'Formulating acquisition architecture, budget pacing, and generative media roadmap.',
    accentColor: '#7C3AED',
    icon: Compass,
  },
  {
    num: '03',
    title: 'CREATE',
    headline: 'Develop content and campaigns.',
    summary: 'High-fidelity multimodal asset synthesis and multi-variant creative testing.',
    accentColor: '#FF00D4',
    icon: Palette,
  },
  {
    num: '04',
    title: 'AUTOMATE',
    headline: 'Connect AI and workflows.',
    summary: 'Deploying autonomous bid engines, lead routing, CRM intelligence, and live attribution.',
    accentColor: '#FF8A00',
    icon: Cpu,
  },
  {
    num: '05',
    title: 'SCALE',
    headline: 'Optimize and grow.',
    summary: 'Continuous machine learning tuning and compounded revenue acceleration.',
    accentColor: '#FFD700',
    icon: Rocket,
  },
];

export const ProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="relative py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-white/[0.08]">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] font-mono-tech text-slate-300 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
              <span>METHODOLOGY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
              FROM IDEA <span className="text-metallic-nexus">→ IMPACT</span>
            </h2>
          </div>
          <p className="mt-2 sm:mt-0 text-xs text-[#A0A0AF] max-w-sm">
            5-phase growth cycle translating ambition into measurable commercial results.
          </p>
        </div>

        {/* Compact 5-Step Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, idx) => {
            const isActive = idx === activeStep;
            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`glass-chrome rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'border-white/30 bg-[#0d1020]/90 shadow-[0_0_25px_rgba(124,58,237,0.2)]'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: `${step.accentColor}15`,
                        border: `1px solid ${step.accentColor}40`,
                      }}
                    >
                      <step.icon className="w-4 h-4" style={{ color: step.accentColor }} />
                    </div>
                    <span className="text-base font-black font-display text-white/40">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-display text-white mb-0.5">
                    {step.title}
                  </h3>
                  <div
                    className="text-xs font-semibold mb-2"
                    style={{ color: step.accentColor }}
                  >
                    {step.headline}
                  </div>
                  <p className="text-[11px] text-[#A0A0AF] leading-relaxed">
                    {step.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
