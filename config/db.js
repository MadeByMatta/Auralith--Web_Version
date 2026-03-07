const mysql = require('mysql2/promise');

// Crear pool de conexiones
const db = mysql.createPool({
    host: 'localhost',
    user: 'root', // Cambiar según la configuración local de XAMPP/MySQL
    password: '', // Normalmente vacío en XAMPP o instalar el correspondiente
    database: 'auralith_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;
