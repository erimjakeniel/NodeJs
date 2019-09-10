var http = require('http');
var url = require('url');
var add = require('./enroll.js');
var fs = require('fs');
var port = 8000;
console.log("Running..," + port);

http.createServer(function (req, res) {

  add.addFile(req, res);

  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;

  if (q.pathname == "/") {
    filename += "index.html";
  } else if (q.pathname.split("/").length > 0) {
    var pathSegment = q.pathname.split("/");
    // console.log(pathSegment);
    var className = pathSegment[2];
    var fName = className + ".csv";
    filename = fName;
  }


  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end("404 Not Found");
    }
    if(filename.substring(filename.length,filename.length-4) == ".csv"){
      var tr = '<tbody>';
      var close = '</tbody></div</body></html>';
      var table ='<!DOCTYPE html>' + 
      '<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"></head><style>body{background-color:#A9DEF9}</style><body><br><br><div class="container text-center table-responsive-md"><h2>'
      + filename.substring(0,filename.length-4).toUpperCase() + 
      ' CLASS</h2><table class="table table-light table-hover"></h2><thead class="thead-dark"><th>ID</th><th>NAME</th><th>EMAIL</th><th>COURSE & YEAR</th></thead>';
      var info = data.split('\n').join(',');
      var content = info.split(',');
      var len = content.length - 1;
      var counter = 0;
      var id = 0;
      for (var i = 0; i < len / 3; i++) {
          tr += '<tr><td>' + id++ + '</td><td>' + content[counter] + '</td><td>' + content[counter + 1] + '</td><td>' + content[counter + 2] + '</td></tr>';
          counter += 3;
      }
      table += tr + close;
      res.writeHead(200, { 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*' });
      res.write(table);
      res.end();
    }else{
      res.writeHead(200, { 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*' });
      res.write(data);
    }
    return res.end();
  });



}).listen(port);