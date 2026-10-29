require('dotenv').config();
const { ApiError, fail } = require('./api-utils');
const { handleAuthApi } = require('./auth-api');
const { handleOrderApi } = require('./order-api');
const { handleAdminApi } = require('./admin-api');

async function handleApi(req, res) {
    await handleAuthApi(req, res);
    if (res.headersSent) return;

    await handleOrderApi(req, res);
    if (res.headersSent) return;

    await handleAdminApi(req, res);
    if (res.headersSent) return;

    fail(404, 'Endpoint tidak ditemukan.');
}

module.exports = { ApiError, handleApi };
