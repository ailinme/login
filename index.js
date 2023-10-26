var express=require("express"); 
var path=require("path");
var cors=require("cors");
var session=require("cookie-session");
var productoRutas=require("./rutas/productoRutas");
var usuariosRutas=require("./rutas/usuarioRutas");
var rutasusuariosApis=require("./rutas/usuarioRutasApi");
var productosRutasApi=require("./rutas/productoRutasApi")

var app=express();
app.set("view engine","ejs");
app.use(cors());
app.use(session({
    name:"session",
    keys:["dagernsslk"],
    maxAge:24*60*60*1000
}))
app.use(express.urlencoded({extended:true}));
app.use("/",express.static(path.join(__dirname,"/web")));
app. use("/",usuariosRutas );
app. use("/producto",productoRutas)
app. use("/",productoRutas);
app.use("/",rutasusuariosApis);
app.use("/", productosRutasApi);


var port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("servidor en http://localhost:"+port);
})
