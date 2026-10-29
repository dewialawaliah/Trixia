const { checkoutSchema } = require('../validators/apiSchemas');
const { ApiError } = require('../api-utils');

function validateCheckout(body) {
    const result = checkoutSchema.safeParse(body);
    if (!result.success) {
        throw new ApiError(422, 'Data checkout tidak valid.', {});
    }
    return result.data;
}

module.exports = { validateCheckout };
