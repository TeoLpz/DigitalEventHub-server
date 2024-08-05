const pool = require('../config/connection_db');

// Función para obtener eventos pendientes
const getPendingEvent = async (req, res) => {
    try {
        // Consulta SQL para obtener eventos con estado "Pendiente" y una sola imagen por evento
        const [rows] = await pool.query(
            `SELECT e.evento_id, e.nombre, e.fecha_inicio, e.fecha_termino, e.hora, e.tipo_evento_id, e.organizador_id, e.categoria_id, e.ubicacion, e.max_per, e.estado, e.autorizado_por, e.fecha_autorizacion, e.validacion_id, 
                    (SELECT i.imagen_url FROM imagenes i WHERE i.evento_id = e.evento_id LIMIT 1) AS imagen_url
             FROM eventos e
             WHERE e.estado = 'Pendiente'`
        );

        // Verifica los datos que se obtienen de la consulta
        console.log('Datos obtenidos:', rows);

        // Enviar los resultados como respuesta
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener la lista de eventos pendientes:', error);
        res.status(500).send('Error al obtener la lista de eventos pendientes');
    }
};

// Función para actualizar el estado de un evento
const postPendingEvent = async (req, res) => {
    const { evento_id, estado } = req.body;

    // Validar el estado
    if (!['Aprobado', 'Rechazado'].includes(estado)) {
        return res.status(400).send('Estado inválido');
    }

    try {
        // Actualizar el estado del evento
        const [result] = await pool.query(
            `UPDATE eventos SET estado = ? WHERE evento_id = ?`,
            [estado, evento_id]
        );

        // Verificar si el evento fue encontrado y actualizado
        if (result.affectedRows === 0) {
            return res.status(404).send('Evento no encontrado');
        }

        // Éxito al actualizar el estado del evento
        res.status(200).send('Estado del evento actualizado correctamente');
    } catch (error) {
        console.error('Error al actualizar el estado del evento:', error);
        res.status(500).send('Error al actualizar el estado del evento');
    }
};

module.exports = {
    getPendingEvent,
    postPendingEvent
};
