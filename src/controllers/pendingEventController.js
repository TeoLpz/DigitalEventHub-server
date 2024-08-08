const pool = require('../config/connection_db');

// Función para obtener eventos pendientes
const getPendingEvent = async (req, res) => {
    try {
        // Consulta SQL para obtener eventos con estado "Pendiente" y una sola imagen por evento
        const [rows] = await pool.query(
            `SELECT e.evento_id, e.nombre AS evento_nombre, e.fecha_inicio, e.fecha_termino, e.hora, 
                    te.nombre AS tipo_evento, c.nombre AS categoria, 
                    e.ubicacion, e.max_per, e.estado, e.autorizado_por, e.fecha_autorizacion, e.validacion_id, 
                    (SELECT i.imagen_url FROM imagenes i WHERE i.evento_id = e.evento_id LIMIT 1) AS imagen_url,
                    (SELECT i.monto FROM pagos i WHERE i.pago_id = e.evento_id LIMIT 1) AS monto,
                     (SELECT s.forma FROM escenario s WHERE s.escenario_id = e.evento_id LIMIT 1) AS forma_escenario,
                    (SELECT d.descripcion FROM detalles_evento d WHERE d.detalle_evento_id = e.evento_id LIMIT 1) AS descripcion
             FROM eventos e
             JOIN Tipos_Evento te ON e.tipo_evento_id = te.tipo_evento_id
             JOIN Categorias c ON e.categoria_id = c.categoria_id
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
