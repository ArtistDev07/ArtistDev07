export type MarqueeBrandKey =
  | 'github'
  | 'linkedin'
  | 'google-cloud-ai'
  | 'microsoft'
  | 'ethereum'
  | 'aiverseui'
  | 'react'
  | 'nextjs'
  | 'typescript'
  | 'threejs'
  | 'nodejs'
  | 'fastapi'
  | 'postgresql'
  | 'vercel'
  | 'docker'
  | 'adobe-cc'
  | 'canva'
  | 'pinterest'
  | 'figma'
  | 'behance'
  | 'google-analytics'
  | 'meta'
  | 'premiere-pro'
  | 'medium'
  | 'devto'
  | 'hashnode'
  | 'substack'
  | 'google-slides'
  | 'notion'
  | 'markdown';

export interface MarqueeBrandSpec {
  key: MarqueeBrandKey;
  ariaLabel: string;
  glow: string;
}

export const WORK_MARQUEE_ITEMS: readonly MarqueeBrandSpec[] = [
  { key: 'github', ariaLabel: 'GitHub', glow: 'rgba(244, 241, 234, 0.45)' },
  { key: 'linkedin', ariaLabel: 'LinkedIn', glow: 'rgba(10, 102, 194, 0.55)' },
  { key: 'google-cloud-ai', ariaLabel: 'Google Cloud & Gemini AI', glow: 'rgba(78, 130, 238, 0.55)' },
  { key: 'microsoft', ariaLabel: 'Microsoft Learn', glow: 'rgba(0, 164, 239, 0.55)' },
  { key: 'ethereum', ariaLabel: 'Ethereum & Web3', glow: 'rgba(98, 126, 234, 0.55)' },
  { key: 'aiverseui', ariaLabel: 'AIVERSEUI Studio', glow: 'rgba(242, 86, 35, 0.55)' }
];

export const SYSTEMS_MARQUEE_ITEMS: readonly MarqueeBrandSpec[] = [
  { key: 'github', ariaLabel: 'GitHub', glow: 'rgba(244, 241, 234, 0.45)' },
  { key: 'react', ariaLabel: 'React', glow: 'rgba(97, 218, 251, 0.55)' },
  { key: 'nextjs', ariaLabel: 'Next.js', glow: 'rgba(255, 255, 255, 0.45)' },
  { key: 'typescript', ariaLabel: 'TypeScript', glow: 'rgba(49, 120, 198, 0.55)' },
  { key: 'threejs', ariaLabel: 'Three.js WebGL', glow: 'rgba(4, 158, 244, 0.55)' },
  { key: 'nodejs', ariaLabel: 'Node.js', glow: 'rgba(104, 160, 99, 0.55)' },
  { key: 'fastapi', ariaLabel: 'FastAPI', glow: 'rgba(0, 150, 136, 0.55)' },
  { key: 'postgresql', ariaLabel: 'PostgreSQL', glow: 'rgba(65, 105, 225, 0.55)' },
  { key: 'vercel', ariaLabel: 'Vercel', glow: 'rgba(255, 255, 255, 0.45)' },
  { key: 'docker', ariaLabel: 'Docker', glow: 'rgba(36, 150, 237, 0.55)' }
];

export const STUDIO_MARQUEE_ITEMS: readonly MarqueeBrandSpec[] = [
  { key: 'adobe-cc', ariaLabel: 'Adobe Creative Cloud', glow: 'rgba(255, 0, 0, 0.5)' },
  { key: 'canva', ariaLabel: 'Canva', glow: 'rgba(0, 196, 204, 0.55)' },
  { key: 'pinterest', ariaLabel: 'Pinterest', glow: 'rgba(230, 0, 35, 0.55)' },
  { key: 'figma', ariaLabel: 'Figma', glow: 'rgba(162, 89, 255, 0.55)' },
  { key: 'behance', ariaLabel: 'Behance', glow: 'rgba(23, 105, 255, 0.55)' },
  { key: 'google-analytics', ariaLabel: 'Google Analytics', glow: 'rgba(249, 171, 0, 0.55)' },
  { key: 'meta', ariaLabel: 'Meta', glow: 'rgba(0, 129, 251, 0.55)' },
  { key: 'premiere-pro', ariaLabel: 'Adobe Premiere Pro', glow: 'rgba(153, 153, 255, 0.55)' }
];

export const EDITORIAL_MARQUEE_ITEMS: readonly MarqueeBrandSpec[] = [
  { key: 'medium', ariaLabel: 'Medium', glow: 'rgba(255, 255, 255, 0.45)' },
  { key: 'devto', ariaLabel: 'Dev.to', glow: 'rgba(244, 241, 234, 0.45)' },
  { key: 'hashnode', ariaLabel: 'Hashnode', glow: 'rgba(41, 98, 255, 0.55)' },
  { key: 'substack', ariaLabel: 'Substack', glow: 'rgba(255, 103, 25, 0.55)' },
  { key: 'google-slides', ariaLabel: 'Google Slides', glow: 'rgba(244, 180, 0, 0.55)' },
  { key: 'notion', ariaLabel: 'Notion', glow: 'rgba(244, 241, 234, 0.45)' },
  { key: 'linkedin', ariaLabel: 'LinkedIn', glow: 'rgba(10, 102, 194, 0.55)' },
  { key: 'markdown', ariaLabel: 'Markdown / MDX', glow: 'rgba(249, 172, 0, 0.55)' }
];

export function renderBrandLogoSvg(
  key: MarqueeBrandKey,
  uid = '0',
  ariaLabel = ''
): string {
  const labelAttr = ariaLabel ? ` role="img" aria-label="${ariaLabel}"` : ' aria-hidden="true"';

  switch (key) {
    case 'github':
      return `<svg class="marquee-logo" viewBox="0 0 24 24"${labelAttr}><path fill="#F4F1EA" fill-rule="evenodd" clip-rule="evenodd" d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12c0 4.64 3.01 8.58 7.18 9.97.52.1.71-.23.71-.5 0-.25-.01-1.08-.01-1.96-2.92.63-3.54-1.24-3.54-1.24-.48-1.21-1.17-1.53-1.17-1.53-.95-.65.07-.64.07-.64 1.06.07 1.61 1.09 1.61 1.09.94 1.61 2.46 1.14 3.06.87.09-.68.37-1.14.67-1.4-2.33-.26-4.78-1.17-4.78-5.19 0-1.15.41-2.08 1.08-2.82-.11-.27-.47-1.33.1-2.78 0 0 .88-.28 2.89 1.08a10.05 10.05 0 0 1 5.26 0c2.01-1.36 2.89-1.08 2.89-1.08.57 1.45.21 2.51.1 2.78.67.74 1.08 1.67 1.08 2.82 0 4.03-2.46 4.92-4.8 5.18.38.33.72.97.72 1.96 0 1.42-.01 2.56-.01 2.91 0 .28.19.61.72.5A10.5 10.5 0 0 0 22.5 12C22.5 6.2 17.8 1.5 12 1.5z"/></svg>`;

    case 'linkedin':
      return `<svg class="marquee-logo" viewBox="0 0 24 24"${labelAttr}><rect x="2" y="2" width="20" height="20" rx="3.5" fill="#0A66C2"/><rect x="5.4" y="9.8" width="2.9" height="8.8" fill="#FFFFFF"/><circle cx="6.85" cy="6.8" r="1.65" fill="#FFFFFF"/><path fill="#FFFFFF" d="M10.4 9.8h2.75v1.2h.04c.38-.73 1.32-1.5 2.72-1.5 2.91 0 3.45 1.91 3.45 4.4v4.7h-2.88v-4.16c0-.99-.02-2.27-1.38-2.27-1.39 0-1.6 1.08-1.6 2.2v4.23h-3.1V9.8z"/></svg>`;

    case 'google-cloud-ai':
      return `<svg class="marquee-logo" viewBox="0 0 46 24"${labelAttr}><defs><linearGradient id="gem-${uid}" x1="28" y1="3" x2="43" y2="21" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#4E82EE"/><stop offset="100%" stop-color="#D96570"/></linearGradient></defs><path fill="#EA4335" d="M18.9 9.5a6.2 6.2 0 0 0-11.2-2.2l2.3 2.3a3.2 3.2 0 0 1 5.9 1.6h3z"/><path fill="#4285F4" d="M20.4 10.5h-4.5v2.7h4.2a2.2 2.2 0 0 1-2.2 2.3H14v3h3.9a5.2 5.2 0 0 0 2.5-8z"/><path fill="#34A853" d="M6.7 15.5a3.2 3.2 0 0 0 3.2 3H14v-3H9.9a1.4 1.4 0 0 1-.8-.3l-2.4.3z"/><path fill="#FBBC05" d="M7.7 7.3A5.8 5.8 0 0 0 2 13c0 2.1 1.1 3.9 2.7 4.9l2-2.4A3.1 3.1 0 0 1 5 13c0-1.4.9-2.6 2.1-3l.6-2.7z"/><path fill="url(#gem-${uid})" d="M35.5 3.5c.6 4.1 2.4 5.9 6.5 6.5-4.1.6-5.9 2.4-6.5 6.5-.6-4.1-2.4-5.9-6.5-6.5 4.1-.6 5.9-2.4 6.5-6.5z"/></svg>`;

    case 'microsoft':
      return `<svg class="marquee-logo" viewBox="0 0 24 24"${labelAttr}><rect x="2.5" y="2.5" width="8.7" height="8.7" fill="#F25022"/><rect x="12.8" y="2.5" width="8.7" height="8.7" fill="#7FBA00"/><rect x="2.5" y="12.8" width="8.7" height="8.7" fill="#00A4EF"/><rect x="12.8" y="12.8" width="8.7" height="8.7" fill="#FFB900"/></svg>`;

    case 'ethereum':
      return `<svg class="marquee-logo" viewBox="0 0 24 24"${labelAttr}><polygon points="12,1.8 5.6,12.2 12,15.9" fill="#8C9EFF"/><polygon points="12,1.8 18.4,12.2 12,15.9" fill="#627EEA"/><polygon points="12,17.2 5.6,13.5 12,22.2" fill="#8C9EFF"/><polygon points="12,17.2 18.4,13.5 12,22.2" fill="#627EEA"/><polygon points="12,9.2 5.6,12.2 12,15.9" fill="#C0CBF6"/><polygon points="12,9.2 18.4,12.2 12,15.9" fill="#8C9EFF"/></svg>`;

    case 'aiverseui':
      return `<svg class="marquee-logo" viewBox="0 0 30 24"${labelAttr}><polygon points="3,20.5 11.5,3.5 20,20.5 15.8,20.5 11.5,11.6 7.2,20.5" fill="#F25623"/><path d="M17.5 4.5h9l-4.5 8.2 4.5 7.8h-9l4.2-7.8-4.2-8.2z" fill="#C7A35A"/><circle cx="11.5" cy="17.8" r="1.6" fill="#C7A35A"/></svg>`;

    case 'react':
      return `<svg class="marquee-logo" viewBox="0 0 24 24"${labelAttr}><circle cx="12" cy="12" r="2.1" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="9.8" ry="3.9" fill="none" stroke="#61DAFB" stroke-width="1.3"/><ellipse cx="12" cy="12" rx="9.8" ry="3.9" fill="none" stroke="#61DAFB" stroke-width="1.3" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9.8" ry="3.9" fill="none" stroke="#61DAFB" stroke-width="1.3" transform="rotate(120 12 12)"/></svg>`;

    case 'nextjs':
      return `<svg class="marquee-logo" viewBox="0 0 24 24"${labelAttr}><defs><linearGradient id="next-${uid}" x1="10" y1="8" x2="18" y2="20" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#0A0A0B"/><stop offset="100%" stop-color="#0A0A0B" stop-opacity="0.1"/></linearGradient></defs><circle cx="12" cy="12" r="10" fill="#FFFFFF"/><path fill="#0A0A0B" d="M8.3 16.4V7.6h1.65l6.5 9.25-1.35.95-5.2-7.45v6.05H8.3z"/><rect x="14.6" y="7.6" width="1.55" height="6.1" fill="url(#next-${uid})"/></svg>`;

    case 'typescript':
      return `<svg class="marquee-logo" viewBox="0 0 24 24"${labelAttr}><rect x="2" y="2" width="20" height="20" rx="2.5" fill="#3178C6"/><path fill="#FFFFFF" d="M5.6 11.4h6.1v1.55H9.6v6.55H7.7v-6.55H5.6V11.4zm12.8 1.55c-.55-.33-1.22-.5-1.92-.5-.86 0-1.34.34-1.34.86 0 .56.51.82 1.62 1.24 1.56.6 2.38 1.32 2.38 2.66 0 1.58-1.26 2.52-3.2 2.52-1.08 0-2.11-.28-2.85-.74v-1.68c.77.52 1.72.84 2.62.84.89 0 1.41-.35 1.41-.91 0-.54-.45-.82-1.5-1.23-1.56-.59-2.46-1.3-2.46-2.66 0-1.5 1.22-2.47 3.04-2.47.92 0 1.76.19 2.2.47v1.6z"/></svg>`;

    case 'threejs':
      return `<svg class="marquee-logo" viewBox="0 0 24 24"${labelAttr}><polygon points="4.5,3.5 21,8.5 8.5,20.8" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linejoin="round"/><polygon points="12.8,6 16.8,14.6 6.5,12.2" fill="none" stroke="#049EF4" stroke-width="1.35" stroke-linejoin="round"/><polygon points="10.7,9.1 13.7,10.2 11.4,13.1" fill="#049EF4"/></svg>`;

    case 'nodejs':
      return `<svg class="marquee-logo" viewBox="0 0 24 24"${labelAttr}><polygon points="12,2 20.6,7 20.6,17 12,22 3.4,17 3.4,7" fill="#339933"/><polygon points="12,4.4 18.5,8.2 18.5,15.8 12,19.6 5.5,15.8 5.5,8.2" fill="#68A063"/><polygon points="12,7.2 16.1,9.6 16.1,14.4 12,16.8 7.9,14.4 7.9,9.6" fill="#0A0A0B" opacity="0.24"/><circle cx="12" cy="12" r="2.2" fill="#FFFFFF"/></svg>`;

    case 'fastapi':
      return `<svg class="marquee-logo" viewBox="0 0 24 24"${labelAttr}><circle cx="12" cy="12" r="10" fill="#009688"/><polygon points="13.2,4.5 7.4,13.2 11.7,13.2 10.6,19.5 16.6,10.8 12.2,10.8" fill="#FFFFFF"/></svg>`;

    case 'postgresql':
      return `<svg class="marquee-logo" viewBox="0 0 24 24"${labelAttr}><path fill="#4169E1" d="M16.9 4.5c-1.8-1.4-4-1.6-5.2-1.1-1.3-.5-3.4-.3-5.1 1.1-1.9 1.5-2.7 4.2-2.1 7.2.6 3.1 2.2 5.4 4.1 6 .7.2 1.2.1 1.5-.3.2.8.7 2.4 2.1 3 .9.4 1.9.1 2.4-.7.4-.6.4-1.4 0-1.9-.3-.4-.8-.4-1.1 0-.2.3-.2.7 0 .9-.3.1-.7 0-1-.3-.7-.7-.9-2.2-.9-3.1.8-.3 1.4-1 1.7-1.9.3.1.6.1.9 0 1.9-.6 3.5-2.9 4.1-6 .6-3-.2-5.7-2.4-7.9z"/><path fill="#FFFFFF" d="M8.6 9.6c0 1.4-.6 2.8-1.4 3.5-.7-.9-1.1-2.5-.9-3.8.2-1.2.9-2 1.6-1.9.5.1.7 1 .7 2.2zm7.2-.3c.2 1.3-.2 2.9-.9 3.8-.8-.7-1.4-2.1-1.4-3.5 0-1.2.2-2.1.7-2.2.7-.1 1.4.7 1.6 1.9z"/><circle cx="10.2" cy="10.2" r="0.9" fill="#FFFFFF"/><circle cx="13.8" cy="10.2" r="0.9" fill="#FFFFFF"/></svg>`;

    case 'vercel':
      return `<svg class="marquee-logo" viewBox="0 0 24 24"${labelAttr}><polygon points="12,3.2 22,20.5 2,20.5" fill="#FFFFFF"/></svg>`;

    case 'docker':
      return `<svg class="marquee-logo" viewBox="0 0 28 24"${labelAttr}><rect x="6.5" y="9.2" width="2.7" height="2.4" fill="#2496ED"/><rect x="9.7" y="9.2" width="2.7" height="2.4" fill="#2496ED"/><rect x="12.9" y="9.2" width="2.7" height="2.4" fill="#2496ED"/><rect x="9.7" y="6.2" width="2.7" height="2.4" fill="#2496ED"/><rect x="12.9" y="6.2" width="2.7" height="2.4" fill="#2496ED"/><rect x="16.1" y="9.2" width="2.7" height="2.4" fill="#2496ED"/><rect x="12.9" y="3.2" width="2.7" height="2.4" fill="#2496ED"/><path fill="#2496ED" d="M25.6 11.7c-.7-.5-2.1-.6-3.2-.3-.2-1.3-1-2.4-2.2-3.2l-.4-.3-.3.4c-.5.7-.7 1.9-.5 2.9.1.7.4 1.3.9 1.8-.6.3-1.4.5-2.2.5H2.4l-.1.5c-.2 2 .3 4 1.5 5.4 1.4 1.7 3.6 2.6 6.4 2.6 6 0 10.6-2.7 12.8-7.6.9 0 2.7 0 3.7-1.8.1-.1.3-.5.4-.7l-.5-.2z"/></svg>`;

    case 'adobe-cc':
      return `<svg class="marquee-logo" viewBox="0 0 30 24"${labelAttr}><path fill="none" stroke="#FF0000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M11.6 16.5a4.5 4.5 0 1 1 0-9c2.5 0 4.3 2.5 6.8 4.5 2.5 2 4.3 4.5 6.8 4.5a4.5 4.5 0 1 0 0-9c-2.5 0-4.3 2.5-6.8 4.5-.8.7-1.6 1.4-2.4 2"/></svg>`;

    case 'canva':
      return `<svg class="marquee-logo" viewBox="0 0 24 24"${labelAttr}><defs><linearGradient id="canva-${uid}" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#00C4CC"/><stop offset="100%" stop-color="#7D2AE8"/></linearGradient></defs><circle cx="12" cy="12" r="10" fill="url(#canva-${uid})"/><path fill="none" stroke="#FFFFFF" stroke-width="2.1" stroke-linecap="round" d="M15.8 8.8c-.9-1.2-2.2-1.8-3.6-1.8-2.8 0-4.9 2.4-4.9 5.3 0 2.6 1.8 4.6 4.3 4.6 1.9 0 3.3-1 4.2-2.5"/></svg>`;

    case 'pinterest':
      return `<svg class="marquee-logo" viewBox="0 0 24 24"${labelAttr}><circle cx="12" cy="12" r="10" fill="#E60023"/><path fill="#FFFFFF" d="M12.2 6.2c-3.4 0-5.4 2.2-5.4 4.7 0 1.1.6 2.5 1.6 2.9.2.1.3 0 .3-.2l.3-1c0-.1 0-.2-.1-.3-.3-.4-.5-1-.5-1.6 0-1.9 1.4-3.2 3.5-3.2 1.9 0 3.1 1.2 3.1 3 0 2.1-1.1 3.7-2.6 3.7-.8 0-1.4-.7-1.2-1.5.2-1 .7-2 .7-2.7 0-.6-.3-1.1-1-1.1-.8 0-1.4.8-1.4 1.9 0 .7.2 1.2.2 1.2l-1 4.1c-.2.9-.1 2.2 0 2.4h.1c.2-.2 1.2-1.5 1.5-2.4l.4-1.6c.4.7 1.3 1.2 2.4 1.2 2.9 0 4.9-2.6 4.9-5.9 0-2.9-2.4-5.6-5.8-5.6z"/></svg>`;

    case 'figma':
      return `<svg class="marquee-logo" viewBox="0 0 24 24"${labelAttr}><path fill="#F24E1E" d="M8.5 2h3.5v6.6H8.5A3.3 3.3 0 0 1 8.5 2z"/><path fill="#FF7262" d="M12 2h3.5a3.3 3.3 0 0 1 0 6.6H12V2z"/><path fill="#A259FF" d="M5.2 11.9A3.3 3.3 0 0 1 8.5 8.6H12v6.6H8.5a3.3 3.3 0 0 1-3.3-3.3z"/><circle cx="15.3" cy="11.9" r="3.3" fill="#1ABCFE"/><path fill="#0ACF83" d="M5.2 18.5a3.3 3.3 0 0 1 3.3-3.3H12v3.3a3.3 3.3 0 1 1-6.8 0z"/></svg>`;

    case 'behance':
      return `<svg class="marquee-logo" viewBox="0 0 28 24"${labelAttr}><rect x="1.5" y="3" width="25" height="18" rx="3" fill="#1769FF"/><path fill="#FFFFFF" d="M5.5 7.7h4.2c1.4 0 2.5.65 2.5 2.05 0 .95-.5 1.6-1.3 1.95 1 .3 1.6 1.1 1.6 2.25 0 1.65-1.35 2.35-2.9 2.35H5.5V7.7zm1.9 3.4h2.05c.65 0 1.05-.3 1.05-.95 0-.6-.4-.9-1.05-.9H7.4v1.85zm0 3.65h2.2c.75 0 1.2-.35 1.2-1.05 0-.7-.45-1.05-1.2-1.05H7.4v2.1zm9.3-6.6h3.9v1.2h-3.9v-1.2zm1.95 1.85c2.2 0 3.45 1.55 3.45 3.85v.45h-5.05c.1 1 .75 1.55 1.75 1.55.75 0 1.3-.3 1.6-.75l1.35.95c-.65.9-1.7 1.35-3.05 1.35-2.25 0-3.65-1.45-3.65-3.7 0-2.15 1.4-3.7 3.6-3.7zm-1.6 2.95h3.2c-.15-.85-.7-1.45-1.55-1.45-.85 0-1.5.55-1.65 1.45z"/></svg>`;

    case 'google-analytics':
      return `<svg class="marquee-logo" viewBox="0 0 24 24"${labelAttr}><rect x="15.4" y="3" width="4.4" height="18" rx="2.2" fill="#F9AB00"/><rect x="9.8" y="9.5" width="4.4" height="11.5" rx="2.2" fill="#E37400"/><circle cx="6.2" cy="18.8" r="2.2" fill="#E37400"/></svg>`;

    case 'meta':
      return `<svg class="marquee-logo" viewBox="0 0 32 24"${labelAttr}><path fill="none" stroke="#0081FB" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" d="M8.8 18.2c-2.6 0-4.6-2.2-4.6-5.6 0-4.1 2.4-7.4 5.2-7.4 2.6 0 4.7 2.8 6.6 6.8 1.9-4 4-6.8 6.6-6.8 2.8 0 5.2 3.3 5.2 7.4 0 3.4-2 5.6-4.6 5.6-2.5 0-4.4-2.2-7.2-6.8-2.8 4.6-4.7 6.8-7.2 6.8z"/></svg>`;

    case 'premiere-pro':
      return `<svg class="marquee-logo" viewBox="0 0 24 24"${labelAttr}><rect x="2" y="2" width="20" height="20" rx="3.5" fill="#00005B" stroke="#9999FF" stroke-width="1"/><path fill="#9999FF" d="M6.8 16.4V7.5h3.55c2.1 0 3.35 1.05 3.35 2.85 0 1.8-1.25 2.9-3.35 2.9H8.65v3.15H6.8zm1.85-4.7h1.55c1 0 1.6-.48 1.6-1.35 0-.86-.6-1.32-1.6-1.32H8.65v2.67zm5.9 4.7V9.85h1.68v1c.35-.75 1.02-1.15 1.95-1.15h.32v1.7h-.45c-1.08 0-1.68.6-1.68 1.75v3.25h-1.82z"/></svg>`;

    case 'medium':
      return `<svg class="marquee-logo" viewBox="0 0 32 24"${labelAttr}><circle cx="8.5" cy="12" r="5.5" fill="#FFFFFF"/><ellipse cx="18.2" cy="12" rx="2.8" ry="5.1" fill="#FFFFFF"/><ellipse cx="24" cy="12" rx="1.15" ry="4.5" fill="#FFFFFF"/></svg>`;

    case 'devto':
      return `<svg class="marquee-logo" viewBox="0 0 30 24"${labelAttr}><rect x="1.5" y="3.5" width="27" height="17" rx="3" fill="#0A0A0B" stroke="#F4F1EA" stroke-width="1.5"/><path fill="#F4F1EA" d="M5.2 8.2h2.25c1.7 0 2.75 1.05 2.75 3.8s-1.05 3.8-2.75 3.8H5.2V8.2zm1.55 1.45v4.7h.65c.85 0 1.25-.65 1.25-2.35s-.4-2.35-1.25-2.35h-.65zm5.15-1.45h4.1v1.45h-2.55v1.55h1.85v1.45h-1.85v1.7h2.55v1.45h-4.1V8.2zm5.25 0h1.6l1.15 5.1 1.15-5.1h1.6l-1.95 7.6h-1.6l-1.95-7.6z"/></svg>`;

    case 'hashnode':
      return `<svg class="marquee-logo" viewBox="0 0 24 24"${labelAttr}><path fill="#2962FF" fill-rule="evenodd" clip-rule="evenodd" d="M14.1 2.9a3 3 0 0 0-4.2 0L2.9 9.9a3 3 0 0 0 0 4.2l7 7a3 3 0 0 0 4.2 0l7-7a3 3 0 0 0 0-4.2l-7-7zM12 15.3a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6z"/></svg>`;

    case 'substack':
      return `<svg class="marquee-logo" viewBox="0 0 24 24"${labelAttr}><rect x="4" y="3" width="16" height="2.3" fill="#FF6719"/><rect x="4" y="7" width="16" height="2.3" fill="#FF6719"/><polygon points="4,11 20,11 20,21 12,16.4 4,21" fill="#FF6719"/></svg>`;

    case 'google-slides':
      return `<svg class="marquee-logo" viewBox="0 0 24 24"${labelAttr}><path fill="#F4B400" d="M14.2 2H6.5A2.2 2.2 0 0 0 4.3 4.2v15.6A2.2 2.2 0 0 0 6.5 22h11a2.2 2.2 0 0 0 2.2-2.2V7.5L14.2 2z"/><polygon points="14.2,2 19.7,7.5 14.2,7.5" fill="#FDE293"/><rect x="7.5" y="10.5" width="9" height="6.5" rx="0.8" fill="none" stroke="#FFFFFF" stroke-width="1.5"/></svg>`;

    case 'notion':
      return `<svg class="marquee-logo" viewBox="0 0 24 24"${labelAttr}><path fill="#F4F1EA" d="M4.2 4.9c.9.7 1.3.7 3 .5l11.2-.7c.3 0 .1-.4 0-.4l-1.9-1.3c-.6-.4-1.3-.9-2.8-.8L3.1 3c-.4 0-.5.3-.3.5l1.4 1.4zm.7 2.8v12.1c0 .7.3.9 1.1.9l12.4-.7c.8-.1.9-.5.9-1.1V6.8c0-.5-.2-.8-.7-.8l-13 .7c-.5.1-.7.4-.7 1z"/><path fill="#0A0A0B" d="M16.1 8.5c.1.4 0 .7-.4.8l-.6.1v8.7c-.5.3-1 .5-1.4.5-.6 0-.8-.2-1.2-.9l-3.7-5.8v5.6l1.2.3s0 .7-1 .7l-2.7.2c-.1-.2 0-.6.3-.7l.7-.2V10l-1-.1c-.1-.4.1-.9.7-.9l2.9-.2 3.9 6V9.7l-1-.1c-.1-.4.2-.8.7-.8l2.6-.3z"/></svg>`;

    case 'markdown':
      return `<svg class="marquee-logo" viewBox="0 0 34 24"${labelAttr}><rect x="1.5" y="3.5" width="31" height="17" rx="2.8" fill="#0A0A0B" stroke="#F4F1EA" stroke-width="1.5"/><path fill="#FFFFFF" d="M5.5 16.2V7.8h2.6l2.5 3.2 2.5-3.2h2.6v8.4h-2.5v-4.8l-2.6 3.2-2.6-3.2v4.8H5.5z"/><path fill="#F9AC00" d="M23.5 16.5l-3.8-4.1h2.4V7.8h2.8v4.6h2.4l-3.8 4.1z"/></svg>`;
  }
}

export function renderMarqueeStripHtml(items: readonly MarqueeBrandSpec[]): string {
  const minItemsPerHalfTrack = Math.max(items.length, 16);
  const repeats = Math.ceil(minItemsPerHalfTrack / Math.max(1, items.length));
  const halfTrackItems: MarqueeBrandSpec[] = [];
  for (let r = 0; r < repeats; r += 1) {
    halfTrackItems.push(...items);
  }

  const buildTrack = (trackOffset: number): string =>
    halfTrackItems
      .map(
        (item, idx) =>
          `<span class="marquee-item" style="--brand-glow:${item.glow}">${renderBrandLogoSvg(item.key, `${trackOffset}-${idx}`, '')}</span>`
      )
      .join('');

  return `
    <div class="marquee-strip" aria-hidden="true">
      <div class="marquee-scroller">
        <div class="marquee-track">${buildTrack(0)}</div>
        <div class="marquee-track">${buildTrack(1)}</div>
      </div>
    </div>
  `;
}
