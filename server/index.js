require('dotenv').config();

const connectPgSimple = require('connect-pg-simple');
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const { rateLimit } = require('express-rate-limit');
const fs = require('node:fs');
const path = require('node:path');
const env = require('./config/env');
const { pool } = require('./config/database');
const apiRouter = require('./routes/api');
const chatRouter = require('./routes/chat');
const { executeLegacyAction } = require('./controllers/apiController');

const app = express();
const PgSessionStore = connectPgSimple(session);
const distDirectory = path.join(__dirname, '..', 'client', 'dist');

app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '2mb' }));

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: 'draft-8', legacyHeaders: false });
const chatLimiter = rateLimit({ windowMs: 60 * 1000, limit: 10, standardHeaders: 'draft-8', legacyHeaders: false });
const adminLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 60, standardHeaders: 'draft-8', legacyHeaders: false });

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/password-reset', authLimiter);
app.use('/api/admin', adminLimiter);
app.use('/api/chat', chatLimiter);
app.use(session({
    name: 'trixia.sid',
    store: new PgSessionStore({ pool, tableName: 'user_sessions', createTableIfMissing: true }),
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use('/api', chatRouter);
app.use('/api', apiRouter);

app.all('/api', async (req, res) => executeLegacyAction(req, res, req.query.action || ''));

app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    if (error.status === 400 && error.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Format permintaan tidak valid.' });
    }
    if (error.status === 413 && error.type === 'entity.too.large') {
        return res.status(413).json({ error: 'Ukuran permintaan terlalu besar.' });
    }
    console.error('TRIXIA HTTP:', error);
    return res.status(500).json({ error: 'Terjadi kesalahan server. Periksa konfigurasi dan log Node.js.' });
});

app.use(express.static(distDirectory));
app.get(/.*/, (req, res, next) => {
    const indexPath = path.join(distDirectory, 'index.html');
    if (!fs.existsSync(indexPath)) {
        return res.status(404).send('Frontend belum dibuat. Jalankan npm run build terlebih dahulu.');
    }
    return res.sendFile(indexPath, error => error && next(error));
});

let server;
if (require.main === module) {
    server = app.listen(env.PORT, () => {
        console.log(`TRIXIA berjalan di http://localhost:${env.PORT}`);
    });
}

async function shutdown() {
    await pool.end();
    process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
module.exports = { app, server };
