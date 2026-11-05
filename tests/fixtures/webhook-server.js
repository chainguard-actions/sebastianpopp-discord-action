// Minimal local webhook receiver used by the tests.
// Usage: node webhook-server.js <port> <status> <outdir>
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = parseInt(process.argv[2] || '8787', 10);
const status = parseInt(process.argv[3] || '204', 10);
const outdir = process.argv[4] || '/tmp/webhook';
fs.mkdirSync(outdir, { recursive: true });

const server = http.createServer((req, res) => {
  let body = '';
  req.on('data', (c) => { body += c; });
  req.on('end', () => {
    fs.writeFileSync(path.join(outdir, 'method'), req.method);
    fs.writeFileSync(path.join(outdir, 'url'), req.url);
    fs.writeFileSync(path.join(outdir, 'content-type'), req.headers['content-type'] || '');
    fs.writeFileSync(path.join(outdir, 'body'), body);
    res.statusCode = status;
    if (status === 204) {
      res.end();
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'mock error', code: status }));
    }
  });
});
server.listen(port, '127.0.0.1', () => {
  fs.writeFileSync(path.join(outdir, 'ready'), 'ok');
});
