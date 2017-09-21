var express = require ('express');
var mongoose = require ('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var cloudinary = require("cloudinary");

cloudinary.config({
	cloud_name: "webmonster666",
	api_key: "528481212642167",
	api_secret: "Db0EhWMgqGbydsSxuWePEfFs8fA"
});

var app = express();

mongoose.connect("mongodb://localhost/webmonsterDB");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var uploader = multer({dest: "./uploads"});
var middleware_upload = uploader.single('image_avatar');
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
	respuesta.render("index");
});

app.get("/bazar",function(solicitud, respuesta){
	Product.find(function(error,documento){
		if(error){ console.log(error);}
		respuesta.render("bazar/index", { products: documento})
	});
});

app.post("/bazar",middleware_upload,function(solicitud, respuesta){
	if(solicitud.body.password == "12345678"){
	var data = {
			title: solicitud.body.title,
			description: solicitud.body.description,
			imageUrl: "data.png",
			pricing: solicitud.body.pricing
		}

		var product = new Product(data);

		if(solicitud.file){
			cloudinary.uploader.upload(solicitud.file.path, 
				function(result){
				product.imageUrl = result.url;
				product.save(function(err){
					console.log(product);
					respuesta.render("index");
				});
			});
		}


	}else{
		respuesta.render("bazar/new");
	}


});

app.get("/bazar/new",function(solicitd, respuesta){

	respuesta.render("bazar/new")

})




app.listen(8080);