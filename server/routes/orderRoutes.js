// Route untuk pesanan, tracking, dan invoice
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/orders', orderController.createOrder);
router.get('/orders/:orderId', orderController.trackOrder);
router.get('/invoices/:orderKey', orderController.getInvoice);
router.get('/validate-account', orderController.validateAccount);

module.exports = router;
