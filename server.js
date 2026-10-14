/**
 * Zero-dependency Node.js HTTP Server for JeevanSetu
 * Serves the modern frontend and bridges emergency coordination requests.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'website shiven');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // Normalize URL
  let safeUrl = req.url.split('?')[0];
  if (safeUrl === '/') safeUrl = '/index.html';

  let filePath = path.join(PUBLIC_DIR, safeUrl);

  // If file doesn't exist in website shiven, check root
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, safeUrl);
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found - JeevanSetu System');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`   🏥 JeevanSetu Emergency System Server Running    `);
  console.log(`   URL: http://localhost:${PORT}                    `);
  console.log(`   Frontend Folder: ${PUBLIC_DIR}                   `);
  console.log(`====================================================`);
});
