// Route untuk panel admin
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyAdmin } = require('../middleware/authMiddleware');

router.get('/session', adminController.getAdminSession);
router.post('/login', adminController.adminLogin);
router.post('/logout', adminController.adminLogout);

// Protected routes (harus login admin)
router.get('/orders', verifyAdmin, adminController.getAllOrders);
router.get('/sales-report', verifyAdmin, adminController.getSalesReport);
router.get('/orders/:orderKey/proof', verifyAdmin, adminController.getOrderProof);
router.patch('/orders/:orderKey/status', verifyAdmin, adminController.updateStatus);
router.delete('/orders/:orderKey', verifyAdmin, adminController.deleteOrder);

module.exports = router;
