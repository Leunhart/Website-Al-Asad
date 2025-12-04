# 🏹 Akademi Panahan App

<p align="center">
  <img src="./public/next.svg" alt="Next.js Logo" width="100"/>
  <img src="./public/window.svg" alt="Dashboard" width="100"/>
</p>

<p align="center">
  Sistem manajemen lengkap untuk akademi panahan dengan dashboard admin, manajemen siswa, pelatih, lomba, dan prestasi.
</p>

<p align="center">
  <a href="#fitur-utama">Fitur</a> •
  <a href="#teknologi-yang-digunakan">Teknologi</a> •
  <a href="#instalasi">Instalasi</a> •
  <a href="#penggunaan">Penggunaan</a> •
  <a href="#struktur-project">Struktur</a>
</p>

---

## 🎯 Tentang Project

Aplikasi Akademi Panahan adalah sistem manajemen komprehensif yang dirancang khusus untuk akademi panahan. Aplikasi ini menyediakan dashboard admin yang intuitif untuk mengelola berbagai aspek operasional akademi, termasuk manajemen siswa, pelatih, jadwal latihan, kompetisi, peralatan, dan pencatatan prestasi.

## 🌟 Fitur Utama

### 🔧 Admin Dashboard
- **Statistik Real-time**: Tampilan lengkap statistik akademi (jumlah siswa, pelatih, lomba, prestasi)
- **Grafik Pertumbuhan**: Visualisasi tren pertumbuhan coach dan siswa selama 6 bulan terakhir
- **Aktivitas Terbaru**: Riwayat aktivitas terkini seperti penambahan lomba, prestasi, dan siswa baru

### 👨‍🎓 Manajemen Siswa
- Pendaftaran dan profil siswa lengkap
- Status keanggotaan (aktif/inaktif)
- Riwayat pencapaian dan level keterampilan

### 🎯 Manajemen Pelatih
- Profil pelatih dengan informasi kontak
- Penugasan pelatih ke cabang akademi

### 🏆 Manajemen Lomba & Prestasi
- Pencatatan detail lomba (nama, penyelenggara, lokasi, tanggal)
- Dokumentasi prestasi dengan foto dan detail atlet

### 📅 Manajemen Jadwal
- Penjadwalan sesi latihan dengan detail waktu dan lokasi
- Pembatasan jumlah peserta per sesi

### 🛠️ Manajemen Peralatan
- Inventaris peralatan panahan
- Status kondisi peralatan

### 🏛️ Manajemen Cabang Akademi
- Manajemen multiple cabang akademi
- Informasi kontak dan alamat cabang

## 🚀 Teknologi yang Digunakan

| Kategori | Teknologi |
|---------|-----------|
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js) ![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript) |
| **Styling** | ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=flat&logo=tailwind-css) |
| **Charting** | ![Recharts](https://img.shields.io/badge/Recharts-3.5.1-blue?style=flat) |
| **Backend** | ![Supabase](https://img.shields.io/badge/Supabase-2.86.2-green?style=flat&logo=supabase) |
| **Icons** | ![Lucide React](https://img.shields.io/badge/Lucide--React-0.554.0-white?style=flat) |

## ⚙️ Instalasi

### Prasyarat
- Node.js >= 18.x
- npm, yarn, atau pnpm

### Langkah-langkah Instalasi

1. **Clone Repository**
   ```bash
   git clone https://github.com/username/panahan-app.git
   cd panahan-app
   ```

2. **Install Dependencies**
   ```bash
   # Menggunakan npm
   npm install
   
   # Atau menggunakan yarn
   yarn install
   
   # Atau menggunakan pnpm
   pnpm install
   ```

3. **Setup Environment Variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local dengan konfigurasi Supabase Anda
   ```

4. **Jalankan Development Server**
   ```bash
   npm run dev
   # atau
   yarn dev
   # atau
   pnpm dev
   ```

5. **Akses Aplikasi**
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## ▶️ Penggunaan

### Struktur URL
- `/` - Halaman utama dengan link navigasi
- `/admin/dashboard` - Dashboard admin utama
- `/admin/siswa` - Manajemen data siswa
- `/admin/lomba` - Manajemen data lomba
- `/admin/prestasi` - Manajemen data prestasi
- `/admin/jadwal` - Manajemen jadwal latihan
- `/admin/peralatan` - Manajemen inventaris peralatan
- `/admin/anggota` - Manajemen data anggota/pelatih

### Fitur Admin
1. **Dashboard Analytics**
   - Melihat statistik keseluruhan akademi
   - Memantau tren pertumbuhan siswa dan pelatih
   - Mengecek aktivitas terbaru

2. **Manajemen Data**
   - CRUD (Create, Read, Update, Delete) untuk semua entitas
   - Form validasi untuk input data
   - Pencarian dan filter data

## 📁 Struktur Project

```
panahan-app/
├── src/
│   ├── app/              # Routing dan halaman
│   │   ├── admin/        # Halaman admin
│   │   └── api/          # API routes
│   ├── actions/          # Server actions
│   ├── components/       # Komponen UI
│   │   ├── admin/        # Komponen admin
│   │   ├── forms/        # Form components
│   │   └── ui/           # UI components
│   ├── lib/              # Library dan utilities
│   └── types/            # Type definitions
├── public/               # Static assets
└── ...
```

## 🤝 Kontribusi

Kontribusi sangat kami nantikan! Untuk berkontribusi:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## 📄 Lisensi

Project ini dilisensikan di bawah lisensi MIT - lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

## 📧 Kontak

Project Link: [https://github.com/username/panahan-app](https://github.com/username/panahan-app)

---

<p align="center">
  Dibangun dengan ❤️ menggunakan Next.js dan Supabase
</p>
