import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3030;
const PAGES_DIR = path.join(__dirname, 'pages');
const PUBLIC_DIR = path.join(__dirname, 'public');
const DELIV_DIR = path.join(__dirname, 'deliverables');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.mp3': 'audio/mpeg',
  '.pdf': 'application/pdf',
  '.m3u8': 'application/vnd.apple.mpegurl'
};

const server = http.createServer((req, res) => {
  const parsed = new URL(req.url, `http://127.0.0.1:${PORT}`);
  let pathname = decodeURIComponent(parsed.pathname);

  if (pathname === '/_next/image') {
    const imgUrl = parsed.searchParams.get('url');
    if (imgUrl) {
      res.writeHead(302, { Location: imgUrl });
      return res.end();
    }
  }

  // Root (/) goes straight to the beginning of the funnel (/thrive)
  if (pathname === '/' || pathname === '/index.html') {
    const thriveFile = path.join(PAGES_DIR, 'thrive.html');
    if (fs.existsSync(thriveFile)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return fs.createReadStream(thriveFile).pipe(res);
    }
  }

  // Direct deliverables folder route (/deliverables/...)
  if (pathname.startsWith('/deliverables/')) {
    const filePath = path.join(DELIV_DIR, path.basename(pathname));
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      return fs.createReadStream(filePath).pipe(res);
    }
  }

  // Funnel HTML pages (/thrive, /seed, /abound, /dms5286, etc.)
  const cleanSlug = pathname.replace(/^\/+|\/+$/g, '').replace(/\.html$/, '');
  if (cleanSlug) {
    const htmlCandidate = path.join(PAGES_DIR, `${cleanSlug}.html`);
    if (fs.existsSync(htmlCandidate) && fs.statSync(htmlCandidate).isFile()) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return fs.createReadStream(htmlCandidate).pipe(res);
    }
  }

  // Static files in /public (/media/..., /art/..., /revistadimemoria/..., /paridade/...)
  const pubPath = path.join(PUBLIC_DIR, pathname);
  if (fs.existsSync(pubPath) && fs.statSync(pubPath).isFile()) {
    const ext = path.extname(pubPath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    return fs.createReadStream(pubPath).pipe(res);
  }

  // Any unknown route redirects cleanly to the start of the funnel (/thrive)
  res.writeHead(302, { Location: '/thrive' });
  res.end();
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Funil Time To Flourish rodando em http://127.0.0.1:${PORT}`);
});
