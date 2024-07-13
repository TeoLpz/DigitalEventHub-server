const pool = require('../config/connection_db');


const createEvent = async (req, res) => {
  try {
    const {
        nombre,
        fecha_inicio,
        fecha_termino,
        hora,
        tipo_evento_id,
        organizador_id,
        categoria_id,
        ubicacion,
        max_per,
        estado,
        autorizado_por,
        fecha_autorizacion,
        validacion_id
    } = req.body;

    // Validar que todos los campos requeridos están presentes
    if ( !nombre || !fecha_inicio || !fecha_termino || !hora || !tipo_evento_id || !organizador_id || !categoria_id || !ubicacion || !max_per || !estado || !autorizado_por || !fecha_autorizacion || !validacion_id) {
        return res.status(400).send('Faltan datos requeridos');
    }

    // CONSULTA
    const query = `
        INSERT INTO eventos (
             nombre, fecha_inicio, fecha_termino, hora, tipo_evento_id,
            organizador_id, categoria_id, ubicacion, max_per, estado,
            autorizado_por, fecha_autorizacion, validacion_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        nombre, fecha_inicio, fecha_termino, hora, tipo_evento_id,
        organizador_id, categoria_id, ubicacion, max_per, estado,
        autorizado_por, fecha_autorizacion, validacion_id
    ];

    // Ejecutar la consulta
    const [result] = await pool.query(query, values);

    // RESPUESTA
    res.status(201).json({ message: 'Evento creado exitosamente', eventId: result.insertId });
} catch (error) {
    // MSG ERROR
    console.error('Error al crear el evento:', error);
    res.status(500).send('Error al crear el evento');
}

  };

  const updateEvent = async (req, res) => {
    try {
      const {
          evento_id,
          nombre,
          fecha_inicio,
          fecha_termino,
          hora,
          tipo_evento_id,
          organizador_id,
          categoria_id,
          ubicacion,
          max_per,
          estado,
          autorizado_por,
          fecha_autorizacion,
          validacion_id
      } = req.body;

    

      // Validar que el evento_id esté presente
      if (!evento_id) {
          return res.status(400).send('Falta el ID del evento');
      }

      // Validar que al menos un campo esté presente para actualizar
      if (!nombre && !fecha_inicio && !fecha_termino && !hora && !tipo_evento_id && !organizador_id && !categoria_id && !ubicacion && !max_per && !estado && !autorizado_por && !fecha_autorizacion && !validacion_id) {
          return res.status(400).send('Faltan datos para actualizar');
      }

      // CONSULTA
      const query = `
          UPDATE eventos
          SET nombre = COALESCE(?, nombre),
              fecha_inicio = COALESCE(?, fecha_inicio),
              fecha_termino = COALESCE(?, fecha_termino),
              hora = COALESCE(?, hora),
              tipo_evento_id = COALESCE(?, tipo_evento_id),
              organizador_id = COALESCE(?, organizador_id),
              categoria_id = COALESCE(?, categoria_id),
              ubicacion = COALESCE(?, ubicacion),
              max_per = COALESCE(?, max_per),
              estado = COALESCE(?, estado),
              autorizado_por = COALESCE(?, autorizado_por),
              fecha_autorizacion = COALESCE(?, fecha_autorizacion),
              validacion_id = COALESCE(?, validacion_id)
          WHERE evento_id = ?
      `;
      const values = [
          nombre, fecha_inicio, fecha_termino, hora, tipo_evento_id, organizador_id,
          categoria_id, ubicacion, max_per, estado, autorizado_por, fecha_autorizacion, validacion_id, evento_id
      ];

      // Ejecutar la consulta
      const [result] = await pool.query(query, values);

      // Verificar si se actualizó algún registro
      if (result.affectedRows === 0) {
          return res.status(404).send('Evento no encontrado');
      }

      // RESPUESTA
      res.status(200).json({ message: 'Evento actualizado exitosamente' });
  } catch (error) {
      // MSG ERROR
      console.error('Error al actualizar el evento:', error);
      res.status(500).send('Error al actualizar el evento');
  }
  };


  const deleteEvent = async (req, res) => {
    try {
      const { evento_id } = req.body;

      const [result] = await pool.query(
        'DELETE FROM eventos WHERE evento_id = ?',
        [evento_id]
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
        'SELECT * FROM eventos'
      );
  
      // Enviar los resultados como respuesta
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error al obtener la lista de eventos:', error);
      res.status(500).send('Error al obtener la lista de eventos');
    }
  };

  const registrationEvent = async (req, res) => {
    try {
      const { eventId } = req.params;
      // Verificar si el evento existe
      const [eventExists] = await pool.query(
        `
            SELECT nombre FROM Eventos WHERE evento_id = ?
        `,
        [eventId]
      );
      if (eventExists.length === 0) {
        return res
          .status(404)
          .json({ error: "No se encontró el evento con el ID proporcionado" });
      }
      // Si el evento existe, obtener los usuarios inscritos sin incluir el nombre del evento en cada usuario
  
      const [users] = await pool.query(
        `
            SELECT Usuarios.nombre AS usuarioNombre, Usuarios.email
            FROM Usuarios
            JOIN Asistentes ON Usuarios.usuario_id = Asistentes.usuario_id
            WHERE Asistentes.evento_id = ?
        `,
        [eventId]
      );
  
      if (users.length > 0) {
        // Incluir el nombre del evento y el total de usuarios solo una vez en la respuesta
        res.json({
          evento: eventExists[0].nombre,
          usuarios: users,
          total: users.length,
        });
      } else {
        res.status(404).json({ error: "No hay usuarios inscritos en el evento" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error en el servidor");
    }

  };


  const updateRegistrationEvent = async (req, res) => {

    try {
      const { eventId, userId } = req.params;
      const { nuevoEstado } = req.body;
  
      if (!eventId || !userId || !nuevoEstado) {
        return res.status(400).send("Faltan datos");
      }
      // Verificar si el evento existe
      const [eventoExiste] = await pool.query(
        "SELECT 1 FROM Eventos WHERE evento_id = ?",
        [eventId]
      );
      if (eventoExiste.length === 0) {
        return res.status(404).json({ error: "Evento no encontrado." });
      }
  
      const [usuarioExiste] = await pool.query(
        "SELECT 1 FROM Usuarios WHERE usuario_id = ?",
        [userId]
      );
  
      if (usuarioExiste.length === 0) {
        return res.status(404).json({ error: "Usuario no encontrado." });
      }
  
      // Actualizar el estado de inscripción
      const [result] = await pool.query(
        `
            UPDATE Asistentes
            SET estado_inscripcion = ?
            WHERE evento_id = ? AND usuario_id = ?
          `,
        [nuevoEstado, eventId, userId]
      );
      if (result.affectedRows === 0) {
        throw new Error("NoRowsAffected");
      }
      res.json({
        mensaje: "El estado de inscripción ha sido actualizado.",
      });
    } catch (error) {
      if (error.message === "NoRowsAffected") {
        res.status(404).json({ error: "No se encontró el usuario en el evento" });
      } else {
        console.error(error);
        res.status(500).send("Error en el servidor");
      }
    }
  
  };



  
module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  registrationEvent,
  updateRegistrationEvent
};