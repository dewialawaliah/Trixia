# API — TRIXIA

## Dasar

- Base URL lokal: `/api`.
- Pilih operasi dengan query parameter `action`.
- Request JSON memakai `Content-Type: application/json`; session browser dikirim sebagai cookie same-origin.
- Respons sukses/error berupa JSON. Bentuk error umum: `{"error":"..."}`.
- API menolak HTTP method yang tidak sesuai (`405`), data tidak valid (`422`), sesi yang tidak berwenang (`401`), dan action tidak dikenal (`404`).
- Backend Node.js menggunakan session store PostgreSQL (`user_sessions`). Login melakukan regenerasi session ID.

Semua field JSON peka huruf besar/kecil sesuai ejaan yang ditampilkan. Endpoint berikut diimplementasikan di `server/index.js`.

## Akun dan autentikasi

| Action | Method | Akses | Parameter/request | Respons utama |
| --- | --- | --- | --- | --- |
| `register` | POST | Publik | `{name, username, contact, password}`. `contact` berupa email atau nomor telepon. | `201 {"user":{id,name,username,email,phone}}`; login otomatis. |
| `user-login` | POST | Publik | `{contact, password}`; contact menerima username, email, atau nomor telepon. | `200 {"user":{...}}`; menetapkan session pengguna. |
| `user-session` | GET | Publik | — | `{"user":{...}}` atau `{"user":null}`. |
| `user-logout` | POST | Session pengguna | — | `{"user":null}`. |
| `update-profile` | POST | Session pengguna | `{name, username, email, phone, currentPassword}`. Email/phone boleh kosong, tetapi minimal salah satu harus terisi. | `{"user":{...}}`. |
| `user-orders` | GET | Session pengguna | — | `{"orders":[...]}` berisi riwayat milik akun aktif. |
| `password-reset-request` | POST | Publik | `{email}` | Respons generik `{"message":"Jika email terdaftar, tautan reset akan segera dikirim."}`. SMTP yang belum siap menghasilkan `503`. |
| `reset-password` | POST | Publik | `{token, password}` | `{"updated":true}`; token 64 karakter hex, berlaku sekali dan satu jam. Sesi pengguna saat ini dihapus. |

Validasi utama: username 3–30 karakter huruf/angka/underscore, `admintrixia` dicadangkan, dan password 8–72 karakter.

## Pesanan pelanggan

| Action | Method | Akses | Parameter/request | Respons utama |
| --- | --- | --- | --- | --- |
| `orders` | POST | Publik; session pengguna opsional | `{game, nominal, payment, userId, serverId?, username?, buktiBase64}`. Bukti harus data URL JPEG/PNG/WEBP/GIF valid, maksimum 2 MB. | `201 {"orderKey":"…","order":{...}}`; status awal `Pending`. |
| `track` | GET | Publik | `orderId` — nomor enam digit. | `{"order":{...}}` atau `{"order":null}`. |
| `invoice` | GET | Publik | `orderKey` — 32 karakter hex. | `{"order":{...}}` atau `{"order":null}`. |

Objek pesanan menggunakan field camelCase: `orderKey`, `orderId`, `game`, `nominal`, `payment`, `userId`, `serverId`, `username` (nickname game), `customerUsername` (username TRIXIA saat order), `status`, dan `date`.

## Admin

| Action | Method | Akses | Parameter/request | Respons utama |
| --- | --- | --- | --- | --- |
| `admin-session` | GET | Publik | — | `{"authenticated":true|false}`. |
| `admin-login` | POST | Publik | `{username:"admintrixia", password}` | `{"authenticated":true}`. Password dibandingkan dengan `ADMIN_PASSWORD_HASH` (bcrypt) dari `.env`. |
| `admin-logout` | POST | Session admin | — | `{"authenticated":false}`. |
| `admin-orders` | GET | Session admin | — | `{"orders":[...]}` termasuk flag `hasProof`. |
| `admin-proof` | GET | Session admin | `orderKey` | `{"buktiBase64":"data:image/...;base64,..."}`. |
| `admin-status` | POST | Session admin | `{orderKey, status}`; status yang diizinkan `Processing` atau `Success`. | `{"updated":true}`. |
| `admin-delete` | POST | Session admin | `{orderKey}` | `{"deleted":true}`. |
| `admin-sales-report` | GET | Session admin | Query sesuai periode di bawah. | `period`, `title`, `summary`, `unpricedOrders`, `buckets`, `games`. |

Query laporan:

- Harian: `period=daily&date=YYYY-MM-DD`; bucket per jam.
- Bulanan: `period=monthly&month=YYYY-MM`; bucket per hari.
- Tahunan: `period=yearly&year=YYYY`; bucket per bulan.

`summary` berisi jumlah pesanan sukses dan pendapatan, jumlah pengguna baru (`newUsers`), serta total pengguna (`totalUsers`). `buckets` memuat label, jumlah pesanan, pendapatan, dan pengguna baru per unit periode. `games` mengurutkan rincian game berdasarkan pendapatan/pesanan. Waktu laporan memakai zona `Asia/Jakarta`.

## Contoh request

```javascript
fetch('/api?action=track&orderId=123456', {
  credentials: 'same-origin'
}).then(response => response.json());
```

```javascript
fetch('/api?action=orders', {
  method: 'POST',
  credentials: 'same-origin',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    game: 'Mobile Legends',
    nominal: '5+0 Diamonds — Rp1.425',
    payment: 'QRIS',
    userId: '12345678',
    serverId: '1234',
    username: '',
    buktiBase64: 'data:image/jpeg;base64,...'
  })
});
```

Jangan menaruh password database, SMTP, session secret, atau kredensial admin dalam request frontend. Detail schema tersedia di [database.md](./database.md).
