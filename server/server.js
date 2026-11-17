// Entry point utama server backend TRIXIA
require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const connectPgSimple = require('connect-pg-simple');
const { rateLimit } = require('express-rate-limit');
const path = require('node:path');
const fs = require('node:fs');

const env = require('./config/env');
const { pool } = require('./config/database');
const apiRouter = require('./routes/api');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const PgSessionStore = connectPgSimple(session);
const distDirectory = path.join(__dirname, '..', 'client', 'dist');

// Keamanan dan parser body
app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '2mb' }));

// Rate limiters untuk keamanan endpoint
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: 'draft-8', legacyHeaders: false });
const chatLimiter = rateLimit({ windowMs: 60 * 1000, limit: 10, standardHeaders: 'draft-8', legacyHeaders: false });
const adminLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 60, standardHeaders: 'draft-8', legacyHeaders: false });

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/password-reset', authLimiter);
app.use('/api/admin', adminLimiter);
app.use('/api/chat', chatLimiter);

// Konfigurasi session dengan PostgreSQL store
app.use(session({
    name: 'trixia.sid',
    store: new PgSessionStore({
        pool,
        tableName: 'user_sessions',
        createTableIfMissing: true
    }),
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 1 hari
    }
}));

// Route API utama
app.use('/api', apiRouter);

// Middleware penanganan error
app.use(errorHandler);

// Penyajian file statis frontend hasil build Vite
app.use(express.static(distDirectory));
app.get(/.*/, (req, res, next) => {
    const indexPath = path.join(distDirectory, 'index.html');
    if (!fs.existsSync(indexPath)) {
        return res.status(404).send('Frontend belum dibuat. Jalankan npm run build terlebih dahulu.');
    }
    return res.sendFile(indexPath, err => err && next(err));
});

let server;
if (require.main === module) {
    server = app.listen(env.PORT, () => {
        console.log(`Server TRIXIA berjalan di http://localhost:${env.PORT}`);
    });
}

// Graceful shutdown
async function shutdown() {
    await pool.end();
    process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

module.exports = { app, server };
