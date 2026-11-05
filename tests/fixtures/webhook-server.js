// Minimal local HTTP server that records incoming webhook requests.
// Usage: node webhook-server.js <port> <outfile> [statusCode]
const http = require('http');
const fs = require('fs');

const port = parseInt(process.argv[2] || '8787', 10);
const outfile = process.argv[3] || '/tmp/webhook-request.json';
const status = parseInt(process.argv[4] || '204', 10);

const server = http.createServer((req, res) => {
  let body = '';
  req.on('data', (chunk) => { body += chunk; });
  req.on('end', () => {
    const record = {
      method: req.method,
      url: req.url,
      contentType: req.headers['content-type'] || '',
      body: body
    };
    fs.writeFileSync(outfile, JSON.stringify(record));
    res.statusCode = status;
    res.end(status === 204 ? undefined : JSON.stringify({ error: 'simulated' }));
  });
});

server.listen(port, '127.0.0.1', () => {
  fs.writeFileSync(outfile + '.ready', 'ok');
});
