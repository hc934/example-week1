/**
 * @overview
 *
 * @author
 * @version 2014/04/26
 */

var http = require("http");
var port = 1337;
var request = require("request");
var url = "http://graph.facebook.com/2013Soggiorno/photos?type=uploaded";
var count = 0;

http.createServer(function (req, res) {
  res.writeHeader(200, {"Content-Type": "text/html"});
  
  var data = "<html><head></head><body><h1>2013 竹友之夜</h1><table>"
  request.get(url, function (err, body, response) {

    response = JSON.parse(response);
    response.data.forEach(function (val, idx) {
      data += "<td><img src='" + val.images[2].source + "' width=400 height=500></td>";
      count += 1;
      if (count%3 == 0){
          data += "<tr>";     
      }
    });
    
    data += "</table></body></html>";
    res.end(data);
  });

}).listen(port);

console.log("start server port: " + port);

