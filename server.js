var http = require('http');
var url = require('url');
var redis = require("redis"),
    client = redis.createClient();


var server = http.createServer(function(req, res) {

    var page = url.parse(req.url).pathname;
    var notes = [];
    var response = "";
    console.log(page);

	client.on("error", function (err) {
	    console.log("Error " + err);
	});

	if (page == "/notes") {

		console.log("On est sur les notes.");
		client.keys("*note*", function(err, replies) {
			replies.forEach(function(reply, i) {
				response += "    " + i + ": " + reply;
				//console.log("    " + i + ": " + reply);
			});
			console.log(response);
			res.writeHead(404, {"Content-Type": "text/html"});
			res.end(response);
			//client.quit();
		});
	} else {
	    res.writeHead(404, {"Content-Type": "text/html"});
	    res.end("No response.");
	}

	/*client.hkeys("hash key", function (err, replies) {
	    console.log(replies.length + " replies:");
	    replies.forEach(function (reply, i) {
	        console.log("    " + i + ": " + reply);
	    });
	    client.quit();
	});*/

});

server.listen(12345);