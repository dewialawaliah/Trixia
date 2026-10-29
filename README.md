# TRIXIA

TRIXIA adalah storefront top up game dengan frontend React, API Node.js/Express, dan database PostgreSQL. Pengunjung dapat memilih produk, mengirim pesanan dengan bukti pembayaran, lalu memantau statusnya. Akun pengguna menyimpan profil dan riwayat pesanan; admin mengelola pesanan dan laporan.

## Mulai cepat

### Kebutuhan

- Node.js 20+ dan npm.
- PostgreSQL 15+.
- Composer/PHP tidak dibutuhkan oleh aplikasi aktif.

### Siapkan database dan konfigurasi

1. Buat role dan database PostgreSQL bernama `trixia` (panduan lengkap ada di [SETUP-POSTGRESQL.md](./SETUP-POSTGRESQL.md)).
2. Salin `.env.example` menjadi `.env`, lalu isi `DATABASE_URL`, `SESSION_SECRET`, dan `ADMIN_PASSWORD_HASH`.
3. Jalankan migration database dengan `npm run db:migrate`.
4. Jalankan `npm install`.

### Jalankan untuk pengembangan

Buka dua terminal di folder proyek:

```powershell
npm run api
```

```powershell
npm run dev
```

Buka alamat Vite yang ditampilkan (biasanya `http://localhost:5173`). Vite meneruskan request `/api` ke API Node.js di port 3000.

### Build dan jalankan aplikasi

```powershell
npm run build
npm start
```

Buka `http://localhost:3000`. Server Node.js menyajikan frontend hasil build sekaligus API.

## Teknologi dan data

- Frontend React/Vite dan file JavaScript lama tetap digunakan.
- API aktif ada di `server/index.js`; perubahan struktur database dijalankan melalui migration `server/migrations` dan snapshot referensi lama ada di `server/db/schema.sql`.
- Perintah migration: `npm run db:migrate`, `npm run db:rollback`, dan `npm run db:create-migration -- nama_migration`.
- Database lama yang sudah memakai `server/db/schema.sql` perlu dicadangkan terlebih dahulu; pada instalasi baru jalankan `npm run db:migrate`. Untuk database lama, tandai baseline migration sebagai sudah dijalankan sebelum menggunakan migration berikutnya.
- File `.env` menyimpan password database, secret session, hash password admin, dan pengaturan SMTP. Jangan unggah atau bagikan file tersebut.
- Migrasi otomatis data dari database lama ke PostgreSQL belum disertakan. Backup database lama sebelum migrasi data manual.
- Bukti pembayaran disimpan di PostgreSQL sebagai `BYTEA`; backup database secara rutin.
- Fitur reset password memerlukan konfigurasi SMTP. Aset lookup nickname, font/icon, ekspor PDF, dan chatbot bergantung pada layanan atau pustaka pihak ketiga.

## Dokumentasi

- [Setup PostgreSQL dan Node.js](./SETUP-POSTGRESQL.md)
- [PRD — kebutuhan dan ruang lingkup produk](./docs/PRD.md)
- [Design — struktur antarmuka dan alur pengguna](./docs/design.md)
- [Database — tabel dan relasi PostgreSQL](./docs/database.md)
- [API — endpoint, autentikasi, dan format respons](./docs/api.md)
