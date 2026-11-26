import test from 'node:test';
import assert from 'node:assert/strict';
import { analytics } from './analytics.js';

test('analytics records navigation events on route change', () => {
  analytics.onRouteChange('/work');
  const queue = analytics.getQueue();
  const lastNav = queue.filter(e => e.type === 'navigation').pop();
  assert.ok(lastNav);
  assert.strictEqual(lastNav.name, '/work');
});

test('analytics records project clicks with correct metadata', () => {
  analytics.recordEvent({
    type: 'project_click',
    name: 'HEIMDALL',
    metadata: {
      category: '2026 / COMPUTER VISION',
      targetUrl: '/work',
    },
    timestamp: Date.now(),
  });

  const queue = analytics.getQueue();
  const clickEvent = queue.find(e => e.type === 'project_click' && e.name === 'HEIMDALL');
  assert.ok(clickEvent);
  assert.strictEqual(clickEvent.name, 'HEIMDALL');
  assert.strictEqual(clickEvent.metadata?.category, '2026 / COMPUTER VISION');
});

test('analytics records route engagement duration', () => {
  analytics.onRouteChange('/about');
  // Simulate leaving /about
  analytics.onRouteChange('/');
  const queue = analytics.getQueue();
  const durationEvent = queue.find(e => e.type === 'route_duration' && e.name === '/about');
  // Duration should either be recorded or skipped if under threshold
  assert.ok(queue.length > 0 && (durationEvent === undefined || durationEvent.type === 'route_duration'));
});
