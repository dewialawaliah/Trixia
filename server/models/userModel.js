// Model untuk tabel users dan password_reset_tokens
const { pool } = require('../config/database');

/**
 * Cari user berdasarkan ID
 */
async function findById(id) {
    const query = 'SELECT id, name, username, email, phone, password_hash, created_at FROM users WHERE id = $1 LIMIT 1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
}

/**
 * Cari user berdasarkan username
 */
async function findByUsername(username) {
    const query = 'SELECT id, name, username, email, phone, password_hash, created_at FROM users WHERE username = $1 LIMIT 1';
    const result = await pool.query(query, [username]);
    return result.rows[0] || null;
}

/**
 * Cari user berdasarkan email
 */
async function findByEmail(email) {
    const query = 'SELECT id, name, username, email, phone, password_hash, created_at FROM users WHERE email = $1 LIMIT 1';
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
}

/**
 * Cari user berdasarkan nomor telepon
 */
async function findByPhone(phone) {
    const query = 'SELECT id, name, username, email, phone, password_hash, created_at FROM users WHERE phone = $1 LIMIT 1';
    const result = await pool.query(query, [phone]);
    return result.rows[0] || null;
}

/**
 * Cari user berdasarkan email ATAU phone ATAU username (untuk fleksibilitas login)
 */
async function findByLoginIdentifier(identifier) {
    const query = `
        SELECT id, name, username, email, phone, password_hash 
        FROM users 
        WHERE username = $1 OR email = $1 OR phone = $1 
        LIMIT 1
    `;
    const result = await pool.query(query, [identifier]);
    return result.rows[0] || null;
}

/**
 * Buat user baru
 */
async function createUser({ name, username, email, phone, passwordHash }) {
    const query = `
        INSERT INTO users (name, username, email, phone, password_hash)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, username, email, phone, created_at
    `;
    const result = await pool.query(query, [name, username, email || null, phone || null, passwordHash]);
    return result.rows[0];
}

/**
 * Update profil user (nama, email, phone, password)
 */
async function updateUserProfile(id, { name, email, phone, passwordHash }) {
    let query;
    let values;

    if (passwordHash) {
        query = `
            UPDATE users 
            SET name = $1, email = $2, phone = $3, password_hash = $4
            WHERE id = $5
            RETURNING id, name, username, email, phone
        `;
        values = [name, email || null, phone || null, passwordHash, id];
    } else {
        query = `
            UPDATE users 
            SET name = $1, email = $2, phone = $3
            WHERE id = $4
            RETURNING id, name, username, email, phone
        `;
        values = [name, email || null, phone || null, id];
    }

    const result = await pool.query(query, values);
    return result.rows[0] || null;
}

/**
 * Cek pembatasan waktu permintaan reset password (rate limit 60 detik)
 */
async function checkResetRateLimit(emailHash) {
    const query = 'SELECT last_requested_at FROM password_reset_requests WHERE email_hash = $1 LIMIT 1';
    const result = await pool.query(query, [emailHash]);
    if (result.rows.length > 0) {
        const lastRequested = new Date(result.rows[0].last_requested_at).getTime();
        const now = Date.now();
        if (now - lastRequested < 60 * 1000) {
            return false; // Terlalu cepat
        }
    }
    return true;
}

/**
 * Perbarui waktu terakhir permintaan reset password
 */
async function updateResetRateLimit(emailHash) {
    const query = `
        INSERT INTO password_reset_requests (email_hash, last_requested_at)
        VALUES ($1, NOW())
        ON CONFLICT (email_hash) DO UPDATE SET last_requested_at = NOW()
    `;
    await pool.query(query, [emailHash]);
}

/**
 * Simpan token reset password
 */
async function saveResetToken(userId, tokenHash, expiresAt) {
    const query = `
        INSERT INTO password_reset_tokens (user_id, token_hash, expires_at)
        VALUES ($1, $2, $3)
    `;
    await pool.query(query, [userId, tokenHash, expiresAt]);
}

/**
 * Cari token reset yang masih aktif (belum expired & belum digunakan)
 */
async function findActiveResetToken(tokenHash) {
    const query = `
        SELECT id, user_id, expires_at 
        FROM password_reset_tokens 
        WHERE token_hash = $1 AND used_at IS NULL AND expires_at > NOW()
        LIMIT 1
    `;
    const result = await pool.query(query, [tokenHash]);
    return result.rows[0] || null;
}

/**
 * Tandai token reset telah digunakan
 */
async function markTokenUsed(tokenId) {
    await pool.query('UPDATE password_reset_tokens SET used_at = NOW() WHERE id = $1', [tokenId]);
}

/**
 * Update password user
 */
async function updatePassword(userId, passwordHash) {
    await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [passwordHash, userId]);
}

module.exports = {
    findById,
    findByUsername,
    findByEmail,
    findByPhone,
    findByLoginIdentifier,
    createUser,
    updateUserProfile,
    checkResetRateLimit,
    updateResetRateLimit,
    saveResetToken,
    findActiveResetToken,
    markTokenUsed,
    updatePassword
};
