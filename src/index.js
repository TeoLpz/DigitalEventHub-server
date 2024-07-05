const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config/config');
const swaggerRouter = require('./config/swagger');

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Rutas
app.use('/api', require('./routes/index'));

// Documentacion
app.use('/api-docs', swaggerRouter);

// Iniciar el servidor
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
