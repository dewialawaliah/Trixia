exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('users', {
        id: { type: 'bigserial', primaryKey: true },
        name: { type: 'varchar(120)', notNull: true },
        username: { type: 'varchar(30)', notNull: true, unique: true },
        email: { type: 'varchar(254)', unique: true },
        phone: { type: 'varchar(20)', unique: true },
        password_hash: { type: 'varchar(255)', notNull: true },
        created_at: { type: 'timestamptz', notNull: true, default: pgm.func('NOW()') }
    });

    pgm.createTable('password_reset_tokens', {
        id: { type: 'bigserial', primaryKey: true },
        user_id: { type: 'bigint', notNull: true, references: 'users', onDelete: 'CASCADE' },
        token_hash: { type: 'char(64)', notNull: true, unique: true },
        expires_at: { type: 'timestamptz', notNull: true },
        used_at: { type: 'timestamptz' },
        created_at: { type: 'timestamptz', notNull: true, default: pgm.func('NOW()') }
    });
    pgm.createIndex('password_reset_tokens', ['user_id', 'created_at'], { name: 'idx_password_reset_user_created' });
    pgm.createIndex('password_reset_tokens', 'expires_at', { name: 'idx_password_reset_expiry' });

    pgm.createTable('password_reset_requests', {
        email_hash: { type: 'char(64)', primaryKey: true },
        last_requested_at: { type: 'timestamptz', notNull: true }
    });

    pgm.createTable('orders', {
        order_key: { type: 'char(32)', primaryKey: true },
        order_id: { type: 'integer', notNull: true, unique: true },
        customer_id: { type: 'bigint', references: 'users', onDelete: 'SET NULL' },
        customer_username: { type: 'varchar(30)' },
        game: { type: 'varchar(120)', notNull: true },
        nominal: { type: 'varchar(255)', notNull: true },
        payment: { type: 'varchar(50)', notNull: true },
        user_id: { type: 'varchar(120)', notNull: true },
        server_id: { type: 'varchar(80)', notNull: true, default: "''" },
        username: { type: 'varchar(120)', notNull: true, default: "''" },
        status: { type: 'varchar(16)', notNull: true, default: "'Pending'" },
        proof_mime: { type: 'varchar(50)', notNull: true },
        proof_data: { type: 'bytea', notNull: true },
        created_at: { type: 'timestamptz', notNull: true, default: pgm.func('NOW()') }
    });
    pgm.addConstraint('orders', 'orders_order_id_range', {
        check: 'order_id BETWEEN 100000 AND 999999'
    });
    pgm.addConstraint('orders', 'orders_status_check', {
        check: "status IN ('Pending', 'Processing', 'Success')"
    });
    pgm.createIndex('orders', ['status', 'created_at'], { name: 'idx_orders_status_created' });
    pgm.createIndex('orders', 'created_at', { name: 'idx_orders_created' });
};

exports.down = pgm => {
    pgm.dropTable('orders', { ifExists: true, cascade: true });
    pgm.dropTable('password_reset_requests', { ifExists: true, cascade: true });
    pgm.dropTable('password_reset_tokens', { ifExists: true, cascade: true });
    pgm.dropTable('users', { ifExists: true, cascade: true });
};
