import { apiRequest as apiRequestService } from './services/api.js';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

function apiRequest(action, options) {
    return apiRequestService(action, options);
}

// ---- DATA ----
var PRICES = {
    "Mobile Legends": [
        "5+0 💎 — Rp1.425","11+1 💎 — Rp3.325","17+2 💎 — Rp5.225","40+4 💎 — Rp11.400",
        "53+6 💎 — Rp7.600","25+3 💎 — Rp15.200","77+8 💎 — Rp21.850","154+16 💎 — Rp43.700",
        "217+23 💎 — Rp61.750","256+40 💎 — Rp76.000","367+41 💎 — Rp104.500",
        "503+65 💎 — Rp142.500","774+101 💎 — Rp218.500","1708+302 💎 — Rp475.000",
        "4003+827 💎 — Rp1.140.000"
    ],
    "Free Fire": [
        "5 💎 — Rp1.000","12 💎 — Rp2.000","50 💎 — Rp8.000","70 💎 — Rp10.000",
        "140 💎 — Rp20.000","355 💎 — Rp50.000","720 💎 — Rp100.000","1.450 💎 — Rp200.000",
        "2.180 💎 — Rp300.000","3.640 💎 — Rp500.000","7.290 💎 — Rp1.000.000",
        "36.500 💎 — Rp5.000.000","73.100 💎 — Rp10.000.000"
    ],
    "PUBG Mobile": [
        "60 UC — Rp15.910","325 UC — Rp79.500","660 UC — Rp159.100","1800 UC — Rp397.000",
        "3850 UC — Rp795.000","8100 UC — Rp1.580.000","16200 UC — Rp3.160.000",
        "24300 UC — Rp4.740.000","32400 UC — Rp6.320.000","40500 UC — Rp7.900.000"
    ],
    "Honor of Kings": [
        "8+8 Token — Rp1.600","16+16 Token — Rp3.200","23+23 Token — Rp4.500",
        "80+80 Token — Rp16.000","240+240 Token — Rp47.000","400 Token — Rp80.000",
        "560+112 Token — Rp109.000","800+160 Token — Rp160.000","1200+240 Token — Rp235.000",
        "2400+480 Token — Rp480.000","4000+800 Token — Rp800.000","8000+1600 Token — Rp1.599.000"
    ],
    "Clash of Clans": [
        "80 Gems — Rp13.450","500 Gems — Rp63.870","1200 Gems — Rp122.000",
        "2500 Gems — Rp255.000","6500 Gems — Rp630.000","14000 Gems — Rp1.333.000"
    ],
    "League of Legends: Wild Rift": [
        "425 Cores — Rp60.000","1000 Cores — Rp125.000","1850 Cores — Rp220.000",
        "3275 Cores — Rp375.000","4800 Cores — Rp535.000","10000 Cores — Rp1.150.000"
    ],
    "Call of Duty Mobile": [
        "31 CP — Rp5.000","63 CP — Rp10.000","128 CP — Rp20.000",
        "1373 CP — Rp195.000","2060 CP — Rp295.000","3564 CP — Rp490.000","7656 CP — Rp970.000"
    ],
    "Genshin Impact": [
        "60 Genesis Crystals — Rp16.500","300+30 Genesis Crystals — Rp81.000",
        "980+110 Genesis Crystals — Rp255.000","1980+260 Genesis Crystals — Rp489.000",
        "3280+600 Genesis Crystals — Rp815.000","6480+1600 Genesis Crystals — Rp1.629.000",
        "Blessing of the Welkin Moon — Rp81.000"
    ],
    "Honkai: Star Rail": [
        "60 Oneiric Shard — Rp16.000","300+30 Oneiric Shard — Rp79.000",
        "980+110 Oneiric Shard — Rp249.000","1980+260 Oneiric Shard — Rp479.000",
        "3280+600 Oneiric Shard — Rp799.000","6480+1600 Oneiric Shard — Rp1.599.000",
        "Express Supply Pass — Rp79.000"
    ],
    "Valorant": [
        "Riot Cash Rp45.000 — Rp45.000","Riot Cash Rp75.000 — Rp75.000",
        "Riot Cash Rp149.000 — Rp149.000","Riot Cash Rp219.000 — Rp219.000",
        "Riot Cash Rp359.000 — Rp359.000","Riot Cash Rp739.000 — Rp739.000"
    ],
    "Steam Wallet": [
        "IDR 6.000 — Rp7.100","IDR 8.000 — Rp8.000","IDR 12.000 — Rp12.000",
        "IDR 45.000 — Rp45.000","IDR 60.000 — Rp60.000","IDR 90.000 — Rp90.000",
        "IDR 120.000 — Rp120.000","IDR 250.000 — Rp249.000","IDR 400.000 — Rp395.000",
        "IDR 600.000 — Rp589.000"
    ],
    "Roblox": [
        "Rp50.000 Gift Card — Rp48.440","Rp65.000 Gift Card — Rp62.970",
        "Rp100.000 Gift Card — Rp96.500","Rp200.000 Gift Card — Rp193.000",
        "Rp500.000 Gift Card — Rp479.000"
    ],
    "Point Blank": [
        "1200 PB Cash — Rp10.000","2400 PB Cash — Rp20.000","6000 PB Cash — Rp50.000",
        "12000 PB Cash — Rp100.000","24000 PB Cash — Rp200.000",
        "36000 PB Cash — Rp300.000","60000 PB Cash — Rp500.000"
    ],
    "Minecraft": [
        "Minecoins 1720 — Rp123.000","Minecoins 3500 — Rp248.000"
    ]
};

var QR_CODES = { "QRIS":"Images/opt/QRIS.jpg" };
var PAYMENT_INFO = {
    "DANA":    { type: "number", label: "Nomor DANA", value: "085154834842" },
    "QRIS":    { type: "image",  label: "QRIS",       value: "Images/opt/QRIS.jpg" },
    "OVO":     { type: "number", label: "Nomor OVO",  value: "085175431594" }
};

// PDF libraries are bundled with the application; no CDN script is required.
function loadPdfLibs() {
    return Promise.resolve({ html2canvas: html2canvas, jsPDF: jsPDF });
}

// State order aktif
var currentOrder = { game:"", nominal:"", payment:"", bukti:"", userId:"", serverId:"", username:"" };
var currentUser = null;
var accountMode = 'login';
var accountReturnPage = '';
var pendingPasswordResetToken = '';

// Cache bukti foto agar tidak perlu mengunduh ulang selama sesi admin.
var buktiFotoMap = {};

// Timer polling dashboard admin.
var adminListener = null;
// Sidik jari render terakhir, supaya daftar pesanan tidak di-build ulang
// setiap 5 detik kalau datanya belum berubah.
var adminListSignature = null;
var salesReportPeriod = 'daily';
var salesReportMetric = 'revenue';
var salesReportData = null;

// Timer polling status invoice.
var invoiceListener = null;

// ============================================================
//  NAVIGATION
// ============================================================
function showPage(id) {
    document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
    var el = document.getElementById(id);
    if (el) { el.classList.add('active'); }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    sessionStorage.setItem('activePage', id);
    if (typeof syncSlider === 'function') syncSlider();
}

function setNavActive(btn) {
    document.querySelectorAll('.nav-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
}

// ============================================================
//  INIT SAAT DOM SIAP
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
    apiRequest('user-session')
        .then(function (result) {
            currentUser = result.user;
            updateAccountUI();
            if (currentUser && document.getElementById('accountPage').classList.contains('active')) {
                loadAccountOrders();
            }
        })
        .catch(function (err) {
            console.error('Gagal memeriksa sesi pengguna:', err);
        });

    // --- Restore halaman terakhir ---
    var savedPage       = sessionStorage.getItem('activePage') || 'dashboard';
    pendingPasswordResetToken = new URLSearchParams(window.location.hash.slice(1)).get('reset')
        || new URLSearchParams(window.location.search).get('reset')
        || '';
    if (pendingPasswordResetToken) {
        setAccountMode('reset');
        showPage('accountPage');
        setNavActive(document.getElementById('navAccount'));
    } else if (savedPage === 'adminPage') {
        apiRequest('admin-session')
            .then(function (data) {
                if (data.authenticated) {
                    showPage('adminPage');
                    loadAdmin();
                } else {
                    showPage('dashboard');
                }
            })
            .catch(function (err) {
                console.error('Gagal memeriksa sesi admin:', err);
                showPage('dashboard');
                toast('Tidak dapat menghubungi server.');
            });
    } else if (savedPage === 'invoicePage') {
        // Restore invoice jika ada data yang disimpan
        var savedInvoice = sessionStorage.getItem('lastInvoice');
        if (savedInvoice) {
            try {
                var parsed = JSON.parse(savedInvoice);
                if (!parsed.orderKey || !/^[a-f0-9]{32}$/.test(parsed.orderKey)) {
                    throw new Error('Invoice tidak memiliki referensi pesanan yang valid.');
                }
                fillInvoiceUI(parsed.order, parsed.orderKey);
                showPage('invoicePage');
                startInvoiceListener(parsed.orderKey);
            } catch(e) {
                sessionStorage.removeItem('lastInvoice');
                showPage('dashboard');
            }
        } else {
            showPage('dashboard');
        }
    } else {
        showPage(savedPage);
    }

    // --- Cek nickname otomatis (debounced) ---
    var uidEl = document.getElementById('mainUserId');
    var sidEl = document.getElementById('mainServerId');
    if (uidEl && sidEl) {
        uidEl.addEventListener('input', scheduleNicknameCheck);
        sidEl.addEventListener('input', scheduleNicknameCheck);
    }

    // --- Upload bukti ---
    var buktiInput = document.getElementById('buktiInput');
    if (buktiInput) {
        buktiInput.addEventListener('change', function (e) {
            var file = e.target.files[0];
            if (!file) return;
            if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
                this.value = '';
                return toast('Gunakan gambar JPEG, PNG, WEBP, atau GIF');
            }
            // Batasi ukuran file 2MB
            if (file.size > 2 * 1024 * 1024) {
                this.value = '';
                return toast('Ukuran gambar maksimal 2MB');
            }
            var reader = new FileReader();
            reader.onload = function (evt) {
                currentOrder.bukti = evt.target.result;
                var zone = document.getElementById('uploadZone');
                zone.classList.add('uploaded');
                zone.querySelector('p').innerText  = 'Bukti terpilih';
                zone.querySelector('span').innerText = file.name;
                toast('Gambar berhasil dipilih');
            };
            reader.readAsDataURL(file);
        });
    }

    // --- Muat banner slider berikutnya setelah render pertama selesai ---
    // Slide 1 sudah di-preload; sisanya baru diambil saat tab tidak terlihat
    // atau browser sedang idle, supaya LCP tidak tertunda.
    var warmNextSlide = function () {
        var slides = document.querySelectorAll('.slide');
        var next = slides[(currentSlide + 1) % slides.length];
        hydrateSlide(next);
    };
    if ('requestIdleCallback' in window) {
        requestIdleCallback(warmNextSlide, { timeout: 3000 });
    } else {
        setTimeout(warmNextSlide, 2500);
    }
});

function updateOrderTotals() {
    var amountMatch = currentOrder && currentOrder.nominal
        ? currentOrder.nominal.match(/Rp\s*([\d.]+)/i)
        : null;
    var amount = amountMatch ? parseInt(amountMatch[1].replace(/\./g, ''), 10) : NaN;
    var formatted = Number.isFinite(amount)
        ? 'Rp' + new Intl.NumberFormat('id-ID').format(amount)
        : 'Pilih nominal';

    ['QRIS', 'DANA', 'OVO'].forEach(function (method) {
        var total = document.getElementById('paymentTotal' + method);
        if (total) total.textContent = formatted;
    });

    var summary = document.getElementById('selectedOrderTotal');
    if (summary) {
        summary.textContent = Number.isFinite(amount) ? formatted : 'Pilih nominal terlebih dahulu';
    }
    var buttonTotal = document.getElementById('checkoutButtonTotal');
    if (buttonTotal) buttonTotal.textContent = Number.isFinite(amount) ? formatted : '—';
}

// ============================================================
//  OPEN GAME
// ============================================================
function openGame(name) {
    currentOrder = { game: name, nominal: '', payment: '', bukti: '', userId: '', serverId: '', username: '' };

    document.getElementById('gameTitleDisplay').innerText = name;
    var gamePoster = document.getElementById('gamePosterImage');
    if (gamePoster) {
        document.querySelectorAll('.game-card').forEach(function (card) {
            if (card.dataset.game !== name) return;
            var thumbnail = card.querySelector('.card-img-wrap img');
            if (thumbnail) {
                gamePoster.src = thumbnail.currentSrc || thumbnail.src;
                gamePoster.alt = name;
            }
        });
    }

    var uidInput = document.getElementById('mainUserId');
    var sidInput = document.getElementById('mainServerId');
    var sidWrap  = document.getElementById('mainServerIdWrap');
    var rowWrap  = document.getElementById('mainInputRow');

    uidInput.value = '';
    sidInput.value = '';
    document.querySelectorAll('.pay-card').forEach(function (card) {
        card.classList.remove('selected');
        card.setAttribute('aria-pressed', 'false');
    });

    var cfg = NICKNAME_API_GAMES[name];
    uidInput.placeholder = (cfg && cfg.idPlaceholder) || 'User ID';

    var shouldHideServer = !!(cfg && cfg.hideServer);
    if (sidWrap) sidWrap.style.display = shouldHideServer ? 'none' : '';
    if (rowWrap) rowWrap.classList.toggle('single-col', shouldHideServer);

    hideNicknameResult();

    var list = document.getElementById('nominalListDisplay');
    list.innerHTML = '';

    (PRICES[name] || []).forEach(function (p) {
        var div = document.createElement('div');
        div.className = 'nominal-card';
        div.innerText = p;
        div.onclick   = function () {
            document.querySelectorAll('.nominal-card').forEach(function (c) { c.classList.remove('selected'); });
            this.classList.add('selected');
            currentOrder.nominal = p;
            updateOrderTotals();
        };
        list.appendChild(div);
    });

    updateOrderTotals();
    showPage('gamePage');
    updateAccountUI();
}

function openAccount(mode, returnPage) {
    accountReturnPage = returnPage || '';
    if (currentUser) {
        updateAccountUI();
        showPage('accountPage');
        setNavActive(document.getElementById('navAccount'));
        loadAccountOrders();
        return;
    }
    setAccountMode(mode || 'login');
    showPage('accountPage');
    setNavActive(document.getElementById('navAccount'));
}

function togglePassword(inputId, button) {
    var input = document.getElementById(inputId);
    if (!input || !button) return;

    var icon = button.querySelector('i');
    var isVisible = input.type === 'text';

    input.type = isVisible ? 'password' : 'text';

    if (icon) {
        icon.classList.toggle('fa-eye', isVisible);
        icon.classList.toggle('fa-eye-slash', !isVisible);
    }

    button.setAttribute('aria-label', isVisible ? 'Tampilkan password' : 'Sembunyikan password');
    button.setAttribute('title', isVisible ? 'Tampilkan password' : 'Sembunyikan password');
}

function setAccountMode(mode) {
    accountMode = ['register', 'forgot', 'reset'].includes(mode) ? mode : 'login';
    var registering = accountMode === 'register';
    var loginOrRegister = accountMode === 'login' || registering;
    var nameField = document.getElementById('accountNameField');
    var nameInput = document.getElementById('accountName');
    var usernameField = document.getElementById('accountUsernameField');
    var usernameInput = document.getElementById('accountUsername');
    var passwordInput = document.getElementById('accountPassword');
    nameField.style.display = registering ? '' : 'none';
    nameInput.required = registering;
    usernameField.style.display = registering ? '' : 'none';
    usernameInput.required = registering;
    document.getElementById('accountForm').style.display = loginOrRegister ? '' : 'none';
    document.getElementById('accountSwitchText').style.display = loginOrRegister ? '' : 'none';
    document.getElementById('forgotPasswordLink').style.display = accountMode === 'login' ? '' : 'none';
    document.getElementById('forgotPasswordForm').style.display = accountMode === 'forgot' ? '' : 'none';
    document.getElementById('resetPasswordForm').style.display = accountMode === 'reset' ? '' : 'none';
    document.getElementById('accountContact').required = loginOrRegister;
    document.getElementById('accountContact').placeholder = registering
        ? 'Email atau nomor telepon'
        : 'Email, nomor telepon, atau username';
    passwordInput.required = loginOrRegister;
    passwordInput.minLength = registering ? 8 : 0;
    passwordInput.autocomplete = registering ? 'new-password' : 'current-password';
    passwordInput.placeholder = registering ? 'Password (minimal 8 karakter)' : 'Password';
    document.getElementById('accountFormTitle').innerText = registering
        ? 'Daftar TRIXIA'
        : (accountMode === 'forgot' ? 'Lupa Password' : (accountMode === 'reset' ? 'Password Baru' : 'Login TRIXIA'));
    document.getElementById('accountFormDescription').innerText = registering
        ? 'Buat akun untuk menyimpan profil dan riwayat pesanan.'
        : (accountMode === 'login'
            ? 'Login untuk melihat profil dan riwayat pesanan.'
            : (accountMode === 'forgot'
                ? 'Kami akan mengirim tautan reset ke email yang terdaftar.'
                : (accountMode === 'reset' ? 'Tautan reset berlaku selama satu jam.' : '')));
    document.getElementById('accountSubmitButton').innerHTML = registering
        ? '<span>Daftar</span> <i class="fas fa-user-plus"></i>'
        : '<span>Login</span> <i class="fas fa-sign-in-alt"></i>';
    document.getElementById('accountSwitchText').innerHTML = registering
        ? 'Sudah punya akun? <button type="button" onclick="setAccountMode(\'login\')">Login</button>'
        : 'Belum punya akun? <button type="button" onclick="setAccountMode(\'register\')">Daftar</button>';
}

function toggleProfileEditor(open) {
    var form = document.getElementById('profileEditForm');
    document.getElementById('accountEditToggle').style.display = open ? 'none' : '';
    form.style.display = open ? '' : 'none';
    if (!open) document.getElementById('editProfilePassword').value = '';
    if (open && currentUser) {
        document.getElementById('editProfileName').value = currentUser.name || '';
        document.getElementById('editProfileUsername').value = currentUser.username || '';
        document.getElementById('editProfileEmail').value = currentUser.email || '';
        document.getElementById('editProfilePhone').value = currentUser.phone || '';
        document.getElementById('editProfilePassword').value = '';
    }
}

function saveProfile() {
    var button = document.getElementById('saveProfileButton');
    var payload = {
        name: document.getElementById('editProfileName').value.trim(),
        username: document.getElementById('editProfileUsername').value.trim(),
        email: document.getElementById('editProfileEmail').value.trim(),
        phone: document.getElementById('editProfilePhone').value.trim(),
        currentPassword: document.getElementById('editProfilePassword').value
    };
    button.disabled = true;
    apiRequest('update-profile', { method: 'POST', body: payload })
        .then(function (result) {
            currentUser = result.user;
            updateAccountUI();
            toggleProfileEditor(false);
            toast('Profil berhasil diperbarui.');
        })
        .catch(function (err) {
            toast(err.message);
        })
        .finally(function () {
            button.disabled = false;
        });
}

function updateAccountUI() {
    var label = document.getElementById('navAccountLabel');
    var hint = document.getElementById('guestLoginHint');
    if (label) label.innerText = currentUser ? 'Profil' : 'Login';
    if (hint) hint.style.display = currentUser ? 'none' : '';
    var authPanel = document.getElementById('accountAuthPanel');
    var profilePanel = document.getElementById('accountProfilePanel');
    if (authPanel && profilePanel) {
        authPanel.style.display = currentUser ? 'none' : '';
        profilePanel.style.display = currentUser ? '' : 'none';
    }
    if (currentUser) {
        document.getElementById('profileName').innerText = currentUser.name || '-';
        document.getElementById('profileUsername').innerText = currentUser.username || '-';
        document.getElementById('profileEmail').innerText = currentUser.email || 'Belum ditambahkan';
        document.getElementById('profilePhone').innerText = currentUser.phone || 'Belum ditambahkan';
    }
}

function submitAccountAuth() {
    var name = document.getElementById('accountName').value.trim();
    var username = document.getElementById('accountUsername').value.trim();
    var contact = document.getElementById('accountContact').value.trim();
    var password = document.getElementById('accountPassword').value;
    var button = document.getElementById('accountSubmitButton');
    var payload = { contact: contact, password: password };
    if (accountMode === 'register') {
        payload.name = name;
        payload.username = username;
    }
    button.disabled = true;

    var isAdminLogin = accountMode === 'login' && contact.trim().toLowerCase() === 'admintrixia';
    var action = accountMode === 'register'
        ? 'register'
        : (isAdminLogin ? 'admin-login' : 'user-login');
    if (isAdminLogin) payload.username = contact.trim();

    apiRequest(action, {
        method: 'POST',
        body: payload
    })
        .then(function (result) {
            document.getElementById('accountPassword').value = '';
            if (isAdminLogin) {
                currentUser = null;
                accountReturnPage = '';
                document.getElementById('accountContact').value = '';
                updateAccountUI();
                showPage('adminPage');
                loadAdmin();
                toast('Berhasil login sebagai admin.');
                return;
            }
            currentUser = result.user;
            updateAccountUI();
            toast(accountMode === 'register' ? 'Akun berhasil dibuat.' : 'Berhasil login.');
            var destination = accountReturnPage || 'accountPage';
            accountReturnPage = '';
            showPage(destination);
            if (destination === 'accountPage') loadAccountOrders();
        })
        .catch(function (err) {
            toast(err.message);
        })
        .finally(function () {
            button.disabled = false;
        });
}

function requestPasswordReset() {
    var button = document.getElementById('forgotPasswordButton');
    var email = document.getElementById('forgotPasswordEmail').value.trim();
    button.disabled = true;
    apiRequest('password-reset-request', { method: 'POST', body: { email: email } })
        .then(function () {
            toast('Jika email terdaftar, tautan reset akan segera dikirim.');
            setAccountMode('login');
        })
        .catch(function (err) {
            toast('Tidak dapat mengirim tautan reset: ' + err.message);
        })
        .finally(function () {
            button.disabled = false;
        });
}

function submitPasswordReset() {
    var password = document.getElementById('newAccountPassword').value;
    var confirmation = document.getElementById('confirmAccountPassword').value;
    if (password !== confirmation) return toast('Konfirmasi password tidak sama.');
    if (!pendingPasswordResetToken) return toast('Tautan reset tidak valid. Minta tautan baru.');

    var button = document.getElementById('resetPasswordButton');
    button.disabled = true;
    apiRequest('reset-password', {
        method: 'POST',
        body: { token: pendingPasswordResetToken, password: password }
    })
        .then(function () {
            pendingPasswordResetToken = '';
            window.history.replaceState({}, document.title, window.location.pathname);
            document.getElementById('newAccountPassword').value = '';
            document.getElementById('confirmAccountPassword').value = '';
            setAccountMode('login');
            toast('Password berhasil diubah. Silakan login.');
        })
        .catch(function (err) {
            toast(err.message);
        })
        .finally(function () {
            button.disabled = false;
        });
}

function loadAccountOrders() {
    var container = document.getElementById('accountOrders');
    if (!container || !currentUser) return;
    container.innerHTML = '<p class="account-empty">Memuat riwayat pesanan...</p>';
    apiRequest('user-orders')
        .then(function (result) {
            if (!result.orders.length) {
                container.innerHTML = '<p class="account-empty">Belum ada pesanan yang terhubung ke akun ini.</p>';
                return;
            }
            container.innerHTML = result.orders.map(function (order) {
                var isSuccess = order.status === 'Success';
                var isProcessing = order.status === 'Processing';
                var badge = isSuccess ? 'success' : (isProcessing ? 'processing' : 'pending');
                var label = isSuccess ? 'Selesai' : (isProcessing ? 'Diproses' : 'Menunggu Verifikasi');
                return '<div class="account-order">' +
                    '<div class="account-order-top"><strong>' + escHtml(order.game) + '</strong>' +
                    '<span class="status-badge ' + badge + '">' + label + '</span></div>' +
                    '<small>No. Order #' + escHtml(String(order.orderId)) + ' · ' + escHtml(order.date) + '</small>' +
                    (order.customerUsername ? '<small>Username TRIXIA: ' + escHtml(order.customerUsername) + '</small>' : '') +
                    '<small>' + escHtml(order.nominal) + '</small></div>';
            }).join('');
        })
        .catch(function (err) {
            container.innerHTML = '<p class="account-empty account-error">Gagal memuat riwayat: ' + escHtml(err.message) + '</p>';
            console.error('Gagal memuat riwayat pesanan akun:', err);
        });
}

function logoutAccount() {
    apiRequest('user-logout', { method: 'POST', body: {} })
        .then(function () {
            currentUser = null;
            accountReturnPage = '';
            updateAccountUI();
            showPage('dashboard');
            setNavActive(document.getElementById('navHome'));
            toast('Kamu sudah keluar dari akun.');
        })
        .catch(function (err) {
            toast('Gagal keluar dari akun: ' + err.message);
        });
}

// ============================================================
//  CEK NICKNAME OTOMATIS (pakai API publik gratis api.isan.eu.org,
//  sumber data dari Codashop — tidak resmi, jadi dibuat gagal-aman:
//  kalau API down/CORS diblokir/game tidak didukung, kotak hasil
//  cuma disembunyikan, tidak pernah mengganggu proses checkout)
// ============================================================
var NICKNAME_API_GAMES = {
    'Mobile Legends':               { code: 'ml',   needsServer: true  },
    'Free Fire':                    { code: 'ff',   needsServer: false },
    'Call of Duty Mobile':          { code: 'codm', needsServer: false },
    'Genshin Impact':               { code: 'gi',   needsServer: false },
    'Honkai: Star Rail':            { code: 'hsr',  needsServer: false },
    'Honor of Kings':               { code: 'hok',  needsServer: true  },
    'League of Legends: Wild Rift': { code: 'lolwr',needsServer: false },
    'Clash of Clans':               { code: 'coc',  needsServer: false },
    'Valorant':                     { code: 'valo', needsServer: false, hideServer: true, idPlaceholder: 'Riot ID (contoh: nama#1234)' },
    'Point Blank':                  { code: 'pb',   needsServer: false, hideServer: true, idPlaceholder: 'Garena/Zepetto ID' }
};

var nicknameDebounceTimer = null;
var nicknameFetchToken    = 0;

function hideNicknameResult() {
    var box = document.getElementById('nicknameResult');
    if (!box) return;
    box.style.display = 'none';
    box.className = 'nickname-result';
    box.innerHTML = '';
}

function showNicknameLoading() {
    var box = document.getElementById('nicknameResult');
    if (!box) return;
    box.style.display = 'flex';
    box.className = 'nickname-result loading';
    box.innerHTML = '<span class="spinner-tiny"></span> Mengecek nickname...';
}

function showNicknameFound(name) {
    var box = document.getElementById('nicknameResult');
    if (!box) return;
    box.style.display = 'flex';
    box.className = 'nickname-result found';
    box.innerHTML = '<i class="fas fa-check-circle"></i> Nickname: <strong>' + escHtml(name) + '</strong>';
}

function showNicknameNotFound() {
    var box = document.getElementById('nicknameResult');
    if (!box) return;
    box.style.display = 'flex';
    box.className = 'nickname-result notfound';
    box.innerHTML = '<i class="fas fa-exclamation-triangle"></i> ID tidak ditemukan, periksa kembali';
}

function scheduleNicknameCheck() {
    clearTimeout(nicknameDebounceTimer);
    nicknameDebounceTimer = setTimeout(checkNickname, 600);
}

function checkNickname() {
    var cfg = NICKNAME_API_GAMES[currentOrder.game];
    if (!cfg) { hideNicknameResult(); return; }

    var uid = document.getElementById('mainUserId').value.trim();
    var sid = document.getElementById('mainServerId').value.trim();

    if (!uid || (cfg.needsServer && !sid)) { hideNicknameResult(); return; }

    var myToken = ++nicknameFetchToken;
    showNicknameLoading();

    var url = 'https://api.isan.eu.org/nickname/' + cfg.code + '?id=' + encodeURIComponent(uid);
    if (cfg.needsServer) url += '&server=' + encodeURIComponent(sid);

    fetch(url)
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (myToken !== nicknameFetchToken) return; // hasil basi, ada input baru
            if (data && data.success && data.name) {
                showNicknameFound(data.name);
            } else {
                showNicknameNotFound();
            }
        })
        .catch(function () {
            if (myToken !== nicknameFetchToken) return;
            // API tidak bisa diakses (down/CORS) — sembunyikan saja, jangan ganggu user
            hideNicknameResult();
        });
}

function selectPayment(el, val) {
    document.querySelectorAll('.pay-card').forEach(function (c) {
        c.classList.remove('selected');
        c.setAttribute('aria-pressed', 'false');
    });
    el.classList.add('selected');
    el.setAttribute('aria-pressed', 'true');
    currentOrder.payment = val;
    updateOrderTotals();
}

// ============================================================
//  CHECKOUT — langsung lanjut ke pembayaran (tanpa modal konfirmasi)
// ============================================================
function processCheckout() {
    updateAccountUI();
    var uID = document.getElementById('mainUserId').value.trim();
    var sID = document.getElementById('mainServerId').value.trim();

    if (!uID)                   return toast('User ID tidak boleh kosong');
    if (!currentOrder.nominal)  return toast('Pilih nominal terlebih dahulu');
    if (!currentOrder.payment)  return toast('Pilih metode pembayaran');

    currentOrder.userId   = uID;
    currentOrder.serverId = sID;

    // Ambil username dari nickname result jika tersedia
    var nicknameBox = document.getElementById('nicknameResult');
    var usernameText = '';
    if (nicknameBox && nicknameBox.classList.contains('found')) {
        var strong = nicknameBox.querySelector('strong');
        if (strong) usernameText = strong.innerText;
    }
    currentOrder.username = usernameText;

    confirmAndCheckout();
}

function confirmAndCheckout() {
    var btn = document.getElementById('btnCheckout');

    var info = PAYMENT_INFO[currentOrder.payment] || {};
    document.getElementById('payMethodDisplay').innerText = currentOrder.payment;

    var qrWrapper = document.querySelector('.qr-wrapper');
    var oldInfo = document.getElementById('payNumberInfo');
    if (oldInfo) oldInfo.remove();

    if (info.type === 'image') {
        document.getElementById('qrImgDisplay').src = info.value || '';
        qrWrapper.style.display = '';
    } else {
        qrWrapper.style.display = 'none';
        var infoDiv = document.createElement('div');
        infoDiv.id = 'payNumberInfo';
        infoDiv.style.cssText = 'text-align:center;margin:24px 0;padding:20px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:14px;';
        infoDiv.innerHTML = '<p style="color:#aaa;font-size:13px;margin-bottom:8px;">' + (info.label || currentOrder.payment) + '</p>' +
            '<p style="font-size:26px;font-weight:700;letter-spacing:2px;color:#6ee7b7;font-family:monospace;">' + (info.value || '') + '</p>' +
            '<p style="color:#aaa;font-size:12px;margin-top:8px;">Salin dan transfer sesuai nominal</p>';
        qrWrapper.insertAdjacentElement('afterend', infoDiv);
    }

    showPage('paymentPage');

    btn.innerHTML = '<span>Lanjut Bayar</span> <i class="fas fa-arrow-right"></i>';
    btn.disabled  = false;
}

// ============================================================
//  SAVE ORDER KE MYSQL API
// ============================================================
function saveOrderToDatabase() {
    if (!currentOrder.bukti) return toast('Upload bukti transfer terlebih dulu!');

    var verBtn = document.querySelector('#paymentPage .btn-primary');
    if (verBtn) {
        verBtn.innerHTML  = '<span>Mengirim...</span>';
        verBtn.disabled   = true;
    }

    var order = {
        game:        currentOrder.game,
        nominal:     currentOrder.nominal,
        payment:     currentOrder.payment,
        userId:      currentOrder.userId,
        serverId:    currentOrder.serverId || '',
        username:    currentOrder.username || '',
        buktiBase64: currentOrder.bukti
    };

    apiRequest('orders', { method: 'POST', body: order })
        .then(function (result) {
            toast('Pesanan berhasil dikirim!');

            // Reset upload zone
            var zone = document.getElementById('uploadZone');
            zone.classList.remove('uploaded');
            zone.querySelector('p').innerText    = 'Upload bukti transfer';
            zone.querySelector('span').innerText = 'Klik untuk memilih gambar';
            document.getElementById('buktiInput').value = '';
            currentOrder.bukti = '';

            if (verBtn) {
                verBtn.innerHTML = '<span>Verifikasi Pembayaran</span> <i class="fas fa-check"></i>';
                verBtn.disabled  = false;
            }

            // Tampilkan invoice
            showInvoice(result.order, result.orderKey);
        })
        .catch(function (err) {
            console.error('Gagal menyimpan pesanan:', err);
            toast('Gagal mengirim pesanan: ' + err.message);

            if (verBtn) {
                verBtn.innerHTML = '<span>Verifikasi Pembayaran</span> <i class="fas fa-check"></i>';
                verBtn.disabled  = false;
            }
        });
}

// ============================================================
//  TRACKING ORDER — dari API
// ============================================================
function trackOrder() {
    var trackInput = document.getElementById('trackInput').value.trim();
    var container  = document.getElementById('statusResult');

    if (!trackInput) return toast('Masukkan No. Order');

    // No. Order adalah angka 6 digit
    if (!/^\d{6}$/.test(trackInput)) return toast('No. Order harus terdiri dari 6 angka');
    var orderNum = parseInt(trackInput, 10);

    container.innerHTML = '<p style="color:var(--text-dim);text-align:center;padding:20px 0;">Mencari pesanan...</p>';

    apiRequest('track', { query: 'orderId=' + encodeURIComponent(orderNum) })
        .then(function (result) {
            var o = result.order;
            if (!o) {
                container.innerHTML = '<p style="color:var(--text-dim);text-align:center;padding:20px 0;">Pesanan tidak ditemukan. Periksa kembali No. Order kamu.</p>';
                return;
            }

            var isSuccess    = o.status === 'Success';
            var isProcessing = o.status === 'Processing';
            var badge = isSuccess ? 'success' : (isProcessing ? 'processing' : 'pending');
            var label = isSuccess ? 'Selesai' : (isProcessing ? 'Diproses' : 'Menunggu Verifikasi');
            var extraClass = isSuccess ? ' status-card-success' : '';
            var topBanner = isSuccess
                ? '<div class="status-success-banner"><i class="fas fa-check-circle"></i> Top up kamu telah selesai diproses!</div>'
                : (isProcessing ? '<div class="status-processing-banner"><i class="fas fa-cog fa-spin"></i> Pesanan kamu sedang diproses oleh admin.</div>' : '');

            container.innerHTML =
                '<div class="status-card' + extraClass + '">' +
                    topBanner +
                    '<div class="status-order-id">No. Order <span class="mono">#' + escHtml(String(o.orderId)) + '</span></div>' +
                    '<div class="game-name">' + escHtml(o.game) + '</div>' +
                    '<div class="order-detail">' + escHtml(o.nominal) + ' · ' + escHtml(o.payment) + '</div>' +
                    '<div class="order-detail" style="margin-top:4px;font-size:12px;color:var(--text-dim)">ID Akun: ' + escHtml(o.userId) + (o.serverId ? ' · Server: ' + escHtml(o.serverId) : '') + '</div>' +
                    (o.customerUsername ? '<div class="order-detail" style="margin-top:4px;font-size:12px;color:var(--text-dim)">Username TRIXIA: ' + escHtml(o.customerUsername) + '</div>' : '') +
                    (o.username ? '<div class="order-detail" style="margin-top:4px;font-size:12px;color:var(--text-dim)">Username Game: ' + escHtml(o.username) + '</div>' : '') +
                    '<div class="order-detail" style="margin-top:4px;font-size:12px;color:var(--text-dim)">' + escHtml(o.date) + '</div>' +
                    '<span class="status-badge ' + badge + '">' + label + '</span>' +
                '</div>';
        })
        .catch(function (err) {
            container.innerHTML = '<p style="color:var(--text-dim);text-align:center;padding:20px 0;">Gagal memuat data.</p>';
            console.error('Gagal melacak pesanan:', err);
            toast('Gagal memuat status pesanan: ' + err.message);
        });
}

// ============================================================
//  ADMIN
// ============================================================
function logoutAdmin() {
    apiRequest('admin-logout', { method: 'POST', body: {} })
        .catch(function (err) { console.error('Gagal mengakhiri sesi admin:', err); })
        .then(function () {
            if (adminListener) clearInterval(adminListener);
            adminListener = null;
            sessionStorage.removeItem('activePage');
            showPage('dashboard');
            setNavActive(document.getElementById('navHome'));
        });
}

function loadAdmin() {
    var list = document.getElementById('adminList');
    list.innerHTML = '<p style="color:var(--text-dim);text-align:center;padding:40px 0;">Memuat data...</p>';
    adminListSignature = null;
    if (adminListener) clearInterval(adminListener);
    var now = new Date();
    var localDate = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
    document.getElementById('reportDate').value = localDate;
    document.getElementById('reportMonth').value = localDate.slice(0, 7);
    document.getElementById('reportYear').value = String(now.getFullYear());
    refreshAdminOrders();
    loadSalesReport();
    adminListener = setInterval(refreshAdminOrders, 5000);
}

function setSalesReportPeriod(period, button) {
    salesReportPeriod = ['daily', 'monthly', 'yearly'].includes(period) ? period : 'daily';
    document.querySelectorAll('.report-period-btn').forEach(function (tab) {
        tab.classList.toggle('active', tab === button);
        tab.setAttribute('aria-selected', tab === button ? 'true' : 'false');
    });
    document.getElementById('reportDailyFilter').style.display = salesReportPeriod === 'daily' ? '' : 'none';
    document.getElementById('reportMonthlyFilter').style.display = salesReportPeriod === 'monthly' ? '' : 'none';
    document.getElementById('reportYearlyFilter').style.display = salesReportPeriod === 'yearly' ? '' : 'none';
    loadSalesReport();
}

function setSalesReportMetric(metric, button) {
    salesReportMetric = ['revenue', 'users', 'games'].includes(metric) ? metric : 'revenue';
    document.querySelectorAll('.report-metric-btn').forEach(function (tab) {
        var active = tab === button;
        tab.classList.toggle('active', active);
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    if (salesReportData) renderSalesReport(salesReportData);
}

function loadSalesReport() {
    var container = document.getElementById('salesReportContent');
    if (!container) return;
    salesReportData = null;

    var value;
    var parameter;
    if (salesReportPeriod === 'daily') {
        parameter = 'date';
        value = document.getElementById('reportDate').value;
    } else if (salesReportPeriod === 'monthly') {
        parameter = 'month';
        value = document.getElementById('reportMonth').value;
    } else {
        parameter = 'year';
        value = document.getElementById('reportYear').value;
    }
    if (!value) {
        container.innerHTML = '<p class="report-message report-error">Pilih periode laporan yang valid.</p>';
        return;
    }

    container.innerHTML = '<p class="report-message">Memuat laporan...</p>';
    var query = 'period=' + encodeURIComponent(salesReportPeriod) + '&' + parameter + '=' + encodeURIComponent(value);
    apiRequest('admin-sales-report', { query: query })
        .then(function (result) {
            renderSalesReport(result);
        })
        .catch(function (err) {
            container.innerHTML = '<p class="report-message report-error">Gagal memuat laporan: ' + escHtml(err.message) + '</p>';
            console.error('Gagal memuat laporan penjualan:', err);
        });
}

function formatReportCurrency(value) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(value);
}

function compactReportCurrency(value) {
    if (value >= 1000000000) return 'Rp' + (value / 1000000000).toFixed(1) + 'M';
    if (value >= 1000000) return 'Rp' + (value / 1000000).toFixed(1) + 'jt';
    if (value >= 1000) return 'Rp' + Math.round(value / 1000) + 'rb';
    return 'Rp' + value;
}

function createSalesChart(buckets) {
    return createReportChart(buckets, 'revenue', 'Grafik omzet pesanan berhasil', 'Omzet');
}

function createUserChart(buckets) {
    return createReportChart(buckets, 'users', 'Grafik pendaftaran pengguna TRIXIA', 'Pengguna baru');
}

function createGameChart(games) {
    var topGames = games.slice(0, 9);
    if (games.length > topGames.length) {
        var remaining = games.slice(topGames.length).reduce(function (summary, game) {
            summary.revenue += game.revenue;
            summary.orders += game.orders;
            return summary;
        }, { game: 'Lainnya', revenue: 0, orders: 0 });
        topGames.push(remaining);
    }

    var width = 900;
    var rowHeight = 42;
    var height = Math.max(165, 48 + topGames.length * rowHeight);
    var left = 190;
    var right = 90;
    var top = 18;
    var chartWidth = width - left - right;
    var maxValue = Math.max.apply(null, topGames.map(function (game) { return game.revenue; }).concat([1]));
    var bars = '';

    topGames.forEach(function (game, index) {
        var y = top + index * rowHeight;
        var barWidth = chartWidth * game.revenue / maxValue;
        var valueLabel = compactReportCurrency(game.revenue);
        bars += '<text x="' + (left - 12) + '" y="' + (y + 16) + '" text-anchor="end" class="report-chart-game-label">' +
            escHtml(game.game) + '</text>' +
            '<rect x="' + left + '" y="' + y + '" width="' + Math.max(2, barWidth).toFixed(1) + '" height="22" rx="4" class="report-chart-bar" tabindex="0" role="img" aria-label="' +
            escHtml(game.game + ', pemasukan: ' + formatReportCurrency(game.revenue) + ', ' + game.orders + ' pesanan berhasil') +
            '" data-period="' + escHtml(game.game) + '" data-value="' + escHtml(formatReportCurrency(game.revenue)) +
            '" data-detail="' + game.orders + ' pesanan berhasil"></rect>' +
            '<text x="' + (left + barWidth + 8).toFixed(1) + '" y="' + (y + 15) + '" class="report-chart-game-value">' +
            escHtml(valueLabel) + '</text>';
    });

    return '<div class="report-chart-wrap"><svg class="report-chart report-chart-games" viewBox="0 0 ' + width + ' ' + height +
        '" role="img" aria-label="Grafik pemasukan per game">' +
        '<defs><linearGradient id="reportBarGradient" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#8D70D8"></stop><stop offset="100%" stop-color="#D8C8FF"></stop></linearGradient></defs>' +
        bars + '</svg><div class="report-chart-tooltip" role="status" aria-live="polite" hidden></div></div>';
}

function createReportChart(buckets, metric, ariaLabel, tooltipLabel) {
    var width = 900;
    var height = 285;
    var left = 76;
    var right = 18;
    var top = 20;
    var bottom = 48;
    var chartWidth = width - left - right;
    var chartHeight = height - top - bottom;
    var maxValue = Math.max.apply(null, buckets.map(function (bucket) { return bucket[metric]; }).concat([1]));
    var grid = '';
    var bars = '';
    var labels = '';

    for (var line = 0; line <= 4; line++) {
        var y = top + chartHeight * line / 4;
        var amount = Math.round(maxValue * (4 - line) / 4);
        grid += '<line x1="' + left + '" y1="' + y + '" x2="' + (width - right) + '" y2="' + y + '" class="report-chart-grid"></line>' +
            '<text x="' + (left - 10) + '" y="' + (y + 4) + '" text-anchor="end" class="report-chart-y-label">' +
            escHtml(metric === 'revenue' ? compactReportCurrency(amount) : String(amount)) + '</text>';
    }

    var slotWidth = chartWidth / buckets.length;
    var barWidth = Math.min(26, slotWidth * 0.62);
    var labelStep = buckets.length <= 12 ? 1 : (buckets.length <= 24 ? 3 : 5);
    buckets.forEach(function (bucket, index) {
        var value = bucket[metric];
        var barHeight = value ? chartHeight * value / maxValue : 0;
        var x = left + slotWidth * index + (slotWidth - barWidth) / 2;
        var visibleBarHeight = Math.max(2, barHeight);
        var y = top + chartHeight - visibleBarHeight;
        var tooltipValue = metric === 'revenue' ? formatReportCurrency(value) : value + ' pengguna';
        var tooltipDetails = metric === 'revenue' ? bucket.orders + ' pesanan berhasil' : 'Pengguna baru terdaftar pada waktu ini';
        bars += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + barWidth.toFixed(1) + '" height="' + visibleBarHeight.toFixed(1) +
            '" rx="4" class="report-chart-bar" tabindex="0" role="img" aria-label="' +
            escHtml(bucket.label + ', ' + tooltipLabel + ': ' + tooltipValue + ', ' + tooltipDetails) +
            '" data-period="' + escHtml(bucket.label) + '" data-value="' + escHtml(tooltipValue) +
            '" data-detail="' + escHtml(tooltipDetails) + '"></rect>';
        if (index % labelStep === 0 || index === buckets.length - 1) {
            labels += '<text x="' + (left + slotWidth * (index + 0.5)).toFixed(1) + '" y="' + (height - 16) + '" text-anchor="middle" class="report-chart-x-label">' +
                escHtml(bucket.label) + '</text>';
        }
    });

    return '<div class="report-chart-wrap"><svg class="report-chart" viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' + escHtml(ariaLabel) + '">' +
        '<defs><linearGradient id="reportBarGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#D8C8FF"></stop><stop offset="100%" stop-color="#8D70D8"></stop></linearGradient></defs>' +
        grid + bars + labels + '</svg><div class="report-chart-tooltip" role="status" aria-live="polite" hidden></div></div>';
}

function renderSalesReport(report) {
    var container = document.getElementById('salesReportContent');
    salesReportData = report;
    var populatedBuckets = report.buckets.filter(function (bucket) {
        return bucket.orders > 0 || bucket.users > 0;
    });
    var gameRows = (report.games || []).map(function (game) {
        return '<tr><td>' + escHtml(game.game) + '</td><td>' + game.orders + '</td><td>' +
            escHtml(formatReportCurrency(game.revenue)) + '</td></tr>';
    }).join('');
    var tableRows = populatedBuckets.map(function (bucket) {
        return '<tr><td>' + escHtml(bucket.label) + '</td><td>' + bucket.orders + '</td><td>' +
            escHtml(formatReportCurrency(bucket.revenue)) + '</td><td>' + bucket.users + '</td></tr>';
    }).join('');
    var selectedMetric = salesReportMetric;
    var chartTitle = selectedMetric === 'revenue' ? 'Grafik pemasukan' : (selectedMetric === 'users' ? 'Grafik pengguna baru' : 'Grafik pemasukan per game');
    var chartSubtitle = selectedMetric === 'games'
        ? 'Berdasarkan game, maksimal 10 kategori'
        : 'Nilai per ' + (report.period === 'daily' ? 'jam' : (report.period === 'monthly' ? 'hari' : 'bulan'));
    var chart = selectedMetric === 'revenue'
        ? createSalesChart(report.buckets)
        : (selectedMetric === 'users' ? createUserChart(report.buckets) : createGameChart(report.games || []));
    var hasMetricData = selectedMetric === 'revenue'
        ? report.summary.revenue > 0
        : (selectedMetric === 'users' ? report.summary.newUsers > 0 : (report.games || []).length > 0);
    var emptyMessage = hasMetricData
        ? ''
        : '<p class="report-message">' + (selectedMetric === 'games'
            ? 'Belum ada pesanan berhasil per game pada periode ini.'
            : (selectedMetric === 'users' ? 'Belum ada pendaftaran pengguna pada periode ini.' : 'Belum ada pemasukan pada periode ini.')) + '</p>';
    var unpricedNote = report.unpricedOrders
        ? '<p class="report-note">' + report.unpricedOrders + ' pesanan Berhasil tidak memiliki nominal berformat Rupiah, sehingga tidak masuk hitungan omzet.</p>'
        : '';

    container.innerHTML =
        '<div class="report-summary">' +
            '<div class="report-kpi"><span>Omzet Berhasil</span><strong>' + escHtml(formatReportCurrency(report.summary.revenue)) + '</strong></div>' +
            '<div class="report-kpi"><span>Pesanan Berhasil</span><strong>' + report.summary.orders + '</strong></div>' +
            '<div class="report-kpi"><span>Total Pengguna TRIXIA</span><strong>' + report.summary.totalUsers + '</strong></div>' +
            '<div class="report-kpi"><span>Pengguna Baru Periode Ini</span><strong>' + report.summary.newUsers + '</strong></div>' +
            '<div class="report-kpi"><span>Periode</span><strong>' + escHtml(report.title) + '</strong></div>' +
        '</div>' +
        '<div class="report-chart-card"><div class="report-chart-heading"><strong>' + chartTitle + '</strong><span>' + chartSubtitle +
            '</span></div>' + chart + '</div>' +
        emptyMessage +
        (selectedMetric === 'games'
            ? ((report.games || []).length ? '<div class="report-table-wrap"><table class="report-table"><thead><tr><th>Game</th><th>Pesanan berhasil</th><th>Omzet berhasil</th></tr></thead><tbody>' +
                gameRows + '<tr class="report-table-total"><th>Total</th><th>' + report.summary.orders + '</th><th>' +
                escHtml(formatReportCurrency(report.summary.revenue)) + '</th></tr></tbody></table></div>' : '')
            : (populatedBuckets.length ? '<div class="report-table-wrap"><table class="report-table"><thead><tr><th>' +
            (report.period === 'daily' ? 'Jam' : (report.period === 'monthly' ? 'Tanggal' : 'Bulan')) +
            '</th><th>Pesanan berhasil</th><th>Omzet berhasil</th><th>Pengguna baru</th></tr></thead><tbody>' +
            tableRows + '<tr class="report-table-total"><th>Total ' + escHtml(report.title) + '</th><th>' +
            report.summary.orders + '</th><th>' + escHtml(formatReportCurrency(report.summary.revenue)) +
            '</th><th>' + report.summary.newUsers + '</th></tr></tbody></table></div>' : '')) + unpricedNote;
    container.querySelectorAll('.report-chart-wrap').forEach(function (chart) {
        chart.querySelectorAll('.report-chart-bar').forEach(function (bar) {
            var tooltip = chart.querySelector('.report-chart-tooltip');
            var showTooltip = function () {
                tooltip.innerHTML = '<strong>' + escHtml(bar.getAttribute('data-period')) + '</strong>' +
                    '<span>' + escHtml(bar.getAttribute('data-value')) + '</span>' +
                    '<small>' + escHtml(bar.getAttribute('data-detail')) + '</small>';
                tooltip.hidden = false;
                var chartRect = chart.getBoundingClientRect();
                var barRect = bar.getBoundingClientRect();
                var center = barRect.left + barRect.width / 2 - chartRect.left;
                tooltip.style.left = Math.max(8, Math.min(chartRect.width - tooltip.offsetWidth - 8, center - tooltip.offsetWidth / 2)) + 'px';
                tooltip.style.top = Math.max(4, barRect.top - chartRect.top - tooltip.offsetHeight - 10) + 'px';
            };
            bar.addEventListener('pointerenter', showTooltip);
            bar.addEventListener('pointermove', showTooltip);
            bar.addEventListener('focus', showTooltip);
            bar.addEventListener('blur', function () { tooltip.hidden = true; });
            bar.addEventListener('pointerleave', function () { tooltip.hidden = true; });
        });
    });
}

function refreshAdminOrders() {
    // Jangan polling saat tab tidak terlihat: hemat request dan CPU.
    if (document.hidden) return;

    var list = document.getElementById('adminList');
    var archive = document.getElementById('archiveList');
    apiRequest('admin-orders')
        .then(function (result) {
            var orders = result.orders;
            var total = orders.length;
            var pending = orders.filter(function (o) { return o.status === 'Pending'; }).length;
            var processing = orders.filter(function (o) { return o.status === 'Processing'; }).length;
            var success = orders.filter(function (o) { return o.status === 'Success'; }).length;

            document.getElementById('totalOrders').innerText = total;
            document.getElementById('pendingOrders').innerText = pending;
            document.getElementById('processingOrders').innerText = processing;
            document.getElementById('successOrders').innerText = success;
            var activeOrders = orders.filter(function (order) { return order.status !== 'Success'; });
            var archivedOrders = orders.filter(function (order) { return order.status === 'Success'; });
            document.getElementById('adminArchiveCount').innerText = archivedOrders.length;

            // Hanya tulis ulang DOM kalau isi yang ditampilkan benar-benar berubah.
            // Rebuild tiap 5 detik membuang state hover/fokus dan mahal saat arsip besar.
            var signature = JSON.stringify(activeOrders.map(orderRenderKey)) + '|' +
                            JSON.stringify(archivedOrders.map(orderRenderKey));
            if (signature === adminListSignature) return;
            adminListSignature = signature;

            list.innerHTML = activeOrders.length
                ? activeOrders.map(function (order) { return renderAdminOrderCard(order, false); }).join('')
                : '<p class="admin-orders-empty">Tidak ada pesanan yang menunggu atau sedang diproses.</p>';
            archive.innerHTML = archivedOrders.length
                ? archivedOrders.map(function (order) { return renderAdminOrderCard(order, true); }).join('')
                : '<p class="admin-orders-empty">Belum ada pesanan selesai.</p>';
        })
        .catch(function (err) {
            if (err.status === 401) {
                if (adminListener) clearInterval(adminListener);
                adminListener = null;
                currentUser = null;
                updateAccountUI();
                setAccountMode('login');
                showPage('accountPage');
                setNavActive(document.getElementById('navAccount'));
            }
            list.innerHTML = '<p class="admin-orders-empty admin-orders-error">Gagal memuat pesanan: ' + escHtml(err.message) + '</p>';
            archive.innerHTML = '';
            console.error('Gagal memuat pesanan admin:', err);
        });
}

// Bagian pesanan yang memengaruhi tampilan kartu (bukan data lazily-loaded
// seperti bukti foto), dipakai untuk mendeteksi perubahan saat polling.
function orderRenderKey(order) {
    return [order.orderKey, order.status, order.game, order.nominal,
            order.payment, order.userId, order.serverId, order.username,
            order.customerUsername, order.date, order.hasProof ? 1 : 0].join('~');
}

function renderAdminOrderCard(order, isArchived) {
    var orderKey = order.orderKey;
    var hasProof = !!order.hasProof;
    var isSuccess = order.status === 'Success';
    var isProcessing = order.status === 'Processing';
    var badge = isSuccess ? 'success' : (isProcessing ? 'processing' : 'pending');
    var label = isSuccess ? 'Berhasil' : (isProcessing ? 'Diproses' : 'Pending');
    var proofLabel = hasProof
        ? '<i class="fas fa-image"></i> Bukti'
        : '<i class="fas fa-image" style="opacity:0.3"></i> Bukti';
    var actionButtons = '';

    if (!isArchived && order.status === 'Pending') {
        actionButtons =
            '<button class="btn-outline btn-processing" onclick="updateStatus(\'' + orderKey + '\',\'Processing\')" title="Tandai Diproses"><i class="fas fa-cog"></i> Diproses</button> ' +
            '<button class="btn-outline btn-success" onclick="updateStatus(\'' + orderKey + '\',\'Success\')" title="Tandai Berhasil"><i class="fas fa-check"></i> Selesai</button> ';
    } else if (!isArchived && order.status === 'Processing') {
        actionButtons =
            '<button class="btn-outline btn-success" onclick="updateStatus(\'' + orderKey + '\',\'Success\')" title="Tandai Berhasil"><i class="fas fa-check"></i> Selesai</button> ';
    }

    var deleteButton = isArchived
        ? ''
        : '<button class="btn-outline btn-danger" onclick="hapusOrder(\'' + orderKey + '\')" title="Hapus"><i class="fas fa-times"></i> Hapus</button>';

    return '<div class="admin-order-card">' +
        '<div class="admin-order-info">' +
            '<small style="color:var(--text-dim)">No. Order <span class="mono" style="color:var(--text-mid)">#' + escHtml(String(order.orderId)) + '</span></small><br>' +
            '<b>' + escHtml(order.game) + '</b> · <span style="color:var(--text-mid)">' + escHtml(order.nominal) + '</span><br>' +
            '<small>ID: ' + escHtml(order.userId) + (order.serverId ? ' · Server: ' + escHtml(order.serverId) : '') + (order.username ? ' · Username Game: <b>' + escHtml(order.username) + '</b>' : '') + ' · ' + escHtml(order.payment) + '</small><br>' +
            (order.customerUsername ? '<small>Username TRIXIA: <b>' + escHtml(order.customerUsername) + '</b></small><br>' : '') +
            '<small>' + escHtml(order.date) + '</small><br>' +
            '<small><span class="status-badge ' + badge + '" style="margin-top:6px">' + label + '</span></small>' +
        '</div>' +
        '<div class="admin-order-actions">' +
            '<button class="btn-outline" onclick="zoomImg(\'' + orderKey + '\')" title="' + (hasProof ? 'Lihat Bukti Transfer' : 'Belum ada bukti foto') + '">' + proofLabel + '</button> ' +
            actionButtons + deleteButton +
        '</div>' +
    '</div>';
}

function updateStatus(orderKey, stat) {
    var labels = { 'Pending': 'Pending', 'Processing': 'Diproses', 'Success': 'Berhasil' };
    apiRequest('admin-status', { method: 'POST', body: { orderKey: orderKey, status: stat } })
        .then(function () {
            toast('Status diperbarui → ' + (labels[stat] || stat));
            refreshAdminOrders();
            loadSalesReport();
        })
        .catch(function (err) { toast('Gagal update: ' + err.message); });
}

function hapusOrder(orderKey) {
    if (!confirm('Hapus pesanan ini?')) return;
    apiRequest('admin-delete', { method: 'POST', body: { orderKey: orderKey } })
        .then(function () {
            delete buktiFotoMap[orderKey];
            toast('Pesanan dihapus');
            refreshAdminOrders();
            loadSalesReport();
        })
        .catch(function (err) { toast('Gagal hapus: ' + err.message); });
}

function zoomImg(orderKey) {
    var src = buktiFotoMap[orderKey];
    if (src) {
        document.getElementById('imgFull').src              = src;
        document.getElementById('imageModal').style.display = 'flex';
        return;
    }
    toast('Memuat bukti foto...');
    apiRequest('admin-proof', { query: 'orderKey=' + encodeURIComponent(orderKey) })
        .then(function (result) {
            var data = result.buktiBase64;
            if (!data) return toast('Bukti foto tidak tersedia');
            buktiFotoMap[orderKey] = data;
            document.getElementById('imgFull').src              = data;
            document.getElementById('imageModal').style.display = 'flex';
        })
        .catch(function (err) {
            console.error('Gagal memuat bukti transfer:', err);
            toast('Gagal memuat bukti: ' + err.message);
        });
}

// ============================================================
//  INVOICE
// ============================================================
function showInvoice(order, orderKey) {
    var inv = document.getElementById('invoicePage');
    if (!inv) return;

    // Simpan data invoice ke sessionStorage supaya tidak hilang saat refresh
    sessionStorage.setItem('lastInvoice', JSON.stringify({ order: order, orderKey: orderKey }));

    fillInvoiceUI(order, orderKey);
    showPage('invoicePage');
    startInvoiceListener(orderKey);
}

function startInvoiceListener(orderKey) {
    if (invoiceListener) clearInterval(invoiceListener);
    var lastStatus = null;
    var refreshStatus = function () {
        if (document.hidden) return;
        apiRequest('invoice', { query: 'orderKey=' + encodeURIComponent(orderKey) })
            .then(function (result) {
                if (!result.order) return;
                var status = result.order.status || 'Pending';
                if (status !== lastStatus) {
                    lastStatus = status;
                    updateInvoiceStatus(status);
                }
                // Status final tidak akan berubah lagi: berhenti polling.
                if (status === 'Success' && invoiceListener) {
                    clearInterval(invoiceListener);
                    invoiceListener = null;
                }
                var saved = sessionStorage.getItem('lastInvoice');
                if (saved) {
                    try {
                        var parsed = JSON.parse(saved);
                        parsed.order.status = status;
                        sessionStorage.setItem('lastInvoice', JSON.stringify(parsed));
                    } catch (err) {
                        console.error('Gagal memperbarui invoice tersimpan:', err);
                    }
                }
            })
            .catch(function (err) {
                console.error('Gagal memperbarui status invoice:', err);
            });
    };
    refreshStatus();
    invoiceListener = setInterval(refreshStatus, 5000);
}

function updateInvoiceStatus(status) {
    var pill   = document.getElementById('inv-status-pill');
    var dot    = document.getElementById('inv-status-dot');
    var banner = document.getElementById('inv-success-banner');
    var note   = document.getElementById('inv-note');
    if (!pill) return;

    if (status === 'Success') {
        pill.className = 'invoice-status-pill status-success';
        pill.innerHTML = '<i class="fas fa-check-circle"></i> Pembayaran Dikonfirmasi';
        if (dot) dot.style.display = 'none';
        if (banner) { banner.style.display = 'flex'; }
        if (note) note.innerHTML = '✅ Top up kamu <strong>sedang diproses</strong> oleh admin.<br>Masukkan item akan segera dikirim ke akun game kamu.';
    } else if (status === 'Processing') {
        pill.className = 'invoice-status-pill status-processing';
        pill.innerHTML = '<span class="pulse-dot pulse-blue" id="inv-status-dot"></span> Sedang Diproses';
        if (banner) banner.style.display = 'none';
        if (note) note.innerHTML = '⚙️ Pesanan kamu <strong>sedang diproses</strong> oleh admin.<br>Harap tunggu, top up akan segera masuk ke akun game kamu.';
    } else {
        pill.className = 'invoice-status-pill';
        pill.innerHTML = '<span class="pulse-dot" id="inv-status-dot"></span> Menunggu Verifikasi Admin';
        if (banner) banner.style.display = 'none';
        if (note) note.innerHTML = '⏳ Top up akan diproses setelah admin memverifikasi pembayaran kamu.<br>Simpan No. Order untuk cek status di menu <strong>Status</strong>.';
    }
}

function fillInvoiceUI(order, orderKey) {
    // Isi konten invoice
    document.getElementById('inv-orderId').innerText  = '#' + order.orderId;
    document.getElementById('inv-date').innerText     = order.date;
    document.getElementById('inv-game').innerText     = order.game;
    document.getElementById('inv-nominal').innerText  = order.nominal;
    document.getElementById('inv-userId').innerText   = order.userId;
    document.getElementById('inv-serverId').innerText = order.serverId || '-';

    // Tampilkan username jika ada
    var usernameRow = document.getElementById('inv-username-row');
    var usernameEl  = document.getElementById('inv-username');
    if (order.username && usernameEl && usernameRow) {
        usernameEl.innerText  = order.username;
        usernameRow.style.display = '';
    } else if (usernameRow) {
        usernameRow.style.display = 'none';
    }
    var accountUsernameRow = document.getElementById('inv-account-username-row');
    var accountUsernameEl = document.getElementById('inv-account-username');
    if (order.customerUsername && accountUsernameEl && accountUsernameRow) {
        accountUsernameEl.innerText = order.customerUsername;
        accountUsernameRow.style.display = '';
    } else if (accountUsernameRow) {
        accountUsernameRow.style.display = 'none';
    }
    document.getElementById('inv-payment').innerText  = order.payment;
    document.getElementById('inv-orderKey').innerText  = orderKey;

    // Ambil harga dari nominal string (format "xxx — RpYYY")
    var hargaMatch = order.nominal.match(/Rp[\d.,]+/);
    document.getElementById('inv-harga').innerText = hargaMatch ? hargaMatch[0] : '-';

    // Set status awal
    updateInvoiceStatus(order.status || 'Pending');
}

function downloadInvoice() {
    var card = document.getElementById('invoiceCard');
    if (!card) return;

    var btn = document.querySelector('.btn-invoice-download');
    var resetBtn = function (label) {
        if (!btn) return;
        btn.innerHTML = label || '<i class="fas fa-download"></i> Simpan Invoice';
        btn.disabled = false;
    };

    resetBtn('<i class="fas fa-spinner fa-spin"></i> Menyiapkan...');

    loadPdfLibs().then(function (pdfLibraries) {
        var JsPDF = pdfLibraries.jsPDF;
        return pdfLibraries.html2canvas(card, {
            backgroundColor: '#04070E',
            scale: 2,
            useCORS: true,
            logging: false
        }).then(function (canvas) {
            var imgData = canvas.toDataURL('image/png');
            var pdf = new JsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            var pageW  = pdf.internal.pageSize.getWidth();
            var pageH  = pdf.internal.pageSize.getHeight();
            var imgW   = pageW - 20;
            var imgH   = (canvas.height * imgW) / canvas.width;
            var posY   = (pageH - imgH) / 2;
            if (posY < 10) posY = 10;
            pdf.addImage(imgData, 'PNG', 10, posY, imgW, imgH);
            var orderId = document.getElementById('inv-orderId').innerText || 'invoice';
            pdf.save('trixia-' + orderId + '.pdf');
            toast('Invoice berhasil diunduh!');
        });
    }).then(function () {
        resetBtn();
    }).catch(function (err) {
        console.error(err);
        resetBtn();
        // Fallback: print dialog
        var printWin = window.open('', '_blank');
        if (!printWin) return toast('Popup diblokir browser. Izinkan popup untuk menyimpan invoice.');
        var styles = Array.from(document.styleSheets).map(function (ss) {
            try { return Array.from(ss.cssRules).map(function (r) { return r.cssText; }).join('\n'); }
            catch (e) { return ''; }
        }).join('\n');
        var html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Invoice TRIXIA</title>' +
            '<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">' +
            '<style>body{background:#04070E;color:#E8EDF5;font-family:DM Sans,sans-serif;margin:0;padding:32px;} ' +
            styles + '</style></head><body>' + card.outerHTML + '</body></html>';
        printWin.document.write(html);
        printWin.document.close();
        printWin.focus();
        setTimeout(function () { printWin.print(); }, 500);
    });
}

// ============================================================
//  UTILS
// ============================================================
function escHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g,'&amp;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;');
}

function toast(msg) {
    var t = document.getElementById('toast');
    t.innerText = msg;
    t.classList.add('show');
    clearTimeout(t._to);
    t._to = setTimeout(function () { t.classList.remove('show'); }, 3500);
}

// ============================================================
//  SLIDER
// ============================================================
var currentSlide = 0;
var pendingSlide = null;

// Slide 2 dan 3 memakai data-src agar banner (~90-150 KB masing-masing)
// tidak ikut request awal. src baru diisi saat slide akan ditampilkan.
function hydrateSlide(img) {
    if (!img || img.dataset.src === undefined) return;
    var src = img.dataset.src;
    delete img.dataset.src;
    img.src = src;
}

function slideReady(img) {
    return !img || !img.getAttribute('src') || img.complete;
}

function goToSlide(n) {
    var slides = document.querySelectorAll('.slide');
    var dots   = document.querySelectorAll('.dot');
    if (!slides.length) return;

    var next = (n + slides.length) % slides.length;
    if (next === currentSlide || next === pendingSlide) return;

    var target = slides[next];
    hydrateSlide(target);

    // Kalau banner belum selesai diunduh, tunggu dulu supaya tidak muncul
    // frame kosong saat transisi. Slide lama tetap terlihat sampai siap.
    if (!slideReady(target)) {
        pendingSlide = next;
        var show = function () {
            if (pendingSlide !== next) return;
            pendingSlide = null;
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = next;
            target.classList.add('active');
            dots[next].classList.add('active');
        };
        target.addEventListener('load', show, { once: true });
        target.addEventListener('error', show, { once: true });
        return;
    }

    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = next;
    target.classList.add('active');
    dots[next].classList.add('active');
}

// Slider hanya perlu jalan saat tab terlihat dan halaman dashboard aktif.
// Kalau tidak, timer tetap berjalan sia-sia dan boros CPU/baterai.
var slideTimer = null;
var SLIDE_INTERVAL = 4000;

function isDashboardVisible() {
    var dash = document.getElementById('dashboard');
    return !document.hidden && dash && dash.classList.contains('active');
}

function stopSlider() {
    if (slideTimer === null) return;
    clearInterval(slideTimer);
    slideTimer = null;
}

function startSlider() {
    if (slideTimer !== null || !isDashboardVisible()) return;
    slideTimer = setInterval(function () {
        goToSlide(currentSlide + 1);
    }, SLIDE_INTERVAL);
}

function syncSlider() {
    if (isDashboardVisible()) startSlider(); else stopSlider();
}

document.addEventListener('visibilitychange', syncSlider);

// ============================================================
//  CUSTOMER SERVICE — FLOATING BUTTON & LIVE CHAT (engine lokal, no API)
// ============================================================
var csOpen     = false;
var csChatOpen = false;
var csIsTyping = false;

function toggleCS() {
    var wrap  = document.getElementById('csFabWrap');
    var badge = document.getElementById('csBadge');
    csOpen = !csOpen;
    if (csOpen) {
        wrap.classList.add('open');
        if (badge) badge.classList.add('hidden');
    } else {
        wrap.classList.remove('open');
        closeCSChat();
    }
}

// ---- OPEN / CLOSE CHAT ----
function openCSChat() {
    var overlay = document.getElementById('csChatOverlay');
    if (!overlay) return;
    overlay.classList.add('open');
    csChatOpen = true;

    // Tampilkan greeting hanya sekali
    if (!document.querySelector('.cs-msg')) {
        var greet = 'Halo! Saya asisten TRIXIA.\n\nSaya bisa bantu kamu soal top up game, cek status pesanan, metode pembayaran, dan pertanyaan lainnya. Silakan ketik pertanyaanmu!';
        addCSMsg('bot', greet, nowTime());
        renderQuickReplies(['Cara Top Up', 'Cek Status Pesanan', 'Metode Pembayaran', 'Daftar Game']);
    }
}

function closeCSChat() {
    var overlay = document.getElementById('csChatOverlay');
    if (overlay) overlay.classList.remove('open');
    csChatOpen = false;
}

// ---- SEND ----
function sendCSMsg() {
    var input = document.getElementById('csChatInput');
    if (!input || csIsTyping) return;
    var text = input.value.trim();
    if (!text) return;
    input.value = '';
    submitCSMessage(text);
}

function submitCSMessage(text) {
    if (csIsTyping) return;
    renderQuickReplies([]);
    addCSMsg('user', text, nowTime());
    processCSMessage(text);
}

// ---- KNOWLEDGE BASE ----
var CS_MOBILE_GAMES = ['Mobile Legends','Free Fire','PUBG Mobile','Honor of Kings','Clash of Clans','League of Legends: Wild Rift','Call of Duty Mobile'];
var CS_PC_GAMES     = ['Genshin Impact','Honkai: Star Rail','Valorant','Steam Wallet','Roblox','Point Blank','Minecraft'];

var GAME_ALIASES = {
    'mobile legends':'Mobile Legends','mobile legend':'Mobile Legends','mlbb':'Mobile Legends','ml':'Mobile Legends',
    'free fire':'Free Fire','freefire':'Free Fire','ff':'Free Fire',
    'pubg mobile':'PUBG Mobile','pubgm':'PUBG Mobile','pubg':'PUBG Mobile',
    'honor of kings':'Honor of Kings','hok':'Honor of Kings',
    'clash of clans':'Clash of Clans','clash clan':'Clash of Clans','coc':'Clash of Clans',
    'league of legends wild rift':'League of Legends: Wild Rift','wild rift':'League of Legends: Wild Rift','wildrift':'League of Legends: Wild Rift',
    'call of duty mobile':'Call of Duty Mobile','call of duty':'Call of Duty Mobile','codm':'Call of Duty Mobile','cod':'Call of Duty Mobile',
    'genshin impact':'Genshin Impact','genshin':'Genshin Impact',
    'honkai star rail':'Honkai: Star Rail','star rail':'Honkai: Star Rail','honkai':'Honkai: Star Rail','hsr':'Honkai: Star Rail',
    'valorant':'Valorant','valo':'Valorant',
    'steam wallet':'Steam Wallet','steam':'Steam Wallet',
    'roblox':'Roblox',
    'point blank':'Point Blank','pb':'Point Blank',
    'minecraft':'Minecraft'
};

function escRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function findGameInText(text) {
    var aliases = Object.keys(GAME_ALIASES).sort(function(a, b) { return b.length - a.length; });
    for (var i = 0; i < aliases.length; i++) {
        var pattern = new RegExp('\\b' + escRegex(aliases[i]) + '\\b', 'i');
        if (pattern.test(text)) return GAME_ALIASES[aliases[i]];
    }
    return null;
}

// ---- INTENT-BASED REPLY ENGINE (lokal, tanpa API/server) ----
function generateCSReply(rawText) {
    var text = rawText.toLowerCase().trim();

    if (/^(halo|hai|hi|hey|p|pagi|siang|sore|malam|assalamualaikum|permisi)\b/.test(text) && text.length <= 20) {
        return {
            reply: 'Halo, selamat datang di TRIXIA! Ada yang bisa saya bantu? Kamu bisa tanya soal cara top up, harga game, metode pembayaran, atau status pesanan.',
            quick: ['Cara Top Up', 'Daftar Game', 'Metode Pembayaran']
        };
    }

    if (/terima kasih|makasih|thanks|thx/.test(text)) {
        return {
            reply: 'Sama-sama! Kalau ada pertanyaan lain seputar TRIXIA, tanya saja ya.',
            quick: ['Cara Top Up', 'Cek Status Pesanan']
        };
    }

    var game = findGameInText(text);
    if (game && PRICES[game]) {
        var rows = PRICES[game].map(function(p) { return '- ' + p; }).join('\n');
        return {
            reply: 'Berikut daftar nominal top up **' + game + '** yang tersedia:\n\n' + rows + '\n\nKamu bisa langsung pilih nominal dan checkout lewat tombol di bawah.',
            quick: [{ label: 'Top Up ' + game, action: 'game', payload: game }, 'Metode Pembayaran']
        };
    }

    if (/status|pesanan saya|order saya|no\.? order|nomor order|cek (pesanan|order)/.test(text)) {
        return {
            reply: 'Untuk cek status pesanan, buka menu **Status** di navbar, lalu masukkan No. Order 6 digit yang ada di invoice/struk kamu.\n\nAda 3 status: Pending (menunggu verifikasi admin), Diproses (sedang dikerjakan admin), dan Selesai (item sudah masuk ke akun game).',
            quick: ['Cara Top Up', 'Buka Instagram']
        };
    }

    if (/bayar|pembayaran|qris|dana|ovo|transfer/.test(text)) {
        return {
            reply: 'Metode pembayaran yang tersedia di TRIXIA:\n\n- QRIS (tinggal scan)\n- DANA: ' + PAYMENT_INFO.DANA.value + '\n- OVO: ' + PAYMENT_INFO.OVO.value + '\n\nSetelah transfer, upload bukti pembayaran di halaman checkout, lalu tunggu konfirmasi admin.',
            quick: ['Cara Top Up', 'Cek Status Pesanan']
        };
    }

    if (/cara (top ?up|order|beli|pesan)|gimana (cara|caranya)|langkah (top ?up|order)/.test(text)) {
        return {
            reply: 'Cara top up di TRIXIA:\n\n1. Pilih game di halaman Beranda\n2. Masukkan User ID (dan Server ID jika diperlukan)\n3. Pilih nominal yang diinginkan\n4. Pilih metode pembayaran (QRIS/DANA/OVO)\n5. Upload bukti transfer\n6. Tunggu konfirmasi admin\n7. Item otomatis masuk ke akun game kamu',
            quick: ['Daftar Game', 'Metode Pembayaran']
        };
    }

    if (/daftar game|game apa|ada game|list game|game tersedia|game yang ada/.test(text)) {
        return {
            reply: 'Game yang tersedia di TRIXIA:\n\n**Mobile:** ' + CS_MOBILE_GAMES.join(', ') + '\n\n**PC/Console:** ' + CS_PC_GAMES.join(', ') + '\n\nMau lihat harga salah satunya? Sebut saja nama gamenya, misalnya "harga ML" atau "harga Genshin".',
            quick: ['Cara Top Up', 'Metode Pembayaran']
        };
    }

    if (/berapa lama|lama proses|kapan masuk|proses berapa/.test(text)) {
        return {
            reply: 'Proses top up biasanya 5–15 menit setelah admin memverifikasi pembayaran, maksimal 30 menit. Layanan TRIXIA 24/7, jadi kamu bisa order kapan saja.',
            quick: ['Cek Status Pesanan', 'Cara Top Up']
        };
    }

    if (/salah.{0,15}(id|server|input|masuk)|id.{0,10}salah|refund|dikembalikan|komplain/.test(text)) {
        return {
            reply: 'Mohon pastikan User ID dan Server ID benar sebelum checkout, karena top up ke ID yang salah tidak bisa direfund atau dikembalikan. Kalau kamu sudah terlanjur salah input, langsung hubungi tim kami via Instagram untuk dibantu cek lebih lanjut.',
            quick: ['Buka Instagram']
        };
    }

    if (/aman|terpercaya|penipuan|scam/.test(text)) {
        return {
            reply: 'TRIXIA melayani top up game online dengan verifikasi manual oleh admin di setiap transaksi, dan setiap pesanan bisa kamu pantau real-time lewat menu Status. Layanan aktif 24/7.',
            quick: ['Cara Top Up', 'Cek Status Pesanan']
        };
    }

    if (/admin|instagram|hubungi|kontak|cs manusia/.test(text)) {
        return {
            reply: 'Untuk ngobrol langsung dengan tim CS kami, kamu bisa DM Instagram di @trixia.for3_. Tim kami siap bantu 24/7.',
            quick: ['Buka Instagram']
        };
    }

    return {
        reply: 'Maaf, saya belum menangkap maksud pertanyaanmu. Saya bisa bantu soal cara top up, harga & nominal game, metode pembayaran, cek status pesanan, atau kebijakan TRIXIA. Kalau butuh bantuan lebih lanjut, kamu juga bisa chat langsung tim kami via Instagram.',
        quick: ['Cara Top Up', 'Daftar Game', 'Metode Pembayaran', 'Buka Instagram']
    };
}

function csGoToGame(name) {
    var wrap = document.getElementById('csFabWrap');
    closeCSChat();
    if (wrap) wrap.classList.remove('open');
    csOpen = false;
    openGame(name);
}

// ---- AI CHAT HISTORY ----
var csChatHistory = [];

// ---- SYSTEM PROMPT untuk AI ----
var CS_SYSTEM_PROMPT = [
    'Kamu adalah asisten customer service TRIXIA, toko top up game online 24/7.',
    'Jawab dalam Bahasa Indonesia yang ramah, singkat, dan to-the-point.',
    'Jangan gunakan markdown berlebihan — gunakan teks biasa, boleh pakai bullet point sederhana jika perlu.',
    '',
    '=== INFO TRIXIA ===',
    'Metode Bayar: QRIS (scan), DANA: 085154834842, OVO: 085175431594',
    'Instagram: @trixia.for3_',
    'Proses top up: 5–15 menit setelah verifikasi admin, maks 30 menit. Layanan 24/7.',
    '',
    'Cara order:',
    '1. Pilih game di Beranda',
    '2. Masukkan User ID (dan Server ID jika perlu)',
    '3. Pilih nominal',
    '4. Pilih metode bayar (QRIS/DANA/OVO)',
    '5. Upload bukti transfer',
    '6. Tunggu konfirmasi admin',
    '7. Item masuk ke akun game',
    '',
    'Cek status: buka menu Status → masukkan No. Order 6 digit dari invoice.',
    'Status order: Pending → Diproses → Selesai.',
    '',
    'PENTING: ID salah tidak bisa direfund. Pastikan User ID & Server ID benar sebelum checkout.',
    '',
    '=== DAFTAR GAME & HARGA ===',
    'Mobile Legends: mulai Rp1.425 (5+0 💎) s/d Rp1.140.000 (4003+827 💎)',
    'Free Fire: mulai Rp1.000 (5 💎) s/d Rp10.000.000 (73.100 💎)',
    'PUBG Mobile: mulai Rp15.910 (60 UC) s/d Rp7.900.000 (40500 UC)',
    'Honor of Kings: mulai Rp1.600 s/d Rp1.599.000',
    'Clash of Clans: mulai Rp13.450 (80 Gems) s/d Rp1.333.000 (14000 Gems)',
    'Wild Rift: mulai Rp60.000 s/d Rp1.150.000',
    'Call of Duty Mobile: mulai Rp5.000 (31 CP) s/d Rp970.000',
    'Genshin Impact: mulai Rp16.500 (60 Genesis Crystals) s/d Rp1.629.000',
    'Honkai: Star Rail: mulai Rp16.000 (60 Oneiric Shard) s/d Rp1.599.000',
    'Valorant: Riot Cash mulai Rp45.000 s/d Rp739.000',
    'Steam Wallet: mulai Rp7.100 (IDR 6.000) s/d Rp589.000 (IDR 600.000)',
    'Roblox Gift Card: mulai Rp48.440 s/d Rp479.000',
    'Point Blank: mulai Rp10.000 (1200 PB Cash) s/d Rp500.000',
    'Minecraft: Minecoins 1720 Rp123.000 atau 3500 Rp248.000',
    '',
    'Kalau ditanya soal game yang tidak ada di daftar, bilang saat ini belum tersedia.',
    'Kalau ada pertanyaan yang sangat kompleks atau perlu penanganan langsung, arahkan ke Instagram @trixia.for3_.',
    'Jangan buat harga fiktif. Jika tidak tahu harga spesifik, sebutkan range atau minta cek langsung di toko.'
].join('\n');

function processCSMessage(text) {
    csIsTyping = true;
    var typingEl = showTypingIndicator();

    // Tambah ke history
    csChatHistory.push({ role: 'user', content: text });

    // Batas history 20 pesan terakhir agar tidak terlalu panjang
    if (csChatHistory.length > 20) {
        csChatHistory = csChatHistory.slice(csChatHistory.length - 20);
    }

    fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ messages: csChatHistory })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
        removeTypingIndicator(typingEl);
        csIsTyping = false;

        var reply = '';
        if (data && data.content && data.content[0] && data.content[0].text) {
            reply = data.content[0].text.trim();
        } else {
            reply = 'Maaf, saya sedang mengalami gangguan. Silakan hubungi tim kami via Instagram @trixia.for3_.';
        }

        // Simpan balasan AI ke history
        csChatHistory.push({ role: 'assistant', content: reply });

        addCSMsg('bot', reply, nowTime());

        // Quick replies kontekstual berdasarkan kata kunci
        var lc = text.toLowerCase();
        var quick = [];
        if (/halo|hai|hi|hey/.test(lc) && text.length <= 20) {
            quick = ['Cara Top Up', 'Daftar Game', 'Metode Pembayaran'];
        } else if (/cara|top up|order/.test(lc)) {
            quick = ['Daftar Game', 'Metode Pembayaran'];
        } else if (/harga|nominal|berapa/.test(lc)) {
            quick = ['Cara Top Up', 'Metode Pembayaran'];
        } else if (/bayar|qris|dana|ovo/.test(lc)) {
            quick = ['Cara Top Up', 'Cek Status Pesanan'];
        } else if (/status|pesanan|order/.test(lc)) {
            quick = ['Cara Top Up', 'Buka Instagram'];
        } else {
            quick = ['Cara Top Up', 'Daftar Game', 'Buka Instagram'];
        }
        renderQuickReplies(quick);
    })
    .catch(function(err) {
        removeTypingIndicator(typingEl);
        csIsTyping = false;
        console.error('AI CS error:', err);
        // Fallback ke engine lokal jika API gagal
        var result = generateCSReply(text);
        addCSMsg('bot', result.reply, nowTime());
        renderQuickReplies(result.quick || []);
    });
}


// ---- QUICK REPLIES ----
var QUICK_ACTIONS = {
    'Cara Top Up':        'Bagaimana cara top up di TRIXIA?',
    'Cek Status Pesanan': 'Bagaimana cara cek status pesanan saya?',
    'Metode Pembayaran':  'Apa saja metode pembayaran yang tersedia?',
    'Daftar Game':        'Game apa saja yang tersedia di TRIXIA?',
    'Buka Instagram':     null  // special: open IG
};

function renderQuickReplies(options) {
    var wrap = document.getElementById('csQuickReplies');
    if (!wrap) return;
    wrap.innerHTML = '';
    (options || []).forEach(function(opt) {
        var isObj  = typeof opt === 'object' && opt !== null;
        var label  = isObj ? opt.label : opt;
        var btn = document.createElement('button');
        btn.className = 'cs-qr-btn';
        btn.innerText = label;
        btn.onclick = function() {
            wrap.innerHTML = '';
            if (isObj && opt.action === 'game') {
                csGoToGame(opt.payload);
                return;
            }
            if (label === 'Buka Instagram') {
                window.open('https://www.instagram.com/trixia.for3_', '_blank');
                return;
            }
            var msg = QUICK_ACTIONS[label] || label;
            submitCSMessage(msg);
        };
        wrap.appendChild(btn);
    });
}

// ---- HELPERS ----
function addCSMsg(type, text, time) {
    var container = document.getElementById('csChatMessages');
    if (!container) return;

    var msgEl = document.createElement('div');
    msgEl.className = 'cs-msg ' + type;
    // Render newlines dan bold sederhana
    var html = escHtml(text)
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    msgEl.innerHTML = html;
    container.appendChild(msgEl);

    if (time) {
        var timeEl = document.createElement('div');
        timeEl.className = 'cs-msg-time' + (type === 'user' ? ' user-time' : '');
        timeEl.innerText = time;
        container.appendChild(timeEl);
    }

    container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
    var container = document.getElementById('csChatMessages');
    if (!container) return null;
    var el = document.createElement('div');
    el.className = 'cs-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    el.id = 'csTypingIndicator';
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
    return el;
}

function removeTypingIndicator(el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
}

function nowTime() {
    return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

export {
    apiRequest, loadPdfLibs, showPage, setNavActive, updateOrderTotals, openGame,
    openAccount, togglePassword, setAccountMode, toggleProfileEditor, saveProfile,
    updateAccountUI, submitAccountAuth, requestPasswordReset, submitPasswordReset,
    loadAccountOrders, logoutAccount, hideNicknameResult, showNicknameLoading,
    showNicknameFound, showNicknameNotFound, scheduleNicknameCheck, checkNickname,
    selectPayment, processCheckout, confirmAndCheckout, saveOrderToDatabase,
    trackOrder, logoutAdmin, loadAdmin, setSalesReportPeriod, setSalesReportMetric,
    loadSalesReport, formatReportCurrency, compactReportCurrency, createSalesChart,
    createUserChart, createGameChart, createReportChart, renderSalesReport,
    refreshAdminOrders, orderRenderKey, renderAdminOrderCard, updateStatus,
    hapusOrder, zoomImg, showInvoice, startInvoiceListener, updateInvoiceStatus,
    fillInvoiceUI, downloadInvoice, escHtml, toast, hydrateSlide, slideReady,
    goToSlide, isDashboardVisible, stopSlider, startSlider, syncSlider, toggleCS,
    openCSChat, closeCSChat, sendCSMsg, submitCSMessage, escRegex, findGameInText,
    generateCSReply, csGoToGame, processCSMessage, renderQuickReplies, addCSMsg,
    showTypingIndicator, removeTypingIndicator, nowTime
};
