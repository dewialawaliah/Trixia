const express = require('express');
const { legacyAction } = require('../controllers/apiController');

const router = express.Router();
router.get('/auth/session', legacyAction('user-session'));
router.post('/auth/register', legacyAction('register'));
router.post('/auth/login', legacyAction('user-login'));
router.post('/auth/logout', legacyAction('user-logout'));
router.get('/auth/orders', legacyAction('user-orders'));
router.post('/auth/profile', legacyAction('update-profile'));
router.post('/auth/password-reset/request', legacyAction('password-reset-request'));
router.post('/auth/password-reset', legacyAction('reset-password'));
router.get('/admin/session', legacyAction('admin-session'));
router.post('/admin/login', legacyAction('admin-login'));
router.post('/admin/logout', legacyAction('admin-logout'));
router.get('/admin/orders', legacyAction('admin-orders'));
router.get('/admin/sales-report', legacyAction('admin-sales-report'));
router.get('/admin/orders/:orderKey/proof', legacyAction('admin-proof'));
router.patch('/admin/orders/:orderKey/status', legacyAction('admin-status'));
router.delete('/admin/orders/:orderKey', legacyAction('admin-delete'));
router.post('/orders', legacyAction('orders'));
router.get('/orders/:orderId', legacyAction('track'));
router.get('/invoices/:orderKey', legacyAction('invoice'));

module.exports = router;
