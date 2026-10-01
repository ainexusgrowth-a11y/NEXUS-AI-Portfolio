import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle, X } from 'lucide-react';

interface CaseStudy {
  id: string;
  name: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  image: string;
  accentColor: string;
  metricsBreakdown: { label: string; value: string }[];
  deliverables: string[];
}

const projects: CaseStudy[] = [
  {
    id: 'aether',
    name: 'Aether Automobili',
    industry: 'Autonomous Luxury Mobility',
    challenge: 'Launch a bespoke $2.8M electric hypercar internationally with zero legacy TV/billboard spend.',
    solution: 'Engineered a synthetic cinematography pipeline generating dynamic localized media, paired with predictive high-net-worth audience clustering.',
    result: '+340% HNW Inquiries & $42M Order Book in 90 Days',
    image: '/src/assets/images/nexus_case_automotive_1790868479995.jpg',
    accentColor: '#0066FF',
    metricsBreakdown: [
      { label: 'Inquiries', value: '+340%' },
      { label: 'Order Book', value: '$42M' },
      { label: 'CAC Efficiency', value: '4.2x' },
    ],
    deliverables: [
      'Synthetic 8K cinematic vehicle unveil renders',
      'Dynamic localized video ad engine in 8 languages',
      'Concierge lead enrichment automation'
    ]
  },
  {
    id: 'chronos',
    name: 'Chronos Quantum',
    industry: 'Haute Horlogerie & Spatial Tech',
    challenge: 'Break through crowded Swiss heritage watch marketing to capture digital-first luxury collectors.',
    solution: 'Deployed multimodal AI storyboards, macro-photorealistic spatial distribution, and algorithmic real-time bid arbitrage.',
    result: '4.8x Return on Ad Spend & 12.4M Verified Organic Views',
    image: '/src/assets/images/nexus_case_chronos_1790868493588.jpg',
    accentColor: '#FF00D4',
    metricsBreakdown: [
      { label: 'Blended ROAS', value: '4.8x' },
      { label: 'Organic Views', value: '12.4M' },
      { label: 'Time to Sold Out', value: '72 Hrs' },
    ],
    deliverables: [
      'Interactive 3D tourbillon micro-campaigns',
      'AI collector sentiment analysis',
      'Autonomous programmatic ad bid calibration'
    ]
  },
  {
    id: 'apex',
    name: 'Apex Horizon',
    industry: 'Autonomous Wealth & Fintech',
    challenge: 'Customer acquisition cost spiked 65%; enterprise inbound pipeline had plateaued.',
    solution: 'Autonomous content synthesis, institutional intelligence dossiers, and multi-touch algorithmic retargeting loops.',
    result: '-52% CAC Reduction & +190% Inbound Pipeline',
    image: '/src/assets/images/nexus_case_fintech_1790868505386.jpg',
    accentColor: '#FF8A00',
    metricsBreakdown: [
      { label: 'CAC Reduction', value: '-52%' },
      { label: 'Enterprise Pipeline', value: '+190%' },
      { label: 'LTV/CAC', value: '5.6x' },
    ],
    deliverables: [
      'Autonomous financial intelligence briefs',
      'Algorithmic account-based retargeting',
      'CRM integration with predictive lead scoring'
    ]
  },
];

export const CaseStudies: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const current = projects[activeIndex];

  return (
    <section id="work" className="relative py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-white/[0.08]">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] font-mono-tech text-slate-300 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
              <span>SELECTED ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
              BUILT TO BE <span className="text-metallic">REMEMBERED</span>
            </h2>
          </div>

          {/* Quick Segmented Project Switcher (horizontal tabs) */}
          <div className="flex items-center gap-1 mt-4 sm:mt-0 p-1 bg-white/[0.03] border border-white/10 rounded-xl overflow-x-auto">
            {projects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech transition-all whitespace-nowrap ${
                  idx === activeIndex
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                0{idx + 1} {p.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Compact Featured Showcase */}
        <div className="relative glass-chrome rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            {/* Visual Column */}
            <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-auto min-h-[300px] overflow-hidden bg-black/40">
              <img
                src={current.image}
                alt={`${current.name} Case Study`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050509] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#080A12]" />

              <div className="absolute top-4 left-4 text-xs font-mono-tech text-white bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                {current.industry}
              </div>
            </div>

            {/* Details Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#080A12]/90 backdrop-blur-xl">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono-tech text-slate-300 uppercase tracking-widest">
                    PROJECT 0{activeIndex + 1} / 03
                  </span>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="p-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all"
                    aria-label="View Full Case Dossier"
                    title="View Full Case Dossier"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black font-display text-white mb-4">
                  {current.name}
                </h3>

                <div className="space-y-3 mb-6 text-xs text-[#A0A0AF] leading-relaxed">
                  <div>
                    <span className="text-white font-semibold font-mono-tech uppercase block mb-0.5">
                      CHALLENGE:
                    </span>
                    <p>{current.challenge}</p>
                  </div>
                  <div>
                    <span className="text-white font-semibold font-mono-tech uppercase block mb-0.5">
                      SOLUTION:
                    </span>
                    <p>{current.solution}</p>
                  </div>
                </div>
              </div>

              {/* Business Impact Metric Bar */}
              <div className="pt-4 border-t border-white/[0.08]">
                <div className="text-[10px] font-mono-tech text-slate-300 uppercase mb-1">
                  BUSINESS IMPACT:
                </div>
                <div
                  className="text-base sm:text-lg font-bold font-display leading-tight"
                  style={{ color: current.accentColor }}
                >
                  {current.result}
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="mt-4 text-xs font-mono-tech text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Inspect Architecture Details</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl glass-chrome rounded-3xl border border-white/20 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Close Case Details"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-xs font-mono-tech uppercase text-slate-400 mb-1">
              {current.industry}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-white mb-4">
              {current.name}
            </h3>

            <div className="grid grid-cols-3 gap-3 mb-6 p-3 rounded-xl bg-white/[0.03] border border-white/10">
              {current.metricsBreakdown.map((m) => (
                <div key={m.label} className="text-center">
                  <div className="text-xl sm:text-2xl font-bold font-display text-white tabular-nums">
                    {m.value}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono-tech mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-xs text-[#A0A0AF] leading-relaxed mb-6">
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Objective</h4>
                <p>{current.challenge}</p>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Execution</h4>
                <p>{current.solution}</p>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-2">Deployments</h4>
                <div className="space-y-1.5">
                  {current.deliverables.map((d) => (
                    <div key={d} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(false)}
              className="w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20"
            >
              Close Dossier
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
