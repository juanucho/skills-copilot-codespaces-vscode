// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const comments = require('./comments');

// Create server
http.createServer((req, res) => {
    // Get URL
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (pathname === '/comment') {
        // Add comment
        comments.add(query.comment);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Comment added');
    } else if (pathname === '/comments') {
        // Get comments
        const allComments = comments.getAll();
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(allComments);
    } else {
        // Read file
        const filename = path.join(__dirname, 'public', pathname);
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
    }
}).listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});