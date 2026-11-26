import React, { useState } from 'react';
import Footer from './Footer';

export interface RegisterPageProps {
  onNavigate?: (path: string) => void;
  className?: string;
}

interface CommissionFormState {
  fullName: string;
  email: string;
  organization: string;
  projectType: string;
  budgetTier: string;
  timeline: string;
  brief: string;
}

const INITIAL_FORM: CommissionFormState = {
  fullName: '',
  email: '',
  organization: '',
  projectType: 'autonomous-agents',
  budgetTier: 'tier-2',
  timeline: 'q4-2026',
  brief: '',
};

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate, className = '' }) => {
  const [formData, setFormData] = useState<CommissionFormState>(INITIAL_FORM);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate registration submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className={`register-page-root min-h-screen bg-[var(--bg,#0a0a0b)] text-[var(--ink,#f4f1ea)] ${className}`}>
      {/* Persistent Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 mix-blend-difference">
        <a
          href="/"
          className="flex items-center gap-2.5 text-lg md:text-xl font-semibold tracking-wider text-[var(--ink,#f4f1ea)] no-underline focus:outline-none focus:ring-2 focus:ring-[var(--ink,#f4f1ea)]"
          onClick={(e) => handleNav(e, '/')}
          aria-label="ARTISTDEV07 Home"
        >
          <svg viewBox="0 0 22 18" className="w-5 h-4 fill-current">
            <path d="M11 0l11 18h-6.200L11 9.600 6.200 18H0z" />
          </svg>
          <span>ARTISTDEV07</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest" aria-label="Main Navigation">
          <a href="/work" onClick={(e) => handleNav(e, '/work')} className="hover:text-[var(--mid,#8d8b86)] transition-colors">
            WORK
          </a>
          <a href="/credentials" onClick={(e) => handleNav(e, '/credentials')} className="hover:text-[var(--mid,#8d8b86)] transition-colors">
            CREDENTIALS
          </a>
          <a href="/about" onClick={(e) => handleNav(e, '/about')} className="hover:text-[var(--mid,#8d8b86)] transition-colors">
            ABOUT
          </a>
          <a href="/contact" onClick={(e) => handleNav(e, '/contact')} className="hover:text-[var(--mid,#8d8b86)] transition-colors">
            CONTACT
          </a>
        </nav>

        <a
          href="/contact"
          onClick={(e) => handleNav(e, '/contact')}
          className="font-mono text-xs tracking-widest border border-[var(--line,rgba(244,241,234,0.2))] px-4 py-2 hover:bg-[var(--ink,#f4f1ea)] hover:text-[var(--bg,#0a0a0b)] transition-all"
        >
          LET'S TALK
        </a>
      </header>

      {/* Main Commission Registration Layout */}
      <main className="px-6 md:px-12 pt-32 pb-24 max-w-5xl mx-auto">
        <div className="font-mono text-xs tracking-widest text-[var(--mid,#8d8b86)] mb-4">
          [ 03 / PROJECT COMMISSION & COLLABORATION REGISTRATION ]
        </div>

        <h1 className="font-['Inter_Tight',sans-serif] text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight mb-6">
          COMMISSION REGISTRATION.
        </h1>

        <p className="font-mono text-sm text-[#b4b1a8] max-w-2xl leading-relaxed mb-12">
          Submit project parameters for direct review by <strong className="text-[var(--ink,#f4f1ea)] font-medium">ARTISTDEV07</strong>.
          We collaborate with early-stage pioneers, tech accelerators, and creative studios.
        </p>

        {isSubmitted ? (
          <div className="border border-[var(--line,rgba(244,241,234,0.2))] bg-[#141417] p-8 md:p-12">
            <div className="font-mono text-xs tracking-widest text-emerald-400 mb-2">
              [ TRANSMISSION CONFIRMED ]
            </div>
            <h2 className="text-2xl md:text-3xl font-medium font-['Inter_Tight',sans-serif] mb-4">
              Registration Received.
            </h2>
            <p className="font-mono text-xs md:text-sm text-[#b4b1a8] leading-relaxed mb-8">
              Thank you, {formData.fullName}. Your project inquiry has been queued for evaluation.
              ARTISTDEV07 reviews briefs within 48 business hours.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setFormData(INITIAL_FORM);
              }}
              className="font-mono text-xs tracking-widest border border-[var(--ink,#f4f1ea)] px-6 py-3 hover:bg-[var(--ink,#f4f1ea)] hover:text-[var(--bg,#0a0a0b)] transition-all"
            >
              SUBMIT ANOTHER BRIEF ↗
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="border border-[var(--line,rgba(244,241,234,0.14))] bg-[#111114] p-6 md:p-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block font-mono text-xs tracking-widest text-[var(--mid,#8d8b86)] uppercase mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name or organization"
                  className="w-full bg-[#18181c] border border-[var(--line,rgba(244,241,234,0.14))] text-[var(--ink,#f4f1ea)] px-4 py-3 font-mono text-xs focus:outline-none focus:border-[var(--ink,#f4f1ea)]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-mono text-xs tracking-widest text-[var(--mid,#8d8b86)] uppercase mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full bg-[#18181c] border border-[var(--line,rgba(244,241,234,0.14))] text-[var(--ink,#f4f1ea)] px-4 py-3 font-mono text-xs focus:outline-none focus:border-[var(--ink,#f4f1ea)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="organization" className="block font-mono text-xs tracking-widest text-[var(--mid,#8d8b86)] uppercase mb-2">
                  Company / Studio / Initiative
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Enter your company or organization"
                  className="w-full bg-[#18181c] border border-[var(--line,rgba(244,241,234,0.14))] text-[var(--ink,#f4f1ea)] px-4 py-3 font-mono text-xs focus:outline-none focus:border-[var(--ink,#f4f1ea)]"
                />
              </div>

              <div>
                <label htmlFor="projectType" className="block font-mono text-xs tracking-widest text-[var(--mid,#8d8b86)] uppercase mb-2">
                  Discipline / Scope
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full bg-[#18181c] border border-[var(--line,rgba(244,241,234,0.14))] text-[var(--ink,#f4f1ea)] px-4 py-3 font-mono text-xs focus:outline-none focus:border-[var(--ink,#f4f1ea)]"
                >
                  <option value="autonomous-agents">Autonomous AI Systems & Agents</option>
                  <option value="spatial-webgl">Interactive WebGL & 3D Shaders</option>
                  <option value="editorial-frontend">High-Fidelity Editorial Frontend</option>
                  <option value="fullstack-system">Full-Stack Cloud Architecture</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="budgetTier" className="block font-mono text-xs tracking-widest text-[var(--mid,#8d8b86)] uppercase mb-2">
                  Target Budget Scope
                </label>
                <select
                  id="budgetTier"
                  name="budgetTier"
                  value={formData.budgetTier}
                  onChange={handleChange}
                  className="w-full bg-[#18181c] border border-[var(--line,rgba(244,241,234,0.14))] text-[var(--ink,#f4f1ea)] px-4 py-3 font-mono text-xs focus:outline-none focus:border-[var(--ink,#f4f1ea)]"
                >
                  <option value="tier-1">$5,000 – $10,000 (Rapid Prototype / Sprint)</option>
                  <option value="tier-2">$10,000 – $25,000 (Production MVP / Full Build)</option>
                  <option value="tier-3">$25,000+ (Enterprise / Spatial System)</option>
                </select>
              </div>

              <div>
                <label htmlFor="timeline" className="block font-mono text-xs tracking-widest text-[var(--mid,#8d8b86)] uppercase mb-2">
                  Target Launch Schedule
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full bg-[#18181c] border border-[var(--line,rgba(244,241,234,0.14))] text-[var(--ink,#f4f1ea)] px-4 py-3 font-mono text-xs focus:outline-none focus:border-[var(--ink,#f4f1ea)]"
                >
                  <option value="immediate">Immediate (Next 2-4 Weeks)</option>
                  <option value="q4-2026">Q4 2026 (Standard Window)</option>
                  <option value="q1-2027">Q1 2027 (Long-Range Project)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="brief" className="block font-mono text-xs tracking-widest text-[var(--mid,#8d8b86)] uppercase mb-2">
                Project Overview & Functional Brief *
              </label>
              <textarea
                id="brief"
                name="brief"
                required
                rows={5}
                value={formData.brief}
                onChange={handleChange}
                placeholder="Describe your vision, core functional requirements, and target timeline..."
                className="w-full bg-[#18181c] border border-[var(--line,rgba(244,241,234,0.14))] text-[var(--ink,#f4f1ea)] p-4 font-mono text-xs leading-relaxed focus:outline-none focus:border-[var(--ink,#f4f1ea)] resize-y"
              />
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--line,rgba(244,241,234,0.08))]">
              <div className="font-mono text-[11px] text-[var(--mid,#8d8b86)]">
                DISPATCH DIRECTLY TO ARTISTDEV07
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto font-mono text-xs tracking-widest border border-[var(--ink,#f4f1ea)] bg-[var(--ink,#f4f1ea)] text-[var(--bg,#0a0a0b)] px-8 py-3.5 font-semibold hover:bg-transparent hover:text-[var(--ink,#f4f1ea)] transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'TRANSMITTING...' : 'DISPATCH COMMISSION BRIEF ↗'}
              </button>
            </div>
          </form>
        )}
      </main>

      {/* Persistent Footer with ARTISTDEV07 © 2026 Copyright Banner */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default RegisterPage;
