var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 3000;
var ip = process.env.IP || "127.0.0.1";


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.post('/', function(req, res){
	console.log(req.body)

	if (req.body.result.action == "checkVote") {
		var age = req.body.result.parameters.age;
		// console.log(age);
		var response = "No lo sé";

		if (age.amount >= 18){
			response = "SI";
		}else {
			response = "NO";
		}

		res.json({
			"speech": response,
			"displayText": response
		})
	}
})

// app.listen(port, ip);
app.listen(process.env.PORT || 8000, function() {
	console.log("Server up and listening");
  });
