const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.get('/getUsers', userController.getUsers);
router.post('/postUsers', userController.postUsers);




module.exports = router;