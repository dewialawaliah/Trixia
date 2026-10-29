const crypto = require('node:crypto');
const { pool } = require('./config/database');
const { fail, requireMethod, requestBody, requiredString, formatDate, orderFromRow, isValidImage } = require('./api-utils');

async function handleOrderApi(req, res) {
    const action = String(req.query.action || req.legacyAction || '');
    if (action === 'orders') {
        requireMethod(req, 'POST');
        const body = requestBody(req);
        const game = requiredString(body, 'game', 120);
        const nominal = requiredString(body, 'nominal', 255);
        const payment = requiredString(body, 'payment', 50);
        const userId = requiredString(body, 'userId', 120);
        let serverId = body.serverId ?? '';
        let username = body.username ?? '';
        if (typeof serverId !== 'string' || typeof username !== 'string' || typeof body.buktiBase64 !== 'string') {
            fail(422, 'Data akun game atau bukti transfer tidak valid.');
        }
        serverId = serverId.trim();
        username = username.trim();
        if (Array.from(serverId).length > 80 || Array.from(username).length > 120) {
            fail(422, 'Data akun game melebihi batas panjang.');
        }
        const proofMatch = /^data:image\/(jpeg|png|webp|gif);base64,([A-Za-z0-9+/=]+)$/.exec(body.buktiBase64);
        if (!proofMatch) fail(422, 'Bukti transfer harus berupa gambar JPEG, PNG, WEBP, atau GIF.');
        const mime = proofMatch[1] === 'jpeg' ? 'image/jpeg' : `image/${proofMatch[1]}`;
        const proofData = Buffer.from(proofMatch[2], 'base64');
        if (!proofData.length || proofData.length > 2 * 1024 * 1024) {
            fail(422, 'Ukuran bukti transfer maksimal 2 MB.');
        }
        if (proofData.toString('base64').replace(/=+$/, '') !== proofMatch[2].replace(/=+$/, '') || !isValidImage(proofData, mime)) {
            fail(422, 'Isi bukti transfer bukan gambar yang valid.');
        }
        let customerId = req.session.userId ? Number(req.session.userId) : null;
        let customerUsername = null;
        if (customerId !== null) {
            const customer = await pool.query('SELECT username FROM users WHERE id = $1 LIMIT 1', [customerId]);
            customerUsername = customer.rows[0]?.username || null;
            if (!customerUsername) {
                delete req.session.userId;
                customerId = null;
            }
        }
        for (let attempt = 0; attempt < 10; attempt++) {
            const orderKey = crypto.randomBytes(16).toString('hex');
            const orderId = crypto.randomInt(100000, 1000000);
            try {
                const result = await pool.query(
                    `INSERT INTO orders
                    (order_key, order_id, customer_id, customer_username, game, nominal, payment, user_id, server_id, username, proof_mime, proof_data)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                    RETURNING created_at`,
                    [orderKey, orderId, customerId, customerUsername, game, nominal, payment, userId, serverId, username, mime, proofData]
                );
                return res.status(201).json({
                    orderKey,
                    order: {
                        orderKey,
                        orderId,
                        game,
                        nominal,
                        payment,
                        userId,
                        serverId,
                        username,
                        customerUsername: customerUsername || '',
                        status: 'Pending',
                        date: formatDate(result.rows[0].created_at)
                    }
                });
            } catch (error) {
                if (error.code !== '23505' || attempt === 9) throw error;
            }
        }
        fail(500, 'Tidak dapat membuat nomor pesanan.');
    }

    if (action === 'track') {
        requireMethod(req, 'GET');
        const orderId = Number(req.query.orderId);
        if (!Number.isInteger(orderId) || orderId < 100000 || orderId > 999999) {
            fail(422, 'Nomor pesanan tidak valid.');
        }
        const result = await pool.query('SELECT * FROM orders WHERE order_id = $1 LIMIT 1', [orderId]);
        return res.json({ order: result.rows[0] ? orderFromRow(result.rows[0]) : null });
    }

    if (action === 'invoice') {
        requireMethod(req, 'GET');
        const orderKey = String(req.query.orderKey || '');
        if (!/^[a-f0-9]{32}$/.test(orderKey)) fail(422, 'Referensi pesanan tidak valid.');
        const result = await pool.query('SELECT * FROM orders WHERE order_key = $1 LIMIT 1', [orderKey]);
        return res.json({ order: result.rows[0] ? orderFromRow(result.rows[0]) : null });
    }


    return false;
}

module.exports = { handleOrderApi };
