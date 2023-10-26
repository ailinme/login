var conexion=require("./conexion").conexionProductos;
var fs=require("fs");
var Producto=require("../modelos/Producto");

async function mostrarProductos(){
    var user=[];
    try{
        var productos=await conexion.get();
        productos.forEach((nombre)=>{
        var nombre1=new Producto(nombre.id, nombre.data());
        if(nombre1.bandera==0){
            user.push(nombre1.obtenerProducto);
        }
    });

    }catch(err){
        console.log("Error al obtener los productos de firebase" + err);
        user.push(null);
    }
    return user;
}
async function buscarporID(id){
    var user;
    try{
        var productodb=await conexion.doc(id).get();
        console.log(productodb.data());
        var productoObjeto=new Producto(productodb.id,productodb.data());
        if(productoObjeto.bandera==0){
            user=productoObjeto;
        }
    }catch(err){
        console.log("Error al buscar el producto"+err);
        user =null;
    }
    return user;
}
async function nuevoProducto(datos){
    var nombre =new Producto(null,datos);
    var error=1;
    if(nombre.bandera==0){
       try{
          await conexion.doc().set(nombre.obtenerProducto);
          console.log("producto resgitrado correctamente");
          error=0;
       }
       catch(err){
          console.log("Error al registrar producto"+err);
       }
    }
    return error;
  }
 
  async function modificarProducto(datos){
    var user=await buscarporID(datos.id);
    var error=1;
    if(user!=undefined){

      var nombre=new Producto(datos.id,datos);
    if (nombre.bandera==0){
       try{
          await conexion.doc(nombre.id).set(nombre.obtenerProducto)
          console.log("Producto actualizado correctamente");
          error=0;
 
       }
       catch(err){
          console.log("Error al modificar producto");
       }
    }
    else{
       console.log("Los datos no son correctos");
    }
    }
    
    return error;
 
  }
 
  async function borrarProducto(id){
    var error=1;
    var user=await buscarporID(id);
    if(user!=undefined){
      try{
         fs.unlinkSync("./web/images/" +user.foto)
         await conexion.doc(id).delete();
         console.log("Producto borrar");
         error=0;
   
      }
      catch(err){
         console.log("Error al borrar producto"+err);
      }
    }
    return error;
  }
 
 module.exports={
    mostrarProductos,
    buscarporID,
    nuevoProducto,
    modificarProducto,
    borrarProducto
 }