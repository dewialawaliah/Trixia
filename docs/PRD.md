# PRD — TRIXIA

## Ringkasan

TRIXIA adalah storefront top up digital untuk game. Pengunjung memilih game dan nominal, memasukkan identitas akun game, memilih metode pembayaran, mengunggah bukti transfer, lalu memperoleh nomor pesanan untuk melihat status. Akun opsional menyediakan profil dan riwayat. Admin memverifikasi pesanan melalui dashboard.

Dokumen ini mencatat perilaku yang tersedia di implementasi saat ini; bukan janji untuk fitur yang belum dibuat.

## Pengguna dan kebutuhan

| Pengguna | Kebutuhan |
| --- | --- |
| Pengunjung/tamu | Menemukan produk, membuat pesanan, memperoleh invoice, dan melacak status tanpa wajib mendaftar. |
| Pengguna terdaftar | Login, mengelola profil, memakai username TRIXIA, melihat riwayat pesanan, dan memulihkan password melalui email. |
| Admin | Login, memeriksa pesanan dan bukti pembayaran, memperbarui status, menghapus pesanan, serta melihat laporan. |

## Sasaran produk

- Membuat alur pemesanan top up yang ringkas dan dapat digunakan tanpa akun.
- Memberikan referensi pesanan dan status yang dapat diperiksa kembali.
- Menyediakan proses verifikasi manual untuk admin.
- Memberi nilai tambahan kepada pengguna terdaftar melalui profil dan riwayat pesanan.

## Ruang lingkup saat ini

### Pengunjung dan pelanggan

- Menjelajahi katalog game dan pilihan nominal yang disediakan frontend.
- Mengisi User ID game dan Server ID bila diperlukan.
- Memilih QRIS, DANA, atau OVO; melihat instruksi pembayaran.
- Mengirim bukti transfer berupa JPEG, PNG, WEBP, atau GIF dengan ukuran maksimum 2 MB.
- Mendapatkan invoice dengan order ID enam digit dan tautan kunci pesanan.
- Melacak pesanan berdasarkan order ID.
- Memakai fitur bantuan pelanggan/chatbot yang tersedia di storefront.

### Akun

- Registrasi dengan nama, username unik, dan email atau nomor telepon.
- Login menggunakan username, email, atau nomor telepon.
- Mengubah nama, username, email, dan nomor telepon dengan konfirmasi password saat ini. Setidaknya satu metode kontak harus tetap diisi.
- Melihat riwayat pesanan yang dibuat saat login.
- Meminta tautan reset password melalui email; tautan sekali pakai berlaku satu jam.
- Mengaitkan pesanan baru dengan akun yang sedang login. Pesanan yang dibuat sebagai tamu tidak otomatis dikaitkan kemudian.

### Admin

- Masuk melalui form akun yang sama dengan username khusus `admintrixia`.
- Melihat antrean pesanan dan bukti pembayaran.
- Memindahkan status pesanan ke `Processing` atau `Success`, atau menghapus pesanan.
- Melihat laporan penjualan, pesanan sukses, jumlah pendaftaran baru, total pengguna, dan rincian per game per hari/bulan/tahun.
- Dashboard memuat ulang data pesanan secara berkala.

## Aturan bisnis dan validasi

- Username pengguna 3–30 karakter, hanya huruf kecil/angka/garis bawah setelah normalisasi; `admintrixia` dicadangkan.
- Email dan nomor telepon unik secara terpisah. Akun harus menyimpan minimal salah satunya.
- Password pengguna 8–72 karakter.
- Status pesanan yang tersimpan: `Pending`, `Processing`, `Success`. Pesanan baru berstatus `Pending`.
- Pendapatan laporan hanya menghitung pesanan `Success` dengan nominal yang dapat dibaca sebagai Rupiah.
- Username TRIXIA pada pesanan merupakan snapshot pada waktu pesanan dibuat; perubahan username profil tidak mengubah snapshot lama.
- Hapus pengguna membuat `customer_id` pesanan menjadi `NULL`; pesanan itu sendiri tetap ada.

## Bukan bagian dari implementasi saat ini

- Pemrosesan top up otomatis atau integrasi payment gateway.
- Validasi pembayaran otomatis; admin memeriksa bukti transfer.
- Katalog produk dan harga yang dikelola melalui dashboard/database.
- Migrasi otomatis pesanan dari Firebase. Riwayat lama hanya dapat dipindah melalui proses ekspor/impor terpisah.
- Pengiriman email transaksi selain email reset password.

## Kriteria penerimaan utama

1. Pengunjung dapat menyelesaikan checkout tanpa login, dan pesanan tercatat dengan status `Pending`.
2. Pengunjung dapat menemukan pesanan melalui order ID dan melihat status terbaru.
3. Pengguna terdaftar dapat login dan hanya melihat riwayat milik akunnya.
4. Admin yang terautentikasi dapat memeriksa bukti dan mengubah status pesanan.
5. Laporan hanya menghitung pesanan `Success`; pengguna baru dihitung berdasarkan waktu registrasi.
6. Reset password hanya menerima token yang belum dipakai dan belum kedaluwarsa.

## Metrik yang dapat diamati

- Jumlah pesanan per periode dan per game.
- Nilai pendapatan yang dapat dihitung dari nominal pesanan sukses.
- Total pengguna dan jumlah pengguna baru per periode.

Implementasi laporan berada di endpoint `admin-sales-report`; definisi database dan API ada di [database.md](./database.md) dan [api.md](./api.md).
