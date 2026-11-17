// Layanan validasi data checkout
const { z } = require('zod');
const { ApiError } = require('../api-utils');

const requiredText = maxLength => z.string().trim().min(1).max(maxLength);

const checkoutSchema = z.object({
    game: requiredText(120),
    nominal: requiredText(255),
    payment: requiredText(50),
    userId: requiredText(120),
    serverId: z.string().trim().max(80).default(''),
    username: z.string().trim().max(120).default(''),
    buktiBase64: z.string().regex(/^data:image\/((jpeg)|(jpg)|(png)|(webp)|(gif));base64,[A-Za-z0-9+/=\r\n\s]+$/)
}).strict();

function validateCheckout(body) {
    const result = checkoutSchema.safeParse(body);
    if (!result.success) {
        throw new ApiError(422, 'Data checkout tidak valid.', {});
    }
    return result.data;
}

module.exports = { validateCheckout };
