const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Documentacion en /api-docs');
});


// Importar y usar otras rutas
const notificationRoutes = require('./notificationRoutes');
const eventsRoutes = require('./eventRoutes');



// Categorias de las rutas
router.use('/notifications', notificationRoutes);
router.use('/events', eventsRoutes);

module.exports = router;
