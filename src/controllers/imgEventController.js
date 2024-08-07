const pool = require('../config/connection_db');

const getImgEvent = async (req, res) => {
    try {
        // Consulta SQL para obtener eventos con una sola imagen por evento y nombres correspondientes
        const [rows] = await pool.query(
            `SELECT e.evento_id, e.nombre AS evento_nombre, e.fecha_inicio, e.fecha_termino, e.hora, 
            te.nombre AS tipo_evento_nombre, c.nombre AS categoria_nombre, e.ubicacion, e.max_per, 
            e.estado, e.autorizado_por, e.fecha_autorizacion, e.validacion_id, 
            (SELECT i.imagen_url FROM imagenes i WHERE i.evento_id = e.evento_id LIMIT 1) AS imagen_url,
            (SELECT i.monto FROM pagos i WHERE i.pago_id = e.evento_id LIMIT 1) AS monto
             FROM eventos e
             JOIN Tipos_Evento te ON e.tipo_evento_id = te.tipo_evento_id
             JOIN Categorias c ON e.categoria_id = c.categoria_id`
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
    const { nombre, fecha_inicio, fecha_termino, hora, tipo_evento_id, categoria_id, ubicacion, max_per, imagen_url, monto } = req.body;

    // Validar que todos los campos necesarios estén presentes
    if (!nombre || !fecha_inicio || !fecha_termino || !hora || !tipo_evento_id || !categoria_id || !ubicacion || !max_per || !imagen_url || !monto) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    // Validar tipo_evento_id y categoria_id
    const validTipoEventoIds = [1, 2];
    const validCategoriaIds = [1, 2, 3, 4];

    if (!validTipoEventoIds.includes(tipo_evento_id)) {
        return res.status(400).send('Invalid tipo_evento_id');
    }

    if (!validCategoriaIds.includes(categoria_id)) {
        return res.status(400).send('Invalid categoria_id');
    }

    try {
        // Insertar el evento
        const [resultEvento] = await pool.query(
            `INSERT INTO eventos (nombre, fecha_inicio, fecha_termino, hora, tipo_evento_id, categoria_id, ubicacion, max_per, estado, autorizado_por, fecha_autorizacion, validacion_id)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pendiente', NULL, NULL, NULL)`,
            [nombre, fecha_inicio, fecha_termino, hora, tipo_evento_id, categoria_id, ubicacion, max_per]
        );

        const evento_id = resultEvento.insertId;

        // Insertar la imagen asociada al evento
        await pool.query(
            `INSERT INTO imagenes (evento_id, imagen_url) VALUES (?, ?)`,
            [evento_id, imagen_url]
        );

        // Insertar el pago asociado al evento
        await pool.query(
            `INSERT INTO pagos (evento_id, monto) VALUES (?, ?)`,
            [evento_id, monto]
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
        // Consulta SQL para obtener eventos con estado "Aprobado" y una sola imagen por evento y nombres correspondientes
        const [rows] = await pool.query(
            `SELECT e.evento_id, e.nombre AS evento_nombre, e.fecha_inicio, e.fecha_termino, e.hora, 
                    te.nombre AS tipo_evento_nombre, c.nombre AS categoria_nombre, 
                    e.ubicacion, e.max_per, e.estado, e.autorizado_por, e.fecha_autorizacion, e.validacion_id, 
                    (SELECT i.imagen_url FROM imagenes i WHERE i.evento_id = e.evento_id LIMIT 1) AS imagen_url,
                    (SELECT i.monto FROM pagos i WHERE i.pago_id = e.evento_id LIMIT 1) AS monto
             FROM eventos e
             JOIN Tipos_Evento te ON e.tipo_evento_id = te.tipo_evento_id
             JOIN Categorias c ON e.categoria_id = c.categoria_id
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
    getImgEvent,
    postImgEvent,
    getApprovedEvent
};

