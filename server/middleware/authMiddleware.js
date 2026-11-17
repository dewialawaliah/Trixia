// Middleware untuk verifikasi session autentikasi

/**
 * Memastikan request dikirim oleh user yang sudah login.
 */
function verifyUser(req, res, next) {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ error: 'Silakan login untuk melihat profil pengguna.' });
    }
    next();
}

/**
 * Memastikan request dikirim oleh admin yang sudah terautentikasi.
 */
function verifyAdmin(req, res, next) {
    if (!req.session || !req.session.adminAuthenticated) {
        return res.status(401).json({ error: 'Silakan login sebagai admin terlebih dahulu.' });
    }
    next();
}

module.exports = {
    verifyUser,
    verifyAdmin
};
