var express = require ('express');
var mongoose = require ('mongoose');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect("mongodb://localhost/webmonsterDB");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var productSchema = {
	title: String,
	description: String,
	imageUrl: String,
	pricing: Number
};

var Product = mongoose.model("Product", productSchema);

app.set("view engine","pug");

app.use(express.static("public"));

app.get("/",function(solicitud,respuesta){

/*var data = {
	title: "Producto1",
	description: "Pieza de software",
	imageUrl: "data.png",
	pricing: 1000
}

var product = new Product(data);

product.save(function(err){
	console.log(product);
});
*/


	respuesta.render("index");
});

app.post("/products",function(solicitud, respuesta){
	if(solicitud.body.password == "12345678"){
	var data = {
			title: solicitud.body.title,
			description: solicitud.body.description,
			imageUrl: "data.png",
			pricing: solicitud.body.pricing
		}

		var product = new Product(data);

		product.save(function(err){
			console.log(product);
			respuesta.render("index");
		});
	}else{
		respuesta.render("products/new");
	}
});

app.get("/products/new",function(solicitd, respuesta){

	respuesta.render("products/new")

})




app.listen(8080);