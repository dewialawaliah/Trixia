// Controller untuk operasional Admin TRIXIA
const bcrypt = require('bcryptjs');
const orderModel = require('../models/orderModel');
const { pool } = require('../config/database');
const {
    orderFromRow,
    parseDate,
    dateAtJakarta,
    regenerateSession
} = require('../api-utils');

/**
 * Cek status autentikasi sesi admin
 */
async function getAdminSession(req, res, next) {
    try {
        const authenticated = Boolean(req.session && req.session.adminAuthenticated);
        return res.json({ authenticated });
    } catch (err) {
        next(err);
    }
}

/**
 * Login admin
 */
async function adminLogin(req, res, next) {
    try {
        const { username, password } = req.body || {};
        const passwordHash = process.env.ADMIN_PASSWORD_HASH || '';

        if (
            typeof username !== 'string' ||
            username.trim().toLowerCase() !== 'admintrixia' ||
            typeof password !== 'string' ||
            !passwordHash ||
            !(await bcrypt.compare(password, passwordHash))
        ) {
            return res.status(401).json({
                error: passwordHash ? 'Username atau password tidak cocok.' : 'Password admin belum dikonfigurasi di file .env.'
            });
        }

        await regenerateSession(req);
        delete req.session.userId;
        req.session.adminAuthenticated = true;

        return res.json({ authenticated: true });
    } catch (err) {
        next(err);
    }
}

/**
 * Logout admin
 */
async function adminLogout(req, res, next) {
    try {
        if (req.session) {
            delete req.session.adminAuthenticated;
            await regenerateSession(req);
        }
        return res.json({ authenticated: false });
    } catch (err) {
        next(err);
    }
}

/**
 * Ambil semua daftar pesanan untuk panel admin
 */
async function getAllOrders(req, res, next) {
    try {
        const rows = await orderModel.getAllOrdersForAdmin();
        const orders = rows.map(row => ({
            ...orderFromRow(row),
            hasProof: Boolean(row.has_proof)
        }));

        return res.json({ orders });
    } catch (err) {
        next(err);
    }
}

/**
 * Ambil bukti pembayaran pesanan
 */
async function getOrderProof(req, res, next) {
    try {
        const orderKey = String(req.params.orderKey || req.query.orderKey || '').trim();

        if (!/^[a-f0-9]{32}$/i.test(orderKey)) {
            return res.status(422).json({ error: 'Referensi pesanan tidak valid.' });
        }

        const proof = await orderModel.getOrderProof(orderKey);
        if (!proof || !proof.proof_data) {
            return res.status(404).json({ error: 'Pesanan tidak ditemukan.' });
        }

        return res.json({
            buktiBase64: `data:${proof.proof_mime};base64,${proof.proof_data.toString('base64')}`
        });
    } catch (err) {
        next(err);
    }
}

/**
 * Update status pesanan (Pending / Processing / Success)
 */
async function updateStatus(req, res, next) {
    try {
        const orderKey = String(req.params.orderKey || req.body?.orderKey || req.query?.orderKey || '').trim();
        const { status } = req.body || {};

        if (!/^[a-f0-9]{16,64}$/i.test(orderKey) || !['Pending', 'Processing', 'Success'].includes(status)) {
            return res.status(422).json({ error: 'Perubahan status tidak valid.' });
        }

        const updated = await orderModel.updateOrderStatus(orderKey, status);
        if (!updated) {
            return res.status(404).json({ error: 'Pesanan tidak ditemukan.' });
        }

        return res.json({ updated: true });
    } catch (err) {
        next(err);
    }
}

/**
 * Hapus pesanan dari panel admin
 */
async function deleteOrder(req, res, next) {
    try {
        const orderKey = String(req.params.orderKey || req.body?.orderKey || req.query?.orderKey || '').trim();

        if (!/^[a-f0-9]{32}$/i.test(orderKey)) {
            return res.status(422).json({ error: 'Referensi pesanan tidak valid.' });
        }

        const deleted = await orderModel.deleteOrder(orderKey);
        if (!deleted) {
            return res.status(404).json({ error: 'Pesanan tidak ditemukan.' });
        }

        return res.json({ deleted: true });
    } catch (err) {
        next(err);
    }
}

/**
 * Laporan penjualan (harian, bulanan, tahunan)
 */
async function getSalesReport(req, res, next) {
    try {
        const period = String(req.query.period || '');
        let start;
        let end;
        let bucketLabels = {};
        let bucketFormat;
        let title;

        if (period === 'daily') {
            const dateStr = String(req.query.date || '');
            const selected = parseDate(dateStr, 'date');
            if (!selected) {
                return res.status(422).json({ error: 'Tanggal laporan tidak valid.' });
            }
            start = dateAtJakarta(selected.year, selected.month, selected.day);
            end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
            bucketFormat = 'hour';
            for (let hour = 0; hour < 24; hour++) {
                const key = String(hour).padStart(2, '0');
                bucketLabels[key] = `${key}.00`;
            }
            title = `${String(selected.day).padStart(2, '0')}/${String(selected.month).padStart(2, '0')}/${selected.year}`;
        } else if (period === 'monthly') {
            const monthStr = String(req.query.month || '');
            const selected = parseDate(monthStr, 'month');
            if (!selected) {
                return res.status(422).json({ error: 'Bulan laporan tidak valid.' });
            }
            start = dateAtJakarta(selected.year, selected.month, 1);
            end = dateAtJakarta(selected.year + (selected.month === 12 ? 1 : 0), selected.month === 12 ? 1 : selected.month + 1, 1);
            bucketFormat = 'day';
            const days = new Date(Date.UTC(selected.year, selected.month, 0)).getUTCDate();
            for (let day = 1; day <= days; day++) {
                bucketLabels[String(day)] = String(day);
            }
            title = `${String(selected.month).padStart(2, '0')}/${selected.year}`;
        } else if (period === 'yearly') {
            const yearStr = String(req.query.year || '');
            if (!/^\d{4}$/.test(yearStr) || Number(yearStr) < 2000 || Number(yearStr) > 2100) {
                return res.status(422).json({ error: 'Tahun laporan tidak valid.' });
            }
            const year = Number(yearStr);
            start = dateAtJakarta(year, 1, 1);
            end = dateAtJakarta(year + 1, 1, 1);
            bucketFormat = 'month';
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
            monthNames.forEach((name, idx) => {
                bucketLabels[String(idx + 1)] = name;
            });
            title = yearStr;
        } else {
            return res.status(422).json({ error: 'Jenis periode laporan tidak valid.' });
        }

        const orders = await orderModel.getSalesReportOrders(start, end);
        const buckets = Object.fromEntries(
            Object.entries(bucketLabels).map(([k, label]) => [k, { label, orders: 0, revenue: 0, users: 0 }])
        );
        const games = new Map();
        let unpricedOrders = 0;

        for (const row of orders) {
            const created = new Date(row.created_at);
            const parts = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Jakarta',
                hour: '2-digit',
                day: 'numeric',
                month: 'numeric',
                hourCycle: 'h23'
            }).formatToParts(created);

            const valueFor = type => parts.find(p => p.type === type).value;
            const key = bucketFormat === 'hour'
                ? valueFor('hour').padStart(2, '0')
                : bucketFormat === 'day' ? String(Number(valueFor('day'))) : String(Number(valueFor('month')));

            if (!buckets[key]) continue;
            buckets[key].orders++;

            const game = row.game.trim();
            if (!games.has(game)) games.set(game, { game, orders: 0, revenue: 0 });
            games.get(game).orders++;

            const amountMatch = /Rp\s*([\d.]+)/i.exec(row.nominal);
            const amount = amountMatch ? Number(amountMatch[1].replace(/\./g, '')) : NaN;
            if (Number.isSafeInteger(amount) && amount >= 0) {
                buckets[key].revenue += amount;
                games.get(game).revenue += amount;
            } else {
                unpricedOrders++;
            }
        }

        // Ambil user baru yang terdaftar di periode ini
        const newUsers = await pool.query(
            'SELECT created_at FROM users WHERE created_at >= $1 AND created_at < $2 ORDER BY created_at ASC',
            [start, end]
        );
        for (const row of newUsers.rows) {
            const parts = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Jakarta',
                hour: '2-digit',
                day: 'numeric',
                month: 'numeric',
                hourCycle: 'h23'
            }).formatToParts(new Date(row.created_at));

            const valueFor = type => parts.find(p => p.type === type).value;
            const key = bucketFormat === 'hour'
                ? valueFor('hour').padStart(2, '0')
                : bucketFormat === 'day' ? String(Number(valueFor('day'))) : String(Number(valueFor('month')));

            if (buckets[key]) buckets[key].users++;
        }

        const bucketValues = Object.values(buckets);
        const totalUsersResult = await pool.query('SELECT COUNT(*) FROM users');
        const summary = bucketValues.reduce((val, b) => ({
            orders: val.orders + b.orders,
            revenue: val.revenue + b.revenue
        }), { orders: 0, revenue: 0 });

        summary.newUsers = bucketValues.reduce((total, b) => total + b.users, 0);
        summary.totalUsers = Number(totalUsersResult.rows[0].count);

        const gamesList = [...games.values()].sort((a, b) =>
            b.revenue - a.revenue || b.orders - a.orders || a.game.localeCompare(b.game, 'en')
        );

        return res.json({
            period,
            title,
            summary,
            unpricedOrders,
            buckets: bucketValues,
            games: gamesList
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAdminSession,
    adminLogin,
    adminLogout,
    getAllOrders,
    getOrderProof,
    updateStatus,
    deleteOrder,
    getSalesReport
};
