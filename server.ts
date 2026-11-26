import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { isAllowedProxyImageUrl } from './src/math.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.get('/api/image-proxy', async (req, res) => {
    const rawUrl = typeof req.query.url === 'string' ? req.query.url : '';
    const parsed = isAllowedProxyImageUrl(rawUrl);
    if (!parsed) {
      res.status(400).json({ error: 'Invalid or disallowed image URL' });
      return;
    }

    try {
      const upstream = await fetch(parsed.toString(), {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; StudioPortfolioProxy/1.0)',
          Accept: 'image/*,*/*;q=0.8',
        },
        redirect: 'manual',
        signal: AbortSignal.timeout(10000),
      });

      if (!upstream.ok) {
        res.status(502).json({ error: 'Upstream image fetch failed' });
        return;
      }

      const contentType = upstream.headers.get('content-type') || '';
      if (!contentType.toLowerCase().startsWith('image/')) {
        res.status(502).json({ error: 'Upstream response is not an image' });
        return;
      }

      const buffer = Buffer.from(await upstream.arrayBuffer());
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).send(buffer);
    } catch {
      res.status(502).json({ error: 'Upstream image request timed out or failed' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
