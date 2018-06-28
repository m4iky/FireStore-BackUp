var admin = require("firebase-admin");
var fs = require('fs');
var serviceAccount = require("./serviceAccountKey.json");
var async = require('async');

// var fileName = process.argv[2];

// You should replae databaseURL with your own
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nene-rentacar.firebaseio.com"
});

var db = admin.firestore();
async.each(["sucursales"], function (file, callback) {

    fs.readFile("Respaldos/" + file + ".json", 'utf8', function(err, data){
      if(err){
        return console.log(err);
      }

      // Turn string from file to an Array
      dataArray = JSON.parse(data);

      udpateCollection(dataArray).then(() => {
        console.log('¡Colección importada a la base de datos!');
      })

    })

    async function udpateCollection(dataArray){
      for(var index in dataArray){
        var collectionName = index;
        for(var doc in dataArray[index]){
          if(dataArray[index].hasOwnProperty(doc)){
            await startUpading(collectionName, doc, dataArray[index][doc])
          }
        }
      }
    }

    function startUpading(collectionName, doc, data){
      return new Promise(resolve => {
        db.collection(collectionName).doc(doc)
        .set(data)
        .then(() => {
          console.log(`¡${doc} fue añadido a la base de datos!`);
          resolve('Data wrote!');
        })
        .catch(error => {
          console.log(error);
        });
      })
    }
})