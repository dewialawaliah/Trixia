// Controller untuk autentikasi user
const bcrypt = require('bcryptjs');
const crypto = require('node:crypto');
const nodemailer = require('nodemailer');
const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');
const {
    normalizeUsername,
    normalizeContact,
    userFromRow,
    orderFromRow,
    validEmail,
    regenerateSession,
    localEmailConfig,
    escapeHtml
} = require('../api-utils');

/**
 * Cek sesi login user yang sedang aktif
 */
async function getUserSession(req, res, next) {
    try {
        if (!req.session || !req.session.userId) {
            return res.json({ user: null });
        }

        const user = await userModel.findById(req.session.userId);
        if (!user) {
            delete req.session.userId;
            return res.json({ user: null });
        }

        return res.json({ user: userFromRow(user) });
    } catch (err) {
        next(err);
    }
}

/**
 * Pendaftaran user baru
 */
async function register(req, res, next) {
    try {
        const { name, username, contact, password } = req.body || {};

        if (!name || typeof name !== 'string' || !name.trim()) {
            return res.status(422).json({ error: 'Nama lengkap wajib diisi.' });
        }
        if (name.trim().length > 120) {
            return res.status(422).json({ error: 'Nama maksimal 120 karakter.' });
        }

        const cleanUsername = normalizeUsername(username || '');
        if (!cleanUsername) {
            return res.status(422).json({ error: 'Username harus terdiri dari 3–30 karakter berupa huruf, angka, atau garis bawah.' });
        }
        if (cleanUsername === 'admintrixia') {
            return res.status(409).json({ error: 'Username tersebut khusus untuk Admin.' });
        }

        const cleanContact = normalizeContact(contact || '');
        if (!cleanContact) {
            return res.status(422).json({ error: 'Gunakan email yang valid (contoh: user@gmail.com) atau nomor HP (minimal 7 angka).' });
        }

        if (!password || typeof password !== 'string' || password.length < 8 || Buffer.byteLength(password, 'utf8') > 72) {
            return res.status(422).json({ error: 'Password harus terdiri dari 8 sampai 72 karakter.' });
        }

        // Cek duplikasi username
        const existingUsername = await userModel.findByUsername(cleanUsername);
        if (existingUsername) {
            return res.status(409).json({ error: 'Username sudah digunakan oleh akun lain.' });
        }

        // Cek duplikasi email / phone
        const email = cleanContact.type === 'email' ? cleanContact.value : null;
        const phone = cleanContact.type === 'phone' ? cleanContact.value : null;

        if (email) {
            const existingEmail = await userModel.findByEmail(email);
            if (existingEmail) {
                return res.status(409).json({ error: 'Email sudah terdaftar. Silakan login atau gunakan email lain.' });
            }
        }
        if (phone) {
            const existingPhone = await userModel.findByPhone(phone);
            if (existingPhone) {
                return res.status(409).json({ error: 'Nomor HP sudah terdaftar. Silakan login atau gunakan nomor lain.' });
            }
        }

        // Hash password dan simpan user
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await userModel.createUser({
            name: name.trim(),
            username: cleanUsername,
            email,
            phone,
            passwordHash
        });

        // Set session
        await regenerateSession(req);
        req.session.userId = newUser.id;

        return res.status(201).json({ user: userFromRow(newUser) });
    } catch (err) {
        next(err);
    }
}

/**
 * Login user
 */
async function login(req, res, next) {
    try {
        const { contact, password } = req.body || {};

        if (!contact || !password || typeof contact !== 'string' || typeof password !== 'string') {
            return res.status(422).json({ error: 'Email/username dan password wajib diisi.' });
        }

        const normalizedContact = normalizeContact(contact);
        const identifier = normalizedContact ? normalizedContact.value : contact.trim().toLowerCase();

        const user = await userModel.findByLoginIdentifier(identifier);
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ error: 'Email/username atau password tidak cocok.' });
        }

        await regenerateSession(req);
        req.session.userId = user.id;

        return res.json({ user: userFromRow(user) });
    } catch (err) {
        next(err);
    }
}

/**
 * Logout user
 */
async function logout(req, res, next) {
    try {
        delete req.session.userId;
        await regenerateSession(req);
        return res.json({ authenticated: false });
    } catch (err) {
        next(err);
    }
}

/**
 * Ambil daftar pesanan milik user yang sedang login
 */
async function getUserOrders(req, res, next) {
    try {
        const customerId = Number(req.session.userId);
        const orders = await orderModel.getOrdersByCustomerId(customerId);
        return res.json({ orders: orders.map(orderFromRow) });
    } catch (err) {
        next(err);
    }
}

/**
 * Update profil user (nama, kontak, password)
 */
async function updateProfile(req, res, next) {
    try {
        const userId = Number(req.session.userId);
        const { name, contact, password, newPassword } = req.body || {};

        if (!name || typeof name !== 'string' || !name.trim()) {
            return res.status(422).json({ error: 'Nama lengkap wajib diisi.' });
        }
        if (name.trim().length > 120) {
            return res.status(422).json({ error: 'Nama maksimal 120 karakter.' });
        }

        const cleanContact = normalizeContact(contact || '');
        if (!cleanContact) {
            return res.status(422).json({ error: 'Gunakan email yang valid atau nomor HP yang valid.' });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            delete req.session.userId;
            return res.status(401).json({ error: 'Sesi akun tidak valid.' });
        }

        if (!password || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ error: 'Password saat ini salah.' });
        }

        let updatedPasswordHash = null;
        if (newPassword) {
            if (typeof newPassword !== 'string' || newPassword.length < 8 || Buffer.byteLength(newPassword, 'utf8') > 72) {
                return res.status(422).json({ error: 'Password baru minimal 8 dan maksimal 72 karakter.' });
            }
            updatedPasswordHash = await bcrypt.hash(newPassword, 10);
        }

        const email = cleanContact.type === 'email' ? cleanContact.value : null;
        const phone = cleanContact.type === 'phone' ? cleanContact.value : null;

        // Cek duplikasi email jika berubah
        if (email && email !== user.email) {
            const existing = await userModel.findByEmail(email);
            if (existing && existing.id !== user.id) {
                return res.status(409).json({ error: 'Email tersebut sudah digunakan oleh akun lain.' });
            }
        }
        // Cek duplikasi nomor hp jika berubah
        if (phone && phone !== user.phone) {
            const existing = await userModel.findByPhone(phone);
            if (existing && existing.id !== user.id) {
                return res.status(409).json({ error: 'Nomor HP tersebut sudah digunakan oleh akun lain.' });
            }
        }

        const updatedUser = await userModel.updateUserProfile(userId, {
            name: name.trim(),
            email,
            phone,
            passwordHash: updatedPasswordHash
        });

        return res.json({ user: userFromRow(updatedUser) });
    } catch (err) {
        next(err);
    }
}

/**
 * Permintaan reset password via email
 */
async function requestPasswordReset(req, res, next) {
    try {
        const { email } = req.body || {};
        if (!email || typeof email !== 'string' || !validEmail(email.trim())) {
            return res.status(422).json({ error: 'Masukkan alamat email yang valid.' });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const emailHash = crypto.createHash('sha256').update(normalizedEmail).digest('hex');

        // Rate limit: 60 detik antar permintaan
        const allowed = await userModel.checkResetRateLimit(emailHash);
        if (!allowed) {
            return res.json({ message: 'Jika email terdaftar, tautan reset akan segera dikirim.' });
        }
        await userModel.updateResetRateLimit(emailHash);

        const user = await userModel.findByEmail(normalizedEmail);
        if (!user) {
            return res.json({ message: 'Jika email terdaftar, tautan reset akan segera dikirim.' });
        }

        // Buat token random
        const token = crypto.randomBytes(32).toString('hex');
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 jam

        await userModel.saveResetToken(user.id, tokenHash, expiresAt);

        // Pengiriman email via SMTP jika terkonfigurasi
        try {
            const mailConfig = localEmailConfig();
            let baseUrl = (process.env.APP_URL || mailConfig.appUrl || '').trim();
            const originHeader = req.get('origin');
            if (originHeader && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(originHeader)) {
                baseUrl = originHeader;
            } else if (!baseUrl && req.get('host')) {
                baseUrl = `${req.protocol || 'http'}://${req.get('host')}`;
            }

            const resetUrl = `${baseUrl}/?reset=${encodeURIComponent(token)}#reset=${encodeURIComponent(token)}`;
            const transporter = nodemailer.createTransport({
                host: mailConfig.smtpHost,
                port: mailConfig.port,
                secure: mailConfig.encryption === 'ssl',
                requireTLS: mailConfig.encryption === 'tls',
                auth: { user: mailConfig.smtpUsername, pass: mailConfig.smtpPassword }
            });

            await transporter.sendMail({
                from: { address: mailConfig.from, name: mailConfig.fromName },
                to: normalizedEmail,
                subject: 'Reset Password Akun TRIXIA',
                html: `
                    <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
                        <h2>Reset Password TRIXIA</h2>
                        <p>Halo ${escapeHtml(user.name)},</p>
                        <p>Kami menerima permintaan untuk mereset password akun TRIXIA Anda. Klik tombol di bawah ini untuk membuat password baru:</p>
                        <p><a href="${resetUrl}" style="background-color: #6366f1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block;">Buat Password Baru</a></p>
                        <p>Tautan ini berlaku selama 1 jam. Jika Anda tidak meminta reset password, abaikan email ini.</p>
                    </div>
                `
            });
        } catch (mailError) {
            console.warn('Gagal mengirim email reset password via SMTP:', mailError.message);
        }

        return res.json({ message: 'Jika email terdaftar, tautan reset akan segera dikirim.' });
    } catch (err) {
        next(err);
    }
}

/**
 * Eksekusi simpan password baru dari token reset
 */
async function resetPassword(req, res, next) {
    try {
        const { token, password } = req.body || {};

        if (!token || typeof token !== 'string') {
            return res.status(422).json({ error: 'Token reset tidak valid.' });
        }
        if (!password || typeof password !== 'string' || password.length < 8 || Buffer.byteLength(password, 'utf8') > 72) {
            return res.status(422).json({ error: 'Password baru harus terdiri dari 8 sampai 72 karakter.' });
        }

        const tokenHash = crypto.createHash('sha256').update(token.trim()).digest('hex');
        const tokenRecord = await userModel.findActiveResetToken(tokenHash);

        if (!tokenRecord) {
            return res.status(400).json({ error: 'Tautan reset sudah kedaluwarsa atau tidak valid. Silakan buat permintaan baru.' });
        }

        const newHash = await bcrypt.hash(password, 10);
        await userModel.updatePassword(tokenRecord.user_id, newHash);
        await userModel.markTokenUsed(tokenRecord.id);

        return res.json({ message: 'Password berhasil diperbarui. Silakan login dengan password baru kamu.' });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getUserSession,
    register,
    login,
    logout,
    getUserOrders,
    updateProfile,
    requestPasswordReset,
    resetPassword
};
