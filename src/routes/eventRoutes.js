const express = require('express');
const router = express.Router();
const eventnController = require('../controllers/eventController');
const imgEventController = require('../controllers/imgEventController');// Ruta del get eventos con imagen
const verifyToken = require("../middlewares/verify-token-rol");


// Administración de eventos - Teo Team
router.post('/create', eventnController.createEvent);
router.delete('/delete', eventnController.deleteEvent);
router.put('/update', eventnController.updateEvent);
router.get('/get', eventnController.getEvent);

router.get('/get/img', imgEventController.getImgEvent);
router.get('/get/img/:id', imgEventController.getIdImgEvent);
router.post('/post/img', imgEventController.postImgEvent);
router.put('/put/img/:id', imgEventController.putImgEvent);
router.get('/get/approved', imgEventController.getApprovedEvent);
router.get('/get/pending', imgEventController.getPendingEvent);
router.post('/post/pending', imgEventController.postPendingEvent);


// Administracion de usarios en eventos - Jesus Team
router.get("/:eventId/users", verifyToken(2),eventnController.registrationEvent);
router.put("/:eventId/users/:userId",verifyToken(2),eventnController.updateRegistrationEvent);

// NO SE QUE PEDO CON LOS TOKENS - Canul Brayan

module.exports = router;