const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const { app, server } = require('../index');
const { pool } = require('../config/database');

test.after(async () => {
    assert.equal(server, undefined);
    await pool.end();
});

test('GET /api?action=admin-session returns session state', async () => {
    const response = await request(app).get('/api?action=admin-session');
    assert.equal(response.status, 200);
    assert.deepEqual(response.body, { authenticated: false });
});

test('REST user session endpoint returns session state', async () => {
    const response = await request(app).get('/api/auth/session');
    assert.equal(response.status, 200);
    assert.deepEqual(response.body, { user: null });
});

test('REST admin session endpoint returns session state', async () => {
    const response = await request(app).get('/api/admin/session');
    assert.equal(response.status, 200);
    assert.deepEqual(response.body, { authenticated: false });
});

test('unknown API action returns 404 JSON response', async () => {
    const response = await request(app).get('/api?action=unknown-action');
    assert.equal(response.status, 404);
    assert.equal(typeof response.body.error, 'string');
});

test('chat endpoint rejects malformed messages without calling provider', async () => {
    const response = await request(app).post('/api/chat').send({ messages: [] });
    assert.equal(response.status, 422);
});

test('unknown endpoint method returns JSON error', async () => {
    const response = await request(app).post('/api?action=admin-session');
    assert.equal(response.status, 405);
    assert.equal(response.headers.allow, 'GET');
});
