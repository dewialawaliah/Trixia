const { pool } = require('./config/database');
const { fail, requireMethod, requireAdmin, requestBody, parseDate, dateAtJakarta, orderFromRow } = require('./api-utils');

async function handleAdminApi(req, res) {
    const action = String(req.query.action || req.legacyAction || '');
    if (action === 'admin-orders') {
        requireMethod(req, 'GET');
        requireAdmin(req);
        const result = await pool.query(
            `SELECT order_key, order_id, customer_username, game, nominal, payment, user_id, server_id,
            username, status, created_at, (proof_data IS NOT NULL) AS has_proof
            FROM orders ORDER BY created_at DESC`
        );
        return res.json({
            orders: result.rows.map(row => ({ ...orderFromRow(row), hasProof: row.has_proof }))
        });
    }

    if (action === 'admin-sales-report') {
        requireMethod(req, 'GET');
        requireAdmin(req);
        const period = String(req.query.period || '');
        let start;
        let end;
        let bucketLabels = {};
        let bucketFormat;
        let title;
        if (period === 'daily') {
            const value = String(req.query.date || '');
            const selected = parseDate(value, 'date');
            if (!selected) fail(422, 'Tanggal laporan tidak valid.');
            start = dateAtJakarta(selected.year, selected.month, selected.day);
            end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
            bucketFormat = 'hour';
            for (let hour = 0; hour < 24; hour++) {
                const key = String(hour).padStart(2, '0');
                bucketLabels[key] = `${key}.00`;
            }
            title = `${String(selected.day).padStart(2, '0')}/${String(selected.month).padStart(2, '0')}/${selected.year}`;
        } else if (period === 'monthly') {
            const value = String(req.query.month || '');
            const selected = parseDate(value, 'month');
            if (!selected) fail(422, 'Bulan laporan tidak valid.');
            start = dateAtJakarta(selected.year, selected.month, 1);
            end = dateAtJakarta(selected.year + (selected.month === 12 ? 1 : 0), selected.month === 12 ? 1 : selected.month + 1, 1);
            bucketFormat = 'day';
            const days = new Date(Date.UTC(selected.year, selected.month, 0)).getUTCDate();
            for (let day = 1; day <= days; day++) bucketLabels[String(day)] = String(day);
            title = `${String(selected.month).padStart(2, '0')}/${selected.year}`;
        } else if (period === 'yearly') {
            const value = String(req.query.year || '');
            if (!/^\d{4}$/.test(value) || Number(value) < 2000 || Number(value) > 2100) {
                fail(422, 'Tahun laporan tidak valid.');
            }
            const year = Number(value);
            start = dateAtJakarta(year, 1, 1);
            end = dateAtJakarta(year + 1, 1, 1);
            bucketFormat = 'month';
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
            monthNames.forEach((name, index) => { bucketLabels[String(index + 1)] = name; });
            title = value;
        } else {
            fail(422, 'Jenis periode laporan tidak valid.');
        }
        const orders = await pool.query(
            'SELECT game, nominal, created_at FROM orders WHERE status = $1 AND created_at >= $2 AND created_at < $3 ORDER BY created_at ASC',
            ['Success', start, end]
        );
        const buckets = Object.fromEntries(Object.entries(bucketLabels).map(([key, label]) => [
            key, { label, orders: 0, revenue: 0, users: 0 }
        ]));
        const games = new Map();
        let unpricedOrders = 0;
        for (const row of orders.rows) {
            const created = new Date(row.created_at);
            const parts = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Jakarta',
                hour: '2-digit',
                day: 'numeric',
                month: 'numeric',
                hourCycle: 'h23'
            }).formatToParts(created);
            const valueFor = type => parts.find(part => part.type === type).value;
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
            const valueFor = type => parts.find(part => part.type === type).value;
            const key = bucketFormat === 'hour'
                ? valueFor('hour').padStart(2, '0')
                : bucketFormat === 'day' ? String(Number(valueFor('day'))) : String(Number(valueFor('month')));
            if (buckets[key]) buckets[key].users++;
        }
        const bucketValues = Object.values(buckets);
        const totalUsers = await pool.query('SELECT COUNT(*) FROM users');
        const summary = bucketValues.reduce((value, bucket) => ({
            orders: value.orders + bucket.orders,
            revenue: value.revenue + bucket.revenue
        }), { orders: 0, revenue: 0 });
        summary.newUsers = bucketValues.reduce((total, bucket) => total + bucket.users, 0);
        summary.totalUsers = Number(totalUsers.rows[0].count);
        const gamesList = [...games.values()].sort((a, b) =>
            b.revenue - a.revenue || b.orders - a.orders || a.game.localeCompare(b.game, 'en')
        );
        return res.json({ period, title, summary, unpricedOrders, buckets: bucketValues, games: gamesList });
    }

    if (action === 'admin-proof') {
        requireMethod(req, 'GET');
        requireAdmin(req);
        const orderKey = String(req.query.orderKey || '');
        if (!/^[a-f0-9]{32}$/.test(orderKey)) fail(422, 'Referensi pesanan tidak valid.');
        const result = await pool.query('SELECT proof_mime, proof_data FROM orders WHERE order_key = $1 LIMIT 1', [orderKey]);
        if (!result.rows[0]) fail(404, 'Pesanan tidak ditemukan.');
        return res.json({
            buktiBase64: `data:${result.rows[0].proof_mime};base64,${result.rows[0].proof_data.toString('base64')}`
        });
    }

    if (action === 'admin-status') {
        requireMethod(req, 'POST');
        requireAdmin(req);
        const body = requestBody(req);
        if (typeof body.orderKey !== 'string' || typeof body.status !== 'string'
            || !/^[a-f0-9]{32}$/.test(body.orderKey) || !['Processing', 'Success'].includes(body.status)) {
            fail(422, 'Perubahan status tidak valid.');
        }
        const result = await pool.query('UPDATE orders SET status = $1 WHERE order_key = $2', [body.status, body.orderKey]);
        if (!result.rowCount) fail(404, 'Pesanan tidak ditemukan.');
        return res.json({ updated: true });
    }

    if (action === 'admin-delete') {
        requireMethod(req, 'POST');
        requireAdmin(req);
        const body = requestBody(req);
        if (typeof body.orderKey !== 'string' || !/^[a-f0-9]{32}$/.test(body.orderKey)) {
            fail(422, 'Referensi pesanan tidak valid.');
        }
        const result = await pool.query('DELETE FROM orders WHERE order_key = $1', [body.orderKey]);
        if (!result.rowCount) fail(404, 'Pesanan tidak ditemukan.');
        return res.json({ deleted: true });
    }


    return false;
}

module.exports = { handleAdminApi };
