const test = require('node:test');
const assert = require('node:assert/strict');
const {
    ApiError,
    fail,
    normalizeUsername,
    normalizeContact,
    isValidImage
} = require('../api-utils');

test('normalizeUsername returns lowercase valid usernames', () => {
    assert.equal(normalizeUsername('  TRIXIA_User  '), 'trixia_user');
    assert.equal(normalizeUsername('ab'), null);
    assert.equal(normalizeUsername('user with spaces'), null);
});

test('normalizeContact recognizes email and phone numbers', () => {
    assert.deepEqual(normalizeContact('User@example.com'), { type: 'email', value: 'user@example.com' });
    assert.deepEqual(normalizeContact('+62 812 3456 7890'), { type: 'phone', value: '+6281234567890' });
    assert.equal(normalizeContact('not-a-contact'), null);
});

test('fail throws an ApiError with status and headers', () => {
    assert.throws(
        () => fail(405, 'Method not allowed', { Allow: 'GET' }),
        error => error instanceof ApiError && error.status === 405 && error.headers.Allow === 'GET'
    );
});

test('isValidImage validates supported image signatures', () => {
    assert.equal(isValidImage(Buffer.from([0xff, 0xd8, 0xff, 0x00]), 'image/jpeg'), true);
    assert.equal(isValidImage(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), 'image/png'), true);
    assert.equal(isValidImage(Buffer.from([0x00, 0x00, 0x00]), 'image/jpeg'), false);
});
