var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body) {
  return `
    <!doctype html>
    <html>
      <head>
        <title> WEB - ${title}</title>
        <meta charset="utf-8">
      </head>
    <body>
      <h1><a href = "/"> WEB </a> </h1>
      ${list}
      ${body}
    </body>
  </html>
  `;
}

function templateList(filelist) {
  var list = '<ul>';
  var i = 0;
  for(i = 0; i < filelist.length; i++) {
    list = list + `<li><a href = "/?id=${filelist[i]}">${filelist[i]}</a></li>`;
  }
  list = list + "</ul>";
  return list;
}

var app = http.createServer( (request, response) => {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if (pathname ==='/') {
    if (queryData.id === undefined) {
      fs.readdir('./data', (error, filelist) => {
        var title = 'Welcome';
        var desc = 'Hello, Node.js';
        var list = templateList(filelist);
        var template = templateHTML(title, list, `<h2>${title}</h2>${desc}`);
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir('./data', (error, filelist) => {
        fs.readFile(`data/${queryData.id}`, 'utf-8', (err, desc) => {
          var title = queryData.id;
          var list = templateList(filelist);
          var template = templateHTML(title, list, `<h2>${title}</h2>${desc}`);
          response.writeHead(200);
        response.end(template);
        });
      });
    }
  } else {
    response.writeHead(200);
    response.end(template);
  }
});

app.listen(3000);