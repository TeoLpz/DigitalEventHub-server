const pool = require('../config/connection_db');

const getImgEvent = async (req, res) => {
    try {
        // Consulta SQL para obtener eventos con una sola imagen por evento y nombres correspondientes
        const [rows] = await pool.query(
            `SELECT e.evento_id, e.nombre AS evento_nombre, e.fecha_inicio, e.fecha_termino, e.hora, 
                    te.nombre AS tipo_evento, c.nombre AS categoria, e.ubicacion, e.max_per, 
                    e.estado, e.autorizado_por, e.fecha_autorizacion, e.validacion_id, 
                    (SELECT i.imagen_url FROM imagenes i WHERE i.evento_id = e.evento_id LIMIT 1) AS imagen_url,
                    (SELECT p.monto FROM pagos p WHERE p.pago_id = e.evento_id LIMIT 1) AS monto,
                    (SELECT s.forma FROM escenario s WHERE s.escenario_id = e.evento_id LIMIT 1) AS forma_escenario,
                    (SELECT d.descripcion FROM detalles_evento d WHERE d.detalle_evento_id = e.evento_id LIMIT 1) AS descripcion
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

const getIdImgEvent = async (req, res) => {
    try {
        const { id: evento_id } = req.params;

        const [rows] = await pool.query(
            `SELECT e.evento_id, e.nombre AS evento_nombre, e.fecha_inicio, e.fecha_termino, e.hora, 
                    te.nombre AS tipo_evento, c.nombre AS categoria, e.ubicacion, e.max_per, 
                    e.estado, e.autorizado_por, e.fecha_autorizacion, e.validacion_id, 
                    (SELECT i.imagen_url FROM imagenes i WHERE i.evento_id = e.evento_id LIMIT 1) AS imagen_url,
                    (SELECT p.monto FROM pagos p WHERE p.pago_id = e.evento_id LIMIT 1) AS monto,
                    (SELECT s.forma FROM escenario s WHERE s.escenario_id = e.evento_id LIMIT 1) AS forma_escenario,
                    (SELECT d.descripcion FROM detalles_evento d WHERE d.detalle_evento_id = e.evento_id LIMIT 1) AS descripcion
             FROM eventos e
             JOIN Tipos_Evento te ON e.tipo_evento_id = te.tipo_evento_id
             JOIN Categorias c ON e.categoria_id = c.categoria_id
             WHERE e.evento_id = ?`,
            [evento_id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error al obtener el evento:', error);
        res.status(500).send('Error al obtener el evento');
    }
};



const postImgEvent = async (req, res) => {
    const { nombre, fecha_inicio, fecha_termino, hora, tipo_evento_id, categoria_id, ubicacion, max_per, imagen_url, monto, forma, descripcion } = req.body;

    // Validar que todos los campos necesarios estén presentes
    if (!nombre || !fecha_inicio || !fecha_termino || !hora || !tipo_evento_id || !categoria_id || !ubicacion || !max_per || !imagen_url || !monto || !forma || !descripcion) {
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

    // Validar forma
    const validFormas = ['Cuadrado', 'Redondo', 'Triangular'];
    if (!validFormas.includes(forma)) {
        return res.status(400).send('Invalid forma');
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

        // Insertar la forma y asiento en la tabla escenario
        console.log(`Inserting forma: ${forma} with max_per: ${max_per} for evento_id: ${evento_id}`);
        await pool.query(
            `INSERT INTO escenario (evento_id, forma, asiento) VALUES (?, ?, ?)`,
            [evento_id, forma, max_per]
        );

        // Insertar la descripción en la tabla detalles_evento
        await pool.query(
            `INSERT INTO detalles_evento (evento_id, descripcion) VALUES (?, ?)`,
            [evento_id, descripcion]
        );

        // Éxito al crear el evento
        res.status(201).send('Evento creado correctamente');
    } catch (error) {
        console.error('Error al crear el evento:', error);
        res.status(500).send('Error al crear el evento');
    }
};

const putImgEvent = async (req, res) => {
    const { id } = req.params;
    const { nombre, fecha_inicio, fecha_termino, hora, tipo_evento_id, categoria_id, ubicacion, max_per, imagen_url, monto, forma, descripcion } = req.body;

    // Validar que todos los campos necesarios estén presentes
    if (!nombre || !fecha_inicio || !fecha_termino || !hora || !tipo_evento_id || !categoria_id || !ubicacion || !max_per || !imagen_url || !monto || !forma || !descripcion) {
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

    // Validar forma
    const validFormas = ['Cuadrado', 'Redondo', 'Triangular'];
    if (!validFormas.includes(forma)) {
        return res.status(400).send('Invalid forma');
    }

    try {
        // Actualizar el evento
        await pool.query(
            `UPDATE eventos 
             SET nombre = ?, fecha_inicio = ?, fecha_termino = ?, hora = ?, tipo_evento_id = ?, categoria_id = ?, ubicacion = ?, max_per = ?
             WHERE evento_id = ?`,
            [nombre, fecha_inicio, fecha_termino, hora, tipo_evento_id, categoria_id, ubicacion, max_per, id]
        );

        // Actualizar la imagen asociada al evento
        await pool.query(
            `UPDATE imagenes 
             SET imagen_url = ?
             WHERE evento_id = ?`,
            [imagen_url, id]
        );

        // Actualizar el pago asociado al evento
        await pool.query(
            `UPDATE pagos 
             SET monto = ?
             WHERE evento_id = ?`,
            [monto, id]
        );

        // Actualizar la forma y asiento en la tabla escenario
        await pool.query(
            `UPDATE escenario 
             SET forma = ?, asiento = ?
             WHERE evento_id = ?`,
            [forma, max_per, id]
        );

        // Actualizar la descripción en la tabla detalles_evento
        await pool.query(
            `UPDATE detalles_evento 
             SET descripcion = ?
             WHERE evento_id = ?`,
            [descripcion, id]
        );

        // Éxito al actualizar el evento
        res.status(200).send('Evento actualizado correctamente');
    } catch (error) {
        console.error('Error al actualizar el evento:', error);
        res.status(500).send('Error al actualizar el evento');
    }
};


// Función para obtener eventos aprobados
const getApprovedEvent = async (req, res) => {
    try {
        // Consulta SQL para obtener eventos con estado "Aprobado" y una sola imagen por evento y nombres correspondientes
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
    getImgEvent,
    getIdImgEvent,
    postImgEvent,
    getApprovedEvent,
    putImgEvent,
    getPendingEvent,
    postPendingEvent
};

