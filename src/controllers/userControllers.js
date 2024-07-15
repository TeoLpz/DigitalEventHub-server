const pool = require('../config/connection_db');
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
    try {
        // Consulta para obtener todas las usuarios
        const [rows] = await pool.query(
            'SELECT * FROM usuarios'
        );

        // Enviar los resultados como respuesta
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
        res.status(500).send('Error al obtener la lista de usuarios');
    }
};

const postUsers = async (req, res) => {
    try {
        const {
            nombre,
            email,
            contrasena,
            telefono,
            last_name,
            resetPasswordExpired,
            resetPasswordToken,
            fotoPerfil,
            rol_id,
            membresia_id,
            activo
        } = req.body;

        const PasswordCrypt = await bcrypt.hash(contrasena, 10);

        // Verificar si el correo ya está registrado
        const [existingUser] = await pool.query('SELECT email FROM usuarios WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            return res.status(400).send('El correo electrónico ya está registrado');
        }

        // Validar que todos los campos requeridos están presentes
        if (!nombre || !email || !contrasena || !telefono || !last_name || !resetPasswordExpired || !resetPasswordToken || !fotoPerfil || !rol_id || !membresia_id || !activo) {
            return res.status(400).send('Faltan datos requeridos');
        }

        // CONSULTA
        const query = `
            INSERT INTO usuarios (nombre, email, contrasena, 
            telefono, last_name, resetPasswordExpired, resetPasswordToken, 
            fotoPerfil, rol_id, membresia_id, activo) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            nombre, email, PasswordCrypt, telefono, last_name, 
            resetPasswordExpired, resetPasswordToken, fotoPerfil, 
            rol_id, membresia_id, activo
        ];

        // Ejecutar la consulta
        const [result] = await pool.query(query, values);

        // RESPUESTA
        res.status(201).json({ message: 'Usuario creado exitosamente', Bienvenido: result.nombre });
    } catch (error) {
        // MSG ERROR
        console.error('Error al crear el usuario:', error);
        res.status(500).send('Error al crear el usuario');
    }
};



module.exports = {
    getUsers,
    postUsers

};