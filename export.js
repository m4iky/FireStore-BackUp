var admin = require("firebase-admin");
var async = require('async');

var fs = require('fs');
var fs2 = require('fs');

var serviceAccount = require("./serviceAccountKey.json");

// var collectionName = process.argv[2];

// You should replae databaseURL with your own
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pilotsystem-9ab72.firebaseio.com"
});

var db = admin.firestore();

 async.each(["CuentaCobrar", "CuentasPagar", "clientes", "colores", "comprobantes", "contratos", "cotizacion", "cuentasPagar_Vehiculos", "entradas", "fecha_veh", "foto_vehiculos", "mecanicos", "menu", "notas", "piezas", "reservas", "salidas", "sucursales", "suplidores", "tiposUsuario", "usuarios", "vehiculos"], function (file, callback) {
  var collectionName = file

  var data = {};
  data[collectionName] = {};

  var results = db.collection(collectionName)
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      data[collectionName][doc.id] = doc.data();
    })
    return data;
  }) 
  .catch(error => {
    console.log(error);
  })

  results.then(dt => {
    // Write collection to JSON file
   

      fs.writeFile('Respaldos/' + file + '.json', JSON.stringify(dt), function (err) {
          if (err) {
              console.log(err);
          }
          else {
              console.log('El archivo ' + file + '.json ha sido actualizado.');
          }

          callback();
      });

  }, function (err) {

      if (err) {
          // One of the iterations produced an error.
          // All processing will now stop.
          console.log('Fallo al procesar el archivo.');
      }
      else {
          console.log('Copia de seguridad de todos los archivos creada correctamente.');
      }
  });
  
})
