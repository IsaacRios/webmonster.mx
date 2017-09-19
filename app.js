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

app.post("/products",middleware_upload,function(solicitud, respuesta){
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

		/*console.log(solicitud.files);

		product.save(function(err){
			console.log(product);
			respuesta.render("index");
		});  */
	}else{
		respuesta.render("products/new");
	}


});

app.get("/products/new",function(solicitd, respuesta){

	respuesta.render("products/new")

})




app.listen(8080);