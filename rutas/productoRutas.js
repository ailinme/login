var ruta=require("express").Router();
var {subirArchivo}=require("../middlewares/middlewares") 
var {autorizado, admin}=require("../middlewares/password");
var {nuevoProducto, buscarporID, modificarProducto, borrarProducto,mostrarProductos}=require("../db/productosBD");

ruta.get("/producto",async(req,res)=>{
    var producto = await mostrarProductos();
    res.render("producto/mostrar",{producto})
});

ruta.get("/nuevoproducto",admin,async(req,res)=>{
    res.render("producto/nuevo")
});

ruta.post("/nuevoproducto",subirArchivo(),async(req,res)=>{
    req.body.foto=req.file.filename;
    var error=await nuevoProducto(req.body);
    res.redirect("/producto");
});

ruta.get("/editarProducto/:id",async(req,res)=>{
    console.log(req.params.id);
    var user = await buscarporID(req.params.id);
    res.render("producto/modificar",{user});
    res.end;
});

ruta.post("/editarProducto", async(req,res)=>{
    var error=await modificarProducto(req.body);
    res.redirect("/producto");

});

ruta.get("/borrarProducto/:id", async(req,res)=>{
    try{
        await borrarProducto(req.params.id);
        res.redirect("/producto");

    }catch(err){
        console.log("Error al borrar producto",+err);
    }
});

module.exports=ruta;