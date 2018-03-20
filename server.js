var http = require('http');
var url = require('url');
var redis = require("redis"),
    client = redis.createClient();
var express = require('express');
var app = express();


var server = http.createServer(function(req, res) {

	// res.write("tamer");
	// res.end();

    var page = url.parse(req.url).pathname;
    var id = "";
    var notes = [];
    var response = "";
    console.log(page);

	client.on("error", function (err) {
	    console.log("Error " + err);
	});

	if (page == "/notes") {

		console.log("On est sur les notes.");
		client.keys("*note*", function(err, replies) {
			replies.forEach(function(key, i) {
				// client.get(key, redis.print);
				// response += client.get(key);
				client.get(key, function(err, reply) {
					console.log("    " + key + ": " + reply);
					response += "    " + key + ": " + reply;
					res.write(reply);
				});
				res.write(response);
				res.writeHead(200, {"Content-Type": "text/html"});
				// res.end();
				// console.log(response);
			});
			//client.quit();
		});
	} else if (page.includes("/notes/")) {
		console.log("On a un ID !");
		id = page.substring(("/notes/").length);
		client.get("note"+id, function(err, reply) {
			console.log(reply);
			res.write(reply);
			res.end();
		});
		console.log(id);
	} else {
	    res.writeHead(404, {"Content-Type": "text/html"});
	    response = "No response";
	    res.write(response);
	    res.end();
	}


	/*client.hkeys("hash key", function (err, replies) {
	    console.log(replies.length + " replies:");
	    replies.forEach(function (reply, i) {
	        console.log("    " + i + ": " + reply);
	    });
	    client.quit();
	});*/

	// res.end();

});

server.listen(12345);