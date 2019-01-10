const http = require('http');
const nunjucks = require("nunjucks");
const path = require("path");
const mime = require("mime");
const fs = require("fs");

//==------------
const lang = "zh-cn";
const dev = false;
//--------------
const srcPath = "./src/";
const resPath = "./src/share/" + lang + ".js";
const tarPath = "./publish/" + lang + "/";

const rootApp = path.resolve("./");
const rootPublish = path.join(rootApp, "publish");
const rootSrc = path.join(rootApp, "src");
const rootPublishPages = path.join(rootPublish, lang);

//================



let folder = "";
let target = "";

//---------创建目录--------------------
console.log("创建发布目录...");
try {
  fs.mkdirSync(rootPublish);
} catch (ex) {}
try {
  fs.mkdirSync(rootPublishPages);
} catch (ex) {}
//--------------------


nunjucks.configure({
  autoescape: false,
  noCache: true
});
const covertFile = (file, lngRes) => {
  return nunjucks.render(file, lngRes);
}


const publish = (rPath) => {
  // console.log(rPath);
  fs.readdir(rPath, (err, files) => {
    files.forEach(file => {
      const xMine = mime.getType(file);
      //console.log(file, xMine);
      if (xMine === "text/html") {
        try {
          const realPath = path.join(rootSrc, file);
          const htmlString = covertFile(realPath, require(resPath));
          const tarPage = path.join(rootPublishPages, file);
          console.log(realPath, tarPath);
          fs.writeFile(tarPage, htmlString, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log(file, "发布成功。");
            }
          });
        } catch (ex) {
          console.log(ex);

        }
      }
    });
  });

};


const server = http.createServer((req, res) => {
  const vUrl = path.parse(req.url);
  if (vUrl.base === "favicon.ico") {
    return false;
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
        return;
      }
      res.write(data);
      res.end();
    });
  }



});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});



if (dev){
  server.listen(8000);
  console.log("http://localhost:8000/");
}else{
  const pyPath = path.resolve(srcPath);
  publish(pyPath);
}


