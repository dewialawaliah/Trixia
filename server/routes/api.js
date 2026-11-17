// Router utama untuk API TRIXIA
const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const orderRoutes = require('./orderRoutes');
const chatRoutes = require('./chatRoutes');

const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const orderController = require('../controllers/orderController');
const { verifyUser, verifyAdmin } = require('../middleware/authMiddleware');

// Mount sub-routers
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/', orderRoutes);
router.use('/', chatRoutes);

// Pemetaan aksi legacy (query ?action=...) untuk backward compatibility
const legacyActions = {
    'admin-session': { method: 'GET', handler: adminController.getAdminSession },
    'admin-login': { method: 'POST', handler: adminController.adminLogin },
    'admin-logout': { method: 'POST', handler: adminController.adminLogout },
    'admin-orders': { method: 'GET', middleware: verifyAdmin, handler: adminController.getAllOrders },
    'admin-sales-report': { method: 'GET', middleware: verifyAdmin, handler: adminController.getSalesReport },
    'admin-proof': { method: 'GET', middleware: verifyAdmin, handler: adminController.getOrderProof },
    'admin-status': { method: ['POST', 'PATCH'], middleware: verifyAdmin, handler: adminController.updateStatus },
    'admin-delete': { method: ['POST', 'DELETE'], middleware: verifyAdmin, handler: adminController.deleteOrder },

    'user-session': { method: 'GET', handler: authController.getUserSession },
    'register': { method: 'POST', handler: authController.register },
    'user-login': { method: 'POST', handler: authController.login },
    'user-logout': { method: 'POST', handler: authController.logout },
    'user-orders': { method: 'GET', middleware: verifyUser, handler: authController.getUserOrders },
    'update-profile': { method: 'POST', middleware: verifyUser, handler: authController.updateProfile },
    'password-reset-request': { method: 'POST', handler: authController.requestPasswordReset },
    'reset-password': { method: 'POST', handler: authController.resetPassword },

    'orders': { method: 'POST', handler: orderController.createOrder },
    'track': { method: 'GET', handler: orderController.trackOrder },
    'invoice': { method: 'GET', handler: orderController.getInvoice },
    'validate-account': { method: 'GET', handler: orderController.validateAccount }
};

// Handler route root /api (mendukung ?action=...)
router.all('/', (req, res, next) => {
    const action = req.query.action || req.legacyAction;
    if (!action) {
        return res.status(404).json({ error: 'Endpoint tidak ditemukan.' });
    }

    const target = legacyActions[action];
    if (!target) {
        return res.status(404).json({ error: 'Endpoint tidak ditemukan.' });
    }

    const allowedMethods = Array.isArray(target.method) ? target.method : [target.method];
    if (!allowedMethods.includes(req.method)) {
        res.set('Allow', allowedMethods.join(', '));
        return res.status(405).json({ error: 'Metode permintaan tidak diizinkan.' });
    }

    if (target.middleware) {
        return target.middleware(req, res, () => target.handler(req, res, next));
    }

    return target.handler(req, res, next);
});

module.exports = router;
