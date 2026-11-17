// Model untuk tabel orders
const { pool } = require('../config/database');

/**
 * Buat pesanan baru ke database
 */
async function createOrder(data) {
    const query = `
        INSERT INTO orders (
            order_key, order_id, customer_id, customer_username,
            game, nominal, payment, user_id, server_id, username,
            proof_mime, proof_data
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING order_key, order_id, created_at
    `;
    const values = [
        data.orderKey,
        data.orderId,
        data.customerId,
        data.customerUsername,
        data.game,
        data.nominal,
        data.payment,
        data.userId,
        data.serverId || '',
        data.username || '',
        data.proofMime,
        data.proofData
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
}

/**
 * Cari pesanan berdasarkan Order ID (6 angka)
 */
async function findOrderById(orderId) {
    const query = `
        SELECT order_key, order_id, customer_username, game, nominal, payment,
               user_id, server_id, username, status, created_at
        FROM orders
        WHERE order_id = $1
        LIMIT 1
    `;
    const result = await pool.query(query, [orderId]);
    return result.rows[0] || null;
}

/**
 * Cari pesanan berdasarkan Order Key (hex 32 char)
 */
async function findOrderByKey(orderKey) {
    const query = `
        SELECT order_key, order_id, customer_username, game, nominal, payment,
               user_id, server_id, username, status, created_at
        FROM orders
        WHERE order_key = $1
        LIMIT 1
    `;
    const result = await pool.query(query, [orderKey]);
    return result.rows[0] || null;
}

/**
 * Ambil semua pesanan milik user tertentu
 */
async function getOrdersByCustomerId(customerId) {
    const query = `
        SELECT order_key, order_id, customer_username, game, nominal, payment,
               user_id, server_id, username, status, created_at
        FROM orders
        WHERE customer_id = $1
        ORDER BY created_at DESC
    `;
    const result = await pool.query(query, [customerId]);
    return result.rows;
}

/**
 * Ambil semua pesanan untuk halaman Admin
 */
async function getAllOrdersForAdmin() {
    const query = `
        SELECT order_key, order_id, customer_username, game, nominal, payment,
               user_id, server_id, username, status, created_at,
               (proof_data IS NOT NULL) AS has_proof
        FROM orders
        ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
}

/**
 * Ambil data file bukti transfer (MIME dan binary data)
 */
async function getOrderProof(orderKey) {
    const query = `
        SELECT proof_mime, proof_data
        FROM orders
        WHERE order_key = $1
        LIMIT 1
    `;
    const result = await pool.query(query, [orderKey]);
    return result.rows[0] || null;
}

/**
 * Update status pesanan (Pending / Processing / Success)
 */
async function updateOrderStatus(orderKey, status) {
    const query = `
        UPDATE orders
        SET status = $1
        WHERE order_key = $2
    `;
    const result = await pool.query(query, [status, orderKey]);
    return result.rowCount > 0;
}

/**
 * Hapus pesanan berdasarkan orderKey
 */
async function deleteOrder(orderKey) {
    const query = 'DELETE FROM orders WHERE order_key = $1';
    const result = await pool.query(query, [orderKey]);
    return result.rowCount > 0;
}

/**
 * Ambil pesanan sukses dalam rentang tanggal untuk laporan penjualan
 */
async function getSalesReportOrders(startDate, endDate) {
    const query = `
        SELECT game, nominal, created_at
        FROM orders
        WHERE status = 'Success' AND created_at >= $1 AND created_at < $2
        ORDER BY created_at ASC
    `;
    const result = await pool.query(query, [startDate, endDate]);
    return result.rows;
}

module.exports = {
    createOrder,
    findOrderById,
    findOrderByKey,
    getOrdersByCustomerId,
    getAllOrdersForAdmin,
    getOrderProof,
    updateOrderStatus,
    deleteOrder,
    getSalesReportOrders
};
