# 🚀 Panduan Setup Rspack: Fast Development Workflow
*Watching Mode, HMR, & React Refresh*

Panduan ini menjelaskan cara memasang sistem development super cepat yang digunakan di proyek **Geo-Convert** ke proyek baru.

---

## 📦 Langkah 1: Instalasi Dependencies
Buka terminal di root proyek Anda dan jalankan perintah berikut untuk menginstal Rspack dan plugin React Refresh:

```powershell
pnpm add -D @rspack/cli @rspack/core @rspack/plugin-react-refresh react-refresh
```

---

## ⚙️ Langkah 2: Konfigurasi `rspack.config.ts`
Buat file `rspack.config.ts` di root folder. Konfigurasi ini adalah "otak" yang mengaktifkan fitur pencerminan kode secara instan.

```typescript
import { defineConfig } from "@rspack/cli";
import RefreshPlugin from "@rspack/plugin-react-refresh";

const isDev = process.env.NODE_ENV === "development";

export default defineConfig({
  // 1. Mengaktifkan fitur "Watching Mode" secara internal
  devServer: {
    hot: true, // Mengaktifkan HMR (Hot Module Replacement)
  },
  
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "builtin:swc-loader", // Loader berbasis Rust yang sangat cepat
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev, // <-- Fitur: React Refresh Sinyal
                  },
                },
              },
            },
          },
        ],
      },
    ],
  },
  
  plugins: [
    // 3. Fitur: React Refresh Plugin (Ahli bedah komponen)
    isDev && new RefreshPlugin(),
  ].filter(Boolean),
});
```

---

## ⌨️ Langkah 3: Setup Perintah di `package.json`
Tambahkan script `dev` agar Anda tidak perlu mengetik perintah panjang setiap kali memulai kerja.

```json
{
  "scripts": {
    "dev": "rspack serve"
  }
}
```

---

## 🛠️ Cara Kerja 3 Fitur Utama

### 1. Rspack "Watching" Mode (Otomatis)
*   **Aktivasi:** Otomatis aktif saat menjalankan `pnpm dev`.
*   **Fungsi:** Menjaga terminal tetap terbuka dan siap memproses ulang kode hanya dalam hitungan milidetik saat Anda menekan `Ctrl + S`.

### 2. Hot Module Replacement (HMR)
*   **Aktivasi:** Diaktifkan melalui opsi `hot: true` di devServer.
*   **Fungsi:** "Menyuntikkan" perubahan kode langsung ke browser lewat WebSocket. Anda akan melihat perubahan di layar tanpa halaman berkedip atau memuat ulang (No Full Refresh).

### 3. React Refresh
*   **Aktivasi:** Diaktifkan melalui `RefreshPlugin` dan opsi `refresh: isDev` di loader.
*   **Fungsi:** Menjaga "State" aplikasi. Jika Anda sedang membuka Modal, Modal tersebut tidak akan tertutup saat Anda mengubah kodenya. Ia hanya mengganti bagian yang Anda edit saja.

---

## 💡 Tips Penggunaan
*   **Gunakan VS Code Auto Save:** Jika Anda mengaktifkan *Auto Save* di VS Code, Anda bahkan tidak perlu menekan `Ctrl + S`. Setiap huruf yang Anda ketik akan langsung tercermin di browser secara *real-time*.
*   **Cek Terminal:** Jika terjadi error koding, Watching Mode akan memberitahu Anda letak baris yang salah di terminal sebelum Anda melihatnya di browser.

---
*Dibuat untuk Geo-Convert Project - PT LEN Geospatial Systems*
