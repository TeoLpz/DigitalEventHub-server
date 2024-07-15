const pool = require('../config/connection_db');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// Función para autenticar al usuario
const authenticateUser = async (req, res) => {
    try {
        const { email, contrasena } = req.body;

        if (!email || !contrasena) {
            return res.status(400).send('Faltan datos requeridos');
        }

        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ? AND rol_id = 2', [email]);

        if (rows.length === 0) {
            return res.status(401).send('Usuario no encontrado o no autorizado');
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(contrasena, user.contrasena);

        if (!isMatch) {
            return res.status(401).send('Contraseña incorrecta');
        }

        // Generar un token JWT
        const token = jwt.sign({ userId: user.usuario_id, email: user.email }, 'tu_secreto_jwt', { expiresIn: '1h' });

        res.status(200).json({
            message: 'Autenticación exitosa',
            token: token
        });
    } catch (error) {
        console.error('Error durante la autenticación:', error);
        res.status(500).send('Error durante la autenticación');
    }
};

// Función para obtener los datos del usuario
const getUserData = async (req, res) => {
    try {
      

        const [rows] = await pool.query('SELECT * FROM usuarios');

        if (rows.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        const user = rows[0];

        res.status(200).json({
            usuario_id: user.usuario_id,
            nombre: user.nombre,
            email: user.email,
            telefono: user.telefono,
            last_name: user.last_name,
            resetPasswordExpired: user.resetPasswordExpired,
            resetPasswordToken: user.resetPasswordToken,
            fotoPerfil: user.fotoPerfil,
            rol_id: user.rol_id,
            membresia_id: user.membresia_id,
            activo: user.activo
        });
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        res.status(500).send('Error al obtener los datos del usuario');
    }
};

module.exports = {
    authenticateUser,
    getUserData
};
