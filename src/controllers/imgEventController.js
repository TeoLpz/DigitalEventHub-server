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

  const postImgEvent = async (req, res) => {
    const { nombre, fecha_inicio, fecha_termino, hora, tipo_evento_id, organizador_id, categoria_id, ubicacion, max_per, estado, autorizado_por, fecha_autorizacion, validacion_id, imagen_url } = req.body;


    try {
        // Insertar el evento
        const [resultEvento] = await pool.query(
            `INSERT INTO eventos (nombre, fecha_inicio, fecha_termino, hora, tipo_evento_id, organizador_id, categoria_id, ubicacion, max_per, estado, autorizado_por, fecha_autorizacion, validacion_id)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [nombre, fecha_inicio, fecha_termino, hora, tipo_evento_id, organizador_id, categoria_id, ubicacion, max_per, estado, autorizado_por, fecha_autorizacion, validacion_id]
        );

        const evento_id = resultEvento.insertId;

        // Insertar la imagen asociada al evento
        await pool.query(
            `INSERT INTO imagenes (evento_id, imagen_url) VALUES (?, ?)`,
            [evento_id, imagen_url]
        );

      

        // Éxito al crear el evento
        res.status(201).send('Evento creado correctamente');
    } catch (error) {

        console.error('Error al crear el evento:', error);
        res.status(500).send('Error al crear el evento');
    } 
};

// Función para obtener eventos aprobados
const getApprovedEvent = async (req, res) => {
    try {
        // Consulta SQL para obtener eventos con estado "Aprobado" y una sola imagen por evento
        const [rows] = await pool.query(
            `SELECT e.evento_id, e.nombre, e.fecha_inicio, e.fecha_termino, e.hora, e.tipo_evento_id, e.organizador_id, e.categoria_id, e.ubicacion, e.max_per, e.estado, e.autorizado_por, e.fecha_autorizacion, e.validacion_id, 
                    (SELECT i.imagen_url FROM imagenes i WHERE i.evento_id = e.evento_id LIMIT 1) AS imagen_url
             FROM eventos e
             WHERE e.estado = 'Aprobado'`
        );

        // Verifica los datos que se obtienen de la consulta
        console.log('Datos obtenidos:', rows);

        // Enviar los resultados como respuesta
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener la lista de eventos aprobados:', error);
        res.status(500).send('Error al obtener la lista de eventos aprobados');
    }
};

module.exports = {
    getImgEvent ,
    postImgEvent,
    getApprovedEvent
};

