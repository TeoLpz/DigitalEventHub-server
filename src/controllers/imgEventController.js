const pool = require('../config/connection_db');

const getImgEvent = async (req, res) => {
    try {
        // Consulta SQL para obtener eventos con una sola imagen por evento
        const [rows] = await pool.query(
            `SELECT e.evento_id, e.nombre, e.fecha_inicio, e.fecha_termino, e.hora, e.tipo_evento_id, e.organizador_id, e.categoria_id, e.ubicacion, e.max_per, e.estado, e.autorizado_por, e.fecha_autorizacion, e.validacion_id, 
                    (SELECT i.imagen_url FROM imagenes i WHERE i.evento_id = e.evento_id LIMIT 1) AS imagen_url
             FROM eventos e`
        );

        // Verifica los datos que se obtienen de la consulta
        console.log('Datos obtenidos:', rows);

        // Enviar los resultados como respuesta
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener la lista de eventos:', error);
        res.status(500).send('Error al obtener la lista de eventos');
    }
  };

module.exports = {
    getImgEvent 
};

