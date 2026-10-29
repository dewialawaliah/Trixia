class ApiError extends Error {
    constructor(status, message, headers = {}) {
        super(message);
        this.status = status;
        this.headers = headers;
    }
}

function fail(status, message, headers) {
    throw new ApiError(status, message, headers);
}

function requireMethod(req, method) {
    if (req.method !== method) {
        fail(405, 'Metode permintaan tidak diizinkan.', { Allow: method });
    }
}

function requireAdmin(req) {
    if (!req.session.adminAuthenticated) {
        fail(401, 'Silakan login sebagai admin terlebih dahulu.');
    }
}

function requireUser(req) {
    if (!req.session.userId) {
        fail(401, 'Silakan login untuk melihat profil pengguna.');
    }
    return Number(req.session.userId);
}

function requestBody(req) {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        fail(400, 'Format permintaan tidak valid.');
    }
    return req.body;
}

function userFromRow(row) {
    return {
        id: Number(row.id),
        name: row.name,
        username: row.username,
        email: row.email,
        phone: row.phone
    };
}

function normalizeUsername(value) {
    const username = value.trim().toLowerCase();
    return /^[a-z0-9_]{3,30}$/.test(username) ? username : null;
}

function normalizeContact(value) {
    const contact = value.trim();
    if (contact.length > 254) return null;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
        return { type: 'email', value: contact.toLowerCase() };
    }
    const phone = contact.replace(/[\s().-]/g, '');
    if (/^\+?[0-9]{7,19}$/.test(phone)) {
        return { type: 'phone', value: phone };
    }
    return null;
}

function requiredString(body, key, maxLength) {
    if (typeof body[key] !== 'string') {
        fail(422, `Data pesanan tidak valid (${key}).`);
    }
    const value = body[key].trim();
    if (!value || Array.from(value).length > maxLength) {
        fail(422, `Data pesanan tidak valid (${key}).`);
    }
    return value;
}

function formatDate(value) {
    return new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Jakarta',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23'
    }).format(new Date(value)).replace(',', '');
}

function orderFromRow(row) {
    return {
        orderKey: row.order_key,
        orderId: Number(row.order_id),
        game: row.game,
        nominal: row.nominal,
        payment: row.payment,
        userId: row.user_id,
        serverId: row.server_id,
        username: row.username,
        customerUsername: row.customer_username || '',
        status: row.status,
        date: formatDate(row.created_at)
    };
}

function validEmail(value) {
    return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function parseDate(value, format) {
    if (format === 'date' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
        const [year, month, day] = value.split('-').map(Number);
        const date = new Date(Date.UTC(year, month - 1, day));
        if (date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day) {
            return { year, month, day };
        }
    }
    if (format === 'month' && /^\d{4}-(0[1-9]|1[0-2])$/.test(value)) {
        const [year, month] = value.split('-').map(Number);
        return { year, month, day: 1 };
    }
    return null;
}

function dateAtJakarta(year, month, day) {
    return new Date(`${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00+07:00`);
}

function isValidImage(bytes, mime) {
    if (mime === 'image/jpeg') return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    if (mime === 'image/png') return bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    if (mime === 'image/gif') return ['GIF87a', 'GIF89a'].includes(bytes.subarray(0, 6).toString('ascii'));
    if (mime === 'image/webp') {
        return bytes.subarray(0, 4).toString('ascii') === 'RIFF'
            && bytes.subarray(8, 12).toString('ascii') === 'WEBP';
    }
    return false;
}

function regenerateSession(req) {
    return new Promise((resolve, reject) => {
        req.session.regenerate(error => error ? reject(error) : resolve());
    });
}

function localEmailConfig() {
    const smtpHost = (process.env.SMTP_HOST || '').trim().toLowerCase();
    const smtpUsername = (process.env.SMTP_USERNAME || '').trim();
    const smtpPassword = (process.env.SMTP_PASSWORD || '').replace(/\s+/g, '');
    const encryption = (process.env.SMTP_ENCRYPTION || 'tls').toLowerCase();
    const portValue = Number(process.env.SMTP_PORT || 587);
    const appUrl = process.env.APP_URL || '';
    const gmail = smtpHost === 'smtp.gmail.com';

    if (!smtpHost || !smtpUsername || !smtpPassword || !appUrl) {
        fail(503, 'Pengaturan email belum lengkap di file .env.');
    }
    if (gmail && (!validEmail(smtpUsername) || !/^[A-Za-z0-9]{16}$/.test(smtpPassword))) {
        fail(503, 'Periksa SMTP_USERNAME dan SMTP_PASSWORD App Password Gmail di file .env.');
    }
    if (!gmail && !validEmail(process.env.MAIL_FROM || '')) {
        fail(503, 'MAIL_FROM harus berupa alamat email yang valid.');
    }
    if (!['tls', 'ssl'].includes(encryption) || !Number.isInteger(portValue) || portValue < 1 || portValue > 65535) {
        fail(503, 'Konfigurasi SMTP_ENCRYPTION atau SMTP_PORT tidak valid.');
    }
    let appUrlObject;
    try {
        appUrlObject = new URL(appUrl);
    } catch {
        fail(503, 'APP_URL tidak valid.');
    }
    if (appUrlObject.protocol !== 'https:' && !(appUrlObject.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(appUrlObject.hostname))) {
        fail(503, 'APP_URL harus HTTPS, kecuali alamat localhost untuk pengembangan.');
    }
    return {
        smtpHost,
        smtpUsername,
        smtpPassword,
        encryption,
        port: portValue,
        appUrl: appUrl.replace(/\/+$/, ''),
        from: gmail ? smtpUsername : process.env.MAIL_FROM.trim(),
        fromName: process.env.MAIL_FROM_NAME || 'TRIXIA'
    };
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[character]);
}

module.exports = { ApiError, fail, requireMethod, requireAdmin, requireUser, requestBody, userFromRow, normalizeUsername, normalizeContact, requiredString, formatDate, orderFromRow, validEmail, parseDate, dateAtJakarta, isValidImage, regenerateSession, localEmailConfig, escapeHtml };
