const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

// Middleware de CORS para permitir solicitudes desde cualquier origen
app.use(cors());

// Ruta para obtener todas las categorías y su contenido
app.get('/api/categorias', (req, res) => {
  const query = 'SELECT * FROM categorias';
  const queryContenido = 'SELECT * FROM contenido';

  db.query(query, (error, categoriasResults, fields) => {
    if (error) {
      console.error('Error en la consulta de categorías:', error);
      res.status(500).json({ error: 'Error en la consulta de la base de datos' });
      return;
    }

    db.query(queryContenido, (contenidoError, contenidoResults, contenidoFields) => {
      if (contenidoError) {
        console.error('Error en la consulta de contenido:', contenidoError);
        res.status(500).json({ error: 'Error en la consulta de la base de datos' });
        return;
      }

      // Organizar la respuesta en la estructura deseada
      const categorizedData = {};

      categoriasResults.forEach((categoria) => {
        const contenidoCategoria = contenidoResults
          .filter((contenido) => contenido.categoria_id === categoria.id)
          .map((contenido) => ({
            nombre: contenido.nombre,
            tipo: contenido.tipo,
            traduccion: contenido.traduccion,
            audio: contenido.audio,
          }));
        
        categorizedData[categoria.nombre] = contenidoCategoria;
      });

      res.json(categorizedData);
    });
  });
});

// Puerto en el que se ejecutará el servidor
const puerto = 3000;

// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`Servidor Express en ejecución en el puerto ${puerto}`);
});
