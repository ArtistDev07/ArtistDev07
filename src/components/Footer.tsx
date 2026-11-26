import React from 'react';

export interface FooterProps {
  onNavigate?: (path: string) => void;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, className = '' }) => {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <footer className={`footer-root ${className}`} aria-label="Site Footer">
      <div className="footer-top">
        <div className="footer-status">OPEN FOR PROJECTS &amp; ROLES </div>
        <nav className="footer-sitemap" aria-label="Footer Site Map">
          <a href="/" className="footer-link" onClick={(e) => handleNav(e, '/')}>HOME</a>
          <a href="/work" className="footer-link" onClick={(e) => handleNav(e, '/work')}>WORK</a>
          <a href="/credentials" className="footer-link" onClick={(e) => handleNav(e, '/credentials')}>CREDENTIALS</a>
          <a href="/about" className="footer-link" onClick={(e) => handleNav(e, '/about')}>ABOUT</a>
          <a href="/contact" className="footer-link" onClick={(e) => handleNav(e, '/contact')}>CONTACT</a>
        </nav>
        <div className="footer-socials">
          <a href="https://github.com/ArtistDev07" target="_blank" rel="noopener noreferrer">GITHUB ↗</a>
          <a href="https://twitter.com/VisionX_07" target="_blank" rel="noopener noreferrer">TWITTER / X ↗</a>
          <a href="https://linkedin.com/in/yogesh-sharma-9312022b9" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a>
        </div>
      </div>
      <div className="footer-center">
        <a
          href="mailto:yogeshsharma9425903357@gmail.com"
          className="magnetic-btn mailto-btn"
          aria-label="Send email to ARTISTDEV07"
        >
          <span className="magnetic-text">LET'S TALK</span>
        </a>
      </div>
      <div className="footer-bottom">
        <svg
          viewBox="0 0 1440 220"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax meet"
          aria-label="ARTISTDEV07 © 2026"
        >
          <text
            x="50%"
            y="180"
            textAnchor="middle"
            fill="var(--ink, #f4f1ea)"
            fontFamily="'Inter Tight', system-ui, sans-serif"
            fontWeight="600"
            fontSize="160"
            letterSpacing="-0.04em"
          >
            ARTISTDEV07 © 2026
          </text>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
