const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const path = require('path');
const multer = require('multer');

// Configuración de Multer para las imágenes de perfil
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/img/users'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

router.get('/logout', authController.logout);

// Rutas de Perfil
router.get('/profile', profileController.getProfile);
router.post('/profile/upload', upload.single('profile_image'), profileController.updateProfilePic);
router.post('/profile/update-username', profileController.updateUsername);

module.exports = router;
