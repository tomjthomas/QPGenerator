const {createServer} = require("http");
const fs = require('fs');
let server = createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(file);
  response.end();
});
server.listen(8000);
console.log("Listening! (port 8000)");
