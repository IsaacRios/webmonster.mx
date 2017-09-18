var express = require ('express');
var mongoose = require ('mongoose');

var app = express();

mongoose.connect("mongodb://localhost/webmonsterDB");
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



app.get("/services/new",function(solicitd, respuesta){

	respuesta.render("services/new")

})




app.listen(8080);