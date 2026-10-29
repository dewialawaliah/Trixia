# Design — TRIXIA

## Prinsip antarmuka

- Storefront berbahasa Indonesia, dengan urutan utama: temukan game → isi akun game → pilih nominal dan pembayaran → unggah bukti → pantau pesanan.
- Login bersifat opsional untuk checkout dan disediakan sebagai nilai tambah untuk profil serta riwayat.
- Status pesanan, validasi form, dan kegagalan API harus memberi umpan balik langsung.
- Antarmuka memakai tema gelap, aksen warna cerah, kartu bergaya glass, serta layout responsif.

## Peta halaman

| Halaman/area | Tujuan | Elemen utama |
| --- | --- | --- |
| Beranda | Menjelajahi game | Banner, filter kategori, kartu game, harga mulai, bantuan pelanggan. |
| Detail game | Menentukan pesanan | User ID, Server ID opsional, lookup nickname bila didukung, nominal, metode pembayaran. |
| Pembayaran | Mengirim pesanan | Instruksi pembayaran QRIS/DANA/OVO, upload bukti, submit ke API. |
| Invoice | Menyimpan referensi | Ringkasan pesanan, order ID, status, tautan lookup invoice, opsi ekspor PDF. |
| Status | Melacak pesanan | Form order ID dan tampilan status `Pending`, `Processing`, atau `Success`. |
| Akun | Mengelola identitas | Login/registrasi, profil, ubah profil, riwayat, reset password. |
| Admin | Operasional pesanan | Login admin, daftar pesanan, bukti transfer, aksi status/hapus, laporan. |

Navigasi halaman dirender dalam satu dokumen HTML; pergantian tampilan dikendalikan oleh JavaScript, bukan routing server per halaman.

## Alur interaksi

### Checkout tamu

1. Pilih game dan nominal.
2. Masukkan ID game (serta server jika game memerlukannya).
3. Pilih metode pembayaran dan ikuti instruksi.
4. Unggah bukti pembayaran, lalu kirim.
5. API menyimpan pesanan dan mengembalikan order ID serta order key.
6. Invoice menampilkan referensi; status dapat diperiksa dari halaman Status.

### Checkout dengan akun

Alur sama dengan checkout tamu. Jika sesi pengguna aktif, backend menyimpan `customer_id` dan snapshot username TRIXIA untuk pesanan tersebut.

### Verifikasi admin

1. Admin masuk melalui halaman login yang sama dengan pengguna.
2. Dashboard meminta daftar pesanan dan bukti ke endpoint yang dilindungi session admin.
3. Admin mengubah status menjadi `Processing` atau `Success`, atau menghapus pesanan.
4. Dashboard memuat ulang daftar secara berkala; invoice dan tracking membaca status terbaru dari API.

### Pengelolaan akun

Pengguna login/registrasi melalui panel akun. Perubahan profil meminta password saat ini. Pemulihan password mengirim tautan melalui SMTP; token tidak dapat digunakan ulang dan kedaluwarsa setelah satu jam.

## Struktur teknis

```text
index.html + style.css + script.js
        │ same-origin JSON / session cookie
        ▼
server/index.js
        │ pg / PostgreSQL
        ▼
users, orders, password_reset_*
```

- `index.html`: struktur storefront, form, dan panel.
- `style.css`: tema gelap, komponen, state interaksi, dan responsivitas.
- `script.js`: state UI, katalog/harga, checkout, akun, invoice, laporan, dan request API.
- `server/index.js`: API Express, session store, autentikasi, email reset, dan operasi database.
- `server/db/schema.sql`: skema tabel PostgreSQL.

## Integrasi eksternal

- Lookup nickname menggunakan `api.isan.eu.org` untuk game yang memiliki kode lookup.
- Font Google Fonts, ikon Font Awesome, serta pustaka ekspor PDF dimuat dari CDN.
- Chatbot mencoba endpoint Anthropic langsung dari browser, lalu memakai jawaban fallback lokal jika request gagal.
- Reset password menggunakan SMTP melalui Nodemailer di server Node.js.

Integrasi browser-side memerlukan koneksi internet dan tunduk pada ketersediaan/aturan layanan pihak ketiga. Backend tetap menjadi sumber kebenaran untuk order, akun, dan status. Jangan menaruh secret server di JavaScript.

## Perilaku visual dan aksesibilitas

- Form menampilkan validasi input dan pesan kegagalan; status pesanan memakai label yang mudah dibedakan.
- Gambar besar dimuat secara bertahap dan sebagian aset memakai ukuran optimasi.
- Interaksi utama menggunakan kontrol tombol/form; perubahan UI dinyatakan melalui teks, badge, dan state visual.
- Pertahankan label yang jelas, teks alternatif gambar, fokus keyboard, dan kontras saat mengubah UI.

## Batasan desain saat ini

- Katalog dan harga tertanam di frontend; perubahan memerlukan perubahan kode.
- Pilihan pembayaran menampilkan instruksi statis. Tidak ada konfirmasi pembayaran otomatis.
- Dashboard admin mengakses seluruh pesanan; pembatasan jumlah/paginasi tidak terlihat di API saat ini.
- Invoice/tracking publik berbasis order ID atau order key; hindari menampilkan informasi sensitif di payload publik.
