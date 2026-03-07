const UserModel = require('../models/userModel');
const db = require('../config/db');
const path = require('path');
const fs = require('fs');

exports.getProfile = (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('pages/profile', { title: 'Mi Perfil' });
};

exports.updateProfilePic = async (req, res) => {
    if (!req.session.user) return res.redirect('/login');

    try {
        if (!req.file) {
            return res.status(400).send('No se ha subido ninguna imagen.');
        }

        const userId = req.session.user.id;
        const newProfilePic = req.file.filename;

        // Obtener la imagen anterior para eliminarla si no es la por defecto
        const [rows] = await db.query('SELECT profile_pic FROM usuarios WHERE id = ?', [userId]);
        const oldPic = rows[0]?.profile_pic;

        // Actualizar la base de datos
        await db.query('UPDATE usuarios SET profile_pic = ? WHERE id = ?', [newProfilePic, userId]);

        // Actualizar la sesión
        req.session.user.profile_pic = newProfilePic;

        // Eliminar la imagen anterior del servidor si no es la por defecto
        if (oldPic && oldPic !== 'Logotipo (Transparente).png') {
            const oldPath = path.join(__dirname, '../public/img/users', oldPic);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar la imagen de perfil.');
    }
};

exports.updateUsername = async (req, res) => {
    if (!req.session.user) return res.redirect('/login');

    const { new_username } = req.body;
    if (!new_username || new_username.trim() === '') {
        return res.status(400).send('El nombre de usuario no puede estar vacío.');
    }

    try {
        const userId = req.session.user.id;

        // Check if username is taken
        const existingUser = await UserModel.findByUsername(new_username);
        if (existingUser && existingUser.id !== userId) {
            return res.status(400).send('Ese nombre de usuario ya está en uso.');
        }

        // Update DB
        await UserModel.updateUsername(userId, new_username);

        // Update session
        req.session.user.username = new_username;

        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar el nombre de usuario.');
    }
};
