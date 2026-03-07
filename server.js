const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar Motor de Vistas (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar Sesiones
app.use(session({
    secret: 'auralith_secret_key_tfg_2026',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // en prod cambiar a true con HTTPS
}));

// Pasar usuario autenticado a todas las vistas localmente
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Importar Rutas
const authRoutes = require('./routes/authRoutes');

// Usar Rutas
app.use('/', authRoutes);

// Rutas base
app.get('/', (req, res) => {
    res.render('pages/dashboard', { title: 'AURALITH' });
});

// Ruta del reproductor
const topAlbumsSpain = require('./data/topAlbumsSpain');

app.get('/player', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('pages/player', { topAlbums: topAlbumsSpain });
});

// Ruta de detalle de álbum
app.get('/album/:id', (req, res) => {
    if (!req.session.user) return res.redirect('/login');

    const albumId = req.params.id;
    const album = topAlbumsSpain.find(a => a.id === albumId);

    if (!album) {
        return res.status(404).render('pages/dashboard', { title: 'Álbum no encontrado' }); // O a una página 404
    }

    res.render('pages/album', { album: album });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor de AURALITH corriendo en http://localhost:${PORT}`);
});
