// Minimal fake Discord webhook receiver.
// Usage: node webhook-server.js <port> <output-file>
// Records the method, url, headers and raw body of each POST request to <output-file> as JSON.
const http = require('http');
const fs = require('fs');

const port = parseInt(process.argv[2] || '8765', 10);
const out = process.argv[3] || '/tmp/webhook-request.json';

http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200);
    res.end('ok');
    return;
  }
  let body = '';
  req.on('data', (chunk) => { body += chunk; });
  req.on('end', () => {
    fs.writeFileSync(out, JSON.stringify({
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: body
    }));
    res.writeHead(204);
    res.end();
  });
}).listen(port, '127.0.0.1', () => {
  console.log('listening on ' + port);
});
