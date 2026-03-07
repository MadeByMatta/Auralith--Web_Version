const mysql = require('mysql2/promise');

// Crear pool de conexiones
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root', // Cambiar según la configuración local de XAMPP/MySQL
    password: process.env.DB_PASSWORD || '', // Normalmente vacío en XAMPP o instalar el correspondiente
    database: process.env.DB_NAME || 'auralith_db',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;
