const pool = require('../config/connection_db');

const createEvent = async (req, res) => {
    try {
     
    // CONSULTA
  

    // RESPUESTA
      res.status(200).json(rows);
    } catch (error) {
    // MSG ERROR
      console.error('Error al obtener las notificaciones:', error);
      res.status(500).send('Error al obtener las notificaciones');
    }
  };

  const updateEvent = async (req, res) => {
    try {
     
    // CONSULTA

    // RESPUESTA
      res.status(200).json(rows);
    } catch (error) {
    // MSG ERROR
      console.error('Error al obtener las notificaciones:', error);
      res.status(500).send('Error al obtener las notificaciones');
    }
  };


  const deleteEvent = async (req, res) => {
    try {
      const { id } = req.body;

      const [result] = await pool.query(
        'DELETE FROM notificaciones WHERE id = ?',
        [id]
      );
      
      if (result.affectedRows === 0) {
        return res.status(404).send('Evento no encontrado');
      }
  
      res.status(200).send('Evento eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
      res.status(500).send('Error al eliminar la evento');
    }
  };


  const getEvent = async (req, res) => {
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
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent

};