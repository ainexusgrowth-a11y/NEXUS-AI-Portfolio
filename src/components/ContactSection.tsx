import React, { useState } from 'react';
import { Mail, Phone, ArrowRight, CheckCircle2, Copy, Check, Instagram, Twitter, Facebook, Flame } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '$10k - $25k',
    services: [] as string[],
    message: '',
  });

  const availableServices = [
    'Strategy',
    'Content Production',
    'Paid Performance',
    'AI Automation',
    'Scale',
  ];

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-20 px-6 overflow-hidden">
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-[#0066FF]/10 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] font-mono-tech text-slate-300 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                <span>INITIATION</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white mb-3">
                READY TO BUILD <br />
                <span className="text-metallic">SOMETHING EPIC?</span>
              </h2>
              <p className="text-sm text-[#A0A0AF] font-light leading-relaxed">
                Let&apos;s connect intelligence with ambition and turn your next idea into something bigger.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3">
              {/* Email */}
              <div className="glass-chrome rounded-xl p-4 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-tech text-slate-400 uppercase">DIRECT EMAIL</div>
                    <a
                      href="mailto:ai.nexusgrowth@gmail.com"
                      className="text-xs sm:text-sm font-semibold text-white hover:text-[#0066FF] transition-colors"
                    >
                      ai.nexusgrowth@gmail.com
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard('ai.nexusgrowth@gmail.com', 'email')}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
                  aria-label="Copy Email address"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="glass-chrome rounded-xl p-4 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#7C3AED]/10 border border-[#7C3AED]/30 flex items-center justify-center text-[#7C3AED]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-tech text-slate-400 uppercase">DIRECT PHONE</div>
                    <a
                      href="tel:03184600675"
                      className="text-xs sm:text-sm font-semibold text-white hover:text-[#7C3AED] transition-colors font-mono-tech"
                    >
                      03184600675
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard('03184600675', 'phone')}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
                  aria-label="Copy Phone number"
                  title="Copy phone to clipboard"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Official Social Channels */}
              <div className="pt-2">
                <div className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-widest mb-2.5">
                  OFFICIAL CHANNELS
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.instagram.com/ai.nexusgrowth/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg glass-chrome border border-white/10 text-slate-300 hover:text-white hover:border-[#FF00D4] hover:bg-[#FF00D4]/10 transition-all"
                    aria-label="Instagram"
                    title="Instagram @ai.nexusgrowth"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://x.com/nexusaigrowth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg glass-chrome border border-white/10 text-slate-300 hover:text-white hover:border-[#0066FF] hover:bg-[#0066FF]/10 transition-all"
                    aria-label="X / Twitter"
                    title="X @nexusaigrowth"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@nexus.ai25?_r=1&_t=ZS-99oQVO87Eqz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg glass-chrome border border-white/10 text-slate-300 hover:text-white hover:border-[#FF8A00] hover:bg-[#FF8A00]/10 transition-all"
                    aria-label="TikTok"
                    title="TikTok @nexus.ai25"
                  >
                    <Flame className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61594229692744"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg glass-chrome border border-white/10 text-slate-300 hover:text-white hover:border-[#0066FF] hover:bg-[#0066FF]/10 transition-all"
                    aria-label="Facebook"
                    title="Facebook NEXUS AI"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Intake Form */}
          <div className="lg:col-span-7">
            <div className="glass-chrome rounded-2xl p-6 sm:p-8 border border-white/10 relative">
              {formSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black font-display text-white">
                    SIGNAL RECEIVED.
                  </h3>
                  <p className="text-xs text-[#A0A0AF] max-w-sm mx-auto">
                    Thank you, {formData.name}. NEXUS AI has received your brief and will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        budget: '$10k - $25k',
                        services: [],
                        message: '',
                      });
                    }}
                    className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-tech uppercase text-slate-300 mb-1.5">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full bg-[#050509] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono-tech uppercase text-slate-300 mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full bg-[#050509] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-tech uppercase text-slate-300 mb-1.5">
                        Brand / Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Brand name"
                        className="w-full bg-[#050509] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono-tech uppercase text-slate-300 mb-1.5">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-[#050509] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                      >
                        <option value="$10k - $25k">$10k – $25k</option>
                        <option value="$25k - $50k">$25k – $50k</option>
                        <option value="$50k - $100k">$50k – $100k</option>
                        <option value="$100k+">$100k+ Enterprise</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-tech uppercase text-slate-300 mb-1.5">
                      Growth Vectors
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {availableServices.map((service) => {
                        const isSelected = formData.services.includes(service);
                        return (
                          <button
                            type="button"
                            key={service}
                            onClick={() => handleServiceToggle(service)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
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
                    <label className="block text-[11px] font-mono-tech uppercase text-slate-300 mb-1.5">
                      Objective
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline target milestones or bottlenecks..."
                      className="w-full bg-[#050509] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-5 rounded-xl text-xs font-bold tracking-widest uppercase text-white bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#FF00D4] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>LET&apos;S CONNECT</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
