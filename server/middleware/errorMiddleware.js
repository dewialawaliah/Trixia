// Middleware untuk penanganan error dan route not found

/**
 * Handle endpoint yang tidak terdaftar (404)
 */
function notFound(req, res, next) {
    res.status(404).json({ error: 'Endpoint tidak ditemukan.' });
}

/**
 * Central error handling middleware
 */
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    // Handle ApiError kustom
    if (err.status && err.message) {
        if (err.headers) {
            for (const [header, val] of Object.entries(err.headers)) {
                res.set(header, val);
            }
        }
        return res.status(err.status).json({ error: err.message });
    }

    // JSON parsing error pada request body
    if (err.status === 400 && err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Format permintaan tidak valid.' });
    }

    // Request payload terlalu besar
    if (err.status === 413 && err.type === 'entity.too.large') {
        return res.status(413).json({ error: 'Ukuran permintaan terlalu besar.' });
    }

    // Error duplicate key PostgreSQL
    if (err.code === '23505') {
        console.error('Database unique constraint error:', err.constraint);
        return res.status(409).json({ error: 'Data tersebut sudah digunakan.' });
    }

    console.error('Server Error:', err);
    return res.status(500).json({ error: 'Terjadi kesalahan server. Periksa konfigurasi dan log Node.js.' });
}

module.exports = {
    notFound,
    errorHandler
};
