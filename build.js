//==------------
const srcPath = "./src";
const resPath = "./src/share/zh-cn.js";
const tarPath = "./publish/zh-cn";
//================

const http = require('http');
const nunjucks = require("nunjucks");
const path = require("path");

let folder = "";
let target = "";


nunjucks.configure({
  autoescape: false,
  noCache: true
});
const covertFile = (file, lngRes) => {
  return nunjucks.render(file, lngRes);
}


const server = http.createServer((req, res) => {

  delete require.cache[require.resolve(resPath)];
  const lngRes = require(resPath);
  
  
  const htmlString = covertFile(path.resolve("./src/about_us.html"), lngRes);
  res.write(htmlString);
  res.end();
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000);