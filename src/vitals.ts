/**
 * Native Core Web Vitals (LCP, FID/INP, CLS) Measurement
 * Zero-dependency native PerformanceObserver monitoring.
 */

export interface MetricScore {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  if (name === 'LCP') {
    return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
  }
  if (name === 'FID') {
    return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
  }
  if (name === 'CLS') {
    return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
  }
  return 'good';
}

export function initWebVitals() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  // 1. Largest Contentful Paint (LCP)
  try {
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        const val = Math.round(lastEntry.startTime);
        const rating = getRating('LCP', val);
        if (isDev) {
          console.info(`[Web Vital] LCP: ${val}ms (${rating})`);
        }
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch {
    // Ignore unsupported browser implementations
  }

  // 2. First Input Delay (FID)
  try {
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      for (const entry of entries) {
        const firstInput = entry as PerformanceEventTiming;
        const val = Math.round(firstInput.processingStart - firstInput.startTime);
        const rating = getRating('FID', val);
        if (isDev) {
          console.info(`[Web Vital] FID: ${val}ms (${rating})`);
        }
      }
    });
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch {
    // Ignore unsupported browser implementations
  }

  // 3. Cumulative Layout Shift (CLS)
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const layoutShift = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
        if (!layoutShift.hadRecentInput && layoutShift.value) {
          clsValue += layoutShift.value;
          const rating = getRating('CLS', clsValue);
          if (isDev) {
            console.info(`[Web Vital] CLS: ${clsValue.toFixed(4)} (${rating})`);
          }
        }
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch {
    // Ignore unsupported browser implementations
  }
}
