const express = require('express');
const router = express.Router();
const eventnController = require('../controllers/eventController');


router.post('/create', eventnController.createEvent);
router.post('/delete', eventnController.deleteEvent);
router.post('/update', eventnController.updateEvent);
router.post('/get', eventnController.getEvent);

module.exports = router;