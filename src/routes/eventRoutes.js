const express = require('express');
const router = express.Router();
const eventnController = require('../controllers/eventController');


router.post('/create', eventnController.createEvent);
router.delete('/delete', eventnController.deleteEvent);
router.put('/update', eventnController.updateEvent);
router.get('/get', eventnController.getEvent);

module.exports = router;