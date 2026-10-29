import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './runtime.js';
import '../style.css';

window.TRIXIA_VITE_DEV = import.meta.env.DEV;

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Elemen aplikasi #root tidak ditemukan.');
}

createRoot(rootElement).render(<App />);
