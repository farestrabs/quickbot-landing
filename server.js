const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const filePath = req.url === '/' ? '/index.html' : req.url;
  const fullPath = path.join(__dirname, filePath);
  const ext = path.extname(fullPath);
  const mimeTypes = {'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
  const contentType = mimeTypes[ext] || 'text/html';

  fs.readFile(fullPath, (err, content) => {
    if (err) {
      fs.readFile(path.join(__dirname, 'index.html'), (e, c) => {
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(c);
      });
    } else {
      res.writeHead(200, {'Content-Type': contentType});
      res.end(content);
    }
  });
});

server.listen(PORT, () => console.log('QuickBot running on port ' + PORT));
