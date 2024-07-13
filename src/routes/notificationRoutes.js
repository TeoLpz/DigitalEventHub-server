const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/send', notificationController.receiveNotification);
router.get('/getAll', notificationController.viewNotifications);

module.exports = router;
