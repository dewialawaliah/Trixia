const { ApiError, handleApi } = require('../api-handler');
const { validateCheckout } = require('../services/checkoutService');
const {
    loginSchema, registerSchema, profileSchema, passwordResetRequestSchema,
    resetPasswordSchema, adminLoginSchema, orderKeySchema, statusSchema
} = require('../validators/apiSchemas');

const bodyValidators = {
    register: registerSchema,
    'user-login': loginSchema,
    'update-profile': profileSchema,
    'password-reset-request': passwordResetRequestSchema,
    'reset-password': resetPasswordSchema,
    'admin-login': adminLoginSchema
};

async function executeLegacyAction(req, res, action) {
    req.query = { ...req.query, ...req.params };
    req.legacyAction = action;
    res.set('Cache-Control', 'no-store, private');

    try {
        if (action === 'orders') req.body = validateCheckout(req.body);
        const bodyValidator = bodyValidators[action];
        if (bodyValidator) {
            const result = bodyValidator.safeParse(req.body);
            if (!result.success) throw new ApiError(422, 'Data permintaan tidak valid.');
            req.body = result.data;
        }
        if (['admin-proof', 'admin-status', 'admin-delete', 'invoice'].includes(action)) {
            const keyResult = orderKeySchema.safeParse(req.params.orderKey || req.query.orderKey);
            if (!keyResult.success) throw new ApiError(422, 'Nomor pesanan tidak valid.');
        }
        if (action === 'track') {
            const orderId = Number(req.params.orderId || req.query.orderId);
            if (!Number.isSafeInteger(orderId) || orderId < 1) throw new ApiError(422, 'Nomor pesanan tidak valid.');
            req.params.orderId = String(orderId);
        }
        if (action === 'admin-status') {
            const result = statusSchema.safeParse(req.body);
            if (!result.success) throw new ApiError(422, 'Perubahan status tidak valid.');
            req.body = { ...result.data, orderKey: req.params.orderKey || req.body.orderKey };
        }
        await handleApi(req, res);
    } catch (error) {
        if (error instanceof ApiError) {
            for (const [name, value] of Object.entries(error.headers || {})) res.set(name, value);
            return res.status(error.status).json({ error: error.message });
        }
        if (error.code === '23505') {
            console.error('TRIXIA API: PostgreSQL unique constraint violation.', error.constraint);
            return res.status(409).json({ error: 'Data tersebut sudah digunakan.' });
        }
        console.error('TRIXIA API:', error);
        return res.status(500).json({ error: 'Terjadi kesalahan server. Periksa konfigurasi dan log Node.js.' });
    }
}

function legacyAction(action) {
    return (req, res) => executeLegacyAction(req, res, action);
}

module.exports = { executeLegacyAction, legacyAction };
