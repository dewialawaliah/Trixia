// Controller untuk pemesanan (orders), tracking, dan invoice
const crypto = require('node:crypto');
const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');
const {
    formatDate,
    orderFromRow,
    isValidImage
} = require('../api-utils');

/**
 * Buat pesanan baru (Checkout)
 */
async function createOrder(req, res, next) {
    try {
        const body = req.body || {};
        const { game, nominal, payment, userId, serverId, username, buktiBase64 } = body;

        // Validasi input utama
        if (!game || typeof game !== 'string' || !game.trim() || game.trim().length > 120) {
            return res.status(422).json({ error: 'Nama game wajib diisi dan maksimal 120 karakter.' });
        }
        if (!nominal || typeof nominal !== 'string' || !nominal.trim() || nominal.trim().length > 255) {
            return res.status(422).json({ error: 'Nominal item wajib diisi.' });
        }
        if (!payment || typeof payment !== 'string' || !payment.trim() || payment.trim().length > 50) {
            return res.status(422).json({ error: 'Metode pembayaran wajib diisi.' });
        }
        if (!userId || typeof userId !== 'string' || !userId.trim() || userId.trim().length > 120) {
            return res.status(422).json({ error: 'User ID game wajib diisi.' });
        }

        const cleanServerId = typeof serverId === 'string' ? serverId.trim() : '';
        const cleanUsername = typeof username === 'string' ? username.trim() : '';

        if (cleanServerId.length > 80 || cleanUsername.length > 120) {
            return res.status(422).json({ error: 'Data akun game melebihi batas panjang.' });
        }

        // Validasi bukti transfer base64
        if (!buktiBase64 || typeof buktiBase64 !== 'string') {
            return res.status(422).json({ error: 'Bukti transfer wajib diunggah.' });
        }

        const proofMatch = /^data:image\/(jpeg|jpg|png|webp|gif);base64,([A-Za-z0-9+/=\s]+)$/.exec(buktiBase64);
        if (!proofMatch) {
            return res.status(422).json({ error: 'Bukti transfer harus berupa gambar JPEG, PNG, WEBP, atau GIF.' });
        }

        const rawBase64 = proofMatch[2].replace(/\s+/g, '');
        const mime = (proofMatch[1] === 'jpeg' || proofMatch[1] === 'jpg') ? 'image/jpeg' : `image/${proofMatch[1]}`;
        const proofData = Buffer.from(rawBase64, 'base64');

        if (!proofData.length || proofData.length > 2 * 1024 * 1024) {
            return res.status(422).json({ error: 'Ukuran bukti transfer maksimal 2 MB.' });
        }
        if (proofData.toString('base64').replace(/=+$/, '') !== rawBase64.replace(/=+$/, '') || !isValidImage(proofData, mime)) {
            return res.status(422).json({ error: 'Isi bukti transfer bukan gambar yang valid.' });
        }

        // Hubungkan ke akun pembeli jika sedang login
        let customerId = req.session && req.session.userId ? Number(req.session.userId) : null;
        let customerUsername = '';

        if (customerId) {
            const customer = await userModel.findById(customerId);
            if (customer) {
                customerUsername = customer.username;
            } else {
                delete req.session.userId;
                customerId = null;
            }
        }

        // Generate Order Key dan Order ID dengan retry untuk mencegah collision
        for (let attempt = 0; attempt < 10; attempt++) {
            const orderKey = crypto.randomBytes(16).toString('hex');
            const orderId = crypto.randomInt(100000, 1000000);

            try {
                const inserted = await orderModel.createOrder({
                    orderKey,
                    orderId,
                    customerId,
                    customerUsername: customerUsername || null,
                    game: game.trim(),
                    nominal: nominal.trim(),
                    payment: payment.trim(),
                    userId: userId.trim(),
                    serverId: cleanServerId,
                    username: cleanUsername,
                    proofMime: mime,
                    proofData
                });

                return res.status(201).json({
                    orderKey,
                    order: {
                        orderKey,
                        orderId,
                        game: game.trim(),
                        nominal: nominal.trim(),
                        payment: payment.trim(),
                        userId: userId.trim(),
                        serverId: cleanServerId,
                        username: cleanUsername,
                        customerUsername,
                        status: 'Pending',
                        date: formatDate(inserted.created_at)
                    }
                });
            } catch (err) {
                if (err.code !== '23505' || attempt === 9) {
                    throw err;
                }
            }
        }

        return res.status(500).json({ error: 'Tidak dapat membuat nomor pesanan.' });
    } catch (err) {
        next(err);
    }
}

/**
 * Lacak status pesanan publik berdasarkan 6-digit Order ID
 */
async function trackOrder(req, res, next) {
    try {
        const rawOrderId = req.params.orderId || req.query.orderId;
        const orderId = Number(rawOrderId);

        if (!Number.isSafeInteger(orderId) || orderId < 1) {
            return res.status(422).json({ error: 'Nomor pesanan tidak valid.' });
        }

        const order = await orderModel.findOrderById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Pesanan tidak ditemukan.' });
        }

        return res.json({
            order: {
                orderId: Number(order.order_id),
                game: order.game,
                nominal: order.nominal,
                payment: order.payment,
                status: order.status,
                date: formatDate(order.created_at)
            }
        });
    } catch (err) {
        next(err);
    }
}

/**
 * Ambil rincian invoice pesanan berdasarkan orderKey
 */
async function getInvoice(req, res, next) {
    try {
        const orderKey = String(req.params.orderKey || req.query.orderKey || '').trim();

        if (!orderKey || !/^[0-9a-f]{32}$/i.test(orderKey)) {
            return res.status(422).json({ error: 'Nomor pesanan tidak valid.' });
        }

        const order = await orderModel.findOrderByKey(orderKey);
        if (!order) {
            return res.status(404).json({ error: 'Invoice tidak ditemukan.' });
        }

        return res.json({ invoice: orderFromRow(order) });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createOrder,
    trackOrder,
    getInvoice
};
