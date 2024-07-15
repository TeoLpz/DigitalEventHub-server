const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');  // Asegúrate de importar el middleware

// Ruta para iniciar sesión
router.post('/login', authController.authenticateUser);

// Ruta para obtener los datos del usuario autenticado
router.get('/token',  authController.getUserData);

module.exports = router;
