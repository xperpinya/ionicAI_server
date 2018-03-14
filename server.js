var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

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

		if (age >= 18){
			response = "SI";
		}else {
			response = "NO";
		}

		res.json({
			"speech": response,
			"displayText": response
		})
	} else if (req.body.result.action == "Add"){
		var sum = parseFloat(req.body.result.parameters.number1) + parseFloat(req.body.result.parameters.number2);
		var responseText = "La suma de " + req.body.result.parameters.number1 + " y " +req.body.result.parameters.number2 + " es " + sum;
		res.json({"speech": responseText, "displayText": sum})

	} else if (req.body.result.action == "Substract"){
		var resta = parseFloat(req.body.result.parameters.number1) - parseFloat(req.body.result.parameters.number2);
		var responseText = "La resta de " + req.body.result.parameters.number1 + " menos " +req.body.result.parameters.number2 + " es " + resta;
		res.json({"speech": responseText, "displayText": resta})
	} else if (req.body.result.action == "Multiply"){
		var product = parseFloat(req.body.result.parameters.number1) * parseFloat(req.body.result.parameters.number2);
		var responseText = "La multiplicación de " + req.body.result.parameters.number1 + " por " +req.body.result.parameters.number2 + " es " + product;
		res.json({"speech": responseText, "displayText": product})
		
	} else if (req.body.result.action == "Divide"){
		var quo = parseFloat(req.body.result.parameters.number1) / parseFloat(req.body.result.parameters.number2);
		var responseText = "La división de " + req.body.result.parameters.number1 + " entre " +req.body.result.parameters.number2 + " es " + (quo);
		res.json({"speech": responseText, "displayText": quo})
		
	} else if (req.body.result.action == "Get-Weather"){
		var city = req.body.result.parameters.city;
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ea2a695ec3da19963aff0cbdc2ce78c3";
		
		request(url, function(error, response, body){
			var temp = Math.round(JSON.parse(body).main.temp - 273.15);
			var responseText = "La temperatura en " + city + " es de " + temp + " grados.";
            
			res.json({ "speech": responseText, "displayText": responseText })
            
        })
	
	
	
	// else if (request.body.result.action == "Get-Weather"){
	// 	var city = req.body.result.parameters.city;
	// 	var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ea2a695ec3da19963aff0cbdc2ce78c3";

	// 	res.json({"speech": city, "displayText": city})

		// request(url, function(error,response,body){
		// 	var temp = Math.round(JSON.parse(body).main.temp - 273.15);
		// 	var responseText = "La temperatura en " + city + " es " + temp + " grados.";
		// 	res.json({"speech": responseText, "displayText": responseText})
		// })

	} else if (req.body.result.action == "Get-archive"){
		// var pdfAktios = app.use(express.static(path.join(__dirname,"archives/Corporativo.pdf")));
		var pdfAktios = "https://www.aktiosdigitalservices.com/assets/Aktios_Digital_Services.pdf";
		// res.json({"url": pdfAktios})
		// "imageUrl": pdfAktios
		var response = "Este el pedido que me has solicitado";
		res.json({
			"speech": response,
			"displayText": response,
			"messages": [
				{
				  "imageUrl": pdfAktios,
				  "type": 3
				}]
		})
	}
})

// app.listen(port, ip);
app.listen(process.env.PORT || 8000, function() {
	console.log("Server up and listening");
  });
