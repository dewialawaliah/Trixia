import React from 'react';
import * as legacy from './runtime.js';
import { GameCatalog } from './GameCatalog.jsx';

export default function App() {
  return (
    <>
      {"\n\n"}
      {/*  Background FX  */}
      {"\n"}
      <div className={"bg-grid"}>
      </div>
      {"\n"}
      <div className={"bg-orb orb-1"}>
      </div>
      {"\n"}
      <div className={"bg-orb orb-2"}>
      </div>
      {"\n\n"}
      <nav className={"navbar"}>
      {"\n    "}
      <div className={"nav-container"}>
      {"\n        "}
      <div className={"logo mobile-hide"} onClick={(event) => { legacy.showPage('dashboard') }}>
      {"\n            "}
      <span className={"logo-icon"}>
      {"⟁"}
      </span>
      {"\n            TRI"}
      <span className={"logo-accent"}>
      {"XIA"}
      </span>
      {"\n        "}
      </div>
      {"\n        "}
      <div className={"nav-menu"}>
      {"\n            "}
      <button className={"nav-btn active mobile-hide"} id={"navHome"} onClick={(event) => { legacy.showPage('dashboard'); legacy.setNavActive(event.currentTarget) }}>
      {"\n                "}
      <i className={"fas fa-home"}>
      </i>
      <span>
      {"Beranda"}
      </span>
      {"\n            "}
      </button>
      {"\n            "}
      <button className={"nav-btn"} id={"navStatus"} onClick={(event) => { legacy.showPage('statusPage'); legacy.setNavActive(event.currentTarget) }}>
      {"\n                "}
      <i className={"fas fa-receipt"}>
      </i>
      <span>
      {"Status"}
      </span>
      {"\n            "}
      </button>
      {"\n            "}
      <button className={"nav-btn account-nav-btn"} id={"navAccount"} onClick={(event) => { legacy.openAccount() }} aria-label={"Login atau buka profil pengguna"} title={"Login atau buka profil"}>
      {"\n                "}
      <i className={"fas fa-user-circle"}>
      </i>
      <span id={"navAccountLabel"}>
      {"Login"}
      </span>
      {"\n            "}
      </button>
      {"\n\n        "}
      </div>
      {"\n    "}
      </div>
      {"\n"}
      </nav>
      {"\n\n"}
      <main id={"mainContent"}>
      {"\n\n    "}
      {/*  DASHBOARD  */}
      {"\n    "}
      <section id={"dashboard"} className={"page active"}>
      {"\n        "}
      <div className={"container"}>
      {"\n\n            "}
      {/*  HERO SLIDER  */}
      {"\n            "}
      <div className={"hero-slider"}>
      {"\n                "}
      <div className={"slides-track"}>
      {"\n                    "}
      <img src={"Images/opt/bannerff.jpg"} className={"slide active"} alt={"Free Fire"} width={"1200"} height={"675"} fetchPriority={"high"} decoding={"async"} />
      {"\n                    "}
      <img data-src={"Images/opt/bannermlbb.jpg"} className={"slide"} alt={"Mobile Legends"} width={"1200"} height={"675"} decoding={"async"} />
      {"\n                    "}
      <img data-src={"Images/opt/bannergenshin.jpg"} className={"slide"} alt={"Genshin Impact"} width={"1200"} height={"696"} decoding={"async"} />
      {"\n                "}
      </div>
      {"\n                "}
      <div className={"slider-overlay"}>
      </div>
      {"\n                "}
      <div className={"slider-content"}>
      {"\n                    "}
      <div className={"hero-eyebrow"}>
      {"TOP UP INSTAN 24/7"}
      </div>
      {"\n                    "}
      <h1 className={"hero-title"}>
      {"LEVEL UP"}
      <br />
      <span className={"hero-accent"}>
      {"YOUR GAME"}
      </span>
      </h1>
      {"\n                    "}
      <p className={"hero-sub"}>
      {"Harga termurah, proses kilat, 100% aman"}
      </p>
      {"\n                "}
      </div>
      {"\n                "}
      <div className={"slider-dots"} id={"sliderDots"}>
      {"\n                    "}
      <button className={"dot active"} type={"button"} aria-label={"Tampilkan banner 1"} onClick={(event) => { legacy.goToSlide(0) }}>
      </button>
      {"\n                    "}
      <button className={"dot"} type={"button"} aria-label={"Tampilkan banner 2"} onClick={(event) => { legacy.goToSlide(1) }}>
      </button>
      {"\n                    "}
      <button className={"dot"} type={"button"} aria-label={"Tampilkan banner 3"} onClick={(event) => { legacy.goToSlide(2) }}>
      </button>
      {"\n                "}
      </div>
      {"\n            "}
      </div>
      {"\n\n            "}
      <div id="catalogRoot"><GameCatalog /></div>
      </div>
      {"\n\n            "}
      {/*  KEUNGGULAN  */}
      {"\n            "}
      <div className={"features-strip"}>
      {"\n                "}
      <div className={"feat"}>
      <i className={"fas fa-bolt"}>
      </i>
      <span>
      {"Proses Instan"}
      </span>
      </div>
      {"\n                "}
      <div className={"feat-divider"}>
      </div>
      {"\n                "}
      <div className={"feat"}>
      <i className={"fas fa-lock"}>
      </i>
      <span>
      {"100% Aman"}
      </span>
      </div>
      {"\n                "}
      <div className={"feat-divider"}>
      </div>
      {"\n                "}
      <div className={"feat"}>
      <i className={"fas fa-headset"}>
      </i>
      <span>
      {"CS 24/7"}
      </span>
      </div>
      {"\n                "}
      <div className={"feat-divider"}>
      </div>
      {"\n                "}
      <div className={"feat"}>
      <i className={"fas fa-tag"}>
      </i>
      <span>
      {"Harga Termurah"}
      </span>
      </div>
      {"\n            "}
      </div>
      {"\n\n        "}
      {"\n        "}
      <footer className={"site-footer"}>
      {"\n            "}
      <div className={"footer-inner"}>
      {"\n                "}
      <div className={"footer-cta"}>
      {"\n                    "}
      <div>
      {"\n                        "}
      <span className={"footer-eyebrow"}>
      {"SIAP MAIN LAGI?"}
      </span>
      {"\n                        "}
      <h2>
      {"Top up game favoritmu "}
      <span>
      {"di sini."}
      </span>
      </h2>
      {"\n                        "}
      <p>
      {"Pilih game, tentukan nominal, lalu ikuti langkah pembayaran."}
      </p>
      {"\n                    "}
      </div>
      {"\n                    "}
      <button className={"footer-cta-button"} type={"button"} onClick={(event) => { document.getElementById('gamesGrid').scrollIntoView({behavior:'smooth',block:'start'}) }}>
      {"\n                        Lihat katalog "}
      <i className={"fas fa-arrow-down"} aria-hidden={"true"}>
      </i>
      {"\n                    "}
      </button>
      {"\n                "}
      </div>
      {"\n\n                "}
      <div className={"footer-columns"}>
      {"\n                    "}
      <div className={"footer-brand"}>
      {"\n                        "}
      <button className={"footer-logo"} type={"button"} onClick={(event) => { legacy.showPage('dashboard'); legacy.setNavActive(document.getElementById('navHome')) }} aria-label={"TRIXIA, kembali ke beranda"}>
      {"\n                            "}
      <span className={"logo-icon"}>
      {"⟁"}
      </span>
      {" TRI"}
      <span>
      {"XIA"}
      </span>
      {"\n                        "}
      </button>
      {"\n                        "}
      <p>
      {"Tempat top up game dan voucher digital. Pesanan dapat dibuat sebagai tamu, tanpa harus membuat akun terlebih dahulu."}
      </p>
      {"\n                        "}
      <a className={"footer-social"} href={"https://www.instagram.com/trixia.for3_"} target={"_blank"} rel={"noopener noreferrer"}>
      {"\n                            "}
      <i className={"fab fa-instagram"} aria-hidden={"true"}>
      </i>
      {"\n                            "}
      <span>
      {"@trixia.for3_"}
      </span>
      {"\n                            "}
      <i className={"fas fa-arrow-up-right-from-square footer-external-icon"} aria-hidden={"true"}>
      </i>
      {"\n                        "}
      </a>
      {"\n                    "}
      </div>
      {"\n\n                    "}
      <nav className={"footer-links"} aria-label={"Tautan footer"}>
      {"\n                        "}
      <div className={"footer-link-group"}>
      {"\n                            "}
      <h3>
      {"Jelajahi"}
      </h3>
      {"\n                            "}
      <button type={"button"} onClick={(event) => { legacy.showPage('dashboard'); legacy.setNavActive(document.getElementById('navHome')); window.scrollTo({top:0,behavior:'smooth'}) }}>
      {"Beranda"}
      </button>
      {"\n                            "}
      <button type={"button"} onClick={(event) => { document.getElementById('gamesGrid').scrollIntoView({behavior:'smooth',block:'start'}) }}>
      {"Katalog game"}
      </button>
      {"\n                            "}
      <button type={"button"} onClick={(event) => { legacy.showPage('statusPage'); legacy.setNavActive(document.getElementById('navStatus')) }}>
      {"Cek status pesanan"}
      </button>
      {"\n                        "}
      </div>
      {"\n                        "}
      <div className={"footer-link-group"}>
      {"\n                            "}
      <h3>
      {"Akun & bantuan"}
      </h3>
      {"\n                            "}
      <button type={"button"} onClick={(event) => { legacy.openAccount() }}>
      {"Profil dan riwayat"}
      </button>
      {"\n                            "}
      <button type={"button"} onClick={(event) => { legacy.toggleCS() }}>
      {"Bantuan pelanggan"}
      </button>
      {"\n                            "}
      <button type={"button"} onClick={(event) => { legacy.openCSChat() }}>
      {"Live chat"}
      </button>
      {"\n                        "}
      </div>
      {"\n                    "}
      </nav>
      {"\n\n                    "}
      <div className={"footer-payment"}>
      {"\n                        "}
      <h3>
      {"Metode pembayaran"}
      </h3>
      {"\n                        "}
      <p>
      {"Pilih channel yang tersedia saat checkout."}
      </p>
      {"\n                        "}
      <div className={"footer-payment-badges"} aria-label={"QRIS, DANA, OVO"}>
      {"\n                            "}
      <span>
      {"QRIS"}
      </span>
      {"\n                            "}
      <span>
      {"DANA"}
      </span>
      {"\n                            "}
      <span>
      {"OVO"}
      </span>
      {"\n                        "}
      </div>
      {"\n                        "}
      <small>
      {"Pembayaran diverifikasi admin setelah bukti transfer dikirim."}
      </small>
      {"\n                    "}
      </div>
      {"\n                "}
      </div>
      {"\n\n                "}
      <div className={"footer-bottom"}>
      {"\n                    "}
      <span>
      {"© 2026 TRIXIA. Seluruh hak cipta dilindungi."}
      </span>
      {"\n                    "}
      <span className={"footer-bottom-note"}>
      <i className={"fas fa-shield-alt"} aria-hidden={"true"}>
      </i>
      {" Simpan nomor pesanan untuk cek status."}
      </span>
      {"\n                "}
      </div>
      {"\n            "}
      </div>
      {"\n        "}
      </footer>
      {"\n    "}
      </section>
      {"\n\n    "}
      {/*  GAME PAGE  */}
      {"\n    "}
      <section id={"gamePage"} className={"page"}>
      {"\n        "}
      <div className={"container game-layout-container"}>
      {"\n            "}
      <button className={"btn-back"} type={"button"} onClick={(event) => { legacy.showPage('dashboard') }}>
      {"\n                "}
      <i className={"fas fa-arrow-left"} aria-hidden={"true"}>
      </i>
      {" Kembali ke katalog\n            "}
      </button>
      {"\n            "}
      <div className={"game-layout"}>
      {"\n                "}
      <aside className={"game-aside"}>
      {"\n                    "}
      <div className={"game-aside-card"}>
      {"\n                        "}
      <div className={"game-poster"}>
      {"\n                            "}
      <img id={"gamePosterImage"} src={"Images/opt/mlbb-480.jpg"} alt={""} width={"480"} height={"480"} />
      {"\n                            "}
      <span className={"poster-overlay"}>
      </span>
      {"\n                            "}
      <span className={"poster-label"}>
      <i className={"fas fa-gamepad"} aria-hidden={"true"}>
      </i>
      {" TOP UP GAME"}
      </span>
      {"\n                        "}
      </div>
      {"\n                        "}
      <div className={"game-aside-copy"}>
      {"\n                            "}
      <span className={"game-title-tag"}>
      {"PROSES AMAN & MUDAH"}
      </span>
      {"\n                            "}
      <h2 id={"gameTitleDisplay"} className={"game-title-large"}>
      </h2>
      {"\n                            "}
      <p className={"game-publisher"}>
      {"Layanan top up game digital"}
      </p>
      {"\n                            "}
      <div className={"service-badge"}>
      {"\n                                "}
      <i className={"fas fa-bolt"} aria-hidden={"true"}>
      </i>
      {"\n                                "}
      <span>
      {"Proses cepat "}
      <b>
      {"•"}
      </b>
      {" Layanan 24/7"}
      </span>
      {"\n                            "}
      </div>
      {"\n                        "}
      </div>
      {"\n                    "}
      </div>
      {"\n                    "}
      <div className={"game-guide-card"}>
      {"\n                        "}
      <h3>
      {"Panduan top up"}
      </h3>
      {"\n                        "}
      <ol>
      {"\n                            "}
      <li>
      <span>
      {"1"}
      </span>
      <p>
      {"Masukkan data akun game dengan benar."}
      </p>
      </li>
      {"\n                            "}
      <li>
      <span>
      {"2"}
      </span>
      <p>
      {"Pilih nominal dan metode pembayaran."}
      </p>
      </li>
      {"\n                            "}
      <li>
      <span>
      {"3"}
      </span>
      <p>
      {"Bayar, unggah bukti, lalu pantau status pesanan."}
      </p>
      </li>
      {"\n                        "}
      </ol>
      {"\n                    "}
      </div>
      {"\n                "}
      </aside>
      {"\n\n                "}
      <div className={"glass-card game-order-card"}>
      {"\n                    "}
      <div className={"game-header"}>
      {"\n                        "}
      <div className={"game-title-tag"}>
      {"FORM PEMESANAN"}
      </div>
      {"\n                        "}
      <p className={"text-dim"}>
      {"Lengkapi langkah berikut untuk melanjutkan."}
      </p>
      {"\n                    "}
      </div>
      {"\n\n                    "}
      <div className={"form-wrapper"}>
      {"\n                        "}
      <div className={"input-section"}>
      {"\n                            "}
      <label className={"input-label"}>
      <span className={"step-number"}>
      {"1"}
      </span>
      {" Data akun game"}
      </label>
      {"\n                            "}
      <div className={"input-row"} id={"mainInputRow"}>
      {"\n                                "}
      <div className={"input-wrap"}>
      {"\n                                    "}
      <input type={"text"} id={"mainUserId"} placeholder={"User ID"} aria-label={"User ID game"} autoComplete={"off"} />
      {"\n                                "}
      </div>
      {"\n                                "}
      <div className={"input-wrap"} id={"mainServerIdWrap"}>
      {"\n                                    "}
      <input type={"text"} id={"mainServerId"} placeholder={"Server ID (opsional)"} aria-label={"Server ID game"} autoComplete={"off"} />
      {"\n                                "}
      </div>
      {"\n                            "}
      </div>
      {"\n                            "}
      <div className={"account-id-tools"}>
      {"\n                                "}
      <p className={"field-hint"}>
      {"Pastikan ID sesuai dengan akun tujuan top up."}
      </p>
      {"\n                                "}
      <button className={"id-guide-trigger"} type={"button"} onClick={(event) => { document.getElementById('idGuideDialog').showModal() }}>
      {"\n                                    "}
      <i className={"far fa-question-circle"} aria-hidden={"true"}>
      </i>
      {" Petunjuk ID\n                                "}
      </button>
      {"\n                            "}
      </div>
      {"\n                            "}
      <div className={"nickname-result"} id={"nicknameResult"} style={{"display": "none"}}>
      </div>
      {"\n                        "}
      </div>
      {"\n\n                        "}
      <div className={"input-section"}>
      {"\n                            "}
      <label className={"input-label"}>
      <span className={"step-number"}>
      {"2"}
      </span>
      {" Pilih nominal"}
      </label>
      {"\n                            "}
      <div id={"nominalListDisplay"} className={"nominal-grid"}>
      </div>
      {"\n                        "}
      </div>
      {"\n\n                        "}
      <div className={"input-section"}>
      {"\n                            "}
      <label className={"input-label"}>
      <span className={"step-number"}>
      {"3"}
      </span>
      {" Metode pembayaran"}
      </label>
      {"\n                            "}
      <div className={"payment-grid"}>
      {"\n                                "}
      <button className={"pay-card"} type={"button"} onClick={(event) => { legacy.selectPayment(event.currentTarget,'QRIS') }} aria-label={"Pilih QRIS"} aria-pressed={"false"}>
      {"\n                                    "}
      <span className={"pay-logo QRIS"}>
      {"QRIS"}
      </span>
      {"\n                                    "}
      <span className={"pay-channel"}>
      {"Scan semua e-wallet"}
      </span>
      {"\n                                    "}
      <strong className={"pay-card-total"} id={"paymentTotalQRIS"}>
      {"Pilih nominal"}
      </strong>
      {"\n                                "}
      </button>
      {"\n                                "}
      <button className={"pay-card"} type={"button"} onClick={(event) => { legacy.selectPayment(event.currentTarget,'DANA') }} aria-label={"Pilih DANA"} aria-pressed={"false"}>
      {"\n                                    "}
      <span className={"pay-logo DANA"}>
      {"DANA"}
      </span>
      {"\n                                    "}
      <span className={"pay-channel"}>
      {"E-wallet"}
      </span>
      {"\n                                    "}
      <strong className={"pay-card-total"} id={"paymentTotalDANA"}>
      {"Pilih nominal"}
      </strong>
      {"\n                                "}
      </button>
      {"\n                                "}
      <button className={"pay-card"} type={"button"} onClick={(event) => { legacy.selectPayment(event.currentTarget,'OVO') }} aria-label={"Pilih OVO"} aria-pressed={"false"}>
      {"\n                                    "}
      <span className={"pay-logo OVO"}>
      {"OVO"}
      </span>
      {"\n                                    "}
      <span className={"pay-channel"}>
      {"E-wallet"}
      </span>
      {"\n                                    "}
      <strong className={"pay-card-total"} id={"paymentTotalOVO"}>
      {"Pilih nominal"}
      </strong>
      {"\n                                "}
      </button>
      {"\n                            "}
      </div>
      {"\n                        "}
      </div>
      {"\n                    "}
      </div>
      {"\n\n                    "}
      <div className={"guest-login-hint"} id={"guestLoginHint"} style={{"display": "none"}}>
      {"\n                        "}
      <i className={"fas fa-user-circle"} aria-hidden={"true"}>
      </i>
      {"\n                        "}
      <span>
      {"Login agar pesanan tersimpan di riwayat profil."}
      </span>
      {"\n                        "}
      <button type={"button"} onClick={(event) => { legacy.openAccount('register', 'gamePage') }}>
      {"Buat akun"}
      </button>
      {"\n                    "}
      </div>
      {"\n\n                    "}
      <div className={"checkout-sticky"}>
      {"\n                        "}
      <div className={"checkout-summary"}>
      {"\n                            "}
      <span>
      {"Total pembayaran"}
      </span>
      {"\n                            "}
      <strong id={"selectedOrderTotal"}>
      {"Pilih nominal terlebih dahulu"}
      </strong>
      {"\n                        "}
      </div>
      {"\n                        "}
      <button className={"btn-primary"} id={"btnCheckout"} type={"button"} onClick={(event) => { legacy.processCheckout() }}>
      {"\n                            "}
      <span>
      {"Beli Sekarang"}
      </span>
      {" "}
      <span className={"checkout-button-total"} id={"checkoutButtonTotal"}>
      {"—"}
      </span>
      {"\n                        "}
      </button>
      {"\n                        "}
      <p className={"checkout-note"}>
      <i className={"fas fa-lock"} aria-hidden={"true"}>
      </i>
      {" Pembayaran diverifikasi admin setelah bukti transfer dikirim."}
      </p>
      {"\n                    "}
      </div>
      {"\n                "}
      </div>
      {"\n            "}
      </div>
      {"\n        "}
      </div>
      {"\n    "}
      </section>
      {"\n\n    "}
      <dialog className={"id-guide-dialog"} id={"idGuideDialog"} aria-labelledby={"idGuideTitle"}>
      {"\n        "}
      <div className={"id-guide-dialog-header"}>
      {"\n            "}
      <div>
      {"\n                "}
      <span className={"game-title-tag"}>
      {"BANTUAN"}
      </span>
      {"\n                "}
      <h2 id={"idGuideTitle"}>
      {"Menemukan User ID"}
      </h2>
      {"\n            "}
      </div>
      {"\n            "}
      <button className={"dialog-close"} type={"button"} aria-label={"Tutup petunjuk"} onClick={(event) => { document.getElementById('idGuideDialog').close() }}>
      {"\n                "}
      <i className={"fas fa-times"} aria-hidden={"true"}>
      </i>
      {"\n            "}
      </button>
      {"\n        "}
      </div>
      {"\n        "}
      <p>
      {"Buka profil di dalam game dan salin User ID yang tertera. Untuk game yang memakai Server ID, masukkan keduanya sesuai format akun. Periksa kembali sebelum melanjutkan."}
      </p>
      {"\n        "}
      <button className={"btn-primary"} type={"button"} onClick={(event) => { document.getElementById('idGuideDialog').close() }}>
      {"Mengerti"}
      </button>
      {"\n    "}
      </dialog>
      {"\n\n    "}
      {/*  USER ACCOUNT  */}
      {"\n    "}
      <section id={"accountPage"} className={"page"}>
      {"\n        "}
      <div className={"container small-container"}>
      {"\n            "}
      <button className={"btn-back"} onClick={(event) => { legacy.showPage('dashboard') }}>
      {"\n                "}
      <i className={"fas fa-arrow-left"}>
      </i>
      {" Kembali\n            "}
      </button>
      {"\n            "}
      <div className={"glass-card login-card"} id={"accountAuthPanel"}>
      {"\n                "}
      <div className={"login-icon"}>
      <i className={"fas fa-user-circle"}>
      </i>
      </div>
      {"\n                "}
      <h2 id={"accountFormTitle"}>
      {"Login TRIXIA"}
      </h2>
      {"\n                "}
      <p className={"text-dim"} id={"accountFormDescription"}>
      {"Login untuk melihat profil dan riwayat pesanan."}
      </p>
      {"\n                "}
      <form id={"accountForm"} onSubmit={(event) => { event.preventDefault(); legacy.submitAccountAuth() }}>
      {"\n                    "}
      <div className={"input-wrap account-field"} id={"accountNameField"} style={{"display": "none"}}>
      {"\n                        "}
      <input type={"text"} id={"accountName"} placeholder={"Nama lengkap"} maxLength={"120"} autoComplete={"name"} />
      {"\n                    "}
      </div>
      {"\n                    "}
      <div className={"input-wrap account-field"} id={"accountUsernameField"} style={{"display": "none"}}>
      {"\n                        "}
      <input type={"text"} id={"accountUsername"} placeholder={"Username (3–30 huruf, angka, atau _)"} minLength={"3"} maxLength={"30"} pattern={"[A-Za-z0-9_]{3,30}"} title={"Gunakan 3–30 huruf, angka, atau garis bawah."} autoComplete={"nickname"} />
      {"\n                    "}
      </div>
      {"\n                    "}
      <div className={"input-wrap account-field"}>
      {"\n                        "}
      <input type={"text"} id={"accountContact"} placeholder={"Email atau username"} maxLength={"254"} autoComplete={"username"} required={true} />
      {"\n                    "}
      </div>
      {"\n                    "}
      <div className={"input-wrap account-field password-field"}>
      {"\n                        "}
      <input type={"password"} id={"accountPassword"} placeholder={"Password (minimal 8 karakter)"} minLength={"8"} maxLength={"72"} autoComplete={"current-password"} required={true} />
      {"\n                        "}
      <button className={"password-toggle"} type={"button"} onClick={(event) => { legacy.togglePassword('accountPassword', event.currentTarget) }} aria-label={"Tampilkan password"} title={"Tampilkan password"}>
      {"\n                            "}
      <i className={"fas fa-eye"}>
      </i>
      {"\n                        "}
      </button>
      {"\n                    "}
      </div>
      {"\n                    "}
      <button className={"btn-primary"} id={"accountSubmitButton"} type={"submit"}>
      {"\n                        "}
      <span>
      {"Login"}
      </span>
      {" "}
      <i className={"fas fa-sign-in-alt"}>
      </i>
      {"\n                    "}
      </button>
      {"\n                "}
      </form>
      {"\n                "}
      <p className={"account-switch"} id={"accountSwitchText"}>
      {"\n                    Belum punya akun?\n                    "}
      <button type={"button"} onClick={(event) => { legacy.setAccountMode('register') }}>
      {"Daftar"}
      </button>
      {"\n                "}
      </p>
      {"\n                "}
      <p className={"account-switch"} id={"forgotPasswordLink"}>
      {"\n                    "}
      <button type={"button"} onClick={(event) => { legacy.setAccountMode('forgot') }}>
      {"Lupa password?"}
      </button>
      {"\n                "}
      </p>
      {"\n                "}
      <form id={"forgotPasswordForm"} onSubmit={(event) => { event.preventDefault(); legacy.requestPasswordReset() }} style={{"display": "none"}}>
      {"\n                    "}
      <p className={"text-dim"}>
      {"Masukkan email yang terdaftar. Kami akan mengirim tautan untuk membuat password baru."}
      </p>
      {"\n                    "}
      <div className={"input-wrap account-field"}>
      {"\n                        "}
      <input type={"email"} id={"forgotPasswordEmail"} placeholder={"Email terdaftar"} maxLength={"254"} autoComplete={"email"} required={true} />
      {"\n                    "}
      </div>
      {"\n                    "}
      <button className={"btn-primary"} id={"forgotPasswordButton"} type={"submit"}>
      {"\n                        "}
      <span>
      {"Kirim tautan reset"}
      </span>
      {" "}
      <i className={"fas fa-envelope"}>
      </i>
      {"\n                    "}
      </button>
      {"\n                    "}
      <p className={"account-switch"}>
      <button type={"button"} onClick={(event) => { legacy.setAccountMode('login') }}>
      {"Kembali ke login"}
      </button>
      </p>
      {"\n                "}
      </form>
      {"\n                "}
      <form id={"resetPasswordForm"} onSubmit={(event) => { event.preventDefault(); legacy.submitPasswordReset() }} style={{"display": "none"}}>
      {"\n                    "}
      <p className={"text-dim"}>
      {"Buat password baru untuk akun TRIXIA kamu."}
      </p>
      {"\n                    "}
      <div className={"input-wrap account-field"}>
      {"\n                        "}
      <input type={"password"} id={"newAccountPassword"} placeholder={"Password baru (minimal 8 karakter)"} minLength={"8"} maxLength={"72"} autoComplete={"new-password"} required={true} />
      {"\n                    "}
      </div>
      {"\n                    "}
      <div className={"input-wrap account-field"}>
      {"\n                        "}
      <input type={"password"} id={"confirmAccountPassword"} placeholder={"Ulangi password baru"} minLength={"8"} maxLength={"72"} autoComplete={"new-password"} required={true} />
      {"\n                    "}
      </div>
      {"\n                    "}
      <button className={"btn-primary"} id={"resetPasswordButton"} type={"submit"}>
      {"\n                        "}
      <span>
      {"Simpan password baru"}
      </span>
      {" "}
      <i className={"fas fa-lock"}>
      </i>
      {"\n                    "}
      </button>
      {"\n                "}
      </form>
      {"\n            "}
      </div>
      {"\n\n            "}
      <div className={"glass-card account-profile"} id={"accountProfilePanel"} style={{"display": "none"}}>
      {"\n                "}
      <div className={"page-title-wrap"}>
      {"\n                    "}
      <div className={"page-icon"}>
      <i className={"fas fa-user-circle"}>
      </i>
      </div>
      {"\n                    "}
      <div>
      {"\n                        "}
      <h2>
      {"Profil Pengguna"}
      </h2>
      {"\n                        "}
      <p className={"text-dim"}>
      {"Informasi akun TRIXIA kamu"}
      </p>
      {"\n                    "}
      </div>
      {"\n                "}
      </div>
      {"\n                "}
      <div className={"account-details"}>
      {"\n                    "}
      <div>
      <span>
      {"Nama"}
      </span>
      <strong id={"profileName"}>
      {"-"}
      </strong>
      </div>
      {"\n                    "}
      <div>
      <span>
      {"Username"}
      </span>
      <strong id={"profileUsername"}>
      {"-"}
      </strong>
      </div>
      {"\n                    "}
      <div>
      <span>
      {"Email"}
      </span>
      <strong id={"profileEmail"}>
      {"-"}
      </strong>
      </div>
      {"\n                "}
      </div>
      {"\n                "}
      <button className={"btn-outline account-edit-toggle"} id={"accountEditToggle"} onClick={(event) => { legacy.toggleProfileEditor(true) }}>
      {"\n                    "}
      <i className={"fas fa-pen"}>
      </i>
      {" Edit profil\n                "}
      </button>
      {"\n                "}
      <form id={"profileEditForm"} onSubmit={(event) => { event.preventDefault(); legacy.saveProfile() }} style={{"display": "none"}}>
      {"\n                    "}
      <div className={"input-wrap account-field"}>
      {"\n                        "}
      <input type={"text"} id={"editProfileName"} placeholder={"Nama lengkap"} maxLength={"120"} autoComplete={"name"} required={true} />
      {"\n                    "}
      </div>
      {"\n                    "}
      <div className={"input-wrap account-field"}>
      {"\n                        "}
      <input type={"text"} id={"editProfileUsername"} placeholder={"Username (3–30 huruf, angka, atau _)"} minLength={"3"} maxLength={"30"} pattern={"[A-Za-z0-9_]{3,30}"} title={"Gunakan 3–30 huruf, angka, atau garis bawah."} autoComplete={"nickname"} required={true} />
      {"\n                    "}
      </div>
      {"\n                    "}
      <div className={"input-wrap account-field"}>
      {"\n                        "}
      <input type={"email"} id={"editProfileEmail"} placeholder={"Email (opsional)"} maxLength={"254"} autoComplete={"email"} />
      {"\n                    "}
      </div>
      {"\n                    "}
      <p className={"account-form-note"}>
      {"Username harus unik; username admintrixia khusus Admin. Isi email dan Konfirmasi dengan password saat ini."}
      </p>
      {"\n                    "}
      <div className={"input-wrap account-field"}>
      {"\n                        "}
      <input type={"password"} id={"editProfilePassword"} placeholder={"Password saat ini"} maxLength={"72"} autoComplete={"current-password"} required={true} />
      {"\n                    "}
      </div>
      {"\n                    "}
      <div className={"account-form-actions"}>
      {"\n                        "}
      <button className={"btn-primary"} id={"saveProfileButton"} type={"submit"}>
      {"\n                            "}
      <span>
      {"Simpan perubahan"}
      </span>
      {" "}
      <i className={"fas fa-check"}>
      </i>
      {"\n                        "}
      </button>
      {"\n                        "}
      <button className={"btn-outline"} type={"button"} onClick={(event) => { legacy.toggleProfileEditor(false) }}>
      {"Batal"}
      </button>
      {"\n                    "}
      </div>
      {"\n                "}
      </form>
      {"\n                "}
      <div className={"account-orders-heading"}>
      {"\n                    "}
      <h3>
      {"Riwayat Pesanan"}
      </h3>
      {"\n                    "}
      <button className={"btn-outline"} onClick={(event) => { legacy.loadAccountOrders() }}>
      <i className={"fas fa-sync-alt"}>
      </i>
      {" Muat ulang"}
      </button>
      {"\n                "}
      </div>
      {"\n                "}
      <div id={"accountOrders"}>
      </div>
      {"\n                "}
      <button className={"btn-outline account-logout"} onClick={(event) => { legacy.logoutAccount() }}>
      {"\n                    "}
      <i className={"fas fa-sign-out-alt"}>
      </i>
      {" Keluar dari akun\n                "}
      </button>
      {"\n            "}
      </div>
      {"\n        "}
      </div>
      {"\n    "}
      </section>
      {"\n\n    "}
      {/*  STATUS PAGE  */}
      {"\n    "}
      <section id={"statusPage"} className={"page"}>
      {"\n        "}
      <div className={"container small-container"}>
      {"\n            "}
      <div className={"glass-card"}>
      {"\n                "}
      <div className={"page-title-wrap"}>
      {"\n                    "}
      <div className={"page-icon"}>
      <i className={"fas fa-receipt"}>
      </i>
      </div>
      {"\n                    "}
      <div>
      {"\n                        "}
      <h2>
      {"Cek Status Pesanan"}
      </h2>
      {"\n                        "}
      <p className={"text-dim"}>
      {"Masukkan No. Order kamu"}
      </p>
      {"\n                    "}
      </div>
      {"\n                "}
      </div>
      {"\n                "}
      <div className={"search-bar-wrap"}>
      {"\n                    "}
      <input type={"text"} id={"trackInput"} placeholder={"Contoh: 482910"} maxLength={"6"} inputMode={"numeric"} />
      {"\n                    "}
      <button className={"btn-primary-sm"} onClick={(event) => { legacy.trackOrder() }}>
      <i className={"fas fa-search"}>
      </i>
      </button>
      {"\n                "}
      </div>
      {"\n                "}
      <div id={"statusResult"}>
      </div>
      {"\n            "}
      </div>
      {"\n        "}
      </div>
      {"\n    "}
      </section>
      {"\n\n    "}
      {/*  PAYMENT PAGE  */}
      {"\n    "}
      <section id={"paymentPage"} className={"page"}>
      {"\n        "}
      <div className={"container small-container"}>
      {"\n            "}
      <div className={"glass-card"}>
      {"\n                "}
      <div className={"payment-header"}>
      {"\n                    "}
      <div className={"pay-status-icon"}>
      <i className={"fas fa-credit-card"}>
      </i>
      </div>
      {"\n                    "}
      <h2>
      {"Konfirmasi Pembayaran"}
      </h2>
      {"\n                    "}
      <p className={"text-dim"}>
      {"Bayar ke: "}
      <span className={"accent-text"} id={"payMethodDisplay"}>
      </span>
      </p>
      {"\n                "}
      </div>
      {"\n\n                "}
      <div className={"qr-wrapper"}>
      {"\n                    "}
      <div className={"qr-box"}>
      <img id={"qrImgDisplay"} alt={"QR Code"} width={"1422"} height={"1422"} decoding={"async"} />
      </div>
      {"\n                    "}
      <p className={"qr-hint"}>
      {"Scan QR atau transfer manual"}
      </p>
      {"\n                "}
      </div>
      {"\n\n                "}
      <div className={"upload-zone"} onClick={(event) => { document.getElementById('buktiInput').click() }} id={"uploadZone"}>
      {"\n                    "}
      <i className={"fas fa-cloud-upload-alt upload-icon"}>
      </i>
      {"\n                    "}
      <p>
      {"Upload bukti transfer"}
      </p>
      {"\n                    "}
      <span>
      {"Klik untuk memilih gambar"}
      </span>
      {"\n                    "}
      <input type={"file"} id={"buktiInput"} hidden={true} accept={"image/jpeg,image/png,image/webp,image/gif"} />
      {"\n                "}
      </div>
      {"\n\n                "}
      <button className={"btn-primary"} onClick={(event) => { legacy.saveOrderToDatabase() }}>
      {"\n                    "}
      <span>
      {"Verifikasi Pembayaran"}
      </span>
      {" "}
      <i className={"fas fa-check"}>
      </i>
      {"\n                "}
      </button>
      {"\n            "}
      </div>
      {"\n        "}
      </div>
      {"\n    "}
      </section>
      {"\n\n    "}
      {/*  ADMIN PAGE  */}
      {"\n    "}
      <section id={"adminPage"} className={"page"}>
      {"\n        "}
      <div className={"container"}>
      {"\n            "}
      <div className={"admin-header"}>
      {"\n                "}
      <div>
      {"\n                    "}
      <h2>
      {"Dashboard Admin"}
      </h2>
      {"\n                    "}
      <p className={"text-dim"}>
      {"Kelola semua transaksi"}
      </p>
      {"\n                "}
      </div>
      {"\n                "}
      <button className={"btn-outline"} onClick={(event) => { legacy.logoutAdmin() }}>
      <i className={"fas fa-sign-out-alt"}>
      </i>
      {" Keluar"}
      </button>
      {"\n            "}
      </div>
      {"\n\n            "}
      <div className={"admin-stats"}>
      {"\n                "}
      <div className={"stat-card"}>
      {"\n                    "}
      <div className={"stat-icon"}>
      <i className={"fas fa-box"}>
      </i>
      </div>
      {"\n                    "}
      <div className={"stat-info"}>
      {"\n                        "}
      <span className={"stat-num"} id={"totalOrders"}>
      {"0"}
      </span>
      {"\n                        "}
      <span className={"stat-label"}>
      {"Total Pesanan"}
      </span>
      {"\n                    "}
      </div>
      {"\n                "}
      </div>
      {"\n                "}
      <div className={"stat-card warning"}>
      {"\n                    "}
      <div className={"stat-icon"}>
      <i className={"fas fa-clock"}>
      </i>
      </div>
      {"\n                    "}
      <div className={"stat-info"}>
      {"\n                        "}
      <span className={"stat-num"} id={"pendingOrders"}>
      {"0"}
      </span>
      {"\n                        "}
      <span className={"stat-label"}>
      {"Pending"}
      </span>
      {"\n                    "}
      </div>
      {"\n                "}
      </div>
      {"\n                "}
      <div className={"stat-card processing"}>
      {"\n                    "}
      <div className={"stat-icon"}>
      <i className={"fas fa-cog fa-spin"}>
      </i>
      </div>
      {"\n                    "}
      <div className={"stat-info"}>
      {"\n                        "}
      <span className={"stat-num"} id={"processingOrders"}>
      {"0"}
      </span>
      {"\n                        "}
      <span className={"stat-label"}>
      {"Diproses"}
      </span>
      {"\n                    "}
      </div>
      {"\n                "}
      </div>
      {"\n                "}
      <div className={"stat-card success"}>
      {"\n                    "}
      <div className={"stat-icon"}>
      <i className={"fas fa-check-circle"}>
      </i>
      </div>
      {"\n                    "}
      <div className={"stat-info"}>
      {"\n                        "}
      <span className={"stat-num"} id={"successOrders"}>
      {"0"}
      </span>
      {"\n                        "}
      <span className={"stat-label"}>
      {"Berhasil"}
      </span>
      {"\n                    "}
      </div>
      {"\n                "}
      </div>
      {"\n            "}
      </div>
      {"\n\n            "}
      <section className={"admin-orders"} aria-labelledby={"activeOrdersTitle"}>
      {"\n                "}
      <div className={"admin-orders-header"}>
      {"\n                    "}
      <div>
      {"\n                        "}
      <h3 id={"activeOrdersTitle"}>
      {"Pesanan Masuk"}
      </h3>
      {"\n                        "}
      <p>
      {"Pesanan yang masih menunggu atau sedang diproses."}
      </p>
      {"\n                    "}
      </div>
      {"\n                "}
      </div>
      {"\n                "}
      <div id={"adminList"} aria-live={"polite"}>
      </div>
      {"\n            "}
      </section>
      {"\n\n            "}
      <details className={"admin-order-archive"}>
      {"\n                "}
      <summary>
      {"\n                    "}
      <span>
      <i className={"fas fa-box-archive"}>
      </i>
      {" Arsip Pesanan Selesai"}
      </span>
      {"\n                    "}
      <span className={"archive-count"} id={"adminArchiveCount"}>
      {"0"}
      </span>
      {"\n                "}
      </summary>
      {"\n                "}
      <div id={"archiveList"} aria-live={"polite"}>
      {"\n                    "}
      <p className={"admin-orders-empty"}>
      {"Belum ada pesanan selesai."}
      </p>
      {"\n                "}
      </div>
      {"\n            "}
      </details>
      {"\n\n            "}
      <section className={"sales-report"} aria-labelledby={"salesReportTitle"}>
      {"\n                "}
      <div className={"sales-report-header"}>
      {"\n                    "}
      <div>
      {"\n                        "}
      <h3 id={"salesReportTitle"}>
      {"Laporan TRIXIA"}
      </h3>
      {"\n                        "}
      <p>
      {"Pilih grafik pemasukan, pengguna, atau performa per game untuk periode terpilih."}
      </p>
      {"\n                    "}
      </div>
      {"\n                    "}
      <button className={"btn-outline"} type={"button"} onClick={(event) => { legacy.loadSalesReport() }}>
      {"\n                        "}
      <i className={"fas fa-sync-alt"}>
      </i>
      {" Perbarui\n                    "}
      </button>
      {"\n                "}
      </div>
      {"\n\n                "}
      <div className={"report-controls"}>
      {"\n                    "}
      <div className={"report-period-tabs"} role={"tablist"} aria-label={"Periode laporan"}>
      {"\n                        "}
      <button className={"report-period-btn active"} type={"button"} role={"tab"} aria-selected={"true"} data-period={"daily"} onClick={(event) => { legacy.setSalesReportPeriod('daily', event.currentTarget) }}>
      {"Harian"}
      </button>
      {"\n                        "}
      <button className={"report-period-btn"} type={"button"} role={"tab"} aria-selected={"false"} data-period={"monthly"} onClick={(event) => { legacy.setSalesReportPeriod('monthly', event.currentTarget) }}>
      {"Bulanan"}
      </button>
      {"\n                        "}
      <button className={"report-period-btn"} type={"button"} role={"tab"} aria-selected={"false"} data-period={"yearly"} onClick={(event) => { legacy.setSalesReportPeriod('yearly', event.currentTarget) }}>
      {"Tahunan"}
      </button>
      {"\n                    "}
      </div>
      {"\n                    "}
      <form id={"salesReportFilter"} className={"report-filter"} onSubmit={(event) => { event.preventDefault(); legacy.loadSalesReport() }}>
      {"\n                        "}
      <label id={"reportDailyFilter"}>
      {"Tanggal\n                            "}
      <input type={"date"} id={"reportDate"} />
      {"\n                        "}
      </label>
      {"\n                        "}
      <label id={"reportMonthlyFilter"} style={{"display": "none"}}>
      {"Bulan\n                            "}
      <input type={"month"} id={"reportMonth"} />
      {"\n                        "}
      </label>
      {"\n                        "}
      <label id={"reportYearlyFilter"} style={{"display": "none"}}>
      {"Tahun\n                            "}
      <input type={"number"} id={"reportYear"} min={"2000"} max={"2100"} step={"1"} />
      {"\n                        "}
      </label>
      {"\n                        "}
      <button className={"btn-primary-sm report-apply"} type={"submit"} aria-label={"Terapkan filter laporan"} title={"Terapkan filter"}>
      {"\n                            "}
      <i className={"fas fa-filter"}>
      </i>
      {"\n                        "}
      </button>
      {"\n                    "}
      </form>
      {"\n                "}
      </div>
      {"\n\n                "}
      <div className={"report-metric-tabs"} role={"tablist"} aria-label={"Jenis grafik laporan"}>
      {"\n                    "}
      <button className={"report-metric-btn active"} type={"button"} role={"tab"} aria-selected={"true"} data-metric={"revenue"} onClick={(event) => { legacy.setSalesReportMetric('revenue', event.currentTarget) }}>
      {"\n                        "}
      <i className={"fas fa-coins"}>
      </i>
      {" Pemasukan\n                    "}
      </button>
      {"\n                    "}
      <button className={"report-metric-btn"} type={"button"} role={"tab"} aria-selected={"false"} data-metric={"users"} onClick={(event) => { legacy.setSalesReportMetric('users', event.currentTarget) }}>
      {"\n                        "}
      <i className={"fas fa-users"}>
      </i>
      {" Pengguna\n                    "}
      </button>
      {"\n                    "}
      <button className={"report-metric-btn"} type={"button"} role={"tab"} aria-selected={"false"} data-metric={"games"} onClick={(event) => { legacy.setSalesReportMetric('games', event.currentTarget) }}>
      {"\n                        "}
      <i className={"fas fa-gamepad"}>
      </i>
      {" Per Game\n                    "}
      </button>
      {"\n                "}
      </div>
      {"\n\n                "}
      <div id={"salesReportContent"} aria-live={"polite"}>
      {"\n                    "}
      <p className={"report-message"}>
      {"Pilih periode untuk memuat laporan."}
      </p>
      {"\n                "}
      </div>
      {"\n            "}
      </section>
      {"\n        "}
      </div>
      {"\n    "}
      </section>
      {"\n\n    "}
      {/*  INVOICE PAGE  */}
      {"\n    "}
      <section id={"invoicePage"} className={"page"}>
      {"\n        "}
      <div className={"container small-container"}>
      {"\n            "}
      <div className={"glass-card"} id={"invoiceCard"}>
      {"\n                "}
      {/*  Invoice Header  */}
      {"\n                "}
      <div className={"invoice-header"}>
      {"\n                    "}
      <div className={"invoice-brand"}>
      {"\n                        "}
      <span className={"logo-icon"} style={{"fontSize": "28px", "color": "var(--accent)"}}>
      {"⬠"}
      </span>
      {"\n                        "}
      <span className={"invoice-brand-name"}>
      {"TRI"}
      <span style={{"color": "var(--accent)"}}>
      {"XIA"}
      </span>
      </span>
      {"\n                    "}
      </div>
      {"\n                    "}
      <div className={"invoice-badge"}>
      {"\n                        "}
      <i className={"fas fa-check-circle"}>
      </i>
      {" PEMBAYARAN DIKIRIM\n                    "}
      </div>
      {"\n                "}
      </div>
      {"\n\n                "}
      <div className={"invoice-divider"}>
      </div>
      {"\n\n                "}
      {/*  Order ID & Date  */}
      {"\n                "}
      <div className={"invoice-meta"}>
      {"\n                    "}
      <div>
      {"\n                        "}
      <p className={"inv-label"}>
      {"No. Order"}
      </p>
      {"\n                        "}
      <p className={"inv-value mono"} id={"inv-orderId"}>
      {"#000000"}
      </p>
      {"\n                    "}
      </div>
      {"\n                    "}
      <div style={{"textAlign": "right"}}>
      {"\n                        "}
      <p className={"inv-label"}>
      {"Tanggal"}
      </p>
      {"\n                        "}
      <p className={"inv-value"} id={"inv-date"}>
      {"-"}
      </p>
      {"\n                    "}
      </div>
      {"\n                "}
      </div>
      {"\n\n                "}
      <div className={"invoice-divider"}>
      </div>
      {"\n\n                "}
      {/*  Detail Rows  */}
      {"\n                "}
      <div className={"invoice-rows"}>
      {"\n                    "}
      <div className={"inv-row"}>
      {"\n                        "}
      <span className={"inv-row-label"}>
      <i className={"fas fa-gamepad"}>
      </i>
      {" Game"}
      </span>
      {"\n                        "}
      <span className={"inv-row-val"} id={"inv-game"}>
      {"-"}
      </span>
      {"\n                    "}
      </div>
      {"\n                    "}
      <div className={"inv-row"}>
      {"\n                        "}
      <span className={"inv-row-label"}>
      <i className={"fas fa-coins"}>
      </i>
      {" Nominal"}
      </span>
      {"\n                        "}
      <span className={"inv-row-val"} id={"inv-nominal"}>
      {"-"}
      </span>
      {"\n                    "}
      </div>
      {"\n                    "}
      <div className={"inv-row"} id={"inv-username-row"} style={{"display": "none"}}>
      {"\n                        "}
      <span className={"inv-row-label"}>
      <i className={"fas fa-id-badge"}>
      </i>
      {" Username Game"}
      </span>
      {"\n                        "}
      <span className={"inv-row-val"} id={"inv-username"}>
      {"-"}
      </span>
      {"\n                    "}
      </div>
      {"\n                    "}
      <div className={"inv-row"} id={"inv-account-username-row"} style={{"display": "none"}}>
      {"\n                        "}
      <span className={"inv-row-label"}>
      <i className={"fas fa-user-tag"}>
      </i>
      {" Username TRIXIA"}
      </span>
      {"\n                        "}
      <span className={"inv-row-val"} id={"inv-account-username"}>
      {"-"}
      </span>
      {"\n                    "}
      </div>
      {"\n                    "}
      <div className={"inv-row"}>
      {"\n                        "}
      <span className={"inv-row-label"}>
      <i className={"fas fa-user"}>
      </i>
      {" User ID"}
      </span>
      {"\n                        "}
      <span className={"inv-row-val mono"} id={"inv-userId"}>
      {"-"}
      </span>
      {"\n                    "}
      </div>
      {"\n                    "}
      <div className={"inv-row"}>
      {"\n                        "}
      <span className={"inv-row-label"}>
      <i className={"fas fa-server"}>
      </i>
      {" Server ID"}
      </span>
      {"\n                        "}
      <span className={"inv-row-val mono"} id={"inv-serverId"}>
      {"-"}
      </span>
      {"\n                    "}
      </div>
      {"\n                    "}
      <div className={"inv-row"}>
      {"\n                        "}
      <span className={"inv-row-label"}>
      <i className={"fas fa-wallet"}>
      </i>
      {" Metode Bayar"}
      </span>
      {"\n                        "}
      <span className={"inv-row-val"} id={"inv-payment"}>
      {"-"}
      </span>
      {"\n                    "}
      </div>
      {"\n                "}
      </div>
      {"\n\n                "}
      <div className={"invoice-divider"}>
      </div>
      {"\n\n                "}
      {/*  Total  */}
      {"\n                "}
      <div className={"invoice-total"}>
      {"\n                    "}
      <span>
      {"Total Pembayaran"}
      </span>
      {"\n                    "}
      <span className={"inv-total-amount"} id={"inv-harga"}>
      {"-"}
      </span>
      {"\n                "}
      </div>
      {"\n\n                "}
      <div className={"invoice-divider"}>
      </div>
      {"\n\n                "}
      {/*  Status & Reference  */}
      {"\n                "}
      <div className={"invoice-status-row"}>
      {"\n                    "}
      <div className={"invoice-status-pill"} id={"inv-status-pill"}>
      {"\n                        "}
      <span className={"pulse-dot"} id={"inv-status-dot"}>
      </span>
      {" Menunggu Verifikasi Admin\n                    "}
      </div>
      {"\n                    "}
      <p className={"inv-ref"}>
      {"Ref: "}
      <span className={"mono"} id={"inv-orderKey"} style={{"fontSize": "10px", "color": "var(--text-dim)"}}>
      {"-"}
      </span>
      </p>
      {"\n                "}
      </div>
      {"\n\n                "}
      {/*  Banner sukses (tersembunyi dulu)  */}
      {"\n                "}
      <div className={"invoice-success-banner"} id={"inv-success-banner"} style={{"display": "none"}}>
      {"\n                    "}
      <i className={"fas fa-check-circle"}>
      </i>
      {"\n                    "}
      <span>
      {"Pembayaran kamu telah "}
      <strong>
      {"dikonfirmasi"}
      </strong>
      {" oleh admin!"}
      </span>
      {"\n                "}
      </div>
      {"\n\n                "}
      <p className={"invoice-note"} id={"inv-note"}>
      {"\n                    ⏳ Top up akan diproses setelah admin memverifikasi pembayaran kamu."}
      <br />
      {"\n                    Simpan No. Order untuk cek status di menu "}
      <strong>
      {"Status"}
      </strong>
      {".\n                "}
      </p>
      {"\n            "}
      </div>
      {"\n\n            "}
      {/*  Action Buttons  */}
      {"\n            "}
      <div className={"invoice-actions"}>
      {"\n                "}
      <button className={"btn-invoice-download"} onClick={(event) => { legacy.downloadInvoice() }}>
      {"\n                    "}
      <i className={"fas fa-download"}>
      </i>
      {" Simpan Invoice\n                "}
      </button>
      {"\n                "}
      <button className={"btn-invoice-home"} onClick={(event) => { legacy.showPage('dashboard'); legacy.setNavActive(document.getElementById('navHome')) }}>
      {"\n                    "}
      <i className={"fas fa-home"}>
      </i>
      {" Kembali ke Beranda\n                "}
      </button>
      {"\n            "}
      </div>
      {"\n        "}
      </div>
      {"\n    "}
      </section>
      {"\n\n"}
      </main>
      {"\n\n"}
      {/*  MODALS & TOAST  */}
      {"\n"}
      <div id={"imageModal"} className={"modal"} onClick={(event) => { event.currentTarget.style.display='none' }}>
      {"\n    "}
      <div className={"modal-inner"}>
      {"\n        "}
      <img className={"modal-content"} id={"imgFull"} alt={"Bukti"} />
      {"\n        "}
      <p className={"modal-hint"}>
      {"Klik untuk tutup"}
      </p>
      {"\n    "}
      </div>
      {"\n"}
      </div>
      {"\n\n\n"}
      <div id={"toast"} className={"toast"}>
      </div>
      {"\n\n"}
      {/*  ===== CUSTOMER SERVICE FLOATING BUTTON =====  */}
      {"\n"}
      <div className={"cs-fab-wrap"} id={"csFabWrap"}>
      {"\n    "}
      {/*  Sub buttons  */}
      {"\n    "}
      <div className={"cs-sub-btns"} id={"csSubBtns"}>
      {"\n        "}
      <a className={"cs-sub-btn cs-ig"} href={"https://www.instagram.com/trixia.for3_"} target={"_blank"} rel={"noopener"} aria-label={"Instagram"}>
      {"\n            "}
      <i className={"fab fa-instagram"}>
      </i>
      {"\n            "}
      <span className={"cs-tooltip"}>
      {"Instagram DM"}
      </span>
      {"\n        "}
      </a>
      {"\n        "}
      <button className={"cs-sub-btn cs-chat"} onClick={(event) => { legacy.openCSChat() }} aria-label={"Live Chat"}>
      {"\n            "}
      <i className={"fas fa-comment-dots"}>
      </i>
      {"\n            "}
      <span className={"cs-tooltip"}>
      {"Live Chat"}
      </span>
      {"\n        "}
      </button>
      {"\n    "}
      </div>
      {"\n    "}
      {/*  Main FAB  */}
      {"\n    "}
      <button className={"cs-fab"} id={"csFab"} onClick={(event) => { legacy.toggleCS() }} aria-label={"Customer Service"}>
      {"\n        "}
      <i className={"fas fa-headset cs-icon-main"}>
      </i>
      {"\n        "}
      <i className={"fas fa-times cs-icon-close"}>
      </i>
      {"\n        "}
      <span className={"cs-badge"} id={"csBadge"}>
      {"1"}
      </span>
      {"\n    "}
      </button>
      {"\n    "}
      <span className={"cs-label"}>
      {"CS 24/7"}
      </span>
      {"\n"}
      </div>
      {"\n\n"}
      {/*  ===== LIVE CHAT MODAL =====  */}
      {"\n"}
      <div className={"cs-chat-overlay"} id={"csChatOverlay"} onClick={(event) => { if(event.target===event.currentTarget) legacy.closeCSChat() }}>
      {"\n    "}
      <div className={"cs-chat-box"} id={"csChatBox"}>
      {"\n        "}
      <div className={"cs-chat-header"}>
      {"\n            "}
      <div className={"cs-chat-avatar"}>
      <i className={"fas fa-robot"}>
      </i>
      </div>
      {"\n            "}
      <div className={"cs-chat-hinfo"}>
      {"\n                "}
      <span className={"cs-chat-name"}>
      {"Asisten TRIXIA "}
      <span className={"cs-ai-badge"}>
      {"AI"}
      </span>
      </span>
      {"\n                "}
      <span className={"cs-chat-status"}>
      <span className={"cs-online-dot"}>
      </span>
      {" Online 24/7 — Powered by AI"}
      </span>
      {"\n            "}
      </div>
      {"\n            "}
      <button className={"cs-chat-close"} onClick={(event) => { legacy.closeCSChat() }}>
      <i className={"fas fa-times"}>
      </i>
      </button>
      {"\n        "}
      </div>
      {"\n        "}
      <div className={"cs-chat-messages"} id={"csChatMessages"}>
      {"\n            "}
      {/*  Messages injected by JS  */}
      {"\n        "}
      </div>
      {"\n        "}
      <div className={"cs-quick-replies"} id={"csQuickReplies"}>
      </div>
      {"\n        "}
      <div className={"cs-chat-input-row"}>
      {"\n            "}
      <input type={"text"} id={"csChatInput"} placeholder={"Ketik pesan..."} autoComplete={"off"} onKeyDown={(event) => { if(event.key==='Enter') legacy.sendCSMsg() }} />
      {"\n            "}
      <button className={"cs-send-btn"} onClick={(event) => { legacy.sendCSMsg() }}>
      <i className={"fas fa-paper-plane"}>
      </i>
      </button>
      {"\n        "}
      </div>
      {"\n    "}
      </div>
      {"\n"}
      </div>
      {"\n\n"}
      {/*  script.js menunda pemuatan html2canvas + jsPDF sampai invoice benar-benar diunduh  */}
      {"\n"}
      {"\n"}
      {"\n"}
      {"\n"}
    </>
  );
}
