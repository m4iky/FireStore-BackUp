Un script que ayudará a exportar e importar datos de FIRESTORE

# Requisitos

Tu necesitas [NODE](https://nodejs.org/en/download/) o algo que pueda ejecutar archivos JAVASCRIPT (JS).

Consigue el archivo JSON **serviceAccount** desde *Configuración > CUENTAS DE SERVICIO* en la Consola de Firebase

Cambia el *databaseURL* en el initializeApp con el de su base de Datos

# Configurando

Descargar o Clonar este repositorio con el código original

```
git clone https://github.com/dalenguyen/firestore-import-export.git
```

Instalar los paquetes de NPM

```
npm install
```

# Exportar la Base de Datos de FireBase

Esto te ayudará a crear respaldos de tu base de datos, archivos JSON que tendrán los nombres de las colecciones que especifiques en el archivo **export.js**, recuerde primero crear la carpeta Respaldos/

```
node export.js
```

# Importar la Base de Datos a FireBase

Esto importará todas las colecciones que especifiques en el archivo **import.js** a tu base de datos FIREBASE. Recuerda que debes tener un archivo JSON de cada colección que vayas a importar en la carpeta de respaldos.

```
node import.js
```

*Cualquier duda o sugerencia, puede hacerla al correo Michaelvargas29@hotmail.com, ¡Gracias!*
