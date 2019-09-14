
exports.readFiles = function (myData,res) {
  var fs = require('fs');
    var tr = '<tbody>';
      var close = '</tbody></div</body></html>';
      var table = '<!DOCTYPE html>' +
        '<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"></head><style>body{background-color:#A9DEF9}</style><body><br><br><div class="container text-center table-responsive-md"><h2>'
        +
        ' CLASS</h2><table class="table table-light table-hover"></h2><thead class="thead-dark"><th>ID</th><th>NAME</th><th>EMAIL</th><th>COURSE & YEAR</th></thead>';
      var info = myData.split('\n').join(',');
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

  };
  
