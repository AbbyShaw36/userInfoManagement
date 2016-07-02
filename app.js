var http = require("http");
var fs = require("fs");
var url = require("url");
var mime = require("mime");
var path = require("path");

function send404(res) {
	res.writeHead(404,{"Content-Type" : "text/plain"});
	res.write("Error 404: resource not found.");
	res.end();
}

function sendFile(res, filePath, fileContent) {
	res.writeHead(200,{
		"Content-Type" : mime.lookup(path.basename(filePath))
	});
	res.end(fileContent);
}

var server = http.createServer(function(req,res) {
	var path = url.parse(req.url).pathname;

	if (path === "/") {
		path = "index.html";
	}

	path = "./" + path;

	console.log("Request for " + path + " received.");

	fs.exists(path,function(exists) {
		if(exists) {
			fs.readFile(path,function(err,data) {
				if (err) {
					send404(res);
					return;
				}

				sendFile(res,path,data);
			});
			return;
		}

		send404(res);
	});
});

server.listen(3333,function() {
	console.log("server start");
});