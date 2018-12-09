//==------------
const srcPath = "./src/";
const resPath = "./src/share/zh-cn.js";
const tarPath = "./publish/zh-cn";
//================

const http = require('http');
const nunjucks = require("nunjucks");
const path = require("path");
const mime = require("mime");
const fs = require("fs");

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
  const vUrl = path.parse(req.url);
  if (vUrl.base === "favicon.ico") {
    return;
  }

  // console.log(vUrl);
  const xMine = mime.getType(vUrl.ext);
  // console.log(xMine);

  delete require.cache[require.resolve(resPath)];
  const lngRes = require(resPath);

  const relPath = path.join(vUrl.dir, vUrl.base)
  const realPath = path.resolve(srcPath + relPath);
  // console.log(realPath);
  res.writeHead(200, {
    'Content-Type': xMine
  });

  if (xMine === "text/html") {
    try {
      const htmlString = covertFile(realPath, lngRes);
      res.write(htmlString);
      res.end();
    } catch (ex) {
      res.writeHead(404);
      res.end("404");
    }
  } else {
    fs.readFile(realPath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("404");
      }
      res.write(data);
      res.end();
    });
  }



});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000);