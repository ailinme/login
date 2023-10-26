var ruta=require("express").Router();
var {subirArchivo}=require("../middlewares/middlewares");
var {autorizado}=require("../middlewares/password")
var {mostrarUsuarios, nuevoUsuario, buscarporID, modificarUsuario, borrarUsuario, login}=require("../db/usuariosBD");

ruta.get("/",autorizado,async(req,res)=>{
    var usuarios = await mostrarUsuarios();
    //console.log(usuarios);
    res.render("usuarios/mostrar",{usuarios});
    
});

ruta.get("/nuevousuario",(req,res)=>{
    res.render("usuarios/nuevo")
});

ruta.post("/nuevousuario",subirArchivo(),async(req,res)=>{
    //console.log(req.originalname);
    //console.log(req.body);
    req.body.foto=req.file.filename;
    var error=await nuevoUsuario(req.body);
    //res.end();
    res.redirect("/");
});

ruta.get("/editarUsuario/:id",async(req,res)=>{
    console.log(req.params.id);
    var user=req.params.id;
    var user = await buscarporID(req.params.id);
    res.render("usuarios/modificar",{user});
    res.end();
});

ruta.post("/editarUsuario", subirArchivo(),async(req,res)=>{
    console.log(req.file);
    if(req.file!=undefined){
        req.body.foto=req.file.filename;
    }else{
        req.body.foto=req.body.fotoAnterior;
    }
    var error=await modificarUsuario(req.body);
    res.redirect("/");

});

ruta.get("/borrarUsuario/:id", async(req,res)=>{
    try{
        await borrarUsuario(req.params.id);
        res.redirect("/");

    }catch(err){
        console.log("Error al borrar el usuario",+err);
    }
});


ruta.get("/login",(req,res)=>{
    res.render("usuarios/login")
});

ruta.post("/login", async(req,res)=>{
    var user=await login(req.body);
    if(user==undefined){
        res.redirect("/login");
    }
    else{
        if(user.admin){
            console.log("Administrador");
            req.session.admin=req.body.usuario;
            res.redirect("/nuevoProducto");
        }
        else{
            console.log("Usuario");
            req.session.usuario=req.body.usuario;
            res.redirect("/");
        }
    }
});

ruta.get("/logout",(req,res)=>{
    req.session=null;
    res.redirect("/login");
});



module.exports=ruta;