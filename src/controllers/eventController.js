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
     
    // CONSULTA
  

    // RESPUESTA
      res.status(200).json(rows);
    } catch (error) {
    // MSG ERROR
      console.error('Error al obtener las notificaciones:', error);
      res.status(500).send('Error al obtener las notificaciones');
    }
  };


  const getEvent = async (req, res) => {
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


  
module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent

};