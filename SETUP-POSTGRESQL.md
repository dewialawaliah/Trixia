# Setup lokal TRIXIA: Node.js dan PostgreSQL

Panduan ini menjalankan aplikasi tanpa Laragon dan PHP. Node.js menjalankan frontend/API; PostgreSQL adalah database.

## 1. Pasang kebutuhan

Pasang Node.js 20+ dan PostgreSQL 15+ untuk Windows. Installer PostgreSQL menyertakan pgAdmin dan `psql`; Laragon tidak diperlukan.

## 2. Buat role dan database

Di pgAdmin Query Tool yang tersambung sebagai `postgres`, jalankan:

```sql
CREATE ROLE trixia_user WITH LOGIN PASSWORD 'GANTI_PASSWORD_DATABASE';
CREATE DATABASE trixia OWNER trixia_user;
```

Jalankan schema dari PowerShell:

```powershell
psql -U trixia_user -d trixia -f .\server\db\schema.sql
```

Masukkan password yang dibuat di langkah sebelumnya. Tabel session `user_sessions` dibuat otomatis oleh backend saat API pertama kali digunakan.

## 3. Isi konfigurasi lokal

Salin template konfigurasi:

```powershell
Copy-Item .\.env.example .\.env
```

Edit `.env`:

```dotenv
DATABASE_URL=postgresql://trixia_user:your_password@localhost:5432/trixia
SESSION_SECRET=isi-dengan-secret-acak
ADMIN_PASSWORD_HASH=isi-dengan-hash-bcrypt
APP_URL=http://localhost:3000
```

Untuk membuat secret sesi dan hash password admin baru:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
node -e "require('bcryptjs').hash('GANTI_DENGAN_PASSWORD_ADMIN', 10).then(console.log)"
```

Tempel output hash bcrypt ke `ADMIN_PASSWORD_HASH`. Login admin menggunakan username `admintrixia`. Jangan masukkan password polos ke file konfigurasi.

Jika password database berisi karakter khusus, URL-encode password tersebut pada `DATABASE_URL`, atau gunakan konfigurasi terpisah `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, dan `PGPASSWORD`.

## 4. Install dan jalankan

Install dependency satu kali:

```powershell
npm install
```

Untuk development, jalankan API dan frontend dari dua terminal:

```powershell
npm run api
```

```powershell
npm run dev
```

Buka alamat Vite (umumnya `http://localhost:5173`). Untuk mode build:

```powershell
npm run build
npm start
```

Lalu buka `http://localhost:3000`.

## 5. (Opsional) Atur email reset password

Isi pengaturan berikut di `.env`:

```dotenv
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=alamat-gmail-anda@gmail.com
SMTP_PASSWORD=app-password-16-karakter
SMTP_ENCRYPTION=tls
MAIL_FROM=
MAIL_FROM_NAME=TRIXIA
APP_URL=http://localhost:3000
```

Untuk Gmail, aktifkan 2-Step Verification dan gunakan App Password. Untuk SMTP selain Gmail, isi `MAIL_FROM` dengan alamat email yang valid. URL aplikasi publik harus menggunakan HTTPS. Setelah mengubah `.env`, mulai ulang API.

## Catatan migrasi dari MySQL lama

Schema PostgreSQL baru ada di `server/db/schema.sql`. Proyek tidak menyertakan migrasi otomatis dari database lama. Backup database lama sebelum migrasi, lalu ekspor/impor data secara terpisah. Hash password bcrypt lama bisa digunakan dengan backend Node.js ini.

## Pemecahan masalah

| Gejala | Pemeriksaan |
| --- | --- |
| `psql` tidak ditemukan | Buka terminal baru setelah memasang PostgreSQL atau jalankan `psql.exe` dari folder `bin` instalasi PostgreSQL. |
| API tidak dapat tersambung ke database | Pastikan service PostgreSQL aktif, role/database tersedia, dan `DATABASE_URL` benar. |
| Error secret session | Isi `SESSION_SECRET` di `.env`, lalu mulai ulang API. |
| Frontend tidak dapat memanggil API saat development | Jalankan `npm run api` dan `npm run dev` di terminal terpisah; API default memakai port 3000. |
| Reset password tidak mengirim email | Periksa SMTP di `.env`, App Password Gmail, dan `APP_URL`. |
| Halaman kosong setelah `npm start` | Jalankan `npm run build` dahulu; server memakai file di `client/dist`. |
