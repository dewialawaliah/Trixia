const { pool } = require('../config/database');

async function findOrderById(orderId) {
    const result = await pool.query('SELECT * FROM orders WHERE order_id = $1 LIMIT 1', [orderId]);
    return result.rows[0] || null;
}

async function findOrderByKey(orderKey) {
    const result = await pool.query('SELECT * FROM orders WHERE order_key = $1 LIMIT 1', [orderKey]);
    return result.rows[0] || null;
}

async function updateOrderStatus(orderKey, status) {
    const result = await pool.query('UPDATE orders SET status = $1 WHERE order_key = $2', [status, orderKey]);
    return result.rowCount > 0;
}

module.exports = { findOrderById, findOrderByKey, updateOrderStatus };
