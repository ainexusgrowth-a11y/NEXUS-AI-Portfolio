import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand: '',
    budget: '$25k - $50k',
    timeline: 'Within 30 Days',
    services: [] as string[],
    notes: '',
  });

  if (!isOpen) return null;

  const servicesList = [
    'AI Marketing Strategy',
    'Creative & Multimodal Production',
    'Paid Performance Ads',
    'Autonomous Automation & Scale',
    'Custom Brand Transformation',
  ];

  const toggleService = (s: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter((item) => item !== s)
        : [...prev.services, s],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl glass-chrome rounded-3xl border border-white/20 p-6 sm:p-10 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Close Project Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-black font-display text-white">
              PROJECT INITIATED.
            </h3>
            <p className="text-sm text-[#A0A0AF] max-w-md mx-auto leading-relaxed">
              We&apos;ve received your request for <span className="text-white font-medium">{formData.brand || 'your brand'}</span>. A partner from NEXUS AI will review your requirements and reach out within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#FF8A00]"
            >
              Return to Experience
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-slate-400 mb-2">
              <Sparkles className="w-4 h-4 text-[#FFD700]" />
              <span>NEXUS AI · INTAKE PORTAL</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black font-display text-white mb-2">
              START A PROJECT
            </h3>
            <p className="text-xs sm:text-sm text-[#A0A0AF] mb-8">
              Tell us about your brand vision, target growth timeline, and primary objectives.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-tech uppercase text-slate-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full bg-[#050509] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono-tech uppercase text-slate-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full bg-[#050509] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-tech uppercase text-slate-300 mb-2">
                    Company / Brand
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="Brand name"
                    className="w-full bg-[#050509] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono-tech uppercase text-slate-300 mb-2">
                    Target Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full bg-[#050509] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                  >
                    <option value="Immediate (< 14 Days)">Immediate (&lt; 14 Days)</option>
                    <option value="Within 30 Days">Within 30 Days</option>
                    <option value="Next Quarter">Next Quarter</option>
                    <option value="Strategic Planning Only">Strategic Planning Only</option>
                  </select>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-mono-tech uppercase text-slate-300 mb-2">
                  Requested Engines
                </label>
                <div className="flex flex-wrap gap-2">
                  {servicesList.map((service) => {
                    const isSelected = formData.services.includes(service);
                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => toggleService(service)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#0066FF] to-[#7C3AED] text-white shadow-md'
                            : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white'
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-tech uppercase text-slate-300 mb-2">
                  Growth Ambition / Context
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Outline key targets, target revenue velocity, or current attention challenges..."
                  className="w-full bg-[#050509] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0066FF] resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl text-xs font-bold tracking-widest uppercase text-white bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#FF00D4] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all flex items-center justify-center gap-2 group"
                >
                  <span>SUBMIT BRIEF</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
