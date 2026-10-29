const test = require('node:test');
const assert = require('node:assert/strict');
const { validateCheckout } = require('../services/checkoutService');
const { ApiError } = require('../api-utils');

test('checkout service accepts complete order data', () => {
    const checkout = validateCheckout({
        game: 'Mobile Legends',
        nominal: '86 Diamonds',
        payment: 'QRIS',
        userId: '123456789',
        serverId: '1234',
        username: 'Player',
        buktiBase64: 'data:image/png;base64,iVBORw0KGgo='
    });
    assert.equal(checkout.game, 'Mobile Legends');
});

test('checkout service rejects incomplete or unknown fields', () => {
    assert.throws(() => validateCheckout({
        game: 'Mobile Legends'
    }), error => error instanceof ApiError && error.status === 422);

    assert.throws(() => validateCheckout({
        game: 'Mobile Legends', nominal: '86 Diamonds', payment: 'QRIS', userId: '123',
        serverId: '', username: '', buktiBase64: 'data:image/png;base64,iVBORw0KGgo=', unexpected: true
    }), error => error instanceof ApiError && error.status === 422);
});
