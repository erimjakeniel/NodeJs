var fs = require('fs');
var port = 8000;

exports.addFile = (function (req, res) {
    var myData = "";
    req.on('data', function (data) {

        myData = JSON.parse(data);

        var fileName = "";
        fileName = myData.subject.split(" ").join("-");
        var text = myData.name + ", " + myData.email + ", " + myData.course + "-" + myData.year + "\n";
        fs.appendFile(fileName.toLowerCase() + ".csv", text , function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        req.on('end', function () {
            res.writeHead(200, { 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*' });
        });
    });

});