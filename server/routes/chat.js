const express = require('express');
const { z } = require('zod');

const router = express.Router();
const chatSchema = z.object({
    messages: z.array(z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().trim().min(1).max(4000)
    })).min(1).max(20)
}).strict();

function generateLocalReply(text) {
    const value = text.toLowerCase();
    if (/halo|hai|^hi|^hello|selamat/.test(value)) {
        return 'Halo! Saya asisten TRIXIA. Bisa bantu tentang cara top up, daftar game, metode pembayaran, atau status pesanan.';
    }
    if (/cara|bagaimana.*top.?up|top.?up/.test(value)) {
        return 'Pilih game dan nominal, isi ID/Server akun bila diperlukan, pilih pembayaran, lalu selesaikan checkout. Setelah pembayaran, pesanan akan diproses oleh tim TRIXIA.';
    }
    if (/status|pesanan|order|cek/.test(value)) {
        return 'Status pesanan dapat dicek dari menu Tracking dengan memasukkan nomor pesanan. Anda juga dapat melihat pesanan akun melalui halaman Akun.';
    }
    if (/bayar|pembayaran|qris|dana|ovo|gopay/.test(value)) {
        return 'Metode pembayaran tersedia sesuai pilihan pada halaman checkout. Setelah memilih metode, ikuti instruksi dan unggah bukti pembayaran jika diminta.';
    }
    if (/harga|nominal|berapa/.test(value)) {
        return 'Harga dan nominal tersedia di halaman setiap game setelah game dipilih. Pastikan memilih jumlah yang sesuai sebelum melanjutkan checkout.';
    }
    if (/game|ml|mobile legends|ff|free fire/.test(value)) {
        return 'Daftar game tersedia pada halaman utama TRIXIA. Pilih game untuk melihat nominal dan harga terbaru.';
    }
    return 'Saya dapat membantu pertanyaan seputar cara top up, daftar game, pembayaran, dan status pesanan. Untuk masalah akun atau pesanan yang spesifik, hubungi Instagram @trixia.for3_.';
}

router.post('/chat', async (req, res) => {
    const parsed = chatSchema.safeParse(req.body);
    if (!parsed.success) return res.status(422).json({ error: 'Pesan chat tidak valid.' });
    const lastUserMessage = [...parsed.data.messages].reverse().find(message => message.role === 'user');
    return res.json({ content: [{ type: 'text', text: generateLocalReply(lastUserMessage.content) }] });
});

module.exports = router;
