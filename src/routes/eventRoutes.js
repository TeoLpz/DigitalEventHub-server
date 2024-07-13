const express = require('express');
const router = express.Router();
const eventnController = require('../controllers/eventController');
const verifyToken = require("../middlewares/verify-token-rol");


// Creacion de eventos - Teo Team
router.post('/create', eventnController.createEvent);
router.delete('/delete', eventnController.deleteEvent);
router.put('/update', eventnController.updateEvent);
router.get('/get', eventnController.getEvent);

// Administracion de usarios en eventos - Jesus Team
router.get("/:eventId/users", verifyToken(2),eventnController.registrationEvent);
router.put("/:eventId/users/:userId",verifyToken(2),eventnController.updateRegistrationEvent);

// NO SE QUE PEDO CON LOS TOKENS - Teo

module.exports = router;