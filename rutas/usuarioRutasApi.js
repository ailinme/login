var ruta=require("express").Router();
var subirArchivo=require("../middlewares/middlewares").subirArchivo;
var {mostrarUsuarios, nuevoUsuario, buscarporID, modificarUsuario, borrarUsuario}=require("../db/usuariosBD");
const Usuarios=require("../modelos/Usuario")


ruta.get("/api/mostrarusuarios",async(req,res)=>{
    var usuarios = await mostrarUsuarios();
    //console.log(usuarios);
    if(usuarios.length==0){
        res.status(400).json("No hay usuarios");

    }
    else{
        res.status(200).json(usuarios);
    }
});


ruta.post("/api/nuevoUsuario",subirArchivo(),async(req,res)=>{
    req.body.foto=req.file.originalname;
    var error=await nuevoUsuario(req.body);
    if(error==0){
        res.status(200).json("Usuario registrado correctamente");
    }else{
        res.status(400).json("El usuario no se a podido registrar");
    }
});

ruta.get("/api/buscarUsuarioPorId/:id",async(req,res)=>{
    var user = await buscarporID(req.params.id);
   if(user==""){
    res.status(400).json("Usuario no encontrado");
   }
   else{
    res.status(200).json(user);
   }

});

ruta.post("/api/editarUsuario", subirArchivo(), async(req,res)=>{
    req.body.foto=req.file.originalname;
    var error=await modificarUsuario(req.body);
    if(error==0){
        res.status(200).json("Usuario actualizado correctamente");
    }   else{
        res.status(400).json("Error al actualizar el usuario ");
       }
});

ruta.get("/api/borrarUsuario/:id", async(req,res)=>{
    var error=await borrarUsuario(req.params.id);
    if(error==0){
        res.status(200).json("Usuario borrado correctamente");

    }else{
        res.status(400).json("Error al borrar usuario");
    }
});

module.exports=ruta;