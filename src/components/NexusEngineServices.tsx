import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Layers, 
  TrendingUp, 
  Cpu, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  accentColor: string;
  icon: React.ElementType;
  deliverables: string[];
  metrics: string;
}

const services: ServiceItem[] = [
  {
    id: 'strategy',
    name: 'STRATEGY',
    tagline: 'Smart Strategy.',
    description: 'AI-powered marketing strategy built around your business goals.',
    accentColor: '#0066FF',
    icon: Compass,
    deliverables: [
      'Competitive Predictive Landscape Analysis',
      'High-Intent Audience Persona Synthesis',
      'Market Penetration Architecture',
      'Cross-Channel Velocity Roadmap'
    ],
    metrics: '3.4x Faster Strategy-to-Execution Cycle',
  },
  {
    id: 'content',
    name: 'CONTENT',
    tagline: 'Content That Connects.',
    description: 'Social content, creative campaigns, storytelling and AI-powered production.',
    accentColor: '#7C3AED',
    icon: Layers,
    deliverables: [
      'Synthetic & Studio Creative Direction',
      'High-Velocity Social Media Production',
      'Cinematic Brand Storytelling Assets',
      'Multimodal Generative Asset Pipelines'
    ],
    metrics: '12M+ Organic Social Reach Delivered',
  },
  {
    id: 'ads',
    name: 'PAID ADS',
    tagline: 'Ads That Convert.',
    description: 'Performance campaigns engineered around attention, testing and conversion.',
    accentColor: '#FF00D4',
    icon: Zap,
    deliverables: [
      'Multi-Variant Creative Stress Testing',
      'Algorithmic Real-Time Bid Optimization',
      'Omnichannel Attention Arbitrage',
      'Full-Funnel Retargeting Clusters'
    ],
    metrics: '4.8x Average Return on Ad Spend',
  },
  {
    id: 'automation',
    name: 'AUTOMATION',
    tagline: 'Automation That Scales.',
    description: 'AI workflows and automated systems designed to reduce repetitive work.',
    accentColor: '#FF8A00',
    icon: Cpu,
    deliverables: [
      'Autonomous Lead Routing & Scoring',
      'CRM Intelligence & Workflow Hooks',
      'Dynamic Content Personalization Engines',
      'Zero-Latency Client Reporting Feeds'
    ],
    metrics: '-85% Manual Operational Friction',
  },
  {
    id: 'growth',
    name: 'GROWTH',
    tagline: 'Results That Matter.',
    description: 'Data-driven optimization focused on measurable business growth.',
    accentColor: '#FFD700',
    icon: TrendingUp,
    deliverables: [
      'Predictive Conversion Rate Optimization',
      'Cohort Lifetime Value Maximization',
      'Attribution Modeling & Net Growth Loops',
      'Autonomous Scaling Thresholds'
    ],
    metrics: '+$180M Cumulative Pipeline Created',
  },
];

interface NexusEngineServicesProps {
  scrollY: number;
  onOpenProjectModal: () => void;
}

export const NexusEngineServices: React.FC<NexusEngineServicesProps> = ({ onOpenProjectModal }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);

  // Auto cycle every 4.5 seconds if user is not actively inspecting
  useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoCycling]);

  const activeService = services[activeIndex];

  return (
    <section id="services" className="relative py-16 px-6 overflow-hidden">
      {/* Dynamic ambient color glow that morphs with active service */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none transition-colors duration-1000 opacity-20"
        style={{ backgroundColor: activeService.accentColor }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/[0.08]">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] font-mono-tech text-slate-300 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
              <span>SERVICES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
              THE <span className="text-metallic-nexus">NEXUS ENGINE</span>
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-xs text-[#A0A0AF] max-w-sm font-light">
            Five synchronized growth vectors revolving around a singular AI intelligence core.
          </p>
        </div>

        {/* Desktop Circular Orbiting Core Layout (>= lg) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center min-h-[480px]">
          {/* Left/Center: The Orbiting AI Core Interactive Visualization */}
          <div className="col-span-7 relative flex items-center justify-center h-[460px]">
            {/* Outer Subtle Orbit Rings */}
            <div className="absolute w-[380px] h-[380px] rounded-full border border-white/[0.06] animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[300px] h-[300px] rounded-full border border-white/[0.08] border-dashed" />
            <div className="absolute w-[200px] h-[200px] rounded-full border border-white/[0.05]" />

            {/* Central Metallic AI Core */}
            <div className="relative z-20 w-32 h-32 rounded-full glass-chrome flex flex-col items-center justify-center p-2 text-center metallic-border shadow-[0_0_40px_rgba(0,102,255,0.2)]">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-1.5 transition-all duration-500"
                style={{ 
                  background: `radial-gradient(circle, ${activeService.accentColor} 0%, rgba(10,12,22,0.8) 100%)`,
                  boxShadow: `0 0 20px ${activeService.accentColor}80`
                }}
              >
                <activeService.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-bold tracking-widest uppercase font-display text-white">NEXUS CORE</span>
            </div>

            {/* Orbiting Service Nodes in Circular Formation */}
            {services.map((service, index) => {
              const total = services.length;
              // Angle for pentagonal distribution
              const angle = ((index - activeIndex) / total) * Math.PI * 2 - Math.PI / 2;
              const radius = 175; // orbit radius in px
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const isActive = index === activeIndex;

              return (
                <button
                  key={service.id}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsAutoCycling(false);
                  }}
                  onMouseEnter={() => setIsAutoCycling(false)}
                  className={`absolute z-30 transition-all duration-700 ease-out transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2.5 group focus:outline-none`}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? 'scale-120 shadow-[0_0_25px_rgba(255,255,255,0.3)] border-2'
                        : 'bg-[#080A12]/90 border border-white/10 opacity-70 group-hover:opacity-100 group-hover:scale-110'
                    }`}
                    style={{
                      borderColor: isActive ? service.accentColor : 'rgba(255,255,255,0.1)',
                      backgroundColor: isActive ? '#0d1124' : '#080A12',
                      boxShadow: isActive ? `0 0 25px ${service.accentColor}60` : undefined,
                    }}
                  >
                    <service.icon
                      className="w-5 h-5 transition-colors duration-300"
                      style={{ color: isActive ? service.accentColor : '#A0A0AF' }}
                    />
                  </div>

                  <div className={`text-left transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-90'}`}>
                    <div 
                      className="text-xs font-bold font-display tracking-wider"
                      style={{ color: isActive ? '#ffffff' : '#A0A0AF' }}
                    >
                      {service.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Active Service Deep Dive Panel */}
          <div className="col-span-5">
            <div className="relative glass-chrome rounded-2xl p-6 sm:p-7 border border-white/10 transition-all duration-500">
              {/* Top Accent Stripe */}
              <div 
                className="absolute top-0 left-6 right-6 h-[2px] transition-colors duration-500 rounded-full"
                style={{ backgroundColor: activeService.accentColor }}
              />

              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono-tech uppercase tracking-widest text-slate-300">
                  0{activeIndex + 1} / 05
                </span>
                <span 
                  className="text-xs font-mono-tech px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]"
                  style={{ color: activeService.accentColor }}
                >
                  {activeService.metrics}
                </span>
              </div>

              <h3 className="text-2xl font-black font-display text-white mb-1">
                {activeService.name}
              </h3>
              <div 
                className="text-sm font-medium mb-3"
                style={{ color: activeService.accentColor }}
              >
                {activeService.tagline}
              </div>

              <p className="text-xs text-[#A0A0AF] leading-relaxed mb-6">
                {activeService.description}
              </p>

              {/* Deliverables List */}
              <div className="space-y-2 mb-6 pt-4 border-t border-white/[0.08]">
                {activeService.deliverables.slice(0, 3).map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 
                      className="w-3.5 h-3.5 shrink-0" 
                      style={{ color: activeService.accentColor }} 
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action trigger */}
              <button
                onClick={onOpenProjectModal}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-white transition-all flex items-center justify-center gap-2 group"
                style={{ 
                  background: `linear-gradient(135deg, ${activeService.accentColor} 0%, #050509 100%)`,
                  border: `1px solid ${activeService.accentColor}50`
                }}
              >
                <span>Deploy {activeService.name}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Vertical Interactive Sequence (< lg) */}
        <div className="lg:hidden space-y-4">
          {services.map((service, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <div
                key={service.id}
                className={`glass-chrome rounded-2xl p-6 transition-all border ${
                  isSelected ? 'border-white/20' : 'border-white/5 opacity-80'
                }`}
                style={{
                  boxShadow: isSelected ? `0 0 25px ${service.accentColor}25` : undefined,
                }}
              >
                <button
                  onClick={() => setActiveIndex(idx)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${service.accentColor}18`,
                        border: `1px solid ${service.accentColor}40`,
                      }}
                    >
                      <service.icon className="w-5 h-5" style={{ color: service.accentColor }} />
                    </div>
                    <div>
                      <div className="text-lg font-bold font-display text-white">{service.name}</div>
                      <div className="text-xs text-slate-400">{service.tagline}</div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-slate-400 transition-transform ${isSelected ? 'rotate-90' : ''}`}
                  />
                </button>

                {isSelected && (
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-4 animate-in fade-in duration-300">
                    <p className="text-xs text-[#A0A0AF] leading-relaxed">
                      {service.description}
                    </p>
                    <div className="text-xs text-[#FFD700] font-mono-tech">
                      {service.metrics}
                    </div>
                    <div className="space-y-2">
                      {service.deliverables.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5" style={{ color: service.accentColor }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={onOpenProjectModal}
                      className="w-full mt-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      Activate {service.name}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
