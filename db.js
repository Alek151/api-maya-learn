const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: '190.151.128.78',        // Cambia esto por la dirección de tu servidor MySQL
  user: 'admin',       // Cambia esto por tu nombre de usuario de MySQL
  password: 'adimn23jlmcjlmc60$$', // Cambia esto por tu contraseña de MySQL
  database: 'mayalearbn', // Cambia esto por el nombre de tu base de datos
};

// Crear una conexión a la base de datos
const connection = mysql.createConnection(dbConfig);

// Conectar a la base de datos
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});

module.exports = connection;
