# Aplikasi CRUD & Autentikasi Full-Stack

Aplikasi ini adalah contoh implementasi project **Full-Stack** yang dibangun sebagai bagian dari latihan pengembangan. Fokus utama project ini adalah mengamankan API menggunakan **JSON Web Token (JWT)**.

---

## 1. Judul Aplikasi dan Deskripsi Singkat

### Aplikasi Manajemen Item Pribadi

Sebuah aplikasi *full-stack* sederhana menggunakan **React.js** di sisi *frontend* dan **Node.js/Express** di sisi *backend*.

Fungsinya mencakup operasi **CRUD** (*Create*, *Read*, *Update*, *Delete*) serta autentikasi pengguna dengan JWT. Semua data item dan pengguna disimpan secara sementara di memori server.

## 2. Fitur-fitur Proyek

### Fitur Utama

* **Autentikasi Aman:** Pengguna dapat registrasi dan login untuk mendapatkan token otorisasi.
* **Rute Terproteksi:** Semua *endpoint* CRUD pada *backend* dilindungi; akses memerlukan Token JWT yang valid.
* **Data Pribadi:** Tiap pengguna **hanya** bisa mengelola item miliknya (data difilter berdasarkan `userId`). Data *dummy* dapat dilihat oleh semua pengguna.
* **Dashboard Dinamis:** Operasi CRUD dijalankan secara interaktif lewat *modals* dan React Hooks tanpa *reload* halaman.
* **Navigasi Aman:** Menggunakan `react-router-dom` dengan komponen `PrivateRoute` agar hanya pengguna *login* yang bisa mengakses `Dashboard`.

### Teknologi yang Digunakan

| Kategori | Frontend (`latihan-frontend`) | Backend (`backend`) |
| :--- | :--- | :--- |
| **Utama** | React.js (CRA), React Bootstrap | Node.js + Express |
| **Routing** | `react-router-dom` | Express Router |
| **HTTP Client** | `axios` | `cors` |
| **Keamanan** | - | `jsonwebtoken`, `bcryptjs` |

## 3. Persyaratan Aplikasi

Sebelum menjalankan aplikasi, pastikan Anda sudah memiliki perangkat lunak berikut:

* **Node.js & npm/yarn:** Versi 14 atau lebih baru (disarankan versi terbaru).
* **Git:** Untuk mengelola kode.
* **Postman (opsional):** Untuk menguji API secara manual (Lihat Bagian 7).

## 4. Instalasi dan Cara Menjalankan

Aplikasi ini terdiri dari dua bagian terpisah: **Frontend (React)** dan **Backend (Express)**. Keduanya perlu diinstal dan dijalankan secara bersamaan.

### A. Instalasi Dependencies

1.  **Backend**
    ```bash
    cd backend
    npm install
    ```

2.  **Frontend**
    ```bash
    cd ..
    cd latihan-frontend
    npm install
    ```

### B. Menjalankan Aplikasi

Gunakan **dua terminal** berbeda:

| Terminal | Lokasi Folder | Perintah | Catatan |
| :--- | :--- | :--- | :--- |
| **Terminal 1** | `backend/` | `npm start` | Jalankan di `http://localhost:5000` |
| **Terminal 2** | `latihan-frontend/` | `npm start` | Terbuka otomatis di `http://localhost:3000` |

### C. Alur Penggunaan

1.  Akses `http://localhost:3000`.
2.  Masuk ke halaman **Login**.
3.  Klik **"Daftar di sini"** untuk membuat akun baru.
4.  Login dengan akun yang telah dibuat.
5.  Anda akan masuk ke **Dashboard** untuk melakukan operasi CRUD.

## 5. Struktur Project

Proyek menggunakan struktur sederhana dengan pemisahan antara *client* dan *server*.

## Project Structure

```bash
latihan-frontend/
├── 📂 backend/                      
│   ├── package.json            # Konfigurasi & dependencies backend
│   ├── package-lock.json
│   ├── server.js               # Entry point server Express
│   ├── data/
│   │   └── db.js               # Database
│   ├── middleware/
│   │   └── auth.js             # Verifikasi JWT
│   └── routes/
│       ├── auth.js             # Endpoint Register & Login
│       └── items.js            # Endpoint CRUD terproteksi
│
└── 📂 src/  
    ├── App.js                  # Komponen utama React yaitu routing & layout
    ├── index.js                # Entry point React
    ├── api/
    │   └── api.js              # Konfigurasi Axios selaku baseURL API
    ├── components/
    │   ├── FormModal.js        # Modal untuk tambah/edit item
    │   ├── Navbar.js           # Navigasi utama
    │   └── PrivateRoute.js     # Proteksi halaman privat
    └── pages/
    |    ├── Dashboard.js       # Halaman utama
    |    ├── Login.js           # Halaman login
    |    ├── NotFound.js        # Halaman 404
    |    └── Register.js        # Halaman registrasi                
    ├── package.json            # Konfigurasi & dependencies frontend
    ├── package-lock.json
    ├── .gitignore
    └── README.md
```
## 6. Penyusun Project

- Penyusun: Rangga Novbrian Syawal Putra Ananto

## 7. Link Dokumentasi API Postman
Link: https://documenter.getpostman.com/view/49073426/2sB3Wqu136
