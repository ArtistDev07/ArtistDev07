import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import { EXTENSION_ASSETS } from '../extensionAssets';

export interface SelectedWorkItem {
  id: string;
  num: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  route: string;
  repoUrl: string;
  highlights: string[];
  techStack: string[];
}

export interface LandingPageProps {
  onNavigate?: (path: string) => void;
  className?: string;
}

const FEATURED_WORKS: SelectedWorkItem[] = [];
void EXTENSION_ASSETS;

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, className = '' }) => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [selectedWork, setSelectedWork] = useState<SelectedWorkItem | null>(null);

  useEffect(() => {
    if (!selectedWork) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedWork(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedWork]);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className={`landing-page-root min-h-screen bg-[var(--bg,#0a0a0b)] text-[var(--ink,#f4f1ea)] ${className}`}>
      {/* Top Navigation Bar */}
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

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 pt-28 pb-16">
        <div className="font-mono text-xs md:text-sm tracking-widest text-[var(--mid,#8d8b86)] mb-6">
          [ 00 / ARTISTDEV07 DIGITAL STUDIO ]
        </div>
        <h1 className="font-['Inter_Tight',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.95] max-w-6xl mb-8">
          CRAFT IN MOTION.
        </h1>
        <p className="font-mono text-sm md:text-base text-[#b4b1a8] max-w-2xl leading-relaxed">
          Autonomous systems, real-time WebGL spatial physics, and editorial web experiences engineered by{' '}
          <strong className="text-[var(--ink,#f4f1ea)] font-medium">ARTISTDEV07</strong>.
        </p>

        <div className="mt-12 flex flex-wrap gap-4 font-mono text-xs tracking-wider">
          <a
            href="/work"
            onClick={(e) => handleNav(e, '/work')}
            className="border border-[var(--ink,#f4f1ea)] bg-[var(--ink,#f4f1ea)] text-[var(--bg,#0a0a0b)] px-6 py-3 font-semibold hover:bg-transparent hover:text-[var(--ink,#f4f1ea)] transition-all"
          >
            EXPLORE SELECTED WORKS ↗
          </a>
          <a
            href="/credentials"
            onClick={(e) => handleNav(e, '/credentials')}
            className="border border-[var(--line,rgba(244,241,234,0.3))] text-[var(--ink,#f4f1ea)] px-6 py-3 hover:border-[var(--ink,#f4f1ea)] transition-all"
          >
            CREDENTIALS & MERIT [35]
          </a>
        </div>
      </section>

      {/* Selected Works Showcase */}
      <section id="selected-works" className="px-6 md:px-12 py-24 border-t border-[var(--line,rgba(244,241,234,0.14))]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="font-mono text-xs tracking-widest text-[var(--mid,#8d8b86)] uppercase mb-2">
              [ 02 / SELECTED WORKS ]
            </div>
            <h2 className="text-3xl md:text-5xl font-medium font-['Inter_Tight',sans-serif] tracking-tight">
              Selected Works
            </h2>
          </div>
          <div className="font-mono text-xs text-[var(--mid,#8d8b86)] tracking-wider tabular-nums">
            SHOWCASING 06 OF 12 RELEASES
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 lg:gap-8">
          {FEATURED_WORKS.map((work) => {
            const isFallback = Boolean(failedImages[work.id]);
            return (
              <article
                key={work.id}
                className="group relative border border-[var(--line,rgba(244,241,234,0.14))] bg-[#121215] overflow-hidden flex flex-col justify-between transition-colors hover:border-[rgba(244,241,234,0.32)]"
              >
                <div>
                  <div className="px-5 py-3.5 flex items-center justify-between gap-3 font-mono text-[11px] border-b border-[var(--line,rgba(244,241,234,0.1))]">
                    <span className="text-[var(--ink,#f4f1ea)] font-medium tabular-nums shrink-0">
                      {work.num} / 06
                    </span>
                    <span className="text-[var(--mid,#8d8b86)] uppercase tracking-wider truncate">
                      {work.category}
                    </span>
                  </div>

                  <div className="aspect-[16/10] overflow-hidden relative bg-[#16161a]">
                    {isFallback ? (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#17171b] via-[#101013] to-[#1a1a1f]">
                        <svg viewBox="0 0 22 18" className="w-7 h-6 fill-[var(--ink,#f4f1ea)] opacity-70 mb-3" aria-hidden="true">
                          <path d="M11 0l11 18h-6.200L11 9.600 6.200 18H0z" />
                        </svg>
                        <div className="font-mono text-xs tracking-widest text-[var(--ink,#f4f1ea)] uppercase">
                          {work.num} · {work.title}
                        </div>
                        <div className="font-mono text-[10px] tracking-widest text-[var(--mid,#8d8b86)] uppercase mt-1">
                          {work.category}
                        </div>
                      </div>
                    ) : (
                      <img
                        src={work.image}
                        alt={`${work.title} — ${work.category}`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(work.id)}
                      />
                    )}
                  </div>

                  <div className="p-6 flex flex-col gap-3">
                    <h3 className="text-2xl font-medium font-['Inter_Tight',sans-serif] tracking-tight text-[var(--ink,#f4f1ea)] group-hover:text-white transition-colors">
                      {work.title}
                    </h3>
                    <p className="font-mono text-xs text-[#b4b1a8] leading-relaxed">
                      {work.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {work.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 border border-[var(--line,rgba(244,241,234,0.14))] text-[#d5d2cb] bg-[#0d0d10] whitespace-nowrap"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3.5 border-t border-[var(--line,rgba(244,241,234,0.1))] flex items-center justify-between gap-3 font-mono text-[11px] tracking-wider">
                    <button
                      type="button"
                      onClick={() => setSelectedWork(work)}
                      className="text-[var(--ink,#f4f1ea)] hover:text-white underline underline-offset-4 cursor-pointer whitespace-nowrap"
                    >
                      VIEW BRIEF
                    </button>
                    <a
                      href={work.route}
                      onClick={(e) => handleNav(e, work.route)}
                      className="text-[var(--mid,#8d8b86)] hover:text-[var(--ink,#f4f1ea)] transition-colors whitespace-nowrap"
                    >
                      SYSTEMS ARCHIVE ↗
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/work"
            onClick={(e) => handleNav(e, '/work')}
            className="inline-block font-mono text-xs tracking-widest border border-[var(--ink,#f4f1ea)] px-8 py-4 hover:bg-[var(--ink,#f4f1ea)] hover:text-[var(--bg,#0a0a0b)] transition-all"
          >
            VIEW FULL ARCHIVE [12 PROJECTS] ↗
          </a>
        </div>
      </section>

      {/* Case Study Quick Preview Modal */}
      {selectedWork && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="selected-work-modal-title"
          onClick={() => setSelectedWork(null)}
        >
          <div
            className="w-full max-w-3xl border border-[var(--line,rgba(244,241,234,0.2))] bg-[#111114] text-[var(--ink,#f4f1ea)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 flex items-center justify-between border-b border-[var(--line,rgba(244,241,234,0.14))] font-mono text-xs">
              <span>{selectedWork.num} · {selectedWork.category}</span>
              <button
                type="button"
                onClick={() => setSelectedWork(null)}
                aria-label="Close project brief"
                className="px-2.5 py-1 border border-[var(--line,rgba(244,241,234,0.2))] hover:bg-[var(--ink,#f4f1ea)] hover:text-[var(--bg,#0a0a0b)] transition-colors cursor-pointer"
              >
                ESC / CLOSE ✕
              </button>
            </div>
            <div className="aspect-[16/10] bg-[#16161a] overflow-hidden">
              <img
                src={selectedWork.image}
                alt={`${selectedWork.title} preview`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 md:p-8 space-y-4">
              <h3 id="selected-work-modal-title" className="text-3xl font-medium font-['Inter_Tight',sans-serif] tracking-tight">
                {selectedWork.title}
              </h3>
              <p className="font-mono text-xs md:text-sm text-[#c7c4bc] leading-relaxed">
                {selectedWork.summary}
              </p>
              <ul className="space-y-1.5 font-mono text-xs text-[#9c9991] pt-1">
                {selectedWork.highlights.map((h) => (
                  <li key={h}>— {h}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedWork.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 border border-[var(--line,rgba(244,241,234,0.18))] text-[var(--ink,#f4f1ea)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="pt-4 border-t border-[var(--line,rgba(244,241,234,0.14))] flex flex-wrap gap-3 font-mono text-xs">
                <a
                  href={selectedWork.route}
                  onClick={(e) => {
                    setSelectedWork(null);
                    handleNav(e, selectedWork.route);
                  }}
                  className="px-5 py-2.5 bg-[var(--ink,#f4f1ea)] text-[var(--bg,#0a0a0b)] font-semibold"
                >
                  EXPLORE SYSTEMS ARCHIVE ↗
                </a>
                <a
                  href={selectedWork.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 border border-[var(--line,rgba(244,241,234,0.28))] hover:border-[var(--ink,#f4f1ea)]"
                >
                  GITHUB PROFILE ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manifesto Section */}
      <section className="bg-[var(--ink,#f4f1ea)] text-[var(--bg,#0a0a0b)] px-6 md:px-16 py-28 md:py-36">
        <div className="max-w-5xl mx-auto">
          <div className="font-mono text-xs tracking-widest text-[#5c5b56] uppercase mb-8">
            [ 02 / PHILOSOPHY & CRAFT ]
          </div>
          <p className="font-['Inter_Tight',sans-serif] text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-snug">
            We believe computing interfaces should possess weight, velocity, and visceral architectural discipline.
            Every transition is mathematically considered, eliminating decorative noise in pursuit of uncompromising aesthetic rigor.
          </p>
          <div className="mt-12 flex items-center justify-between font-mono text-xs tracking-widest border-t border-[rgba(10,10,11,0.2)] pt-6">
            <span>CURATED & ENGINEERED BY ARTISTDEV07</span>
            <span>2026 CODEX</span>
          </div>
        </div>
      </section>

      {/* Site Footer with ARTISTDEV07 © 2026 Copyright Banner */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default LandingPage;
