const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // console.log('Hello World!!!');
  res.end('Hello!');
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});