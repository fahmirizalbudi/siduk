 
# SIDUK – Sistem Informasi Kependudukan

**SIDUK** adalah aplikasi berbasis web untuk mengelola data kependudukan secara digital. Aplikasi ini dibangun menggunakan arsitektur *frontend-backend* terpisah.

![SIDUK](https://github.com/fahmirizalbudi/siduk/blob/main/siduk.png)

---

## ✨ Fitur Utama

- ✅ Manajemen data penduduk (CRUD)
- 🏠 Data Kartu Keluarga & Anggota
- 📍 Informasi wilayah (provinsi, kabupaten, dll)
- 🔐 Autentikasi dan otorisasi pengguna
- ➕ & More

---

## 🛠️ Teknologi yang Digunakan

### Backend (`/backend`)
- PHP 8.x
- Laravel 11+
- MySQL
- Sanctum 
- Faker & Seeder

### Frontend (`/frontend`)
- React (JavaScript)

---

## 🚀 Instalasi & Setup

### 🔧 Persiapan

1. Pastikan sudah menginstal:
   - PHP 8.1+
   - Composer
   - Node.js & npm (opsional untuk frontend build)
   - MySQL/MariaDB

### 📥 Clone Repositori

```bash
git clone https://github.com/fahmirizalbudi/siduk.git
cd siduk/backend
```

### ⚙️ Backend Setup

```bash
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### 🌐 Frontend Setup

Jika frontend terpisah (misalnya dengan Vite):

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🧪 API Endpoint (Contoh)

| Method | Endpoint            | Deskripsi             |
|--------|---------------------|------------------------|
| GET    | `/api/penduduk`     | List semua penduduk   |
| POST   | `/api/penduduk`     | Tambah penduduk       |
| PUT    | `/api/penduduk/{id}`| Update data penduduk  |
| DELETE | `/api/penduduk/{id}`| Hapus data penduduk   |

Gunakan Postman atau cURL untuk uji API.

---

> Dibuat dengan ❤️ oleh [@fahmirizalbudi](https://github.com/fahmirizalbudi)
