// api/dev-server.ts — local dev only, NOT deployed to Vercel
// Bridges Node.js HTTP to the Web-standard Request/Response that api/chat.ts expects.
import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import handler from './chat.js';

const PORT = 3001;

createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  const body = Buffer.concat(chunks);

  try {
    const url = `http://localhost:${PORT}${req.url ?? '/'}`;
    const webReq = new Request(url, {
      method: req.method ?? 'GET',
      headers: req.headers as HeadersInit,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? body : undefined,
    });

    const webRes = await handler(webReq);
    const text = await webRes.text();
    res.writeHead(webRes.status, Object.fromEntries(webRes.headers.entries()));
    res.end(text);
  } catch (err) {
    console.error('[dev-server]', err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
}).listen(PORT, () => {
  console.log(`[dev-server] API listening on http://localhost:${PORT}`);
});
