var ruta=require("express").Router();
var subirArchivo=require("../middlewares/middlewares").subirArchivo;
var {nuevoProducto, buscarporID, modificarProducto, borrarProducto,mostrarProductos}=require("../db/productosBD");
const Producto = require("../modelos/Producto");


ruta.get("/api/mostrarproductos",async(req,res)=>{
    var producto = await mostrarProductos();
    if(producto.length==0){
        res.status(400).json("No hay productos");
    }else{
        res.status(200).json(producto);
    }
});

ruta.post("/api/nuevoProducto",subirArchivo(),async(req,res)=>{
    req.body.foto=req.file.originalname;
    var error=await nuevoProducto(req.body);
    if(error==0){
        res.status(200).json("Producto registrado correctamente");
    }else{
        res.status(400).json("El producto no se a podido registrar");
    }
});

ruta.get("/api/buscarProductoPorId/:id",async(req,res)=>{
    var user = await buscarporID(req.params.id);
   if(user==""){
    res.status(400).json("Producto no encontrado");
   }
   else{
    res.status(200).json(user);
   }

});

ruta.post("/api/editarProducto", subirArchivo(),async(req,res)=>{
    req.body.foto=req.file.originalname;
    var error=await modificarProducto(req.body);
    if(error==0){
        res.status(200).json("Producto actualizado correctamente");
    }else{
        res.status(400).json("Error al actualizar el producto");
    }

});

ruta.get("/api/borrarProducto/:id", async(req,res)=>{
    var error=await borrarProducto(req.params.id);
    if(error==0){
        res.status(200).json("Producto borrado correctamente");
    }else{
        res.status(400).json("Error al borrar producto");
    }
});

module.exports=ruta;