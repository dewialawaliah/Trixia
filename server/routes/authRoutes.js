// Route untuk autentikasi user
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyUser } = require('../middleware/authMiddleware');

router.get('/session', authController.getUserSession);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/orders', verifyUser, authController.getUserOrders);
router.post('/profile', verifyUser, authController.updateProfile);
router.post('/password-reset/request', authController.requestPasswordReset);
router.post('/password-reset', authController.resetPassword);

module.exports = router;
