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

        // Foto anterior no por defecto
        const [rows] = await db.query('SELECT profile_pic FROM usuarios WHERE id = ?', [userId]);
        const oldPic = rows[0]?.profile_pic;

        await db.query('UPDATE usuarios SET profile_pic = ? WHERE id = ?', [newProfilePic, userId]);

        req.session.user.profile_pic = newProfilePic;

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

        const existingUser = await UserModel.findByUsername(new_username);
        if (existingUser && existingUser.id !== userId) {
            return res.status(400).send('Ese nombre de usuario ya está en uso.');
        }

        await UserModel.updateUsername(userId, new_username);

        req.session.user.username = new_username;

        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar el nombre de usuario.');
    }
};
