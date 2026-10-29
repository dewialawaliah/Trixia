const bcrypt = require('bcryptjs');
const crypto = require('node:crypto');
const nodemailer = require('nodemailer');
const { pool } = require('./config/database');
const { fail, requireMethod, requireAdmin, requireUser, requestBody, userFromRow, normalizeUsername, normalizeContact, requiredString, formatDate, validEmail, regenerateSession, localEmailConfig, escapeHtml } = require('./api-utils');

async function handleAuthApi(req, res) {
    const action = String(req.query.action || req.legacyAction || '');
    if (action === 'admin-session') {
        requireMethod(req, 'GET');
        return res.json({ authenticated: Boolean(req.session.adminAuthenticated) });
    }
    if (action === 'admin-login') {
        requireMethod(req, 'POST');
        const body = requestBody(req);
        const username = body.username;
        const password = body.password;
        const passwordHash = process.env.ADMIN_PASSWORD_HASH || '';
        if (typeof username !== 'string' || username.trim().toLowerCase() !== 'admintrixia'
            || typeof password !== 'string' || !passwordHash || !(await bcrypt.compare(password, passwordHash))) {
            fail(401, passwordHash ? 'Username atau password tidak cocok.' : 'Password admin belum dikonfigurasi di file .env.');
        }
        await regenerateSession(req);
        delete req.session.userId;
        req.session.adminAuthenticated = true;
        return res.json({ authenticated: true });
    }
    if (action === 'admin-logout') {
        requireMethod(req, 'POST');
        delete req.session.adminAuthenticated;
        await regenerateSession(req);
        return res.json({ authenticated: false });
    }

    if (action === 'register') {
        requireMethod(req, 'POST');
        const body = requestBody(req);
        const name = requiredString(body, 'name', 120);
        if (typeof body.username !== 'string' || typeof body.contact !== 'string' || typeof body.password !== 'string') {
            fail(422, 'Nama, username, kontak, dan password wajib diisi.');
        }
        const username = normalizeUsername(body.username);
        if (!username) fail(422, 'Username harus terdiri dari 3–30 karakter berupa huruf, angka, atau garis bawah.');
        if (username === 'admintrixia') fail(409, 'Username tersebut khusus untuk Admin.');
        const contact = normalizeContact(body.contact);
        if (!contact) fail(422, 'Masukkan email yang valid atau nomor telepon dengan minimal 7 angka.');
        if (body.password.length < 8 || Buffer.byteLength(body.password, 'utf8') > 72) {
            fail(422, 'Password harus terdiri dari 8 sampai 72 karakter.');
        }
        const duplicateUsername = await pool.query('SELECT 1 FROM users WHERE username = $1 LIMIT 1', [username]);
        if (duplicateUsername.rowCount) fail(409, 'Username tersebut sudah digunakan.');
        const duplicateContact = await pool.query(`SELECT 1 FROM users WHERE ${contact.type} = $1 LIMIT 1`, [contact.value]);
        if (duplicateContact.rowCount) fail(409, 'Email atau nomor telepon tersebut sudah terdaftar.');
        try {
            const result = await pool.query(
                'INSERT INTO users (name, username, email, phone, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING id',
                [name, username, contact.type === 'email' ? contact.value : null, contact.type === 'phone' ? contact.value : null, await bcrypt.hash(body.password, 10)]
            );
            await regenerateSession(req);
            delete req.session.adminAuthenticated;
            req.session.userId = Number(result.rows[0].id);
            const user = await pool.query('SELECT id, name, username, email, phone FROM users WHERE id = $1', [result.rows[0].id]);
            return res.status(201).json({ user: userFromRow(user.rows[0]) });
        } catch (error) {
            if (error.code === '23505') fail(409, 'Username, email, atau nomor telepon tersebut sudah digunakan.');
            throw error;
        }
    }

    if (action === 'user-login') {
        requireMethod(req, 'POST');
        const body = requestBody(req);
        if (typeof body.contact !== 'string' || typeof body.password !== 'string') {
            fail(422, 'Email/nomor telepon dan password wajib diisi.');
        }
        if (Buffer.byteLength(body.password, 'utf8') > 72) fail(422, 'Password maksimal 72 karakter.');
        const candidates = [];
        const username = normalizeUsername(body.contact);
        if (username) candidates.push(['username', username]);
        const contact = normalizeContact(body.contact);
        if (contact) candidates.push([contact.type, contact.value]);
        for (const [column, value] of candidates) {
            const result = await pool.query(
                `SELECT id, name, username, email, phone, password_hash FROM users WHERE ${column} = $1 LIMIT 1`,
                [value]
            );
            const row = result.rows[0];
            if (row && await bcrypt.compare(body.password, row.password_hash)) {
                await regenerateSession(req);
                delete req.session.adminAuthenticated;
                req.session.userId = Number(row.id);
                return res.json({ user: userFromRow(row) });
            }
        }
        fail(401, 'Username, email/nomor telepon, atau password salah.');
    }

    if (action === 'user-session') {
        requireMethod(req, 'GET');
        if (!req.session.userId) return res.json({ user: null });
        const result = await pool.query('SELECT id, name, username, email, phone FROM users WHERE id = $1', [req.session.userId]);
        if (!result.rows[0]) {
            delete req.session.userId;
            return res.json({ user: null });
        }
        return res.json({ user: userFromRow(result.rows[0]) });
    }

    if (action === 'update-profile') {
        requireMethod(req, 'POST');
        const userId = requireUser(req);
        const body = requestBody(req);
        const name = requiredString(body, 'name', 120);
        if (typeof body.username !== 'string' || typeof (body.email ?? '') !== 'string'
            || typeof (body.phone ?? '') !== 'string' || typeof body.currentPassword !== 'string') {
            fail(422, 'Data profil tidak valid.');
        }
        const username = normalizeUsername(body.username);
        if (!username) fail(422, 'Username harus terdiri dari 3–30 karakter berupa huruf, angka, atau garis bawah.');
        if (username === 'admintrixia') fail(409, 'Username tersebut khusus untuk Admin.');
        let email = body.email.trim();
        if (email) {
            if (!validEmail(email)) fail(422, 'Format email tidak valid.');
            email = email.toLowerCase();
        } else {
            email = null;
        }
        let phone = null;
        if (body.phone.trim()) {
            const normalizedPhone = normalizeContact(body.phone);
            if (!normalizedPhone || normalizedPhone.type !== 'phone' || normalizedPhone.value.length > 20) {
                fail(422, 'Format nomor telepon tidak valid.');
            }
            phone = normalizedPhone.value;
        }
        if (!email && !phone) fail(422, 'Isi minimal email atau nomor telepon.');
        const existing = await pool.query('SELECT password_hash FROM users WHERE id = $1 LIMIT 1', [userId]);
        if (!existing.rows[0] || !(await bcrypt.compare(body.currentPassword, existing.rows[0].password_hash))) {
            fail(401, 'Password saat ini salah.');
        }
        try {
            await pool.query(
                'UPDATE users SET name = $1, username = $2, email = $3, phone = $4 WHERE id = $5',
                [name, username, email, phone, userId]
            );
        } catch (error) {
            if (error.code === '23505') fail(409, 'Username, email, atau nomor telepon sudah digunakan akun lain.');
            throw error;
        }
        const updated = await pool.query('SELECT id, name, username, email, phone FROM users WHERE id = $1', [userId]);
        return res.json({ user: userFromRow(updated.rows[0]) });
    }

    if (action === 'user-logout') {
        requireMethod(req, 'POST');
        delete req.session.userId;
        await regenerateSession(req);
        return res.json({ user: null });
    }

    if (action === 'user-orders') {
        requireMethod(req, 'GET');
        const userId = requireUser(req);
        const result = await pool.query(
            'SELECT order_id, customer_username, game, nominal, status, created_at FROM orders WHERE customer_id = $1 ORDER BY created_at DESC',
            [userId]
        );
        return res.json({
            orders: result.rows.map(row => ({
                orderId: Number(row.order_id),
                customerUsername: row.customer_username,
                game: row.game,
                nominal: row.nominal,
                status: row.status,
                date: formatDate(row.created_at)
            }))
        });
    }

    if (action === 'password-reset-request') {
        requireMethod(req, 'POST');
        const body = requestBody(req);
        if (typeof body.email !== 'string' || !validEmail(body.email.trim())) {
            fail(422, 'Masukkan alamat email yang valid.');
        }
        const email = body.email.trim().toLowerCase();
        const mailConfig = localEmailConfig();
        const requestHash = crypto.createHash('sha256').update(email).digest('hex');
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            await client.query("DELETE FROM password_reset_requests WHERE last_requested_at < NOW() - INTERVAL '30 days'");
            const insertedRequest = await client.query(
                'INSERT INTO password_reset_requests (email_hash, last_requested_at) VALUES ($1, NOW()) ON CONFLICT (email_hash) DO NOTHING',
                [requestHash]
            );
            const request = await client.query(
                'SELECT last_requested_at FROM password_reset_requests WHERE email_hash = $1 FOR UPDATE',
                [requestHash]
            );
            const lastRequestedAt = new Date(request.rows[0].last_requested_at).getTime();
            if (!insertedRequest.rowCount && Date.now() - lastRequestedAt < 60_000) {
                await client.query('COMMIT');
                return res.json({ message: 'Jika email terdaftar, tautan reset akan segera dikirim.' });
            }
            await client.query('UPDATE password_reset_requests SET last_requested_at = NOW() WHERE email_hash = $1', [requestHash]);
            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
        const result = await pool.query('SELECT id, name FROM users WHERE email = $1 LIMIT 1', [email]);
        if (!result.rows[0]) return res.json({ message: 'Jika email terdaftar, tautan reset akan segera dikirim.' });
        const user = result.rows[0];
        const token = crypto.randomBytes(32).toString('hex');
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        await pool.query(
            'DELETE FROM password_reset_tokens WHERE user_id = $1 OR expires_at < NOW() OR used_at IS NOT NULL',
            [user.id]
        );
        await pool.query(
            "INSERT INTO password_reset_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, NOW() + INTERVAL '1 hour')",
            [user.id, tokenHash]
        );
        const resetUrl = `${mailConfig.appUrl}/#reset=${encodeURIComponent(token)}`;
        const transporter = nodemailer.createTransport({
            host: mailConfig.smtpHost,
            port: mailConfig.port,
            secure: mailConfig.encryption === 'ssl',
            requireTLS: mailConfig.encryption === 'tls',
            auth: { user: mailConfig.smtpUsername, pass: mailConfig.smtpPassword },
            connectionTimeout: 15_000,
            greetingTimeout: 15_000,
            socketTimeout: 15_000
        });
        try {
            await transporter.sendMail({
                from: { address: mailConfig.from, name: mailConfig.fromName },
                to: { address: email, name: user.name },
                subject: 'Reset password akun TRIXIA',
                text: `Halo ${user.name},\n\nGunakan tautan berikut dalam 1 jam untuk membuat password baru:\n${resetUrl}\n\nJika kamu tidak meminta reset password, abaikan email ini.`,
                html: `<p>Halo ${escapeHtml(user.name)},</p><p>Klik tautan berikut untuk membuat password baru. Tautan hanya berlaku selama 1 jam dan hanya dapat digunakan sekali.</p><p><a href="${escapeHtml(resetUrl)}">Reset password TRIXIA</a></p><p>Jika kamu tidak meminta reset password, abaikan email ini.</p>`
            });
        } catch (error) {
            await pool.query('DELETE FROM password_reset_tokens WHERE token_hash = $1', [tokenHash]);
            console.error('TRIXIA SMTP: Email delivery failed.', error.code || error.name);
            if (/auth/i.test(String(error.message))) {
                fail(503, 'Gmail menolak login SMTP. Periksa SMTP_USERNAME dan App Password di file .env.');
            }
            fail(503, 'Email reset gagal dikirim. Periksa koneksi SMTP dan pengaturan di file .env.');
        }
        return res.json({ message: 'Jika email terdaftar, tautan reset akan segera dikirim.' });
    }

    if (action === 'reset-password') {
        requireMethod(req, 'POST');
        const body = requestBody(req);
        if (typeof body.token !== 'string' || !/^[a-f0-9]{64}$/.test(body.token)
            || typeof body.password !== 'string') {
            fail(422, 'Tautan reset tidak valid atau sudah kedaluwarsa.');
        }
        if (body.password.length < 8 || Buffer.byteLength(body.password, 'utf8') > 72) {
            fail(422, 'Password harus terdiri dari 8 sampai 72 karakter.');
        }
        const tokenHash = crypto.createHash('sha256').update(body.token).digest('hex');
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const reset = await client.query(
                'SELECT id, user_id FROM password_reset_tokens WHERE token_hash = $1 AND used_at IS NULL AND expires_at > NOW() LIMIT 1 FOR UPDATE',
                [tokenHash]
            );
            if (!reset.rows[0]) fail(422, 'Tautan reset tidak valid atau sudah kedaluwarsa.');
            await client.query('UPDATE users SET password_hash = $1 WHERE id = $2', [
                await bcrypt.hash(body.password, 10),
                reset.rows[0].user_id
            ]);
            await client.query('DELETE FROM password_reset_tokens WHERE user_id = $1', [reset.rows[0].user_id]);
            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
        delete req.session.userId;
        await regenerateSession(req);
        return res.json({ updated: true });
    }


    return false;
}

module.exports = { handleAuthApi };
