const express = require('express');
const router = express.Router();
const eventnController = require('../controllers/eventController');

/**
 * @openapi
 * tags:
 *   - name: eventos
 *     description: API para manejar eventos
 */

/**
 * @openapi
 * /api/events/create:
 *   post:
 *     tags:
 *       - eventos
 *     description: Crea un nuevo evento.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Conferencia de Tecnología"
 *               fecha_inicio:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-08-01T06:00:00.000Z"
 *               fecha_termino:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-08-01T06:00:00.000Z"
 *               hora:
 *                 type: string
 *                 format: time
 *                 example: "09:00:00"
 *               tipo_evento_id:
 *                 type: integer
 *                 example: 1
 *               organizador_id:
 *                 type: integer
 *                 example: 3
 *               categoria_id:
 *                 type: integer
 *                 example: 1
 *               ubicacion:
 *                 type: string
 *                 example: "Auditorio Nacional"
 *               max_per:
 *                 type: integer
 *                 example: 100
 *               estado:
 *                 type: string
 *                 example: "Aprobado"
 *               autorizado_por:
 *                 type: integer
 *                 example: 1
 *               fecha_autorizacion:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-07-01T16:00:00.000Z"
 *               validacion_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Evento creado exitosamente.
 *       400:
 *         description: Faltan datos requeridos.
 *       500:
 *         description: Error al crear el evento.
 */
router.post('/create', eventnController.createEvent);

/**
 * @openapi
 * /api/events/delete:
 *   delete:
 *     tags:
 *       - eventos
 *     description: Elimina un evento.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               evento_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Evento eliminado exitosamente.
 *       400:
 *         description: Faltan datos requeridos.
 *       404:
 *         description: Evento no encontrado.
 *       500:
 *         description: Error al eliminar el evento.
 */
router.delete('/delete', eventnController.deleteEvent);

/**
 * @openapi
 * /api/events/update:
 *   put:
 *     tags:
 *       - eventos
 *     description: Actualiza un evento existente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               evento_id:
 *                 type: integer
 *                 example: 1
 *               nombre:
 *                 type: string
 *                 example: "Conferencia de Tecnología"
 *               fecha_inicio:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-08-01"
 *               fecha_termino:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-08-01"
 *               hora:
 *                 type: string
 *                 format: time
 *                 example: "09:00:00"
 *               tipo_evento_id:
 *                 type: integer
 *                 example: 1
 *               organizador_id:
 *                 type: integer
 *                 example: 3
 *               categoria_id:
 *                 type: integer
 *                 example: 1
 *               ubicacion:
 *                 type: string
 *                 example: "Auditorio Nacional"
 *               max_per:
 *                 type: integer
 *                 example: 100
 *               estado:
 *                 type: string
 *                 example: "Aprobado"
 *               autorizado_por:
 *                 type: integer
 *                 example: 1
 *               fecha_autorizacion:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-07-01"
 *               validacion_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Evento actualizado exitosamente.
 *       400:
 *         description: Faltan datos para actualizar.
 *       404:
 *         description: Evento no encontrado.
 *       500:
 *         description: Error al actualizar el evento.
 */
router.put('/update', eventnController.updateEvent);

/**
 * @openapi
 * /api/events/get:
 *   get:
 *     tags:
 *       - eventos
 *     description: Obtiene la lista de eventos.
 
 *     responses:
 *       200:
 *         description: Detalles del evento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 evento_id:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: "Conferencia de Tecnología"
 *                 fecha_inicio:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-08-01T06:00:00.000Z"
 *                 fecha_termino:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-08-01T06:00:00.000Z"
 *                 hora:
 *                   type: string
 *                   format: time
 *                   example: "09:00:00"
 *                 tipo_evento_id:
 *                   type: integer
 *                   example: 1
 *                 organizador_id:
 *                   type: integer
 *                   example: 3
 *                 categoria_id:
 *                   type: integer
 *                   example: 1
 *                 ubicacion:
 *                   type: string
 *                   example: "Auditorio Nacional"
 *                 max_per:
 *                   type: integer
 *                   example: 100
 *                 estado:
 *                   type: string
 *                   example: "Aprobado"
 *                 autorizado_por:
 *                   type: integer
 *                   example: 1
 *                 fecha_autorizacion:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-07-01T16:00:00.000Z"
 *                 validacion_id:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Evento no encontrado.
 *       500:
 *         description: Error al obtener el evento.
 */
router.get('/get', eventnController.getEvent);

module.exports = router;


module.exports = router;