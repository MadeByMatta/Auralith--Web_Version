const db = require('../config/db');

class UserModel {
    static async findByEmail(email) {
        const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0];
    }

    static async findByUsername(username) {
        const [rows] = await db.execute('SELECT * FROM usuarios WHERE username = ?', [username]);
        return rows[0];
    }

    static async create(userData) {
        const { username, email, passwordHash, profile_pic = 'Logotipo (Transparente).png' } = userData;
        const [result] = await db.execute(
            'INSERT INTO usuarios (username, email, password_hash, profile_pic) VALUES (?, ?, ?, ?)',
            [username, email, passwordHash, profile_pic]
        );
        return result.insertId;
    }

    static async updateUsername(id, newUsername) {
        const [result] = await db.execute('UPDATE usuarios SET username = ? WHERE id = ?', [newUsername, id]);
        return result.affectedRows > 0;
    }
}

module.exports = UserModel;
