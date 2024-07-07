const express = require('express');
const router = express.Router();
const eventnController = require('../controllers/eventController');


router.post('/newEvent', eventnController.createEvent);
router.delete('/dropEvent', eventnController.deleteEvent);
router.put('/editData', eventnController.updateEvent);
router.get('/viewList', eventnController.getEvent);

module.exports = router;