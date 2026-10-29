require('dotenv').config();
const { Pool } = require('pg');
const env = require('./env');

const pool = new Pool({
    connectionString: env.DATABASE_URL,
    host: env.PGHOST,
    port: env.PGPORT,
    database: env.PGDATABASE,
    user: env.PGUSER,
    password: env.PGPASSWORD,
    ssl: env.PGSSL === 'true' ? { rejectUnauthorized: false } : undefined,
    options: '-c timezone=Asia/Jakarta'
});

module.exports = { pool };
