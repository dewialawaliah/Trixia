const { z } = require('zod');

const envSchema = z.object({
    PORT: z.coerce.number().int().positive().default(3000),
    DATABASE_URL: z.string().min(1).optional(),
    PGHOST: z.string().default('127.0.0.1'),
    PGPORT: z.coerce.number().int().positive().default(5432),
    PGDATABASE: z.string().default('trixia'),
    PGUSER: z.string().default('trixia_user'),
    PGPASSWORD: z.string().optional(),
    PGSSL: z.enum(['true', 'false']).optional(),
    SESSION_SECRET: z.string().min(32, 'SESSION_SECRET minimal 32 karakter.'),
    ADMIN_PASSWORD_HASH: z.string().optional(),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    APP_URL: z.string().url().optional()
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    const messages = parsed.error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`);
    throw new Error(`Konfigurasi .env tidak valid:\n${messages.join('\n')}`);
}

module.exports = parsed.data;
