const API_URL = '/api';
const API_ROUTES = {
    'user-session': 'GET /api/auth/session',
    register: 'POST /api/auth/register',
    'user-login': 'POST /api/auth/login',
    'user-logout': 'POST /api/auth/logout',
    'user-orders': 'GET /api/auth/orders',
    'update-profile': 'POST /api/auth/profile',
    'password-reset-request': 'POST /api/auth/password-reset/request',
    'reset-password': 'POST /api/auth/password-reset',
    'admin-session': 'GET /api/admin/session',
    'admin-login': 'POST /api/admin/login',
    'admin-logout': 'POST /api/admin/logout',
    'admin-orders': 'GET /api/admin/orders',
    'admin-sales-report': 'GET /api/admin/sales-report',
    orders: 'POST /api/orders',
    track: 'GET /api/orders/{orderId}',
    invoice: 'GET /api/invoices/{orderKey}',
    'admin-proof': 'GET /api/admin/orders/{orderKey}/proof',
    'admin-status': 'PATCH /api/admin/orders/{orderKey}/status',
    'admin-delete': 'DELETE /api/admin/orders/{orderKey}'
};

export async function apiRequest(action, options = {}) {
    const route = API_ROUTES[action] || `GET ${API_URL}?action=${encodeURIComponent(action)}`;
    const [method, ...urlParts] = route.split(' ');
    let url = urlParts.join(' ');
    const query = new URLSearchParams(options.query || '');
    const body = options.body || {};
    url = url.replace('{orderId}', encodeURIComponent(query.get('orderId') || body.orderId || ''));
    url = url.replace('{orderKey}', encodeURIComponent(query.get('orderKey') || body.orderKey || ''));
    if (options.query && !url.includes('?')) url += `?${options.query}`;

    const response = await fetch(url, {
        headers: options.body ? { 'Content-Type': 'application/json' } : {},
        method: options.method || method,
        credentials: 'same-origin',
        body: options.body ? JSON.stringify(options.body) : undefined
    });
    const data = await response.json().catch(() => {
        throw new Error('Server mengirim respons yang tidak valid.');
    });
    if (!response.ok) {
        const error = new Error(data.error || 'Permintaan ke server gagal.');
        error.status = response.status;
        throw error;
    }
    return data;
}
