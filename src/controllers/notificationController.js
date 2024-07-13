const pool = require('../config/connection_db');

const receiveNotification = async (req, res) => {
  const { usuario_id, mensaje } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO NotificacionO (usuario_id, mensaje) VALUES (?, ?)',
      [usuario_id, mensaje]
    );

    console.log('Notificación guardada:', { id: result.insertId, usuario_id, mensaje });

    res.status(200).send('Notificación recibida');
  } catch (error) {
    console.error('Error al guardar la notificación:', error);
    res.status(500).send('Error al procesar la notificación');
  }
};


const viewNotifications = async (req, res) => {
  try {
    const [result] = await pool.query(
      'SELECT * FROM NotificacionO'
    );
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al obtener las Notificaciones:', error);
    res.status(500).send('Error al obtener las Notificaciones');
  }
};


module.exports = {
  receiveNotification,
  viewNotifications

};
