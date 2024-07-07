const pool = require('../config/connection_db');

const  receiveNotification = async (req, res) => {
  const { titulo, cuerpo } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO notificaciones (titulo, cuerpo) VALUES (?, ?)',
      [titulo, cuerpo]
    );

    console.log('Notificación guardada:', { id: result.insertId, titulo, cuerpo });

    res.status(200).send('Notificación recibida');
  } catch (error) {
    console.error('Error al guardar la notificación:', error);
    res.status(500).send('Error al procesar la notificación');
  }
};

const viewNotifications = async (req, res) => {
  try {
    // Consulta para obtener todas las notificaciones
    const [rows] = await pool.query(
      'SELECT * FROM notificaciones'
    );

    // Enviar los resultados como respuesta
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener las notificaciones:', error);
    res.status(500).send('Error al obtener las notificaciones');
  }
};


module.exports = {
  receiveNotification,
  viewNotifications

};
