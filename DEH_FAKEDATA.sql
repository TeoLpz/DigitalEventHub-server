USE bgivundzrylpnlvsapmh;

-- Insertar datos en Membresia
INSERT INTO Membresia (tipo, descripcion, costo) VALUES
('Básica', 'Acceso limitado a eventos y contenido.', 29.99),
('Premium', 'Acceso completo a todos los eventos y contenido exclusivo.', 99.99),
('VIP', 'Acceso completo y preferente a todos los eventos y contenido.', 199.99);

-- Insertar datos en Roles
INSERT INTO Roles (nombre) VALUES
('Administrador'),
('Usuario'),
('Organizador');

-- Insertar datos en Permisos
INSERT INTO Permisos (nombre) VALUES
('Crear evento'),
('Editar evento'),
('Eliminar evento'),
('Ver usuarios'),
('Editar usuarios'),
('Eliminar usuarios');

-- Insertar datos en Tipos_Evento
INSERT INTO Tipos_Evento (nombre) VALUES
('Conferencia'),
('Taller'),
('Seminario'),
('Concierto');

-- Insertar datos en Tipos_Pago
INSERT INTO Tipos_Pago (nombre) VALUES
('Tarjeta de Crédito'),
('PayPal'),
('Transferencia Bancaria');

-- Insertar datos en Validacion
INSERT INTO Validacion (estado, comentarios) VALUES
('Aprobado', 'Validado por el sistema.'),
('Pendiente', 'En espera de revisión.'),
('Rechazado', 'No cumple con los requisitos.');

-- Insertar datos en Categorias
INSERT INTO Categorias (nombre) VALUES
('Tecnología'),
('Educación'),
('Entretenimiento'),
('Deportes');

-- Insertar datos en Usuarios
INSERT INTO Usuarios (nombre, email, contrasena, telefono, rol_id, membresia_id) VALUES
('Juan Pérez', 'juan.perez@example.com', 'hashedpassword1', '1234567890', 1, 2),
('Maria García', 'maria.garcia@example.com', 'hashedpassword2', '0987654321', 2, 1),
('Carlos López', 'carlos.lopez@example.com', 'hashedpassword3', '1122334455', 3, 3);

-- Insertar datos en Roles_Permisos
INSERT INTO Roles_Permisos (rol_id, permiso_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(2, 4),
(2, 5);

-- Insertar datos en Eventos
INSERT INTO Eventos (nombre, fecha_inicio, fecha_termino, hora, tipo_evento_id, organizador_id, categoria_id, ubicacion, max_per, estado, autorizado_por, fecha_autorizacion, validacion_id) VALUES
('Conferencia de Tecnología', '2024-08-01', '2024-08-01', '09:00:00', 1, 3, 1, 'Auditorio Nacional', 100, 'Aprobado', 1, '2024-07-01 10:00:00', 1),
('Taller de Programación', '2024-09-01', '2024-09-02', '10:00:00', 2, 3, 1, 'Centro de Convenciones', 50, 'Pendiente', 2, NULL, 2);

-- Insertar datos en Detalles_Evento
INSERT INTO Detalles_Evento (evento_id, descripcion, requerimientos) VALUES
(1, 'Una conferencia sobre las últimas tendencias en tecnología.', 'Proyector, Wifi'),
(2, 'Un taller intensivo de programación para principiantes.', 'Computadora portátil');

-- Insertar datos en Imagenes
INSERT INTO Imagenes (usuario_id, evento_id, imagen_url, es_principal) VALUES
(1, 1, 'https://example.com/imagen1.jpg', TRUE),
(2, 2, 'https://example.com/imagen2.jpg', FALSE);

-- Insertar datos en Pagos
INSERT INTO Pagos (monto, fecha, tipo_pago_id, usuario_id, evento_id) VALUES
(99.99, '2024-07-05', 1, 1, 1),
(29.99, '2024-07-06', 2, 2, 2);

-- Insertar datos en Pago_Tarjeta
INSERT INTO Pago_Tarjeta (numero_tarjeta, fecha_expiracion, cvv, pago_id) VALUES
('1234567812345678', '2025-07-01', '123', 1),
('8765432187654321', '2026-08-01', '321', 2);

-- Insertar datos en Asistentes
INSERT INTO Asistentes (usuario_id, evento_id) VALUES
(1, 1),
(2, 2);

-- Insertar datos en Tokens
INSERT INTO Tokens (usuario_id, token, expiracion) VALUES
(1, 'token123', '2024-08-01 10:00:00'),
(2, 'token456', '2024-09-01 10:00:00');

-- Insertar datos en Asientos
INSERT INTO Asientos (numero_asiento, estado, usuario_id) VALUES
('A1', 'Reservado', 1),
('B1', 'Disponible', NULL);

-- Insertar datos en Comentarios
INSERT INTO Comentarios (usuario_id, evento_id, comentario) VALUES
(1, 1, 'Muy interesante y bien organizado.'),
(2, 2, 'Aprendí mucho en el taller.');

-- Insertar datos en Errores_Logs
INSERT INTO Errores_Logs (usuario_id, mensaje) VALUES
(1, 'Error al cargar la página de eventos.'),
(2, 'Error al procesar el pago.');

-- Insertar datos en Escenario
INSERT INTO Escenario (asiento, forma, evento_id) VALUES
(100, 'Redondo', 1),
(200, 'Cuadrado', 2);
