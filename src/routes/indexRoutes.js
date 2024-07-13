const express = require('express');
const router = express.Router();



// Importar y usar otras rutas
const notificationRoutes = require('./notificationRoutes');
const eventRoutes = require('./eventRoutes');
const userRoutes = require('./userRoutes');



// Categorias de las rutas
router.use('/notification', notificationRoutes);
router.use('/event', eventRoutes);
router.use('/user', userRoutes);




module.exports = router;
