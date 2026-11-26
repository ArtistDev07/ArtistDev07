import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clamp,
  mix,
  ease,
  out,
  span,
  calculateDepth,
  calculateEdge,
  calculateRibbonPoint,
  calculateFov,
  lenisEasing,
  lerp,
  calcMagneticOffset,
  calcWordProgress,
  calcParallax,
  calcMarqueeSpeed,
  normalizeRoute,
  isMagneticEnabled,
  getRouteMetadata,
  canTransition,
  isMotionReduced,
  debounce,
  calcHorizontalProgress,
  calcHorizontalTranslate,
  calcCardTilt,
  calcLiquidRipple,
  calcTimelineProgress,
  calcVelocitySkew,
  calcMasonryParallax,
  calcImageScale,
  calcArchiveMagnetic,
  calcCountUp,
  calcHairlineScale,
  calcWallParallax,
  calcCertHorizontalTranslate,
  calcCertVelocitySkew,
  calcBadgeVelocityScale,
  calcSkylineTranslate,
  calcSkylineCardScale,
  calcSkylineImagePan,
  calcAccoladeVelocitySkew,
  calcAccoladeImagePan,
  calcTunnelProgress,
  calcTunnelTrackZ,
  calcSpatialFrameDepth,
  calcSpatialTilt,
  calcPartnerStaggerDelay,
  calcVisionParallaxY,
  calcVisionApertureMotion,
  calcFloatingFrameParallaxY,
  calcMagneticRepulsion,
  calcArtistryTrackTranslate,
  calcArtistryFrameFocus,
  calcHorizontalFocusScrollTarget,
  calcTunnelFocusScrollTarget,
  isTouchCapableEnv,
  resolveRouteKey,
  calcCanvasCardTransform,
  calcCanvasActiveLayer,
  computeBadgeCategoryCounts,
  filterBadgeItems,
  isAllowedProxyImageUrl,
  getWebGLTextureSrc,
  calcCylinderRadius,
  calcCylinderRotationDeg,
  calcCylinderFrameFocus,
  calcCylinderActiveIndex,
  calcCylinderFocusScrollTarget,
  formatISTClock,
  generateContactRefCode,
  calcContactMagneticOffset,
  validateContactBrief,
  toggleContactScope,
  computeStudioCategoryCounts,
  filterStudioFrames,
  resolveCapabilityRoute,
  getCapabilityClusterTag,
  calcCapabilityBladeTilt,
  calcCapabilityDragPhysics,
  calcCapabilityMobileDeckState,
  calcHorizontalCounterState,
  formatCertificateId,
  hasValidCertImageSrc,
  PROTECTED_IMAGE_CONTAINER_CLASSES,
  PROTECTED_IMAGE_CONTAINER_SELECTOR,
  PROTECTED_IMAGE_MATCH_SELECTOR,
  shouldProtectImageInteraction,
} from './math';
import {
  WORK_MARQUEE_ITEMS,
  SYSTEMS_MARQUEE_ITEMS,
  STUDIO_MARQUEE_ITEMS,
  EDITORIAL_MARQUEE_ITEMS,
  renderBrandLogoSvg,
  renderMarqueeStripHtml,
} from './marqueeLogos';

test('clamp restricts values to range', () => {
  assert.equal(clamp(0.5, 0, 1), 0.5);
  assert.equal(clamp(-0.2, 0, 1), 0);
  assert.equal(clamp(1.5, 0, 1), 1);
});

test('mix performs linear interpolation', () => {
  assert.equal(mix(0, 10, 0), 0);
  assert.equal(mix(0, 10, 1), 10);
  assert.equal(mix(0, 10, 0.5), 5);
  assert.equal(mix(-50, 76, 0.5), 13);
});

test('span scales and clamps progress into subrange', () => {
  assert.equal(span(0.1, 0.2, 0.6), 0);
  assert.ok(Math.abs(span(0.4, 0.2, 0.6) - 0.5) < 1e-6);
  assert.equal(span(0.7, 0.2, 0.6), 1);
});

test('out cubic easing behaves correctly at endpoints', () => {
  assert.equal(out(0), 0);
  assert.equal(out(1), 1);
  assert.ok(out(0.5) > 0.5); // easing out starts fast
});

test('ease smoothstep behaves correctly', () => {
  assert.equal(ease(0), 0);
  assert.equal(ease(1), 1);
  assert.equal(ease(0.5), 0.5);
});

test('calculateDepth produces shallow arc in front and deep runs behind', () => {
  // when cs > 0 (e.g. ph = 0, cs = 1) -> 7.6 + 16.4 = 24
  const depthFar = calculateDepth(0);
  assert.ok(Math.abs(depthFar - 24) < 1e-4);

  // when cs < 0 (e.g. ph = PI, cs = -1) -> 7.6 - 2.2 = 5.4
  const depthNear = calculateDepth(Math.PI);
  assert.ok(Math.abs(depthNear - 5.4) < 1e-4);
});

test('calculateEdge expands near start and end of ribbon', () => {
  const edgeMid = calculateEdge(0.5);
  assert.equal(edgeMid, 0.84);

  const edgeStart = calculateEdge(0);
  assert.ok(edgeStart > 0.84);

  const edgeEnd = calculateEdge(1);
  assert.ok(edgeEnd > 0.84);
});

test('calculateRibbonPoint returns 3D coordinates', () => {
  const pt = calculateRibbonPoint(0.5, Math.PI);
  assert.equal(pt.length, 3);
  assert.ok(pt[2] < 0); // negative depth along camera -Z
});

test('calculateFov maintains horizontal width on aspect < 16/9', () => {
  const wideFov = calculateFov(16 / 9);
  assert.equal(wideFov, 35);

  const portraitFov = calculateFov(9 / 16);
  assert.ok(portraitFov > 35);
});

test('lenisEasing matches exponential decay towards 1', () => {
  assert.ok(lenisEasing(0) < 0.01);
  assert.ok(lenisEasing(1) >= 0.999);
  assert.ok(lenisEasing(0.5) > 0.95);
});

test('lerp correctly blends values', () => {
  assert.equal(lerp(0, 100, 0.5), 50);
  assert.equal(lerp(20, 40, 0.1), 22);
});

test('calcMagneticOffset calculates bounded displacement towards cursor', () => {
  const center = { x: 500, y: 500 };
  const inside = calcMagneticOffset(550, 500, center.x, center.y, 0.3, 40);
  assert.equal(inside.distance, 50);
  assert.equal(inside.x, 15);
  assert.equal(inside.y, 0);

  // Far away offset clamped to 40 max
  const far = calcMagneticOffset(800, 500, center.x, center.y, 0.3, 40);
  assert.equal(far.x, 40);
});

test('calcWordProgress staggers word reveal across section progress', () => {
  const firstWord = calcWordProgress(0.2, 0, 10);
  const lastWord = calcWordProgress(0.2, 9, 10);
  assert.ok(firstWord > 0);
  assert.equal(lastWord, 0);

  const completedLastWord = calcWordProgress(0.9, 9, 10);
  assert.equal(completedLastWord, 1);
});

test('calcParallax bounds output between -maxPercent and +maxPercent', () => {
  const atBottom = calcParallax(900, 200, 900, 10);
  assert.equal(atBottom, -10);

  const atTop = calcParallax(-200, 200, 900, 10);
  assert.equal(atTop, 10);

  const atMid = calcParallax(350, 200, 900, 10);
  assert.ok(Math.abs(atMid) <= 10);
});

test('calcMarqueeSpeed accelerates with scroll velocity', () => {
  const idle = calcMarqueeSpeed(1, 0);
  assert.equal(idle, 1);

  const boosted = calcMarqueeSpeed(1, 50, 0.05, 10);
  assert.ok(boosted > 1);

  const capped = calcMarqueeSpeed(1, 1000, 0.05, 10);
  assert.equal(capped, 10);
});

test('normalizeRoute cleans paths', () => {
  assert.equal(normalizeRoute(''), '/');
  assert.equal(normalizeRoute('/'), '/');
  assert.equal(normalizeRoute('/work/'), '/work');
  assert.equal(normalizeRoute('/about?query=1'), '/about');
  assert.equal(normalizeRoute('/contact#team'), '/contact');
});

test('isMagneticEnabled respects 768px breakpoint', () => {
  assert.equal(isMagneticEnabled(1024), true);
  assert.equal(isMagneticEnabled(768), true);
  assert.equal(isMagneticEnabled(390), false);
});

test('getRouteMetadata returns accurate SEO title, description, and announcer text', () => {
  const home = getRouteMetadata('/');
  assert.ok(home.title.includes('Craft in Motion'));
  assert.equal(home.announcerText, 'Navigated to Home');

  const work = getRouteMetadata('/work');
  assert.ok(work.title.includes('Selected Works'));
  assert.equal(work.announcerText, 'Navigated to Selected Works');

  const about = getRouteMetadata('/about');
  assert.ok(about.title.includes('Studio & Engineering Philosophy'));
  assert.equal(about.announcerText, 'Navigated to Studio Philosophy');
});

test('canTransition prevents race conditions during active transition', () => {
  assert.equal(canTransition(false), true);
  assert.equal(canTransition(true), false);
});

test('isMotionReduced forwards user preferences', () => {
  assert.equal(isMotionReduced(true), true);
  assert.equal(isMotionReduced(false), false);
});

test('debounce delays function invocation', async () => {
  let callCount = 0;
  const fn = debounce(() => {
    callCount++;
  }, 50);

  fn();
  fn();
  fn();
  assert.equal(callCount, 0);

  await new Promise((r) => setTimeout(r, 70));
  assert.equal(callCount, 1);
});

test('calcHorizontalProgress correctly maps section vertical scroll to 0..1', () => {
  const sectionHeight = 4000;
  const vh = 1000;
  // Section hasn't scrolled past top yet
  assert.equal(calcHorizontalProgress(100, sectionHeight, vh), 0);
  assert.equal(calcHorizontalProgress(0, sectionHeight, vh), 0);

  // Scrolled halfway through sticky zone (sectionTop = -1500, scrollable = 3000)
  assert.equal(calcHorizontalProgress(-1500, sectionHeight, vh), 0.5);

  // Reached end of sticky zone (sectionTop = -3000)
  assert.equal(calcHorizontalProgress(-3000, sectionHeight, vh), 1);

  // Scrolled past end
  assert.equal(calcHorizontalProgress(-4000, sectionHeight, vh), 1);
});

test('calcHorizontalTranslate computes bounded negative translation', () => {
  assert.equal(calcHorizontalTranslate(0, 2000), 0);
  assert.equal(calcHorizontalTranslate(0.5, 2000), -1000);
  assert.equal(calcHorizontalTranslate(1, 2000), -2000);
  assert.equal(calcHorizontalTranslate(1.5, 2000), -2000);
});

test('calcCardTilt calculates normalized mouse coordinates and bounded rotation angles', () => {
  const tiltCenter = calcCardTilt(300, 200, 100, 100, 400, 200, 5);
  assert.equal(tiltCenter.mouseX, 0);
  assert.equal(tiltCenter.mouseY, 0);
  assert.equal(tiltCenter.rotateX, 0);
  assert.equal(tiltCenter.rotateY, 0);

  // Mouse at right edge (clientX = 500)
  const tiltRight = calcCardTilt(500, 200, 100, 100, 400, 200, 5);
  assert.equal(tiltRight.mouseX, 1);
  assert.equal(tiltRight.rotateY, 5);

  // Mouse at bottom edge (clientY = 300)
  const tiltBottom = calcCardTilt(300, 300, 100, 100, 400, 200, 5);
  assert.equal(tiltBottom.mouseY, -1);
  assert.equal(tiltBottom.rotateX, -5);
});

test('calcLiquidRipple oscillates at rest and amplifies with scroll velocity', () => {
  const atRest1 = calcLiquidRipple(0, 0);
  const atRest2 = calcLiquidRipple(1, 0);
  assert.ok(atRest1.scale >= 3.5 && atRest1.scale <= 8.5);
  assert.notEqual(atRest1.scale, atRest2.scale);

  // High velocity ripples aggressively
  const highVelocity = calcLiquidRipple(0, 50);
  assert.ok(highVelocity.scale > atRest1.scale + 20);
  assert.ok(highVelocity.freqY > atRest1.freqY);
});

test('calcTimelineProgress measures scroll through timeline section', () => {
  // Before section arrives
  assert.equal(calcTimelineProgress(1200, 1000, 800), 0);
  // Halfway through
  const mid = calcTimelineProgress(-20, 1000, 800);
  assert.ok(mid > 0.4 && mid < 0.6);
  // Passed section
  assert.equal(calcTimelineProgress(-1000, 1000, 800), 1);
});

test('calcVelocitySkew scales with scroll velocity and clamps at max', () => {
  assert.equal(calcVelocitySkew(0), 0);
  assert.equal(calcVelocitySkew(10, 0.2), 2);
  assert.equal(calcVelocitySkew(-10, 0.2), -2);
  assert.equal(calcVelocitySkew(100, 0.2, 12), 12);
  assert.equal(calcVelocitySkew(-100, 0.2, 12), -12);
});

test('calcMasonryParallax applies speed multiplier to scroll', () => {
  assert.equal(calcMasonryParallax(1000, -0.05), -50);
  assert.equal(calcMasonryParallax(1000, -0.15), -150);
  assert.equal(calcMasonryParallax(0, -0.15), 0);
});

test('calcImageScale interpolates from 1.2 down to 1.0', () => {
  assert.equal(calcImageScale(0), 1.2);
  assert.equal(calcImageScale(0.5), 1.1);
  assert.equal(calcImageScale(1), 1.0);
  assert.equal(calcImageScale(2), 1.0);
});

test('calcArchiveMagnetic pulls smoothly towards cursor within max radius', () => {
  const center = calcArchiveMagnetic(500, 500, 500, 500);
  assert.equal(center.x, 0);
  assert.equal(center.y, 0);

  const offset = calcArchiveMagnetic(600, 500, 500, 500, 0.15, 45);
  assert.equal(offset.x, 15);
  assert.equal(offset.y, 0);

  // Clamped at max pull
  const far = calcArchiveMagnetic(1500, 500, 500, 500, 0.15, 45);
  assert.equal(far.x, 45);
});

test('calcCountUp counts up smoothly with cubic out easing', () => {
  assert.equal(calcCountUp(0, 100), 0);
  assert.equal(calcCountUp(1, 100), 100);
  // Cubic ease out at progress 0.5 is 1 - 0.5^3 = 0.875
  assert.equal(calcCountUp(0.5, 100), 88);
  assert.equal(calcCountUp(1.5, 1200), 1200);
});

test('calcHairlineScale scales rule based on section proximity to viewport', () => {
  // Far below viewport
  assert.equal(calcHairlineScale(1200, 800), 0);
  // Reached target
  assert.equal(calcHairlineScale(200, 800), 1);
  // In between
  const mid = calcHairlineScale(480, 800, 0.9, 0.3);
  assert.ok(mid > 0 && mid < 1);
});

test('calcWallParallax applies opposing multi-speed drift for columns', () => {
  // Odd column (-0.04)
  assert.equal(calcWallParallax(1000, false), -40);
  // Even column (0.06)
  assert.equal(calcWallParallax(1000, true), 60);
  assert.equal(calcWallParallax(0, true), 0);
});

test('calcCertHorizontalTranslate translates within 0..maxDistance', () => {
  assert.equal(calcCertHorizontalTranslate(0, 3000), 0);
  assert.equal(calcCertHorizontalTranslate(0.5, 3000), -1500);
  assert.equal(calcCertHorizontalTranslate(1, 3000), -3000);
  assert.equal(calcCertHorizontalTranslate(1.2, 3000), -3000);
});

test('calcCertVelocitySkew skews proportionally to velocity and clamps', () => {
  assert.equal(calcCertVelocitySkew(0), 0);
  assert.equal(calcCertVelocitySkew(10), -5);
  assert.equal(calcCertVelocitySkew(-10), 5);
  assert.equal(calcCertVelocitySkew(50), -15);
  assert.equal(calcCertVelocitySkew(-50), 15);
});

test('calcBadgeVelocityScale scales down subtly at high velocity', () => {
  assert.equal(calcBadgeVelocityScale(0), 1);
  assert.equal(calcBadgeVelocityScale(5), 0.99);
  assert.equal(calcBadgeVelocityScale(20), 0.98);
  assert.equal(calcBadgeVelocityScale(100), 0.98);
});

test('calcSkylineTranslate bounds negative translation within scroll progress', () => {
  assert.equal(calcSkylineTranslate(0, 2000), 0);
  assert.equal(calcSkylineTranslate(0.5, 2000), -1000);
  assert.equal(calcSkylineTranslate(1, 2000), -2000);
  assert.equal(calcSkylineTranslate(1.5, 2000), -2000);
});

test('calcSkylineCardScale peaks at center and smoothly decays toward edges', () => {
  const radius = 600;
  // Exactly at center: maxScale (1.15)
  assert.equal(calcSkylineCardScale(0, radius, 0.9, 1.15), 1.15);
  // Halfway: quadratic falloff (0.5^2 = 0.25 -> 0.9 + 0.25 * 0.25 = 0.9625)
  const midScale = calcSkylineCardScale(300, radius, 0.9, 1.15);
  assert.ok(midScale > 0.9 && midScale < 1.15);
  // At edge or beyond: minScale (0.9)
  assert.equal(calcSkylineCardScale(600, radius, 0.9, 1.15), 0.9);
  assert.equal(calcSkylineCardScale(1000, radius, 0.9, 1.15), 0.9);
});

test('calcSkylineImagePan pans inversely to distance from center', () => {
  const radius = 500;
  assert.equal(calcSkylineImagePan(0, radius, 30), 0);
  assert.equal(calcSkylineImagePan(250, radius, 30), -15);
  assert.equal(calcSkylineImagePan(-250, radius, 30), 15);
  assert.equal(calcSkylineImagePan(500, radius, 30), -30);
});

test('calcAccoladeVelocitySkew computes velocity skew and respects clamping bounds', () => {
  assert.equal(calcAccoladeVelocitySkew(0), 0);
  assert.equal(calcAccoladeVelocitySkew(10, -0.2, 8), -2);
  assert.equal(calcAccoladeVelocitySkew(-10, -0.2, 8), 2);
  assert.equal(calcAccoladeVelocitySkew(100, -0.2, 8), -8);
  assert.equal(calcAccoladeVelocitySkew(-100, -0.2, 8), 8);
});

test('calcAccoladeImagePan subtly shifts image based on viewport center offset', () => {
  const radius = 600;
  assert.equal(calcAccoladeImagePan(0, radius, 24), 0);
  assert.equal(calcAccoladeImagePan(300, radius, 24), -12);
  assert.equal(calcAccoladeImagePan(-300, radius, 24), 12);
  assert.equal(calcAccoladeImagePan(900, radius, 24), -24);
  assert.equal(calcAccoladeImagePan(0, 0, 24), 0);
});

test('calcTunnelProgress maps section scroll within range', () => {
  const height = 6000;
  const vh = 1000;
  assert.equal(calcTunnelProgress(100, height, vh), 0);
  assert.equal(calcTunnelProgress(0, height, vh), 0);
  assert.equal(calcTunnelProgress(-2500, height, vh), 0.5);
  assert.equal(calcTunnelProgress(-5000, height, vh), 1);
  assert.equal(calcTunnelProgress(-7000, height, vh), 1);
});

test('calcTunnelTrackZ scales track forward from 0px to maxZ', () => {
  assert.equal(calcTunnelTrackZ(0, 18000), 0);
  assert.equal(calcTunnelTrackZ(0.5, 18000), 9000);
  assert.equal(calcTunnelTrackZ(1, 18000), 18000);
  assert.equal(calcTunnelTrackZ(1.2, 18000), 18000);
});

test('calcSpatialFrameDepth computes depth blur, brightness, and camera fly-past opacity', () => {
  // Far away (-3000px)
  const far = calcSpatialFrameDepth(-3000, 0);
  assert.equal(far.worldZ, -3000);
  assert.equal(far.blurPx, 10);
  assert.equal(far.brightness, 0.4);
  assert.equal(far.opacity, 1.0);
  assert.equal(far.isInteractable, false);

  // In foreground near camera (-200px)
  const near = calcSpatialFrameDepth(-200, 0);
  assert.equal(near.worldZ, -200);
  assert.ok(near.blurPx < 1);
  assert.ok(near.brightness > 0.95);
  assert.equal(near.opacity, 1.0);
  assert.equal(near.isInteractable, true);

  // Flying past camera (z > 200px)
  const past = calcSpatialFrameDepth(-1000, 1400); // worldZ = 400
  assert.equal(past.worldZ, 400);
  assert.equal(past.opacity, 0.5); // halfway between 200 and 600

  // Completely behind camera
  const behind = calcSpatialFrameDepth(-1000, 1700); // worldZ = 700
  assert.equal(behind.opacity, 0);
  assert.equal(behind.isInteractable, false);
});

test('calcSpatialTilt normalizes and bounds 3D rotation angles', () => {
  const center = calcSpatialTilt(0, 0, 10);
  assert.equal(center.rotateX, 0);
  assert.equal(center.rotateY, 0);

  const corner = calcSpatialTilt(1, -1, 10);
  assert.equal(corner.rotateX, 10);
  assert.equal(corner.rotateY, 10);
});

test('calcPartnerStaggerDelay computes sequential delay for domino reveal', () => {
  assert.equal(calcPartnerStaggerDelay(0, 0.05), 0);
  assert.equal(calcPartnerStaggerDelay(1, 0.05), 0.05);
  assert.equal(calcPartnerStaggerDelay(5, 0.05), 0.25);
  assert.equal(calcPartnerStaggerDelay(11, 0.05), 0.55);
  assert.equal(calcPartnerStaggerDelay(-2, 0.05), 0);
});

test('calcVisionParallaxY maps viewport traversal smoothly from -15% to 15%', () => {
  const vh = 900;
  const h = 900;
  assert.equal(calcVisionParallaxY(vh, h, vh, 15), -15);
  assert.equal(calcVisionParallaxY(0, h, vh, 15), 0);
  assert.equal(calcVisionParallaxY(-h, h, vh, 15), 15);
});

test('calcFloatingFrameParallaxY computes vertical offset from relative scroll and speed', () => {
  assert.equal(calcFloatingFrameParallaxY(0, -0.1), 0);
  assert.equal(calcFloatingFrameParallaxY(500, -0.1), -50);
  assert.equal(calcFloatingFrameParallaxY(500, 0.2), 100);
});

test('calcMagneticRepulsion pushes frame away from cursor within radius up to maxRepulsionPx', () => {
  // Outside radius: no repulsion
  const far = calcMagneticRepulsion(100, 100, 600, 600, 320, 30);
  assert.equal(far.x, 0);
  assert.equal(far.y, 0);

  // Cursor left of frame: pushes frame right (+x)
  const rightPush = calcMagneticRepulsion(200, 200, 100, 200, 320, 30);
  assert.ok(rightPush.x > 0 && rightPush.x <= 30);
  assert.equal(rightPush.y, 0);

  // Very close cursor: bounded by maxRepulsionPx (30)
  const nearPush = calcMagneticRepulsion(200, 200, 199, 200, 320, 30);
  assert.ok(nearPush.x > 29 && nearPush.x <= 30);
});

test('calcArtistryTrackTranslate bounds horizontal shift to negative maxDistance', () => {
  assert.equal(calcArtistryTrackTranslate(0, 2400), 0);
  assert.equal(calcArtistryTrackTranslate(0.5, 2400), -1200);
  assert.equal(calcArtistryTrackTranslate(1, 2400), -2400);
  assert.equal(calcArtistryTrackTranslate(1.5, 2400), -2400);
});

test('calcArtistryFrameFocus peaks scale/color at center and fades toward edges', () => {
  const radius = 600;
  const center = calcArtistryFrameFocus(0, radius, 0.85, 1.05, 80);
  assert.equal(center.scale, 1.05);
  assert.equal(center.grayscale, 0);
  assert.equal(center.overlayOpacity, 1);

  const edge = calcArtistryFrameFocus(600, radius, 0.85, 1.05, 80);
  assert.equal(edge.scale, 0.85);
  assert.equal(edge.grayscale, 80);
  assert.equal(edge.overlayOpacity, 0);

  const mid = calcArtistryFrameFocus(300, radius, 0.85, 1.05, 80);
  assert.ok(mid.scale > 0.85 && mid.scale < 1.05);
  assert.ok(mid.grayscale > 0 && mid.grayscale < 80);
});

test('calcHorizontalFocusScrollTarget computes document scrollY to center focused track cards', () => {
  assert.equal(calcHorizontalFocusScrollTarget(1000, 4000, 1000, 0, 4), 1000);
  assert.equal(calcHorizontalFocusScrollTarget(1000, 4000, 1000, 1, 4), 2000);
  assert.equal(calcHorizontalFocusScrollTarget(1000, 4000, 1000, 3, 4), 4000);
  assert.equal(calcHorizontalFocusScrollTarget(500, 1000, 1000, 2, 1), 500);
});

test('calcTunnelFocusScrollTarget maps Z-axis frame depth into foreground camera scrollY', () => {
  const sectionTop = 2000;
  const sectionHeight = 6000;
  const vh = 1000;
  // Frame with initZ = -1000 wants trackZ = 820 for worldZ = -180 -> progress = 820 / 18000
  const scrollFirst = calcTunnelFocusScrollTarget(sectionTop, sectionHeight, vh, -1000, 18000, -180);
  assert.ok(scrollFirst > sectionTop && scrollFirst < sectionTop + 400);

  // Deep frame with initZ = -17500 wants trackZ = 17320 -> near end of 5000px scrollable span
  const scrollLast = calcTunnelFocusScrollTarget(sectionTop, sectionHeight, vh, -17500, 18000, -180);
  assert.ok(scrollLast > sectionTop + 4500 && scrollLast <= sectionTop + 5000);

  // 10-frame 500vh calibration (maxZ = 15000, initZ = -14500)
  const scroll10Last = calcTunnelFocusScrollTarget(sectionTop, 5000, vh, -14500, 15000, -180);
  assert.ok(scroll10Last > sectionTop + 3600 && scroll10Last <= sectionTop + 4000);
});

test('isTouchCapableEnv returns true only when hover is none and pointer is coarse', () => {
  assert.equal(isTouchCapableEnv(true, true), true);
  assert.equal(isTouchCapableEnv(false, true), false);
  assert.equal(isTouchCapableEnv(true, false), false);
  assert.equal(isTouchCapableEnv(false, false), false);
});

test('resolveRouteKey validates known SPA routes and returns null on unknown paths', () => {
  const known = ['/', '/work', '/credentials', '/about', '/contact'];
  assert.equal(resolveRouteKey('/', known), '/');
  assert.equal(resolveRouteKey('/work/', known), '/work');
  assert.equal(resolveRouteKey('/credentials?tab=1', known), '/credentials');
  assert.equal(resolveRouteKey('/unknown-404', known), null);
});

test('calcCanvasCardTransform stacks 5 cards smoothly from 120vh to 0vh and scales earlier cards down', () => {
  // At progress 0: Card 1 is centered at 0vh scale 1, Cards 2..5 wait at 120vh
  const c0Start = calcCanvasCardTransform(0, 0, 5);
  assert.equal(c0Start.translateYvh, 0);
  assert.equal(c0Start.scale, 1);
  assert.equal(c0Start.brightness, 1);

  const c1Start = calcCanvasCardTransform(0, 1, 5);
  assert.equal(c1Start.translateYvh, 120);
  assert.equal(c1Start.scale, 1);

  const c4Start = calcCanvasCardTransform(0, 4, 5);
  assert.equal(c4Start.translateYvh, 120);

  // At progress 0.25: Card 2 has arrived at 0vh scale 1, Card 1 scaled down behind it
  const c0AtQ1 = calcCanvasCardTransform(0.25, 0, 5);
  assert.ok(c0AtQ1.scale < 1 && c0AtQ1.scale > 0.9);
  assert.ok(c0AtQ1.translateYvh < 0);
  const c1AtQ1 = calcCanvasCardTransform(0.25, 1, 5);
  assert.equal(c1AtQ1.translateYvh, 0);
  assert.equal(c1AtQ1.scale, 1);

  // At progress 1.0: Card 5 is active on top at 0vh scale 1, Cards 1..4 stacked beneath with monotonic decreasing scale
  const c4End = calcCanvasCardTransform(1, 4, 5);
  assert.equal(c4End.translateYvh, 0);
  assert.equal(c4End.scale, 1);
  assert.equal(c4End.rotateZdeg, 0);
  const c3End = calcCanvasCardTransform(1, 3, 5);
  const c0End = calcCanvasCardTransform(1, 0, 5);
  assert.ok(c0End.scale < c3End.scale && c3End.scale < c4End.scale);

  // 6-card stack alternating rotateZdeg tilt verification
  const c6_0 = calcCanvasCardTransform(1, 0, 6);
  const c6_1 = calcCanvasCardTransform(1, 1, 6);
  const c6_4 = calcCanvasCardTransform(1, 4, 6);
  const c6_5 = calcCanvasCardTransform(1, 5, 6);
  assert.ok(c6_0.rotateZdeg < 0);
  assert.ok(c6_1.rotateZdeg > 0);
  assert.ok(c6_4.rotateZdeg < 0);
  assert.equal(c6_5.translateYvh, 0);
  assert.equal(c6_5.scale, 1);
  assert.equal(c6_5.rotateZdeg, 0);
});

test('computeBadgeCategoryCounts and filterBadgeItems return exact category totals and subsets', () => {
  const sample = [
    { category: 'GOOGLE' as const, id: 1 },
    { category: 'GOOGLE' as const, id: 2 },
    { category: 'MICROSOFT' as const, id: 3 },
    { category: 'AWS' as const, id: 4 },
    { category: 'POSTMAN' as const, id: 5 },
    { category: 'IBM' as const, id: 6 },
    { category: 'CISCO' as const, id: 7 },
    { category: 'ISC2' as const, id: 8 },
    { category: 'MOOC.FI' as const, id: 9 },
    { category: 'GSOC' as const, id: 10 },
  ];
  const counts = computeBadgeCategoryCounts(sample);
  assert.equal(counts.ALL, 10);
  assert.equal(counts.GOOGLE, 2);
  assert.equal(counts.MICROSOFT, 1);
  assert.equal(counts.ISC2, 1);
  assert.equal(counts['MOOC.FI'], 1);
  assert.equal(counts.GSOC, 1);

  assert.equal(filterBadgeItems(sample, 'ALL').length, 10);
  assert.equal(filterBadgeItems(sample, 'GOOGLE').length, 2);
  assert.equal(filterBadgeItems(sample, 'POSTMAN')[0].id, 5);
  assert.equal(filterBadgeItems(sample, 'MOOC.FI')[0].id, 9);
  assert.equal(filterBadgeItems(sample, 'GSOC')[0].id, 10);
});

test('calcVisionApertureMotion maps entry, center viewport, and exit transforms accurately', () => {
  const vh = 900;
  const h = 990;

  // Entry: top === vh -> progress 0
  const entry = calcVisionApertureMotion(vh, h, vh);
  assert.equal(entry.progress, 0);
  assert.equal(entry.percent, 0);
  assert.equal(entry.topLineXvw, -4);
  assert.equal(entry.botLineXvw, 4);
  assert.equal(entry.clipInsetPct, 32);
  assert.equal(entry.imgPanPct, -6);

  // Center viewport: top === (vh - h) / 2 -> progress 0.5
  const center = calcVisionApertureMotion((vh - h) / 2, h, vh);
  assert.equal(center.progress, 0.5);
  assert.equal(center.percent, 50);
  assert.equal(center.topLineXvw, 0);
  assert.equal(center.botLineXvw, 0);
  assert.equal(center.clipInsetPct, 0);
  assert.equal(center.imgPanPct, -3);

  // Exit: top === -h -> progress 1
  const exit = calcVisionApertureMotion(-h, h, vh);
  assert.equal(exit.progress, 1);
  assert.equal(exit.percent, 100);
  assert.equal(exit.topLineXvw, 4);
  assert.equal(exit.botLineXvw, -4);
  assert.equal(exit.clipInsetPct, 0);
  assert.equal(exit.imgPanPct, 0);
});

test('isAllowedProxyImageUrl strictly allows https://i.pinimg.com URLs and rejects SSRF targets', () => {
  const valid = isAllowedProxyImageUrl('https://i.pinimg.com/736x/15/63/be/1563bec75f9503fda9661df1ab0d2134.jpg');
  assert.ok(valid !== null);
  assert.equal(valid?.hostname, 'i.pinimg.com');

  assert.equal(isAllowedProxyImageUrl('http://i.pinimg.com/test.jpg'), null);
  assert.equal(isAllowedProxyImageUrl('https://evil.com/test.jpg'), null);
  assert.equal(isAllowedProxyImageUrl('https://127.0.0.1:8080/secret'), null);
  assert.equal(isAllowedProxyImageUrl('https://user@i.pinimg.com/test.jpg'), null);
  assert.equal(isAllowedProxyImageUrl('not-a-url'), null);
});

test('getWebGLTextureSrc wraps i.pinimg.com URLs through /api/image-proxy and keeps local assets intact', () => {
  const pin = 'https://i.pinimg.com/736x/15/63/be/1563bec75f9503fda9661df1ab0d2134.jpg';
  assert.equal(getWebGLTextureSrc(pin), `/api/image-proxy?url=${encodeURIComponent(pin)}`);
  assert.equal(getWebGLTextureSrc('/assets/local.jpg'), '/assets/local.jpg');
});

test('calcCylinderRadius clamps desktop radius to 420..820 and returns 240 on mobile', () => {
  assert.equal(calcCylinderRadius(390), 240);
  assert.equal(calcCylinderRadius(767), 240);
  assert.equal(calcCylinderRadius(768), 420);
  assert.equal(calcCylinderRadius(1440), 748.8);
  assert.equal(calcCylinderRadius(1920), 820);
});

test('calcCylinderRotationDeg maps scroll progress 0..1 across 0..-324deg for 10 frames', () => {
  assert.equal(calcCylinderRotationDeg(0), 0);
  assert.equal(calcCylinderRotationDeg(0.5), -162);
  assert.equal(calcCylinderRotationDeg(1), -324);
  assert.equal(calcCylinderRotationDeg(1.5), -324);
  assert.equal(calcCylinderRotationDeg(-0.5), 0);
});

test('calcCylinderFrameFocus computes shortest angular diff, grayscale, brightness, and focus threshold', () => {
  // Frame 0 centered at 0deg
  const center = calcCylinderFrameFocus(0, 0);
  assert.equal(center.diffDeg, 0);
  assert.equal(center.focus, 1);
  assert.equal(center.grayscalePct, 0);
  assert.equal(center.brightness, 1.05);
  assert.equal(center.isFocused, true);

  // Adjacent frame at 36deg
  const adjacent = calcCylinderFrameFocus(1, 0);
  assert.equal(adjacent.diffDeg, 36);
  assert.equal(adjacent.focus, 0.5);
  assert.equal(adjacent.grayscalePct, 50);
  assert.equal(adjacent.brightness, 0.675);
  assert.equal(adjacent.isFocused, false);

  // Wrapped frame 9 at 324deg -> -36deg from front center
  const wrapped = calcCylinderFrameFocus(9, 0);
  assert.equal(wrapped.diffDeg, -36);
  assert.equal(wrapped.focus, 0.5);

  // Rear frame at 180deg -> focus 0
  const rear = calcCylinderFrameFocus(5, 0);
  assert.equal(Math.abs(rear.diffDeg), 180);
  assert.equal(rear.focus, 0);
  assert.equal(rear.grayscalePct, 100);
  assert.equal(rear.brightness, 0.3);
  assert.equal(rear.isFocused, false);

  // Final frame rotated to front center (-324deg)
  const lastCentered = calcCylinderFrameFocus(9, -324);
  assert.equal(lastCentered.diffDeg, 0);
  assert.equal(lastCentered.focus, 1);
  assert.equal(lastCentered.isFocused, true);
});

test('calcCylinderActiveIndex returns closest centered frame index 0..9', () => {
  assert.equal(calcCylinderActiveIndex(0), 0);
  assert.equal(calcCylinderActiveIndex(-36), 1);
  assert.equal(calcCylinderActiveIndex(-160), 4);
  assert.equal(calcCylinderActiveIndex(-164), 5);
  assert.equal(calcCylinderActiveIndex(-324), 9);
});

test('calcCylinderFocusScrollTarget maps frame index 0..9 cleanly across scrollable height', () => {
  assert.equal(calcCylinderFocusScrollTarget(1000, 4500, 1000, 0, 10), 1000);
  assert.equal(calcCylinderFocusScrollTarget(1000, 4500, 1000, 9, 10), 4500);
  assert.ok(calcCylinderFocusScrollTarget(1000, 4500, 1000, 3, 10) > 2100);
});

test('formatISTClock outputs INDORE, IN // HH:MM:SS IST in Asia/Kolkata timezone', () => {
  // 2026-11-24T00:00:00Z is 05:30:00 IST
  const sample = new Date('2026-11-24T00:00:00Z');
  assert.equal(formatISTClock(sample), 'INDORE, IN // 05:30:00 IST');
  const midnightUtc = new Date('2026-11-24T18:30:05Z');
  assert.equal(formatISTClock(midnightUtc), 'INDORE, IN // 00:00:05 IST');
});

test('generateContactRefCode produces padded REF // #YS-2026-XXXX tags', () => {
  assert.equal(generateContactRefCode(0), 'REF // #YS-2026-0000');
  assert.equal(generateContactRefCode(0.4829), 'REF // #YS-2026-4829');
  assert.equal(generateContactRefCode(0.99999), 'REF // #YS-2026-9999');
});

test('calcContactMagneticOffset clamps pull within maxOffsetPx and zeroes outside radius', () => {
  assert.deepEqual(calcContactMagneticOffset(500, 500, 500, 500, 12, 200), { x: 0, y: 0 });
  assert.deepEqual(calcContactMagneticOffset(900, 500, 500, 500, 12, 200), { x: 0, y: 0 });
  const pull = calcContactMagneticOffset(580, 560, 500, 500, 12, 220);
  assert.ok(Math.hypot(pull.x, pull.y) <= 12);
  assert.ok(pull.x > 0 && pull.y > 0);
});

test('validateContactBrief enforces required name, valid email, and brief message', () => {
  assert.equal(validateContactBrief({ name: '   ', email: 'bad', message: '' }).valid, false);
  assert.equal(validateContactBrief({ name: 'Yogesh', email: 'bad-email', message: 'Hi' }).valid, false);
  assert.equal(validateContactBrief({ name: 'Yogesh', email: 'yogesh@example.com', message: '   ' }).valid, false);
  assert.deepEqual(
    validateContactBrief({ name: 'Yogesh', email: 'yogesh@example.com', timeline: 'Q4', message: 'Build WebGL app' }),
    { valid: true, errors: [] }
  );
});

test('toggleContactScope immutably adds and removes topic pills', () => {
  const step1 = toggleContactScope([], 'AI / ML ENGINEERING');
  assert.deepEqual(step1, ['AI / ML ENGINEERING']);
  const step2 = toggleContactScope(step1, 'UI/UX DESIGN');
  assert.deepEqual(step2, ['AI / ML ENGINEERING', 'UI/UX DESIGN']);
  const step3 = toggleContactScope(step2, 'AI / ML ENGINEERING');
  assert.deepEqual(step3, ['UI/UX DESIGN']);
});

test('resolveRouteKey supports /work sub-routes alongside core routes', () => {
  const known = ['/', '/work', '/work/systems', '/work/studio', '/work/editorial', '/credentials', '/about', '/contact'];
  assert.equal(resolveRouteKey('/work/systems', known), '/work/systems');
  assert.equal(resolveRouteKey('/work/studio/', known), '/work/studio');
  assert.equal(resolveRouteKey('/work/editorial?ref=cap', known), '/work/editorial');
  assert.equal(resolveRouteKey('/work/unknown', known), null);
});

test('computeStudioCategoryCounts and filterStudioFrames enforce 50-frame totals (13+13+12+12)', () => {
  const categories = [
    ...Array.from({ length: 13 }, () => ({ category: 'BRANDING' as const })),
    ...Array.from({ length: 13 }, () => ({ category: 'GRAPHICS DESIGN' as const })),
    ...Array.from({ length: 12 }, () => ({ category: 'CONTENT CREATION' as const })),
    ...Array.from({ length: 12 }, () => ({ category: 'MARKETING & SEO' as const })),
  ];
  const counts = computeStudioCategoryCounts(categories);
  assert.equal(counts.ALL, 50);
  assert.equal(counts.BRANDING, 13);
  assert.equal(counts['GRAPHICS DESIGN'], 13);
  assert.equal(counts['CONTENT CREATION'], 12);
  assert.equal(counts['MARKETING & SEO'], 12);
  assert.equal(filterStudioFrames(categories, 'ALL').length, 50);
  assert.equal(filterStudioFrames(categories, 'BRANDING').length, 13);
  assert.equal(filterStudioFrames(categories, 'MARKETING & SEO').length, 12);
});

test('resolveCapabilityRoute maps all 8 capabilities to their exact showcase sub-pages', () => {
  assert.equal(resolveCapabilityRoute('Website Designing'), '/work/systems');
  assert.equal(resolveCapabilityRoute('Product Development'), '/work/systems');
  assert.equal(resolveCapabilityRoute('Content Creation'), '/work/studio');
  assert.equal(resolveCapabilityRoute('Branding'), '/work/studio');
  assert.equal(resolveCapabilityRoute('Marketing & SEO'), '/work/studio');
  assert.equal(resolveCapabilityRoute('Graphics Design'), '/work/studio');
  assert.equal(resolveCapabilityRoute('Presentation Arch'), '/work/editorial');
  assert.equal(resolveCapabilityRoute('Tech Blog Writing'), '/work/editorial');
});

test('calcCanvasActiveLayer maps deck scroll progress 0..1 to 1-indexed layers 1..6', () => {
  assert.equal(calcCanvasActiveLayer(-0.2, 6), 1);
  assert.equal(calcCanvasActiveLayer(0, 6), 1);
  assert.equal(calcCanvasActiveLayer(0.2, 6), 2);
  assert.equal(calcCanvasActiveLayer(0.4, 6), 3);
  assert.equal(calcCanvasActiveLayer(0.6, 6), 4);
  assert.equal(calcCanvasActiveLayer(0.8, 6), 5);
  assert.equal(calcCanvasActiveLayer(1, 6), 6);
  assert.equal(calcCanvasActiveLayer(1.5, 6), 6);
  assert.equal(calcCanvasActiveLayer(0.5, 1), 1);
});

test('getCapabilityClusterTag maps target showcase routes to cluster registration tags', () => {
  assert.equal(getCapabilityClusterTag('/work/systems'), '[ 01 // SYSTEMS ]');
  assert.equal(getCapabilityClusterTag('/work/studio'), '[ 02 // STUDIO ]');
  assert.equal(getCapabilityClusterTag('/work/editorial'), '[ 03 // EDITORIAL ]');
});

test('calcCapabilityBladeTilt computes bounded 3D rotation and spotlight coordinates', () => {
  const center = calcCapabilityBladeTilt(200, 150, 100, 50, 200, 200, 6);
  assert.equal(center.nx, 0);
  assert.equal(center.ny, 0);
  assert.equal(center.rotateXdeg, 0);
  assert.equal(center.rotateYdeg, 0);
  assert.equal(center.mxPct, 50);
  assert.equal(center.myPct, 50);

  const corner = calcCapabilityBladeTilt(300, 50, 100, 50, 200, 200, 6);
  assert.equal(corner.nx, 1);
  assert.equal(corner.ny, -1);
  assert.equal(corner.rotateXdeg, 6);
  assert.equal(corner.rotateYdeg, 6);
  assert.equal(corner.mxPct, 100);
  assert.equal(corner.myPct, 0);
});

test('calcCapabilityDragPhysics applies damped spring offset, clamped skew, and drag threshold', () => {
  const micro = calcCapabilityDragPhysics(4, 3, 8);
  assert.equal(micro.isDragging, false);
  assert.equal(micro.translateXpx, 0.88);
  assert.equal(micro.translateYpx, 0.66);

  const dragRight = calcCapabilityDragPhysics(200, -50, 8);
  assert.equal(dragRight.isDragging, true);
  assert.equal(dragRight.translateXpx, 44);
  assert.equal(dragRight.translateYpx, -11);
  assert.equal(dragRight.skewXdeg, -5);

  const dragLeft = calcCapabilityDragPhysics(-200, 0, 8);
  assert.equal(dragLeft.skewXdeg, 5);
});

test('calcCapabilityMobileDeckState identifies centered card and scales flanking blades', () => {
  const state = calcCapabilityMobileDeckState(195, [195, 519, 843], 312);
  assert.equal(state.activeIndex, 0);
  assert.equal(state.scales[0], 1);
  assert.equal(state.opacities[0], 1);
  assert.equal(state.scales[1], 0.93);
  assert.equal(state.opacities[1], 0.55);
  assert.equal(state.statusText, '[ SWIPE // 01 OF 03 ]');

  const second = calcCapabilityMobileDeckState(519, [195, 519, 843], 312);
  assert.equal(second.activeIndex, 1);
  assert.equal(second.scales[1], 1);
  assert.equal(second.statusText, '[ SWIPE // 02 OF 03 ]');
});

test('marquee brand item arrays define exact counts (6/10/8/8) and brand glow styles', () => {
  assert.equal(WORK_MARQUEE_ITEMS.length, 6);
  assert.equal(SYSTEMS_MARQUEE_ITEMS.length, 10);
  assert.equal(STUDIO_MARQUEE_ITEMS.length, 8);
  assert.equal(EDITORIAL_MARQUEE_ITEMS.length, 8);

  for (const list of [WORK_MARQUEE_ITEMS, SYSTEMS_MARQUEE_ITEMS, STUDIO_MARQUEE_ITEMS, EDITORIAL_MARQUEE_ITEMS]) {
    for (const item of list) {
      assert.ok(item.glow.startsWith('rgba('));
      assert.ok(item.ariaLabel.length > 0);
    }
  }
});

test('renderMarqueeStripHtml outputs logo-only SVGs with zero text labels, zero <img> tags, and unique gradient IDs', () => {
  const lists = [
    WORK_MARQUEE_ITEMS,
    SYSTEMS_MARQUEE_ITEMS,
    STUDIO_MARQUEE_ITEMS,
    EDITORIAL_MARQUEE_ITEMS,
  ];

  for (const items of lists) {
    const html = renderMarqueeStripHtml(items);
    // Zero external images or legacy text-item classes
    assert.equal(html.includes('<img'), false);
    assert.equal(html.includes('marquee-strip-item'), false);

    // Must render two .marquee-track halves containing .marquee-item + .marquee-logo
    const trackMatches = html.match(/class="marquee-track"/g) ?? [];
    assert.equal(trackMatches.length, 2);

    const logoMatches = html.match(/class="marquee-logo"/g) ?? [];
    assert.ok(logoMatches.length >= items.length * 2);

    // Stripping all HTML tags must yield zero visible text nodes
    const textOnly = html.replace(/<[^>]+>/g, '').trim();
    assert.equal(textOnly, '');

    // All SVG <defs> IDs across duplicated tracks must be strictly unique
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
    assert.equal(new Set(ids).size, ids.length);
  }
});

test('renderBrandLogoSvg embeds authentic multi-color palettes and dark-mode contrast fills', () => {
  assert.ok(renderBrandLogoSvg('github', 't').includes('#F4F1EA'));
  assert.ok(renderBrandLogoSvg('linkedin', 't').includes('#0A66C2'));
  assert.ok(renderBrandLogoSvg('google-cloud-ai', 't').includes('#EA4335'));
  assert.ok(renderBrandLogoSvg('microsoft', 't').includes('#F25022'));
  assert.ok(renderBrandLogoSvg('ethereum', 't').includes('#627EEA'));
  assert.ok(renderBrandLogoSvg('aiverseui', 't').includes('#F25623'));
  assert.ok(renderBrandLogoSvg('react', 't').includes('#61DAFB'));
  assert.ok(renderBrandLogoSvg('figma', 't').includes('#A259FF'));
  assert.ok(renderBrandLogoSvg('substack', 't').includes('#FF6719'));
  assert.ok(renderBrandLogoSvg('markdown', 't').includes('#F9AC00'));
});

test('calcHorizontalCounterState computes dynamic zero-padded counters for 4 and 6 items', () => {
  assert.deepEqual(calcHorizontalCounterState(0, 6), { activeIndex: 1, total: 6, label: '01 / 06' });
  assert.deepEqual(calcHorizontalCounterState(0.5, 6), { activeIndex: 4, total: 6, label: '04 / 06' });
  assert.deepEqual(calcHorizontalCounterState(0.84, 6), { activeIndex: 6, total: 6, label: '06 / 06' });
  assert.deepEqual(calcHorizontalCounterState(1, 6), { activeIndex: 6, total: 6, label: '06 / 06' });
  assert.deepEqual(calcHorizontalCounterState(-0.5, 6), { activeIndex: 1, total: 6, label: '01 / 06' });
  assert.deepEqual(calcHorizontalCounterState(1.4, 6), { activeIndex: 6, total: 6, label: '06 / 06' });

  assert.deepEqual(calcHorizontalCounterState(0, 4), { activeIndex: 1, total: 4, label: '01 / 04' });
  assert.deepEqual(calcHorizontalCounterState(1, 4), { activeIndex: 4, total: 4, label: '04 / 04' });
});

test('formatCertificateId and hasValidCertImageSrc handle blank and populated certificate slots', () => {
  assert.equal(formatCertificateId('—'), 'ID NO // —');
  assert.equal(formatCertificateId(''), 'ID NO // —');
  assert.equal(formatCertificateId(undefined), 'ID NO // —');
  assert.equal(formatCertificateId('CERT-12345'), 'ID NO // CERT-12345');

  assert.equal(hasValidCertImageSrc(''), false);
  assert.equal(hasValidCertImageSrc('   '), false);
  assert.equal(hasValidCertImageSrc(null), false);
  assert.equal(hasValidCertImageSrc('https://example.com/certificate.png'), true);
});

test('shouldProtectImageInteraction blocks images and protected wrappers while allowing normal controls', () => {
  assert.ok(PROTECTED_IMAGE_CONTAINER_CLASSES.includes('card-img-wrap'));
  assert.ok(PROTECTED_IMAGE_CONTAINER_CLASSES.includes('cert-frame'));
  assert.ok(PROTECTED_IMAGE_CONTAINER_CLASSES.includes('badge-frame'));
  assert.ok(PROTECTED_IMAGE_CONTAINER_CLASSES.includes('cylinder-frame'));
  assert.ok(PROTECTED_IMAGE_CONTAINER_SELECTOR.includes('[data-image-protection]'));
  assert.ok(PROTECTED_IMAGE_MATCH_SELECTOR.startsWith('img, '));

  assert.equal(shouldProtectImageInteraction({ tagName: 'img' }), true);
  assert.equal(shouldProtectImageInteraction({ tagName: 'IMG' }), true);
  assert.equal(shouldProtectImageInteraction({ tagName: 'SPAN', hasClosestImg: true }), true);
  assert.equal(shouldProtectImageInteraction({ tagName: 'DIV', hasDataImageProtection: true }), true);
  assert.equal(shouldProtectImageInteraction({ tagName: 'DIV', hasProtectedContainerAncestor: true }), true);

  assert.equal(
    shouldProtectImageInteraction({ tagName: 'INPUT', hasProtectedContainerAncestor: true, isExemptInteractiveControl: true }),
    false
  );
  assert.equal(shouldProtectImageInteraction({ tagName: 'CANVAS' }), false);
  assert.equal(shouldProtectImageInteraction({ tagName: 'A' }), false);
  assert.equal(shouldProtectImageInteraction(null), false);
});
