# GeoConvert - PT LEN Geospatial Intelligence System

![GeoConvert Logo](https://img.shields.io/badge/GeoConvert-v1.0.0-E11D48?style=for-the-badge) ![Status](https://img.shields.io/badge/Status-Development-blue?style=for-the-badge) ![Tests](https://img.shields.io/badge/Tests-Passing-green?style=for-the-badge)

**GeoConvert** adalah aplikasi web modern yang dirancang untuk kebutuhan **PT LEN Industri** dalam melakukan transformasi koordinat geografis. Aplikasi ini memungkinkan pengguna untuk mengonversi **Decimal Degrees (DD)** ke **Degrees Minutes Seconds (DMS)** dan sebaliknya dengan presisi tinggi, memvisualisasikan hasilnya pada peta interaktif, serta menyimpan data ke database pusat.

## 🚀 Fitur Utama

- **Konversi Presisi**: Transformasi akurat antara format DD dan DMS sesuai standar geospasial.
- **Peta Interaktif**: Visualisasi titik koordinat menggunakan engine **OpenLayers** dengan dukungan OSM Tiles.
- **Database Persistence**: Integrasi dengan **MySQL** melalui **gRPC-Web** untuk penyimpanan data permanen.
- **Interaksi Klik Peta**: Dapatkan koordinat DD dan DMS secara otomatis hanya dengan mengklik lokasi di peta.
- **Tutorial Interaktif**: Panduan penggunaan yang terintegrasi untuk pengguna baru.
- **Tema Gelap & Terang**: Tampilan dinamis (Glassmorphism design) yang mendukung kenyamanan visual.
- **Bilingual**: Dukungan Bahasa Indonesia dan Inggris.

## 🛠️ Teknologi yang Digunakan

### Frontend
- **Framework**: React 18 (TypeScript)
- **Bundler**: Rspack (Ultra-fast build tool)
- **Styling**: Tailwind CSS & Framer Motion
- **Map Engine**: OpenLayers
- **RPC Client**: Pure gRPC-Web client

### Backend
- **Server**: Node.js (TypeScript) dengan gRPC-JS
- **Database**: MySQL
- **Protocol**: Pure gRPC & Protocol Buffers

### Testing & Tooling
- **Testing**: Jest
- **Linting**: ESLint & Prettier
- **Proto Generator**: Protoc (Native)

---

## 📋 Prasyarat Sistem

- [Node.js](https://nodejs.org/) (Versi 18 LTS atau lebih baru)
- [MySQL](https://www.mysql.com/) (Menjalankan server database lokal)
- pnpm

## 📦 Panduan Instalasi & Setup

### 1. Persiapan Database
1. Buka MySQL (misal menggunakan XAMPP atau MySQL Workbench).
2. Buat database baru bernama `geoconvert_db`.
3. Jalankan query berikut untuk membuat tabel:
```sql
CREATE TABLE saved_points (
    id INT AUTO_INCREMENT PRIMARY KEY,
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Instalasi Dependensi
```bash
# Masuk ke direktori proyek
cd PTlen

# Instal semua dependensi (Frontend & Backend)
pnpm install
```

### 3. Menjalankan Server Backend (gRPC)
Server ini menangani komunikasi ke database MySQL.
```bash
pnpm run backend
```
*Backend gRPC akan berjalan di `localhost:50051`. Peta membutuhkan gRPC-Web Proxy (seperti Envoy atau APISIX) di port `9080`.*

### 4. Menjalankan Aplikasi Frontend
Buka terminal baru:
```bash
pnpm run dev
```
*Aplikasi akan berjalan di `http://localhost:5173`*

---

## 🧪 Pengujian & Pengembangan

### Menjalankan Unit Test (Jest)
Pastikan logika matematika konversi tetap akurat:
```bash
pnpm test
```

### Update gRPC Definitions
Jika Anda mengubah file di folder `/proto`, jalankan perintah ini untuk memperbarui boilerplate kode:
```bash
pnpm run proto:gen
```

---

## 📚 Dokumentasi Teknis
Silakan merujuk ke folder `/docs` untuk detail lebih mendalam:
1.  **[Arsitektur Folder](docs/FOLDER_STRUCTURE.md)**: Organisasi kode Clean Architecture.
2.  **[Class Diagram](docs/CLASS_DIAGRAM.md)**: Struktur kelas dan relasi layanan.
3.  **[Sequence Diagram](docs/SEQUENCE_DIAGRAM.md)**: Alur komunikasi gRPC antara UI, Server, dan Database.

---
## Ringkasan Perintah
| Perintah | Fungsi |
| :--- | :--- |
| `pnpm run dev` | Menjalankan aplikasi React (Rspack Serve) |
| `pnpm run backend` | Menjalankan server Node gRPC + MySQL |
| `pnpm test` | Menjalankan semua unit test (Jest) |
| `pnpm run proto:gen` | Generate ulang kode gRPC dari .proto |
| `pnpm run build` | Membuat bundle produksi |