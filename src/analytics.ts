/**
 * Lightweight Custom Analytics Module for ARTISTDEV07 Portfolio
 * Non-blocking, beacon-compatible, zero-dependency analytics engine.
 */

export interface AnalyticsEvent {
  type: 'project_click' | 'route_duration' | 'web_vital' | 'navigation';
  name: string;
  value?: number;
  metadata?: Record<string, unknown>;
  timestamp: number;
}

class PortfolioAnalytics {
  private currentRoute: string = '/';
  private routeStartTime: number = performance.now();
  private eventQueue: AnalyticsEvent[] = [];
  private isDev: boolean = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => this.flushCurrentRouteDuration());
      window.addEventListener('pagehide', () => this.flushCurrentRouteDuration());
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.flushCurrentRouteDuration();
        } else {
          this.routeStartTime = performance.now();
        }
      });
    }
  }

  /**
   * Tracks route transition and logs duration of previous route
   */
  public onRouteChange(newRoute: string) {
    this.flushCurrentRouteDuration();
    this.currentRoute = newRoute;
    this.routeStartTime = performance.now();

    this.recordEvent({
      type: 'navigation',
      name: newRoute,
      timestamp: Date.now(),
    });
  }

  /**
   * Flushes and logs engagement time spent on /work or /about
   */
  private flushCurrentRouteDuration() {
    if (this.currentRoute === '/work' || this.currentRoute === '/about') {
      const elapsedMs = performance.now() - this.routeStartTime;
      const durationSec = Math.round((elapsedMs / 1000) * 10) / 10;

      if (durationSec > 0.5) {
        this.recordEvent({
          type: 'route_duration',
          name: this.currentRoute,
          value: durationSec,
          metadata: {
            route: this.currentRoute,
            label: this.currentRoute === '/work' ? 'Selected Works Engagement' : 'Community Leadership & Bio Engagement',
            durationSeconds: durationSec,
          },
          timestamp: Date.now(),
        });
      }
    }
  }

  /**
   * Binds click tracking to .work-card elements with optional AbortSignal cleanup
   */
  public bindWorkCardTracking(container: HTMLElement | Document = document, signal?: AbortSignal) {
    const cards = container.querySelectorAll('.work-card');
    cards.forEach((card) => {
      card.addEventListener(
        'click',
        () => {
          const titleEl = card.querySelector('.card-title-massive');
          const projectName = titleEl ? titleEl.textContent?.trim() : 'Unknown Project';

          this.recordEvent({
            type: 'project_click',
            name: projectName || 'Unknown Project',
            metadata: {
              category: card.querySelector('.card-category')?.textContent?.trim() || '',
              targetUrl: '/work',
            },
            timestamp: Date.now(),
          });
        },
        signal ? { signal } : undefined
      );
    });
  }

  /**
   * Records and logs an analytics event
   */
  public recordEvent(event: AnalyticsEvent) {
    this.eventQueue.push(event);

    if (this.isDev) {
      if (event.type === 'project_click') {
        console.info(`[Analytics] Project Clicked: "${event.name}"`, event.metadata);
      } else if (event.type === 'route_duration') {
        console.info(`[Analytics] Route Engagement: ${event.name} -> ${event.value}s`, event.metadata);
      }
    }

    // Dispatch custom DOM event for potential listeners or integrations
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('vante:analytics', { detail: event }));
    }
  }

  public getQueue(): readonly AnalyticsEvent[] {
    return [...this.eventQueue];
  }
}

export const analytics = new PortfolioAnalytics();
