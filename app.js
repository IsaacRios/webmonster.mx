var express = require ('express');

var app = express();
app.set("view engine","pug");

app.use(express.static("public"));

app.get("/",function(solicitud,respuesta){
	respuesta.render("index");
});

app.listen(8080);