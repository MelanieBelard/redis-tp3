var http = require('http');
var url = require('url');
var redis = require("redis"),
    client = redis.createClient();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil');
});

app.get('/notes', function(req, res) {
	res.writeHead(200, {"Content-Type": "text/html"});
	console.log("On est sur les notes.");
	var arr = [];
	client.keys("*note*", function(err, replies) {
		replies.forEach(function(key, i) {
			// client.get(key, redis.print);
			client.get(key, function(err, reply) {
				console.log("    " + key + ": " + reply);
				arr.push(reply);
			});
		});
		// Les données devraient être stockées dans le array arr et à partir de là, nous devrions pouvoir les écrire
		// pour la réponse sauf que ça ne fonctionne pas... La méthode client.keys() est exécutée à la fin.
	});
});

app.get('/notes/:id', function(req, res) {
	// console.log("On a un ID !");
	id = req.params.id;
	if (client.get("note"+id)) {
		client.get("note"+id, function(err, reply) {
			if (reply != null) {
				res.write(reply);
				res.end();
			} else {
			    res.setHeader('Content-Type', 'text/plain');
			    res.status(404).send('Page introuvable !');
			}
		});
	}
});

app.post("/notes", function(req, res) {
	res.status(200).send("Vous nous envoyez une note");
	console.log(req.body);
});


app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(12345);