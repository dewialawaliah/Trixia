// Controller untuk layanan Chatbot Customer Service TRIXIA

function generateLocalReply(text) {
    const value = (text || '').toLowerCase();

    if (/halo|hai|^hi|^hello|selamat/.test(value)) {
        return 'Halo! Saya asisten TRIXIA. Ada yang bisa dibantu tentang cara top up, daftar game, metode pembayaran, atau status pesanan?';
    }
    if (/cara|bagaimana.*top.?up|top.?up/.test(value)) {
        return 'Pilih game dan nominal, isi User ID/Server akun game kamu, pilih pembayaran, lalu selesaikan checkout dan unggah bukti transfer. Pesananmu akan segera diproses oleh tim kami!';
    }
    if (/status|pesanan|order|cek|lacak|track/.test(value)) {
        return 'Status pesanan dapat dicek melalui menu Status dengan memasukkan nomor pesanan (Order ID 6 angka). Kamu juga dapat melihat riwayat pesanan akun melalui menu Profil.';
    }
    if (/bayar|pembayaran|qris|dana|ovo|gopay/.test(value)) {
        return 'Metode pembayaran yang tersedia saat ini meliputi QRIS, DANA, dan OVO. Setelah transfer, jangan lupa unggah screenshot bukti transfer di halaman checkout.';
    }
    if (/harga|nominal|berapa/.test(value)) {
        return 'Daftar nominal dan harga lengkap dapat kamu lihat langsung dengan mengklik game yang ingin di-top up di halaman Beranda.';
    }
    if (/game|ml|mobile legends|ff|free fire|genshin|pubg/.test(value)) {
        return 'Daftar game populer tersedia di Beranda TRIXIA (Mobile Legends, Free Fire, Genshin Impact, PUBG, dll). Silakan pilih game favoritmu!';
    }

    return 'Saya dapat membantu seputar cara top up, daftar game, metode pembayaran, dan pengecekan pesanan. Jika ada kendala akun atau pesanan khusus, silakan hubungi Instagram resmi kami di @trixia.for3_.';
}

/**
 * Handle permintaan chat bot
 */
async function chat(req, res, next) {
    try {
        const { messages } = req.body || {};

        if (!Array.isArray(messages) || messages.length === 0 || messages.length > 20) {
            return res.status(422).json({ error: 'Pesan chat tidak valid.' });
        }

        for (const msg of messages) {
            if (!msg || typeof msg !== 'object' || !['user', 'assistant'].includes(msg.role)) {
                return res.status(422).json({ error: 'Pesan chat tidak valid.' });
            }
            if (typeof msg.content !== 'string' || !msg.content.trim() || msg.content.trim().length > 4000) {
                return res.status(422).json({ error: 'Pesan chat tidak valid.' });
            }
        }

        const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
        const replyText = generateLocalReply(lastUserMessage ? lastUserMessage.content : '');

        return res.json({
            content: [{ type: 'text', text: replyText }]
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    chat
};
