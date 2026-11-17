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
function checkResetToken() {
    var hash = (typeof window !== 'undefined' ? window.location.hash : '') || '';
    var search = (typeof window !== 'undefined' ? window.location.search : '') || '';
    var token = '';

    try {
        var hashClean = hash.replace(/^[#\/]+/, '');
        var hashParams = new URLSearchParams(hashClean);
        token = hashParams.get('reset') || hashParams.get('token') || '';
        if (!token) {
            var searchParams = new URLSearchParams(search);
            token = searchParams.get('reset') || searchParams.get('token') || '';
        }
        if (!token && /^[a-f0-9]{64}$/i.test(hashClean)) {
            token = hashClean;
        }
    } catch (e) {
        console.error('Gagal membaca token reset:', e);
    }

    if (token) {
        pendingPasswordResetToken = token;
        setAccountMode('reset');
        showPage('accountPage');
        var authPanel = document.getElementById('accountAuthPanel');
        var profilePanel = document.getElementById('accountProfilePanel');
        if (authPanel) authPanel.style.display = '';
        if (profilePanel) profilePanel.style.display = 'none';
        var navAccount = document.getElementById('navAccount');
        if (navAccount) setNavActive(navAccount);
        var resetForm = document.getElementById('resetPasswordForm');
        if (resetForm) {
            resetForm.style.display = '';
            var newPass = document.getElementById('newAccountPassword');
            if (newPass) setTimeout(function() { newPass.focus(); }, 200);
        }
        return true;
    }
    return false;
}

document.addEventListener('DOMContentLoaded', function () {
    if (checkResetToken()) return;
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

    var shouldHideServer = !(cfg && cfg.needsServer);
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

    var authTabs = document.querySelector('.auth-mode-tabs');
    if (authTabs) {
        authTabs.style.display = (accountMode === 'login' || accountMode === 'register') ? '' : 'none';
    }

    var tabLogin = document.getElementById('tabAuthLogin');
    var tabReg = document.getElementById('tabAuthRegister');
    if (tabLogin) tabLogin.className = (accountMode === 'login') ? 'auth-mode-tab active' : 'auth-mode-tab';
    if (tabReg) tabReg.className = (accountMode === 'register') ? 'auth-mode-tab active' : 'auth-mode-tab';

    var authPanel = document.getElementById('accountAuthPanel');
    var profilePanel = document.getElementById('accountProfilePanel');
    if (accountMode === 'reset') {
        if (authPanel) authPanel.style.display = '';
        if (profilePanel) profilePanel.style.display = 'none';
    }

    if (nameField) nameField.style.display = registering ? '' : 'none';
    if (nameInput) nameInput.required = registering;
    if (usernameField) usernameField.style.display = registering ? '' : 'none';
    if (usernameInput) usernameInput.required = registering;
    var accountForm = document.getElementById('accountForm');
    if (accountForm) accountForm.style.display = loginOrRegister ? '' : 'none';
    var accountSwitchText = document.getElementById('accountSwitchText');
    if (accountSwitchText) accountSwitchText.style.display = loginOrRegister ? '' : 'none';
    var forgotPasswordLink = document.getElementById('forgotPasswordLink');
    if (forgotPasswordLink) forgotPasswordLink.style.display = accountMode === 'login' ? '' : 'none';
    var forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) forgotPasswordForm.style.display = accountMode === 'forgot' ? '' : 'none';
    var resetPasswordForm = document.getElementById('resetPasswordForm');
    if (resetPasswordForm) resetPasswordForm.style.display = accountMode === 'reset' ? '' : 'none';

    var accountContact = document.getElementById('accountContact');
    if (accountContact) {
        accountContact.required = loginOrRegister;
        accountContact.placeholder = registering
            ? 'Email atau nomor telepon'
            : 'Email, nomor telepon, atau username';
    }
    if (passwordInput) {
        passwordInput.required = loginOrRegister;
        passwordInput.minLength = registering ? 8 : 0;
        passwordInput.autocomplete = registering ? 'new-password' : 'current-password';
        passwordInput.placeholder = registering ? 'Password (minimal 8 karakter)' : 'Password';
    }
    var formTitle = document.getElementById('accountFormTitle');
    if (formTitle) {
        formTitle.innerText = registering
            ? 'Daftar TRIXIA'
            : (accountMode === 'forgot' ? 'Lupa Password' : (accountMode === 'reset' ? 'Password Baru' : 'Login TRIXIA'));
    }
    var formDesc = document.getElementById('accountFormDescription');
    if (formDesc) {
        formDesc.innerText = registering
            ? 'Buat akun untuk menyimpan profil dan riwayat pesanan.'
            : (accountMode === 'login'
                ? 'Login untuk melihat profil dan riwayat pesanan.'
                : (accountMode === 'forgot'
                    ? 'Kami akan mengirim tautan reset ke email yang terdaftar.'
                    : (accountMode === 'reset' ? 'Masukkan password baru untuk akun kamu.' : '')));
    }
    var submitButton = document.getElementById('accountSubmitButton');
    if (submitButton) {
        submitButton.innerHTML = registering
            ? '<span>Daftar</span> <i class="fas fa-user-plus"></i>'
            : '<span>Login</span> <i class="fas fa-sign-in-alt"></i>';
    }
    if (accountSwitchText) {
        accountSwitchText.innerHTML = registering
            ? 'Sudah punya akun? <button type="button" onclick="setAccountMode(\'login\')">Login</button>'
            : 'Belum punya akun? <button type="button" onclick="setAccountMode(\'register\')">Daftar</button>';
    }
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
        if (accountMode === 'reset') {
            authPanel.style.display = '';
            profilePanel.style.display = 'none';
        } else {
            authPanel.style.display = currentUser ? 'none' : '';
            profilePanel.style.display = currentUser ? '' : 'none';
        }
    }
    if (currentUser) {
        var elName = document.getElementById('profileName');
        if (elName) elName.innerText = currentUser.name || '-';
        var elUser = document.getElementById('profileUsername');
        if (elUser) elUser.innerText = currentUser.username || '-';
        var elEmail = document.getElementById('profileEmail');
        if (elEmail) elEmail.innerText = currentUser.email || 'Belum ditambahkan';
        var elPhone = document.getElementById('profilePhone');
        if (elPhone) elPhone.innerText = currentUser.phone || 'Belum ditambahkan';
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
    var p1 = document.getElementById('newAccountPassword');
    var p2 = document.getElementById('confirmAccountPassword');
    var password = p1 ? p1.value : '';
    var confirmation = p2 ? p2.value : '';
    if (!password || password.length < 8) return toast('Password minimal 8 karakter.');
    if (password !== confirmation) return toast('Konfirmasi password tidak sama.');
    if (!pendingPasswordResetToken) return toast('Tautan reset tidak valid. Minta tautan baru.');

    var button = document.getElementById('resetPasswordButton');
    if (button) button.disabled = true;
    apiRequest('reset-password', {
        method: 'POST',
        body: { token: pendingPasswordResetToken, password: password }
    })
        .then(function () {
            pendingPasswordResetToken = '';
            try {
                window.history.replaceState({}, document.title, window.location.pathname);
            } catch (e) {}
            if (p1) p1.value = '';
            if (p2) p2.value = '';
            setAccountMode('login');
            toast('Password berhasil diubah. Silakan login dengan password baru.');
        })
        .catch(function (err) {
            toast(err.message || 'Gagal mengubah password.');
        })
        .finally(function () {
            if (button) button.disabled = false;
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
    'Mobile Legends':               { code: 'ml',    needsServer: true,  idPlaceholder: 'User ID' },
    'Free Fire':                    { code: 'ff',    needsServer: false, idPlaceholder: 'Player ID Free Fire' },
    'PUBG Mobile':                  { code: 'pubgm', needsServer: false, idPlaceholder: 'Player ID PUBG' },
    'Call of Duty Mobile':          { code: 'codm',  needsServer: false, idPlaceholder: 'Player ID CODM' },
    'Genshin Impact':               { code: 'gi',    needsServer: false, idPlaceholder: 'UID Genshin Impact' },
    'Honkai: Star Rail':            { code: 'hsr',   needsServer: false, idPlaceholder: 'UID Honkai Star Rail' },
    'Honor of Kings':               { code: 'hok',   needsServer: true,  idPlaceholder: 'Player ID' },
    'League of Legends: Wild Rift': { code: 'lolwr', needsServer: false, idPlaceholder: 'Riot ID Wild Rift' },
    'Clash of Clans':               { code: 'coc',   needsServer: false, idPlaceholder: 'Player Tag (contoh: #2PP...)' },
    'Valorant':                     { code: 'valo',  needsServer: false, idPlaceholder: 'Riot ID (contoh: nama#1234)' },
    'Point Blank':                  { code: 'pb',    needsServer: false, idPlaceholder: 'Garena/Zepetto ID' },
    'Roblox':                       { type: 'roblox',needsServer: false, isUsername: true, idPlaceholder: 'Username Roblox' },
    'Steam Wallet':                 { type: 'manual',needsServer: false, idPlaceholder: 'Steam Account Name / ID' },
    'Minecraft':                    { type: 'manual',needsServer: false, idPlaceholder: 'Xbox Gamertag / Username' }
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
    box.innerHTML = '<span class="spinner-tiny"></span> Mengecek akun...';
}

function showNicknameFound(name, label) {
    var box = document.getElementById('nicknameResult');
    if (!box) return;
    box.style.display = 'flex';
    box.className = 'nickname-result found';
    box.innerHTML = '<i class="fas fa-check-circle"></i> ' + (label || 'Nickname: ') + '<strong>' + escHtml(name) + '</strong>';
}

function showNicknameNotFound(msg) {
    var box = document.getElementById('nicknameResult');
    if (!box) return;
    box.style.display = 'flex';
    box.className = 'nickname-result notfound';
    box.innerHTML = '<i class="fas fa-exclamation-triangle"></i> ' + escHtml(msg || 'ID tidak ditemukan, periksa kembali');
}

function showNicknameInfo(msg) {
    var box = document.getElementById('nicknameResult');
    if (!box) return;
    box.style.display = 'flex';
    box.className = 'nickname-result info';
    box.innerHTML = '<i class="fas fa-info-circle"></i> ' + escHtml(msg);
}

function scheduleNicknameCheck() {
    clearTimeout(nicknameDebounceTimer);
    nicknameDebounceTimer = setTimeout(checkNickname, 400);
}

function checkNickname() {
    var gameName = (currentOrder && currentOrder.game) || (document.getElementById('gameTitleDisplay') ? document.getElementById('gameTitleDisplay').innerText : '');
    var cfg = NICKNAME_API_GAMES[gameName];

    var uidInput = document.getElementById('mainUserId');
    var sidInput = document.getElementById('mainServerId');
    if (!uidInput) return;

    var uid = uidInput.value.trim();
    var sid = sidInput ? sidInput.value.trim() : '';

    if (!uid) {
        hideNicknameResult();
        return;
    }

    var isUsername = !!(cfg && cfg.isUsername);

    if (cfg && cfg.needsServer && !sid) {
        showNicknameNotFound('Masukkan Server ID (Zone ID) untuk memeriksa ID');
        return;
    }

    if (uid.length < 3) {
        showNicknameNotFound((isUsername ? 'Username' : 'ID') + ' terlalu pendek (minimal 3 karakter)');
        return;
    }

    // Untuk game/voucher manual tanpa auto-lookup (Steam, Minecraft, dsb)
    if (cfg && cfg.type === 'manual') {
        showNicknameInfo('Pastikan ' + (cfg.idPlaceholder || 'ID') + ' sudah benar sebelum pembayaran.');
        return;
    }

    var myToken = ++nicknameFetchToken;
    showNicknameLoading();

    var query = 'game=' + encodeURIComponent(gameName) + '&id=' + encodeURIComponent(uid);
    if (sid) query += '&server=' + encodeURIComponent(sid);

    apiRequest('validate-account', { query: query })
        .then(function (data) {
            if (myToken !== nicknameFetchToken) return;

            if (data && data.success && data.name) {
                var label = isUsername ? 'Akun Roblox: ' : 'Nickname: ';
                showNicknameFound(data.name, label);
                currentOrder.username = data.name;
            } else if (data && data.manual) {
                showNicknameInfo('Pastikan ' + (isUsername ? 'Username' : 'ID') + ' akun sudah benar.');
            } else if (data && data.offline) {
                // Tampilkan info netral jika service luar offline (jangan centang hijau palsu)
                showNicknameInfo(data.message || ('Pemeriksaan ' + (isUsername ? 'Username' : 'ID') + ' sedang offline, pastikan input sudah sesuai.'));
            } else {
                showNicknameNotFound((data && data.message) || ((isUsername ? 'Username' : 'ID') + ' tidak ditemukan, periksa kembali'));
                currentOrder.username = '';
            }
        })
        .catch(function (err) {
            if (myToken !== nicknameFetchToken) return;
            var msg = (err && err.message) || '';
            if (msg.includes('tidak ditemukan')) {
                showNicknameNotFound(msg);
                currentOrder.username = '';
            } else {
                showNicknameInfo('Pastikan ' + (isUsername ? 'Username' : 'ID') + ' akun Anda sudah sesuai.');
            }
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
    if (list) list.innerHTML = '<p style="color:var(--text-dim);text-align:center;padding:40px 0;">Memuat data...</p>';
    adminListSignature = null;
    if (adminListener) clearInterval(adminListener);
    var now = new Date();
    var localDate = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
    var rDate = document.getElementById('reportDate');
    var rMonth = document.getElementById('reportMonth');
    var rYear = document.getElementById('reportYear');
    if (rDate) rDate.value = localDate;
    if (rMonth) rMonth.value = localDate.slice(0, 7);
    if (rYear) rYear.value = String(now.getFullYear());
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
    if (document.hidden) return;

    var list = document.getElementById('adminList');
    if (!list) return;

    var archive = document.getElementById('archiveList');

    apiRequest('admin-orders')
        .then(function (result) {
            var orders = (result && result.orders) ? result.orders : [];
            var total = orders.length;
            var pending = orders.filter(function (o) { return o.status === 'Pending'; }).length;
            var processing = orders.filter(function (o) { return o.status === 'Processing'; }).length;
            var success = orders.filter(function (o) { return o.status === 'Success'; }).length;

            // Safe update helper
            var setBadge = function (id, val) {
                var el = document.getElementById(id);
                if (el) el.innerText = String(val);
            };

            setBadge('badgeTabOrders', total);
            setBadge('countFilterAll', total);
            setBadge('countFilterPending', pending);
            setBadge('countFilterProcessing', processing);
            setBadge('countFilterSuccess', success);

            setBadge('totalOrders', total);
            setBadge('pendingOrders', pending);
            setBadge('processingOrders', processing);
            setBadge('successOrders', success);
            setBadge('adminArchiveCount', success);

            var signature = JSON.stringify(orders.map(orderRenderKey));
            if (signature !== adminListSignature) {
                adminListSignature = signature;
                if (orders.length === 0) {
                    list.innerHTML = '<p class="admin-orders-empty">Belum ada pesanan masuk.</p>';
                } else {
                    list.innerHTML = orders.map(function (order) {
                        return renderAdminOrderCard(order, false);
                    }).join('');
                }
            }

            // Always apply current filter & search
            applyAdminFilters();

            if (archive) {
                var archivedOrders = orders.filter(function (order) { return order.status === 'Success'; });
                archive.innerHTML = archivedOrders.length
                    ? archivedOrders.map(function (order) { return renderAdminOrderCard(order, true); }).join('')
                    : '<p class="admin-orders-empty">Belum ada pesanan selesai.</p>';
            }
        })
        .catch(function (err) {
            if (err.status === 401) {
                if (adminListener) clearInterval(adminListener);
                adminListener = null;
                currentUser = null;
                updateAccountUI();
                setAccountMode('login');
                showPage('accountPage');
                var navAcc = document.getElementById('navAccount');
                if (navAcc) setNavActive(navAcc);
            }
            if (list) {
                list.innerHTML = '<p class="admin-orders-empty admin-orders-error">Gagal memuat pesanan: ' + escHtml(err.message || 'Terjadi kesalahan') + '</p>';
            }
            if (archive) archive.innerHTML = '';
            console.error('Gagal memuat pesanan admin:', err);
        });
}

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
            '<button class="btn-outline btn-processing" data-admin-action="process" data-order-key="' + orderKey + '" onclick="updateStatus(\'' + orderKey + '\',\'Processing\')" title="Tandai Diproses"><i class="fas fa-cog"></i> Diproses</button> ' +
            '<button class="btn-outline btn-success" data-admin-action="success" data-order-key="' + orderKey + '" onclick="updateStatus(\'' + orderKey + '\',\'Success\')" title="Tandai Berhasil"><i class="fas fa-check"></i> Selesai</button> ';
    } else if (!isArchived && order.status === 'Processing') {
        actionButtons =
            '<button class="btn-outline btn-success" data-admin-action="success" data-order-key="' + orderKey + '" onclick="updateStatus(\'' + orderKey + '\',\'Success\')" title="Tandai Berhasil"><i class="fas fa-check"></i> Selesai</button> ';
    }

    var deleteButton = isArchived
        ? ''
        : '<button class="btn-outline btn-danger" data-admin-action="delete" data-order-key="' + orderKey + '" onclick="hapusOrder(\'' + orderKey + '\')" title="Hapus"><i class="fas fa-times"></i> Hapus</button>';

    return '<div class="admin-order-card" data-status="' + escHtml(order.status) + '">' +
        '<div class="admin-order-info">' +
            '<small style="color:var(--text-dim)">No. Order <span class="mono" style="color:var(--text-mid)">#' + escHtml(String(order.orderId)) + '</span></small><br>' +
            '<b>' + escHtml(order.game) + '</b> · <span style="color:var(--text-mid)">' + escHtml(order.nominal) + '</span><br>' +
            '<small>ID: ' + escHtml(order.userId) + (order.serverId ? ' · Server: ' + escHtml(order.serverId) : '') + (order.username ? ' · Username Game: <b>' + escHtml(order.username) + '</b>' : '') + ' · ' + escHtml(order.payment) + '</small><br>' +
            (order.customerUsername ? '<small>Username TRIXIA: <b>' + escHtml(order.customerUsername) + '</b></small><br>' : '') +
            '<small>' + escHtml(order.date) + '</small><br>' +
            '<small><span class="status-badge ' + badge + '" style="margin-top:6px">' + label + '</span></small>' +
        '</div>' +
        '<div class="admin-order-actions">' +
            '<button class="btn-outline" data-admin-action="proof" data-order-key="' + orderKey + '" onclick="zoomImg(\'' + orderKey + '\')" title="' + (hasProof ? 'Lihat Bukti Transfer' : 'Belum ada bukti foto') + '">' + proofLabel + '</button> ' +
            actionButtons + deleteButton +
        '</div>' +
    '</div>';
}

function updateStatus(orderKey, stat) {
    var labels = { 'Pending': 'Pending', 'Processing': 'Diproses', 'Success': 'Berhasil' };
    apiRequest('admin-status', { body: { orderKey: orderKey, status: stat } })
        .then(function () {
            toast('Status diperbarui → ' + (labels[stat] || stat));
            refreshAdminOrders();
            loadSalesReport();
        })
        .catch(function (err) { toast('Gagal update: ' + err.message); });
}

function hapusOrder(orderKey) {
    if (!confirm('Hapus pesanan ini?')) return;
    apiRequest('admin-delete', { body: { orderKey: orderKey } })
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

function cleanPdfText(str) {
    if (!str) return '';
    return String(str)
        .replace(/💎/g, ' Diamonds')
        .replace(/🪙/g, ' Coins')
        .replace(/[—–]/g, '-')
        .replace(/•/g, '*')
        .replace(/[^\x20-\x7E]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function downloadInvoice() {
    var btn = document.querySelector('.btn-invoice-download');
    var resetBtn = function (label) {
        if (!btn) return;
        btn.innerHTML = label || '<i class="fas fa-download"></i> Simpan Struk (PDF)';
        btn.disabled = false;
    };

    resetBtn('<i class="fas fa-spinner fa-spin"></i> Menyiapkan Struk...');

    var rawOrderId = (document.getElementById('inv-orderId') ? document.getElementById('inv-orderId').innerText : '#000000').replace('#', '');
    var orderId = cleanPdfText(rawOrderId);
    var date = cleanPdfText(document.getElementById('inv-date') ? document.getElementById('inv-date').innerText : '-');
    var game = cleanPdfText(document.getElementById('inv-game') ? document.getElementById('inv-game').innerText : '-');
    var nominal = cleanPdfText(document.getElementById('inv-nominal') ? document.getElementById('inv-nominal').innerText : '-');
    var userId = cleanPdfText(document.getElementById('inv-userId') ? document.getElementById('inv-userId').innerText : '-');
    var serverId = cleanPdfText(document.getElementById('inv-serverId') ? document.getElementById('inv-serverId').innerText : '-');
    var username = cleanPdfText(document.getElementById('inv-username') ? document.getElementById('inv-username').innerText : '');
    var accountUsername = cleanPdfText(document.getElementById('inv-account-username') ? document.getElementById('inv-account-username').innerText : '');
    var payment = cleanPdfText(document.getElementById('inv-payment') ? document.getElementById('inv-payment').innerText : '-');
    var harga = cleanPdfText(document.getElementById('inv-harga') ? document.getElementById('inv-harga').innerText : '-');
    var orderKey = cleanPdfText(document.getElementById('inv-orderKey') ? document.getElementById('inv-orderKey').innerText : '-');
    var statusText = cleanPdfText((document.getElementById('inv-status-pill') ? document.getElementById('inv-status-pill').innerText : 'MENUNGGU VERIFIKASI').trim());

    loadPdfLibs().then(function (pdfLibraries) {
        var JsPDF = pdfLibraries.jsPDF;
        var doc = new JsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a5'
        });

        var pageWidth = 148;
        var margin = 12;
        var contentWidth = pageWidth - (margin * 2);

        // Header Background Banner Navy Dark
        doc.setFillColor(15, 23, 42);
        doc.rect(0, 0, pageWidth, 32, 'F');

        // Brand & Header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.setTextColor(255, 255, 255);
        doc.text('TRIXIA', margin, 14);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(199, 210, 254);
        doc.text('OFFICIAL GAMING STORE - STRUK PEMBAYARAN', margin, 21);

        doc.setFontSize(7.5);
        doc.setTextColor(148, 163, 184);
        doc.text('Instagram: @trixia.for3_  |  Layanan Top Up Game 24/7', margin, 27);

        // Receipt Card Box
        var startY = 38;
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.3);
        doc.roundedRect(margin, startY, contentWidth, 155, 3, 3, 'FD');

        // Meta Header (Order ID & Tanggal)
        var y = startY + 9;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text('NOMOR PESANAN', margin + 6, y);
        doc.text('TANGGAL', margin + contentWidth - 6, y, { align: 'right' });

        y += 5.5;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(79, 70, 229);
        doc.text('#' + orderId, margin + 6, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(51, 65, 85);
        doc.text(date, margin + contentWidth - 6, y, { align: 'right' });

        // Divider
        y += 5.5;
        doc.setDrawColor(226, 232, 240);
        doc.line(margin + 6, y, margin + contentWidth - 6, y);

        // Status Badge
        y += 7;
        doc.setFillColor(238, 242, 255);
        doc.setDrawColor(199, 210, 254);
        doc.roundedRect(margin + 6, y - 4, contentWidth - 12, 7.5, 2, 2, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(67, 56, 202);
        doc.text('STATUS: ' + statusText.toUpperCase(), margin + (contentWidth / 2), y + 1.2, { align: 'center' });

        // Detail Rows
        y += 10;
        var details = [
            ['Game', game],
            ['Item / Nominal', nominal],
            ['User ID Game', userId],
            ['Server ID', (serverId && serverId !== '-') ? serverId : '-'],
            ['Nickname Game', username || '-'],
            ['Metode Bayar', payment],
            ['Ref Order', orderKey]
        ];

        if (accountUsername && accountUsername !== '-') {
            details.splice(5, 0, ['Akun TRIXIA', accountUsername]);
        }

        doc.setFontSize(8.5);
        details.forEach(function (row, idx) {
            var rowY = y + (idx * 8);

            if (idx % 2 === 0) {
                doc.setFillColor(248, 250, 252);
                doc.rect(margin + 6, rowY - 4.5, contentWidth - 12, 8, 'F');
            }

            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 116, 139);
            doc.text(row[0], margin + 9, rowY + 1);

            doc.setFont('helvetica', 'bold');
            doc.setTextColor(30, 41, 59);
            doc.text(cleanPdfText(row[1]), margin + contentWidth - 9, rowY + 1, { align: 'right' });
        });

        // Total Bayar Box
        var totalY = y + (details.length * 8) + 4;
        doc.setFillColor(241, 245, 249);
        doc.setDrawColor(203, 213, 225);
        doc.roundedRect(margin + 6, totalY, contentWidth - 12, 15, 2, 2, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(71, 85, 105);
        doc.text('TOTAL PEMBAYARAN', margin + 10, totalY + 9.5);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(15, 23, 42);
        doc.text(harga, margin + contentWidth - 10, totalY + 10.5, { align: 'right' });

        // Footer Note
        var footerY = startY + 155 - 12;
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(7);
        doc.setTextColor(148, 163, 184);
        doc.text('* Struk ini sah sebagai bukti transaksi resmi dari TRIXIA.', margin + (contentWidth / 2), footerY, { align: 'center' });
        doc.text('Simpan No. Pesanan untuk melacak status pesanan Anda.', margin + (contentWidth / 2), footerY + 4.5, { align: 'center' });

        doc.save('Struk-TRIXIA-' + orderId + '.pdf');
        toast('Struk PDF berhasil diunduh!');
        resetBtn();
    }).catch(function (err) {
        console.error('Gagal membuat struk:', err);
        resetBtn();
        toast('Gagal mengunduh struk.');
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
    if (next === currentSlide) return;

    var target = slides[next];
    hydrateSlide(target);

    if (slides[currentSlide]) slides[currentSlide].classList.remove('active');
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

    currentSlide = next;
    pendingSlide = null;

    if (target) target.classList.add('active');
    if (dots[next]) dots[next].classList.add('active');

    // Reset interval timer agar jeda 4 detik dihitung ulang
    if (slideTimer !== null) {
        clearInterval(slideTimer);
        slideTimer = setInterval(function () {
            goToSlide(currentSlide + 1);
        }, SLIDE_INTERVAL);
    }
}

// Slider hanya perlu jalan saat tab terlihat dan halaman dashboard aktif.
// Kalau tidak, timer tetap berjalan sia-sia dan boros CPU/baterai.
var slideTimer = null;
var SLIDE_INTERVAL = 4000;

function isDashboardVisible() {
    var dash = document.getElementById('dashboard');
    return !document.hidden && (!dash || dash.classList.contains('active'));
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


if (typeof window !== 'undefined') {
    window.checkResetToken = checkResetToken;
    window.submitPasswordReset = submitPasswordReset;
    window.requestPasswordReset = requestPasswordReset;
    window.addEventListener('hashchange', checkResetToken);
    window.addEventListener('popstate', checkResetToken);
}


function handleBuktiUpload(e) {
    var file = e && e.target && e.target.files && e.target.files[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
        if (e.target) e.target.value = '';
        return toast('Gunakan gambar JPEG, PNG, WEBP, atau GIF');
    }
    if (file.size > 2 * 1024 * 1024) {
        if (e.target) e.target.value = '';
        return toast('Ukuran gambar maksimal 2MB');
    }
    var reader = new FileReader();
    reader.onload = function (evt) {
        currentOrder.bukti = evt.target.result;
        var zone = document.getElementById('uploadZone');
        if (zone) {
            zone.classList.add('uploaded');
            var p = zone.querySelector('p');
            if (p) p.innerText = 'Bukti terpilih';
            var s = zone.querySelector('span');
            if (s) s.innerText = file.name;
        }
        toast('Gambar berhasil dipilih');
    };
    reader.readAsDataURL(file);
}

function copyOrderKey() {
    var rawOrderId = (document.getElementById('invOrderKeyDisplay')?.innerText || '').replace(/[^a-f0-9]/gi, '');
    if (!rawOrderId) return toast('Kode referensi tidak ditemukan');
    if (navigator.clipboard) {
        navigator.clipboard.writeText(rawOrderId).then(function() {
            toast('Kode referensi berhasil disalin');
        }).catch(function() {
            toast('Gagal menyalin kode referensi');
        });
    } else {
        toast('Kode referensi: ' + rawOrderId);
    }
}

function toggleAdminAutoRefresh() {
    if (adminListener) {
        clearInterval(adminListener);
        adminListener = null;
        var btn = document.getElementById('btnAdminAutoRefresh');
        if (btn) btn.innerHTML = '<i class="fas fa-play"></i> Auto: OFF';
        toast('Auto-refresh dimatikan');
    } else {
        refreshAdminOrders();
        adminListener = setInterval(refreshAdminOrders, 5000);
        var btn = document.getElementById('btnAdminAutoRefresh');
        if (btn) btn.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Auto: ON';
        toast('Auto-refresh diaktifkan');
    }
}

var currentAdminStatusFilter = 'all';
var currentAdminSearchQuery = '';

function applyAdminFilters() {
    var query = (currentAdminSearchQuery || '').toLowerCase().trim();
    var filter = (currentAdminStatusFilter || 'all').toLowerCase();
    var cards = document.querySelectorAll('#adminList .admin-order-card');
    cards.forEach(function (card) {
        var cardStatus = (card.getAttribute('data-status') || '').toLowerCase();
        var cardText = card.textContent.toLowerCase();
        var matchStatus = (filter === 'all' || cardStatus === filter);
        var matchSearch = (!query || cardText.includes(query));
        card.style.display = (matchStatus && matchSearch) ? '' : 'none';
    });
}

function setAdminStatusFilter(status) {
    currentAdminStatusFilter = status || 'all';
    document.querySelectorAll('.admin-filter-chip').forEach(function (c) { c.classList.remove('active'); });
    var chip = document.getElementById('chipFilter' + (status.charAt(0).toUpperCase() + status.slice(1)));
    if (chip) chip.classList.add('active');
    applyAdminFilters();
}

function handleAdminSearch(query) {
    currentAdminSearchQuery = query || '';
    applyAdminFilters();
}

function setAdminTab(tab) {
    var ordersWrap = document.getElementById('adminTabOrdersSection');
    var reportsWrap = document.getElementById('adminTabReportsSection');
    var btnOrders = document.getElementById('tabBtnOrders');
    var btnReports = document.getElementById('tabBtnReports');
    if (tab === 'reports') {
        if (ordersWrap) ordersWrap.style.display = 'none';
        if (reportsWrap) reportsWrap.style.display = '';
        if (btnOrders) btnOrders.classList.remove('active');
        if (btnReports) btnReports.classList.add('active');
        loadSalesReport();
    } else {
        if (ordersWrap) ordersWrap.style.display = '';
        if (reportsWrap) reportsWrap.style.display = 'none';
        if (btnOrders) btnOrders.classList.add('active');
        if (btnReports) btnReports.classList.remove('active');
        refreshAdminOrders();
    }
}

if (typeof window !== 'undefined') {
    window.updateStatus = updateStatus;
    window.hapusOrder = hapusOrder;
    window.zoomImg = zoomImg;
    window.applyAdminFilters = applyAdminFilters;
    window.setAdminStatusFilter = setAdminStatusFilter;
    window.handleAdminSearch = handleAdminSearch;
    window.setAdminTab = setAdminTab;
    window.toggleAdminAutoRefresh = toggleAdminAutoRefresh;
}

document.addEventListener('click', function(e) {
    var btn = e.target.closest('[data-admin-action]');
    if (!btn) return;
    var action = btn.getAttribute('data-admin-action');
    var key = btn.getAttribute('data-order-key');
    if (action === 'process') updateStatus(key, 'Processing');
    else if (action === 'success') updateStatus(key, 'Success');
    else if (action === 'delete') hapusOrder(key);
    else if (action === 'proof') zoomImg(key);
});

export {
    handleBuktiUpload, copyOrderKey, toggleAdminAutoRefresh, setAdminTab, handleAdminSearch, setAdminStatusFilter,
    checkResetToken,
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
