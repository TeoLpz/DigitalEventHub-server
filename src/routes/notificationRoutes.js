const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

/**
 * @openapi
 * tags:
 *   name: Notifications
 *   description: API for managing notifications
 */

/**
 * @openapi
 * /api/notifications/send:
 *   post:
 *     tags:
 *       - Notifications
 *     description: Recibe una notificación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Notification Title"
 *               cuerpo:
 *                 type: string
 *                 example: "Notification Body"
 *     responses:
 *       200:
 *         description: Notificación recibida.
 */
router.post('/send', notificationController.receiveNotification);


/**
 * @openapi
 * /api/notifications/getAll:
 *   get:
 *     tags:
 *       - Notifications
 *     description: Obtiene todas las notificaciones.
 *     responses:
 *       200:
 *         description: Lista de notificaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1"
 *                   message:
 *                     type: string
 *                     example: "Notification message"
 */
router.get('/getAll', notificationController.viewNotifications);

module.exports = router;
