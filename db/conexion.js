var admin = require("firebase-admin");
var keys = require("../keys.json");

admin.initializeApp({
    credential:admin.credential.cert(keys)
});

var db=admin.firestore();
var conexionUsuarios=db.collection("miejemploBD");
var conexionProductos=db.collection("miejemplo2");

module.exports={
    conexionUsuarios,
    conexionProductos
};