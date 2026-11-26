/**
 * Pure calculation functions for Vante scroll portfolio hero.
 */

export const clamp = (x: number, a = 0, b = 1): number => Math.min(b, Math.max(a, x));

export const mix = (a: number, b: number, t: number): number => a + (b - a) * t;

export const ease = (t: number): number => t * t * (3 - 2 * t);

export const out = (t: number): number => 1 - Math.pow(1 - t, 3);

export const span = (p: number, a: number, b: number): number => clamp((p - a) / (b - a));

export const calculateDepth = (ph: number): number => {
  const cs = Math.cos(ph);
  return cs > 0 ? 7.6 + 16.4 * Math.pow(cs, 0.9) : 7.6 + 2.2 * cs;
};

export const calculateEdge = (t: number): number => {
  return 0.84 + 0.5 * span(0.14 - t, 0, 0.14) + 0.8 * span(t, 0.84, 1);
};

export const calculateRibbonPoint = (t: number, ph: number): [number, number, number] => {
  const depth = calculateDepth(ph);
  const edge = calculateEdge(t);
  const u = 2 * t - 1;
  const x = edge * Math.sin(ph) * depth * 0.561;
  const y = 0.5 * Math.sign(u) * Math.pow(Math.abs(u), 1.4) * depth * 0.63;
  const z = -depth;
  return [x, y, z];
};

export const calculateFov = (aspect: number, baseFov = 35): number => {
  return aspect < 16 / 9 ? (Math.atan(0.561 / aspect) * 360) / Math.PI : baseFov;
};

export const lenisEasing = (t: number): number => {
  return Math.min(1, 1.001 - Math.pow(2, -10 * t));
};

export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

export const calcMagneticOffset = (
  mouseX: number,
  mouseY: number,
  centerX: number,
  centerY: number,
  factor = 0.3,
  maxOffset = 40
): { x: number; y: number; distance: number } => {
  const dx = mouseX - centerX;
  const dy = mouseY - centerY;
  const distance = Math.hypot(dx, dy);
  let x = dx * factor;
  let y = dy * factor;
  const offsetDist = Math.hypot(x, y);
  if (offsetDist > maxOffset && offsetDist > 0) {
    x = (x / offsetDist) * maxOffset;
    y = (y / offsetDist) * maxOffset;
  }
  return { x, y, distance };
};

export const calcWordProgress = (
  sectionProgress: number,
  wordIndex: number,
  totalWords: number
): number => {
  if (totalWords <= 1) return clamp(sectionProgress);
  // Stagger words across section progress 0.15 to 0.85
  const start = 0.15 + (wordIndex / totalWords) * 0.55;
  const end = start + 0.15;
  return clamp((sectionProgress - start) / (end - start));
};

export const calcParallax = (
  elementTop: number,
  elementHeight: number,
  viewportHeight: number,
  maxPercent = 10
): number => {
  // 0 when center of element is at bottom of viewport, 1 when at top of viewport
  const center = elementTop + elementHeight / 2;
  const progress = clamp(1 - center / viewportHeight);
  // Maps 0..1 to -maxPercent..+maxPercent
  return -maxPercent + progress * (maxPercent * 2);
};

export const calcMarqueeSpeed = (
  baseSpeed = 1,
  scrollVelocity = 0,
  multiplier = 0.05,
  maxSpeed = 10
): number => {
  const speedBoost = Math.abs(scrollVelocity) * multiplier;
  return Math.min(baseSpeed + speedBoost, maxSpeed);
};

export const normalizeRoute = (path: string): string => {
  if (!path) return '/';
  const clean = path.split('?')[0].split('#')[0];
  if (clean === '' || clean === '/') return '/';
  return clean.replace(/\/+$/, '') || '/';
};

export const isMagneticEnabled = (
  viewportWidth: number,
  breakpoint = 768
): boolean => {
  return viewportWidth >= breakpoint;
};

export const getRouteMetadata = (path: string): { title: string; description: string; announcerText: string } => {
  const clean = normalizeRoute(path);
  switch (clean) {
    case '/work':
      return {
        title: 'Vante — Selected Works & Spatial Archive',
        description: 'Immersive interactive gallery of AI, spatial computing, and WebGL digital products.',
        announcerText: 'Navigated to Selected Works',
      };
    case '/about':
      return {
        title: 'Vante — Studio & Engineering Philosophy',
        description: 'The creative engineering practice of ARTISTDEV07 at the intersection of design and systems architecture.',
        announcerText: 'Navigated to Studio Philosophy',
      };
    case '/contact':
      return {
        title: 'Vante — Start a Project & Commissions',
        description: 'Available for high-impact technical and creative commissions worldwide.',
        announcerText: 'Navigated to Contact Drawer',
      };
    case '/':
    default:
      return {
        title: 'Vante — Craft in Motion',
        description: 'A studio portfolio where a ribbon of live video work sweeps through space, then lands in a grid.',
        announcerText: 'Navigated to Home',
      };
  }
};

export const canTransition = (isTransitioning: boolean): boolean => {
  return !isTransitioning;
};

export const isMotionReduced = (matchesMedia: boolean): boolean => {
  return matchesMedia;
};

export const debounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, wait);
  };
};

export const calcHorizontalProgress = (
  sectionTop: number,
  sectionHeight: number,
  viewportHeight: number
): number => {
  const scrollableDistance = sectionHeight - viewportHeight;
  if (scrollableDistance <= 0) return 0;
  return clamp(-sectionTop / scrollableDistance, 0, 1);
};

export const calcHorizontalTranslate = (progress: number, maxShift: number): number => {
  const val = -clamp(progress, 0, 1) * Math.max(0, maxShift);
  return val === 0 ? 0 : val;
};

export const calcCardTilt = (
  clientX: number,
  clientY: number,
  cardLeft: number,
  cardTop: number,
  cardWidth: number,
  cardHeight: number,
  maxTilt = 5
): { mouseX: number; mouseY: number; rotateX: number; rotateY: number } => {
  if (cardWidth <= 0 || cardHeight <= 0) {
    return { mouseX: 0, mouseY: 0, rotateX: 0, rotateY: 0 };
  }
  const rawX = clamp(((clientX - cardLeft) / cardWidth - 0.5) * 2, -1, 1);
  const rawY = clamp(((clientY - cardTop) / cardHeight - 0.5) * 2, -1, 1);
  const normX = rawX === 0 ? 0 : rawX;
  const normY = rawY === 0 ? 0 : rawY;
  const my = -normY === 0 ? 0 : -normY;
  const rx = -normY * maxTilt === 0 ? 0 : -normY * maxTilt;
  const ry = normX * maxTilt === 0 ? 0 : normX * maxTilt;
  return {
    mouseX: normX,
    mouseY: my,
    rotateX: rx,
    rotateY: ry,
  };
};

export const calcLiquidRipple = (
  timeSec: number,
  velocity: number
): { scale: number; freqX: number; freqY: number } => {
  const calmSine = Math.sin(timeSec * 2.2);
  const calmCos = Math.cos(timeSec * 1.7);
  const baseScale = 6 + calmSine * 2.5;
  const vel = Math.abs(velocity);
  const velBoost = Math.min(vel * 1.6, 40);
  const totalScale = baseScale + velBoost;

  const baseFreqX = 0.012 + calmSine * 0.003;
  const baseFreqY = 0.035 + calmCos * 0.006;
  const velFreqBoost = Math.min(vel * 0.0015, 0.035);

  return {
    scale: totalScale,
    freqX: baseFreqX + velFreqBoost * 0.4,
    freqY: baseFreqY + velFreqBoost,
  };
};

export const calcTimelineProgress = (
  sectionTop: number,
  sectionHeight: number,
  viewportHeight: number
): number => {
  if (sectionHeight <= 0) return 0;
  // Progress begins when top of section enters 60% of viewport, finishes when bottom approaches
  const startY = viewportHeight * 0.6;
  const travel = sectionHeight;
  const current = startY - sectionTop;
  const p = clamp(current / travel, 0, 1);
  return p === 0 ? 0 : p;
};

export const calcVelocitySkew = (
  velocity: number,
  factor = 0.2,
  maxSkew = 12
): number => {
  const raw = velocity * factor;
  const clamped = clamp(raw, -maxSkew, maxSkew);
  return clamped === 0 ? 0 : clamped;
};

export const calcMasonryParallax = (
  scrollY: number,
  speedMultiplier: number
): number => {
  const offset = scrollY * speedMultiplier;
  return offset === 0 ? 0 : offset;
};

export const calcImageScale = (
  viewportProgress: number,
  minScale = 1.0,
  maxScale = 1.2
): number => {
  const p = clamp(viewportProgress, 0, 1);
  // Scale from maxScale (1.2) when p = 0 down to minScale (1.0) when p = 1
  const scale = maxScale - p * (maxScale - minScale);
  return scale;
};

export const calcArchiveMagnetic = (
  mouseX: number,
  mouseY: number,
  centerX: number,
  centerY: number,
  factor = 0.15,
  maxPull = 45
): { x: number; y: number } => {
  const dx = (mouseX - centerX) * factor;
  const dy = (mouseY - centerY) * factor;
  const len = Math.hypot(dx, dy);
  if (len > maxPull && len > 0) {
    const nx = (dx / len) * maxPull;
    const ny = (dy / len) * maxPull;
    return {
      x: nx === 0 ? 0 : nx,
      y: ny === 0 ? 0 : ny,
    };
  }
  return {
    x: dx === 0 ? 0 : dx,
    y: dy === 0 ? 0 : dy,
  };
};

export const calcCountUp = (
  progress: number,
  targetValue: number,
  round = true
): number => {
  const p = clamp(progress, 0, 1);
  const eased = 1 - Math.pow(1 - p, 3);
  const val = eased * targetValue;
  return round ? Math.round(val) : val;
};

export const calcHairlineScale = (
  sectionTop: number,
  viewportHeight: number,
  startRatio = 0.9,
  endRatio = 0.3
): number => {
  if (viewportHeight <= 0) return 0;
  const start = viewportHeight * startRatio;
  const end = viewportHeight * endRatio;
  const progress = (start - sectionTop) / (start - end);
  return clamp(progress, 0, 1);
};

export const calcWallParallax = (
  scrollY: number,
  isEvenCol: boolean
): number => {
  const factor = isEvenCol ? 0.06 : -0.04;
  return scrollY * factor;
};

export const calcCertHorizontalTranslate = (
  progress: number,
  maxDistance: number
): number => {
  const p = clamp(progress, 0, 1);
  const val = -p * Math.max(0, maxDistance);
  return val === 0 ? 0 : val;
};

export const calcCertVelocitySkew = (
  velocity: number,
  factor = -0.5,
  maxSkew = 15
): number => {
  const raw = velocity * factor;
  const clamped = clamp(raw, -maxSkew, maxSkew);
  return clamped === 0 ? 0 : clamped;
};


export const calcBadgeVelocityScale = (
  velocity: number,
  minScale = 0.98,
  factor = 0.002
): number => {
  const speed = Math.abs(velocity);
  const reduction = Math.min(1 - minScale, speed * factor);
  return 1 - reduction;
};

export const calcSkylineTranslate = (
  progress: number,
  maxDistance: number
): number => {
  const p = clamp(progress, 0, 1);
  const val = -p * Math.max(0, maxDistance);
  return val === 0 ? 0 : val;
};

export const calcSkylineCardScale = (
  distanceFromCenter: number,
  radius: number,
  minScale = 0.9,
  maxScale = 1.15
): number => {
  if (radius <= 0) return 1.0;
  const normDist = clamp(Math.abs(distanceFromCenter) / radius, 0, 1);
  const factor = (1 - normDist) * (1 - normDist);
  return minScale + factor * (maxScale - minScale);
};

export const calcSkylineImagePan = (
  distanceFromCenter: number,
  radius: number,
  maxPan = 30
): number => {
  if (radius <= 0) return 0;
  const ratio = clamp(distanceFromCenter / radius, -1, 1);
  const val = -ratio * maxPan;
  return val === 0 ? 0 : val;
};

export const calcAccoladeVelocitySkew = (
  velocity: number,
  factor = -0.2,
  maxSkew = 10
): number => {
  const raw = velocity * factor;
  const clamped = clamp(raw, -maxSkew, maxSkew);
  return clamped === 0 ? 0 : clamped;
};

export const calcAccoladeImagePan = (
  distanceFromCenter: number,
  radius: number,
  maxPan = 24
): number => {
  if (radius <= 0) return 0;
  const ratio = clamp(distanceFromCenter / radius, -1, 1);
  const val = -ratio * maxPan;
  return val === 0 ? 0 : val;
};

export const calcTunnelProgress = (
  sectionTop: number,
  sectionHeight: number,
  viewportHeight: number
): number => {
  const scrollableDistance = sectionHeight - viewportHeight;
  if (scrollableDistance <= 0) return 0;
  const p = clamp(-sectionTop / scrollableDistance, 0, 1);
  return p === 0 ? 0 : p;
};

export const calcTunnelTrackZ = (
  progress: number,
  maxZ = 18000
): number => {
  const p = clamp(progress, 0, 1);
  const val = p * maxZ;
  return val === 0 ? 0 : val;
};

export const calcSpatialFrameDepth = (
  initialZ: number,
  trackZ: number
): {
  worldZ: number;
  blurPx: number;
  brightness: number;
  opacity: number;
  isInteractable: boolean;
} => {
  const worldZ = initialZ + trackZ;

  // Blur: 10px when far away (worldZ <= -3000px), down to 0px near z: 0
  let blurPx = 0;
  if (worldZ < 0) {
    const distRatio = clamp(-worldZ / 3000, 0, 1);
    blurPx = Math.round(distRatio * 10 * 10) / 10;
  }

  // Brightness: 0.2 when far away (worldZ <= -4000px), up to 1.0 near z: 0
  let brightness = 1.0;
  if (worldZ < 0) {
    const darkRatio = clamp(-worldZ / 4000, 0, 1);
    brightness = Math.round((1.0 - darkRatio * 0.8) * 100) / 100;
  }

  // Opacity: If z > 200px, rapidly fade opacity from 1.0 at 200px to 0.0 at 600px
  let opacity = 1.0;
  if (worldZ > 200) {
    const fadeRatio = clamp((worldZ - 200) / 400, 0, 1);
    opacity = Math.round((1.0 - fadeRatio) * 100) / 100;
  } else if (worldZ < -7000) {
    const distFade = clamp((-worldZ - 7000) / 3000, 0, 1);
    opacity = Math.round((1.0 - distFade) * 100) / 100;
  }

  // Interactable when in foreground
  const isInteractable = worldZ >= -1200 && worldZ <= 250 && opacity > 0.3;

  return {
    worldZ,
    blurPx,
    brightness,
    opacity,
    isInteractable,
  };
};

export const calcSpatialTilt = (
  mouseXNorm: number,
  mouseYNorm: number,
  maxAngle = 10
): { rotateX: number; rotateY: number } => {
  const mx = clamp(mouseXNorm, -1, 1);
  const my = clamp(mouseYNorm, -1, 1);
  const rx = -my * maxAngle;
  const ry = mx * maxAngle;
  return {
    rotateX: rx === 0 ? 0 : rx,
    rotateY: ry === 0 ? 0 : ry,
  };
};

export const calcPartnerStaggerDelay = (
  index: number,
  staggerSeconds = 0.05
): number => {
  const safeIndex = Math.max(0, Math.floor(index));
  const delay = safeIndex * staggerSeconds;
  return Math.round(delay * 1000) / 1000;
};

export const calcVisionParallaxY = (
  sectionTop: number,
  sectionHeight: number,
  viewportHeight: number,
  maxPercent = 15
): number => {
  const totalTravel = viewportHeight + sectionHeight;
  if (totalTravel <= 0) return 0;
  const progress = clamp((viewportHeight - sectionTop) / totalTravel, 0, 1);
  const val = -maxPercent + progress * (maxPercent * 2);
  return val === 0 ? 0 : Math.round(val * 100) / 100;
};

export const calcVisionApertureMotion = (
  sectionTop: number,
  sectionHeight: number,
  viewportHeight: number
): {
  progress: number;
  percent: number;
  topLineXvw: number;
  botLineXvw: number;
  clipInsetPct: number;
  imgPanPct: number;
} => {
  const totalTravel = viewportHeight + sectionHeight;
  const progress =
    totalTravel <= 0 ? 0 : clamp((viewportHeight - sectionTop) / totalTravel, 0, 1);
  const percent = Math.round(progress * 100);
  const topLineXvw = Math.round((-4 + progress * 8) * 1000) / 1000;
  const botLineXvw = Math.round((4 - progress * 8) * 1000) / 1000;
  const apertureOpenT = clamp(progress / 0.5, 0, 1);
  const clipInsetPct = Math.round(32 * (1 - apertureOpenT) * 100) / 100;
  const imgPanPct = Math.round((-6 + progress * 6) * 1000) / 1000;

  return {
    progress,
    percent,
    topLineXvw: topLineXvw === 0 ? 0 : topLineXvw,
    botLineXvw: botLineXvw === 0 ? 0 : botLineXvw,
    clipInsetPct: clipInsetPct === 0 ? 0 : clipInsetPct,
    imgPanPct: imgPanPct === 0 ? 0 : imgPanPct,
  };
};

export const calcFloatingFrameParallaxY = (
  relativeScroll: number,
  speed: number
): number => {
  const val = relativeScroll * speed;
  return val === 0 ? 0 : Math.round(val * 100) / 100;
};

export const calcMagneticRepulsion = (
  frameCenterX: number,
  frameCenterY: number,
  cursorX: number,
  cursorY: number,
  activationRadius = 320,
  maxRepulsionPx = 30
): { x: number; y: number } => {
  if (activationRadius <= 0 || maxRepulsionPx <= 0) return { x: 0, y: 0 };
  const dx = frameCenterX - cursorX;
  const dy = frameCenterY - cursorY;
  const dist = Math.hypot(dx, dy);
  if (dist >= activationRadius || dist === 0) {
    return { x: 0, y: 0 };
  }
  const strength = Math.pow(1 - dist / activationRadius, 1.5);
  const mag = strength * maxRepulsionPx;
  const x = Math.round(((dx / dist) * mag) * 100) / 100;
  const y = Math.round(((dy / dist) * mag) * 100) / 100;
  return {
    x: x === 0 ? 0 : x,
    y: y === 0 ? 0 : y,
  };
};

export const calcArtistryTrackTranslate = (
  progress: number,
  maxDistance: number
): number => {
  const p = clamp(progress, 0, 1);
  const val = -p * Math.max(0, maxDistance);
  return val === 0 ? 0 : Math.round(val * 100) / 100;
};

export const calcArtistryFrameFocus = (
  distanceFromCenter: number,
  radius: number,
  minScale = 0.85,
  maxScale = 1.05,
  maxGrayscale = 80
): {
  scale: number;
  grayscale: number;
  overlayOpacity: number;
} => {
  if (radius <= 0) {
    return { scale: maxScale, grayscale: 0, overlayOpacity: 1 };
  }
  const normDist = clamp(Math.abs(distanceFromCenter) / radius, 0, 1);
  // Smooth bell curve peaking at center (normDist = 0)
  const focus = 1 - normDist * normDist * (3 - 2 * normDist);
  const scale = Math.round((minScale + focus * (maxScale - minScale)) * 1000) / 1000;
  const grayscale = Math.round(((1 - focus) * maxGrayscale) * 10) / 10;
  const overlayOpacity = Math.round(clamp((focus - 0.35) / 0.65, 0, 1) * 100) / 100;

  return {
    scale,
    grayscale: grayscale === 0 ? 0 : grayscale,
    overlayOpacity: overlayOpacity === 0 ? 0 : overlayOpacity,
  };
};

export const calcHorizontalFocusScrollTarget = (
  sectionTopDoc: number,
  sectionHeight: number,
  viewportHeight: number,
  itemIndex: number,
  totalItems: number
): number => {
  const scrollableDistance = Math.max(0, sectionHeight - viewportHeight);
  if (totalItems <= 1 || scrollableDistance === 0) {
    return Math.max(0, Math.round(sectionTopDoc));
  }
  const safeIndex = clamp(itemIndex, 0, totalItems - 1);
  const progress = safeIndex / (totalItems - 1);
  return Math.max(0, Math.round(sectionTopDoc + progress * scrollableDistance));
};

export const calcTunnelFocusScrollTarget = (
  sectionTopDoc: number,
  sectionHeight: number,
  viewportHeight: number,
  initZ: number,
  maxZ = 18000,
  targetWorldZ = -180
): number => {
  const scrollableDistance = Math.max(0, sectionHeight - viewportHeight);
  if (maxZ <= 0 || scrollableDistance === 0) {
    return Math.max(0, Math.round(sectionTopDoc));
  }
  const desiredTrackZ = targetWorldZ - initZ;
  const progress = clamp(desiredTrackZ / maxZ, 0, 1);
  return Math.max(0, Math.round(sectionTopDoc + progress * scrollableDistance));
};

export const isTouchCapableEnv = (
  hoverNone: boolean,
  pointerCoarse: boolean
): boolean => {
  return Boolean(hoverNone && pointerCoarse);
};

export const resolveRouteKey = (
  rawPath: string,
  knownRoutes: readonly string[]
): string | null => {
  const clean = normalizeRoute(rawPath);
  return knownRoutes.includes(clean) ? clean : null;
};

export const calcCanvasCardTransform = (
  progress: number,
  cardIndex: number,
  totalCards = 6,
  scaleStep = 0.055,
  stackOffsetVh = 1.8
): {
  translateYvh: number;
  scale: number;
  brightness: number;
  rotateZdeg: number;
} => {
  const safeTotal = Math.max(2, totalCards);
  const steps = safeTotal - 1;
  const p = clamp(progress, 0, 1) * steps;

  let enterYvh = 0;
  let enterTilt = 0;
  const dir = cardIndex % 2 === 0 ? -1 : 1;
  if (cardIndex > 0) {
    const enterLinear = clamp(p - (cardIndex - 1), 0, 1);
    const enterEased = 1 - Math.pow(1 - enterLinear, 3);
    enterYvh = 120 * (1 - enterEased);
    enterTilt = dir * 4.5 * (1 - enterEased);
  }

  const depth = Math.max(0, p - cardIndex);
  const stackYvh = -depth * stackOffsetVh;
  const translateYvh = Math.round((enterYvh + stackYvh) * 100) / 100;
  const scale = Math.max(0.7, Math.round((1 - depth * scaleStep) * 1000) / 1000);
  const brightness = Math.max(0.35, Math.round((1 - depth * 0.14) * 100) / 100);
  const stackTilt = dir * Math.min(4.8, depth * 2.2);
  const rotateZdeg = Math.round((enterTilt + stackTilt) * 100) / 100;

  return {
    translateYvh: translateYvh === 0 ? 0 : translateYvh,
    scale,
    brightness,
    rotateZdeg: rotateZdeg === 0 ? 0 : rotateZdeg,
  };
};

export const calcCanvasActiveLayer = (
  progress: number,
  totalCards = 6
): number => {
  const safeTotal = Math.max(1, Math.floor(totalCards));
  if (safeTotal === 1) return 1;
  const p = clamp(Number.isFinite(progress) ? progress : 0, 0, 1);
  return Math.min(safeTotal, Math.max(1, Math.floor(p * (safeTotal - 1) + 0.5) + 1));
};

export type BadgeCategory =
  | 'ALL'
  | 'GOOGLE'
  | 'MICROSOFT'
  | 'AWS'
  | 'POSTMAN'
  | 'IBM'
  | 'CISCO'
  | 'ISC2'
  | 'MOOC.FI'
  | 'GSOC';

export interface BadgeItemMeta {
  category: Exclude<BadgeCategory, 'ALL'>;
}

export const computeBadgeCategoryCounts = <T extends BadgeItemMeta>(
  badges: readonly T[]
): Record<BadgeCategory, number> => {
  const counts: Record<BadgeCategory, number> = {
    ALL: badges.length,
    GOOGLE: 0,
    MICROSOFT: 0,
    AWS: 0,
    POSTMAN: 0,
    IBM: 0,
    CISCO: 0,
    ISC2: 0,
    'MOOC.FI': 0,
    GSOC: 0,
  };
  for (const b of badges) {
    if (b.category in counts) {
      counts[b.category] += 1;
    }
  }
  return counts;
};

export const filterBadgeItems = <T extends BadgeItemMeta>(
  badges: readonly T[],
  category: BadgeCategory
): T[] => {
  if (category === 'ALL') return [...badges];
  return badges.filter((b) => b.category === category);
};

export const isAllowedProxyImageUrl = (rawUrl: string): URL | null => {
  if (!rawUrl || typeof rawUrl !== 'string' || rawUrl.length > 512) return null;
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'https:') return null;
    if (parsed.hostname !== 'i.pinimg.com') return null;
    if (parsed.username || parsed.password) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const getWebGLTextureSrc = (src: string): string => {
  return isAllowedProxyImageUrl(src)
    ? `/api/image-proxy?url=${encodeURIComponent(src)}`
    : src;
};

export const calcCylinderRadius = (viewportWidth: number): number => {
  if (viewportWidth < 768) return 240;
  return Math.round(clamp(viewportWidth * 0.52, 420, 820) * 100) / 100;
};

export const calcCylinderRotationDeg = (
  progress: number,
  stepDeg = 36,
  totalFrames = 10
): number => {
  const p = clamp(progress, 0, 1);
  const maxRotation = Math.max(0, totalFrames - 1) * stepDeg;
  const deg = -p * maxRotation;
  return deg === 0 ? 0 : Math.round(deg * 1000) / 1000;
};

export const calcCylinderFrameFocus = (
  frameIndex: number,
  ringAngleDeg: number,
  stepDeg = 36
): {
  diffDeg: number;
  focus: number;
  grayscalePct: number;
  brightness: number;
  isFocused: boolean;
} => {
  const raw = frameIndex * stepDeg + ringAngleDeg;
  let diffDeg = (((raw % 360) + 540) % 360) - 180;
  if (diffDeg === 0) diffDeg = 0;
  const focus = clamp(1 - Math.abs(diffDeg) / 72, 0, 1);
  const grayscalePct = Math.round((1 - focus) * 100 * 10) / 10;
  const brightness = Math.round((0.3 + focus * 0.75) * 1000) / 1000;
  const isFocused = focus > 0.85;

  return {
    diffDeg: Math.round(diffDeg * 1000) / 1000,
    focus: Math.round(focus * 1000) / 1000,
    grayscalePct: grayscalePct === 0 ? 0 : grayscalePct,
    brightness,
    isFocused,
  };
};

export const calcCylinderActiveIndex = (
  ringAngleDeg: number,
  totalFrames = 10,
  stepDeg = 36
): number => {
  if (totalFrames <= 1) return 0;
  let bestIdx = 0;
  let minAbsDiff = Infinity;
  for (let i = 0; i < totalFrames; i += 1) {
    const { diffDeg } = calcCylinderFrameFocus(i, ringAngleDeg, stepDeg);
    const absDiff = Math.abs(diffDeg);
    if (absDiff < minAbsDiff) {
      minAbsDiff = absDiff;
      bestIdx = i;
    }
  }
  return bestIdx;
};

export const calcCylinderFocusScrollTarget = (
  sectionTopDoc: number,
  sectionHeight: number,
  viewportHeight: number,
  frameIndex: number,
  totalFrames = 10
): number => {
  const scrollableDistance = Math.max(0, sectionHeight - viewportHeight);
  if (totalFrames <= 1 || scrollableDistance === 0) {
    return Math.max(0, Math.round(sectionTopDoc));
  }
  const safeIndex = clamp(frameIndex, 0, totalFrames - 1);
  const progress = safeIndex / (totalFrames - 1);
  return Math.max(0, Math.round(sectionTopDoc + progress * scrollableDistance));
};

export const formatISTClock = (date: Date = new Date()): string => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date);

  const map: Record<string, string> = {};
  for (const p of parts) {
    if (p.type === 'hour' || p.type === 'minute' || p.type === 'second') {
      map[p.type] = p.value;
    }
  }
  const hh = map.hour === '24' ? '00' : (map.hour || '00');
  const mm = map.minute || '00';
  const ss = map.second || '00';
  return `INDORE, IN // ${hh}:${mm}:${ss} IST`;
};

export const generateContactRefCode = (randomVal: number = Math.random(), year = 2026): string => {
  const normalized = clamp(Number.isFinite(randomVal) ? randomVal : 0, 0, 0.999999);
  const num = Math.floor(normalized * 10000);
  const padded = String(num).padStart(4, '0');
  return `REF // #YS-${year}-${padded}`;
};

export const calcContactMagneticOffset = (
  cursorX: number,
  cursorY: number,
  centerX: number,
  centerY: number,
  maxOffsetPx = 12,
  radiusPx = 220
): { x: number; y: number } => {
  const dx = cursorX - centerX;
  const dy = cursorY - centerY;
  const dist = Math.hypot(dx, dy);
  if (dist === 0 || dist > radiusPx) {
    return { x: 0, y: 0 };
  }
  const strength = 1 - dist / radiusPx;
  const rawX = dx * 0.14 * strength;
  const rawY = dy * 0.24 * strength;
  const len = Math.hypot(rawX, rawY);
  if (len > maxOffsetPx && len > 0) {
    const scale = maxOffsetPx / len;
    return {
      x: Math.round(rawX * scale * 100) / 100,
      y: Math.round(rawY * scale * 100) / 100,
    };
  }
  return {
    x: Math.round(rawX * 100) / 100,
    y: Math.round(rawY * 100) / 100,
  };
};

export const validateContactBrief = (input: {
  name: string;
  email: string;
  timeline?: string;
  message: string;
}): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const name = (input.name || '').trim();
  const email = (input.email || '').trim();
  const message = (input.message || '').trim();

  if (!name) {
    errors.push('Name or team is required.');
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('A valid email address is required.');
  }
  if (!message) {
    errors.push('Project brief or message is required.');
  }
  return { valid: errors.length === 0, errors };
};

export const toggleContactScope = (selected: string[], scope: string): string[] => {
  if (!scope) return [...selected];
  return selected.includes(scope)
    ? selected.filter((item) => item !== scope)
    : [...selected, scope];
};

export type StudioDiscipline =
  | 'ALL'
  | 'BRANDING'
  | 'GRAPHICS DESIGN'
  | 'CONTENT CREATION'
  | 'MARKETING & SEO';

export const computeStudioCategoryCounts = <T extends { category: Exclude<StudioDiscipline, 'ALL'> }>(
  frames: readonly T[]
): Record<StudioDiscipline, number> => {
  const counts: Record<StudioDiscipline, number> = {
    ALL: frames.length,
    BRANDING: 0,
    'GRAPHICS DESIGN': 0,
    'CONTENT CREATION': 0,
    'MARKETING & SEO': 0,
  };
  for (const frame of frames) {
    if (frame.category in counts) {
      counts[frame.category] += 1;
    }
  }
  return counts;
};

export const filterStudioFrames = <T extends { category: Exclude<StudioDiscipline, 'ALL'> }>(
  frames: readonly T[],
  category: StudioDiscipline
): T[] => {
  if (category === 'ALL') return [...frames];
  return frames.filter((f) => f.category === category);
};

export const resolveCapabilityRoute = (title: string): '/work/systems' | '/work/studio' | '/work/editorial' => {
  const normalized = title.trim().toLowerCase();
  if (normalized === 'website designing' || normalized === 'product development') {
    return '/work/systems';
  }
  if (normalized === 'presentation arch' || normalized === 'tech blog writing') {
    return '/work/editorial';
  }
  return '/work/studio';
};

export const getCapabilityClusterTag = (
  route: string
): '[ 01 // SYSTEMS ]' | '[ 02 // STUDIO ]' | '[ 03 // EDITORIAL ]' => {
  if (route === '/work/systems') return '[ 01 // SYSTEMS ]';
  if (route === '/work/editorial') return '[ 03 // EDITORIAL ]';
  return '[ 02 // STUDIO ]';
};

export const calcCapabilityBladeTilt = (
  clientX: number,
  clientY: number,
  rectLeft: number,
  rectTop: number,
  rectWidth: number,
  rectHeight: number,
  maxDeg = 6
): {
  nx: number;
  ny: number;
  rotateXdeg: number;
  rotateYdeg: number;
  mxPct: number;
  myPct: number;
} => {
  const w = Math.max(1, rectWidth);
  const h = Math.max(1, rectHeight);
  const rawNx = ((clientX - rectLeft) / w) * 2 - 1;
  const rawNy = ((clientY - rectTop) / h) * 2 - 1;
  const nx = Math.round(clamp(rawNx, -1, 1) * 1000) / 1000;
  const ny = Math.round(clamp(rawNy, -1, 1) * 1000) / 1000;
  const rx = Math.round(-ny * maxDeg * 100) / 100;
  const ry = Math.round(nx * maxDeg * 100) / 100;
  const mxPct = Math.round(clamp((nx + 1) * 50, 0, 100) * 10) / 10;
  const myPct = Math.round(clamp((ny + 1) * 50, 0, 100) * 10) / 10;
  return {
    nx: nx === 0 ? 0 : nx,
    ny: ny === 0 ? 0 : ny,
    rotateXdeg: rx === 0 ? 0 : rx,
    rotateYdeg: ry === 0 ? 0 : ry,
    mxPct,
    myPct,
  };
};

export const calcCapabilityDragPhysics = (
  dx: number,
  dy: number,
  thresholdPx = 8
): {
  translateXpx: number;
  translateYpx: number;
  skewXdeg: number;
  isDragging: boolean;
} => {
  const safeDx = Number.isFinite(dx) ? dx : 0;
  const safeDy = Number.isFinite(dy) ? dy : 0;
  const dist = Math.hypot(safeDx, safeDy);
  const translateXpx = Math.round(safeDx * 0.22 * 100) / 100;
  const translateYpx = Math.round(safeDy * 0.22 * 100) / 100;
  const skewXdeg = Math.round(clamp(safeDx * -0.04, -5, 5) * 100) / 100;
  return {
    translateXpx: translateXpx === 0 ? 0 : translateXpx,
    translateYpx: translateYpx === 0 ? 0 : translateYpx,
    skewXdeg: skewXdeg === 0 ? 0 : skewXdeg,
    isDragging: dist > thresholdPx,
  };
};

export const calcCapabilityMobileDeckState = (
  viewportCenterX: number,
  cardCentersX: readonly number[],
  cardWidthPx: number
): {
  activeIndex: number;
  scales: number[];
  opacities: number[];
  statusText: string;
} => {
  const count = cardCentersX.length;
  if (count === 0) {
    return {
      activeIndex: 0,
      scales: [],
      opacities: [],
      statusText: '[ SWIPE // 01 OF 01 ]',
    };
  }
  const spanPx = Math.max(1, cardWidthPx);
  let activeIndex = 0;
  let bestDist = Infinity;
  const scales: number[] = [];
  const opacities: number[] = [];

  for (let i = 0; i < count; i += 1) {
    const dist = Math.abs(cardCentersX[i] - viewportCenterX);
    if (dist < bestDist) {
      bestDist = dist;
      activeIndex = i;
    }
    const t = clamp(dist / spanPx, 0, 1);
    const scale = Math.round((1 - t * 0.07) * 1000) / 1000;
    const opacity = Math.round((1 - t * 0.45) * 1000) / 1000;
    scales.push(scale);
    opacities.push(opacity);
  }

  const activeNum = String(activeIndex + 1).padStart(2, '0');
  const totalNum = String(count).padStart(2, '0');
  return {
    activeIndex,
    scales,
    opacities,
    statusText: `[ SWIPE // ${activeNum} OF ${totalNum} ]`,
  };
};
export const calcHorizontalCounterState = (
  progress: number,
  totalItems: number
): {
  activeIndex: number;
  total: number;
  label: string;
} => {
  const safeTotal = Math.max(1, Math.floor(Number.isFinite(totalItems) ? totalItems : 1));
  const clamped = clamp(Number.isFinite(progress) ? progress : 0, 0, 1);
  const activeIndex = Math.min(Math.floor(clamped * safeTotal) + 1, safeTotal);
  const activeStr = String(activeIndex).padStart(2, '0');
  const totalStr = String(safeTotal).padStart(2, '0');
  return {
    activeIndex,
    total: safeTotal,
    label: `${activeStr} / ${totalStr}`,
  };
};

export const formatCertificateId = (id?: string | null): string => {
  const cleaned = typeof id === 'string' ? id.trim() : '';
  return `ID NO // ${cleaned || '—'}`;
};

export const hasValidCertImageSrc = (src?: string | null): boolean => {
  return typeof src === 'string' && src.trim().length > 0;
};

export const PROTECTED_IMAGE_CONTAINER_CLASSES = [
  'card-inner',
  'card-img-wrap',
  'card-reflection',
  'vision-aperture',
  'cylinder-frame',
  'partner-logo-wrap',
  'systems-media',
  'studio-frame',
  'editorial-deck-media',
  'cert-frame',
  'badge-frame',
  'canvas-card',
  'artistry-frame',
  'clip-reveal',
] as const;

export const PROTECTED_IMAGE_CONTAINER_SELECTOR =
  '[data-image-protection], ' +
  PROTECTED_IMAGE_CONTAINER_CLASSES.map((cls) => `.${cls}`).join(', ');

export const PROTECTED_IMAGE_MATCH_SELECTOR =
  `img, ${PROTECTED_IMAGE_CONTAINER_SELECTOR}`;

export interface ImageTargetDescriptor {
  tagName?: string | null;
  hasClosestImg?: boolean;
  hasDataImageProtection?: boolean;
  hasProtectedContainerAncestor?: boolean;
  isExemptInteractiveControl?: boolean;
}

export const shouldProtectImageInteraction = (
  desc: ImageTargetDescriptor | null | undefined
): boolean => {
  if (!desc || desc.isExemptInteractiveControl) return false;
  const tag = typeof desc.tagName === 'string' ? desc.tagName.toUpperCase() : '';
  if (tag === 'IMG' || desc.hasClosestImg === true) return true;
  if (desc.hasDataImageProtection === true) return true;
  if (desc.hasProtectedContainerAncestor === true) return true;
  return false;
};
