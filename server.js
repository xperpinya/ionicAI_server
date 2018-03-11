var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 3000;
var ip = process.env.IP || "127.0.0.1";


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.post('/', function(req, res){
	console.log(req.body)

	if (req.body.result.actio == "checkVote") {
		var age = req.body.result.parameters.age;
		console.log(age);
	}
})

// app.listen(port, ip);
app.listen(process.env.PORT || 8000, function() {
	console.log("Server up and listening");
  });
