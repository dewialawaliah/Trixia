const { z } = require('zod');

const requiredText = maxLength => z.string().trim().min(1).max(maxLength);

const checkoutSchema = z.object({
    game: requiredText(120),
    nominal: requiredText(255),
    payment: requiredText(50),
    userId: requiredText(120),
    serverId: z.string().trim().max(80).default(''),
    username: z.string().trim().max(120).default(''),
    buktiBase64: z.string().regex(/^data:image\/((jpeg)|(png)|(webp)|(gif));base64,[A-Za-z0-9+/=]+$/)
}).strict();

const loginSchema = z.object({
    contact: z.string().trim().min(1).max(254),
    password: z.string().min(1).max(72)
}).strict();

const registerSchema = z.object({
    name: requiredText(120),
    username: z.string().trim().min(3).max(30).regex(/^[A-Za-z0-9_]+$/),
    contact: z.string().trim().min(1).max(254),
    password: z.string().min(8).max(72)
}).strict();

const profileSchema = z.object({
    name: requiredText(120),
    username: z.string().trim().min(3).max(30).regex(/^[A-Za-z0-9_]+$/),
    email: z.string().trim().max(254).default(''),
    phone: z.string().trim().max(20).default(''),
    currentPassword: z.string().min(1).max(72)
}).strict();

const passwordResetRequestSchema = z.object({
    email: z.string().trim().email().max(254)
}).strict();

const resetPasswordSchema = z.object({
    token: z.string().regex(/^[a-f0-9]{64}$/),
    password: z.string().min(8).max(72)
}).strict();

const adminLoginSchema = z.object({
    username: z.string().trim().max(30).optional(),
    contact: z.string().trim().max(254).optional(),
    password: z.string().min(1).max(72)
}).strict();

const orderKeySchema = z.string().trim().min(1).max(120);

const statusSchema = z.object({
    status: z.enum(['Processing', 'Success'])
}).strict();

module.exports = {
    checkoutSchema, loginSchema, registerSchema, profileSchema,
    passwordResetRequestSchema, resetPasswordSchema, adminLoginSchema,
    orderKeySchema, statusSchema
};
