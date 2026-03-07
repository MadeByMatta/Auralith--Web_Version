const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');

exports.getLogin = (req, res) => {
    if (req.session.user) return res.redirect('/player');
    res.render('pages/login', { title: 'Iniciar Sesión', error: null });
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findByEmail(email);
        if (!user) {
            return res.render('pages/login', { title: 'Iniciar Sesión', error: 'Credenciales inválidas.' });
        }

        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return res.render('pages/login', { title: 'Iniciar Sesión', error: 'Credenciales inválidas.' });
        }

        req.session.user = {
            id: user.id,
            username: user.username,
            rol: user.rol,
            profile_pic: user.profile_pic || 'Logotipo (Transparente).png'
        };
        res.redirect('/player');
    } catch (err) {
        console.error(err);
        res.render('pages/login', { title: 'Iniciar Sesión', error: 'Error interno del servidor.' });
    }
};

exports.getRegister = (req, res) => {
    if (req.session.user) return res.redirect('/player');
    res.render('pages/register', { title: 'Registrarse', error: null });
};

exports.postRegister = async (req, res) => {
    const { nombre_usuario, email, password } = req.body;
    try {
        // Verificar existencia
        const userByEmail = await UserModel.findByEmail(email);
        if (userByEmail) {
            return res.render('pages/register', { title: 'Registrarse', error: 'El correo ya está en uso.' });
        }
        const userByUsername = await UserModel.findByUsername(nombre_usuario);
        if (userByUsername) {
            return res.render('pages/register', { title: 'Registrarse', error: 'El nombre de usuario ya está en uso.' });
        }

        // Hashear password y crear
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserId = await UserModel.create({
            username: nombre_usuario,
            email: email,
            passwordHash: hashedPassword
        });

        // Iniciar sesión automáticamente
        req.session.user = {
            id: newUserId,
            username: nombre_usuario,
            rol: 'user', // Asumimos rol por defecto
            profile_pic: 'Logotipo (Transparente).png'
        };

        res.redirect('/player');
    } catch (err) {
        res.render('pages/register', { title: 'Registrarse', error: 'Error al registrar el usuario: ' + err.message });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) console.error(err);
        res.redirect('/');
    });
};
