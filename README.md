# Untuk Ayah — Ucapan Selamat Hari Ayah

Website personal sebagai kejutan untuk Ayah. Dibuat dengan HTML, CSS, dan JavaScript murni tanpa backend, tanpa build step, dan siap dipublikasikan melalui Vercel.

Alurnya satu pengalaman utuh: amplop di halaman pembuka terbuka dengan gerakan 3D, kertas perlahan keluar dari dalamnya, lalu kertas itu membesar dan terbuka menjadi surat penuh. Setelah kertas stabil, judul muncul bertahap, disusul kedua foto, lima paragraf pesan, dan penutup. Cahaya lembut serta butir partikel halus ikut menghidupkan kertas. Semua isi berada di dalam kertas yang sama; tidak ada halaman ucapan atau galeri terpisah. Seluruh tulisan menggunakan bahasa Indonesia.

## Struktur project

```
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   ├── foto-1.jpg
│   │   └── foto-2.jpg
│   └── music/
│       └── lagu.mp3
└── README.md
```

Folder `assets/images/` dan `assets/music/` sudah terisi dua foto dan satu lagu. Kamu tetap bisa menggantinya kapan saja dengan berkas lain.

## 1. Memasukkan foto

Hanya ada dua foto di surat ini. Letakkan keduanya di dalam folder `assets/images/`:

| Nama file | Isi foto | Posisi di kertas | Rasio yang disarankan |
| --- | --- | --- | --- |
| `foto-1.jpg` | Kamu bersama Ayah | Foto potret besar, sedikit miring ke kiri | 3 : 4 (potret) |
| `foto-2.jpg` | Adikmu bersama Ayah | Foto potret lebih kecil, bergeser ke kanan bawah | 9 : 16 (potret tegak) |

Catatan:

- Nama file harus sama persis, termasuk huruf kecil dan ekstensi `.jpg`.
- Ukuran ideal: sisi terpanjang sekitar 1600 piksel, ukuran file di bawah 500 KB agar halaman tetap ringan di ponsel.
- Foto ditampilkan utuh di dalam bingkai, tidak dipotong dan tidak diubah warnanya. Rasio 3 : 4 dan 9 : 16 membuat bingkai terisi penuh; rasio lain tetap tampil lengkap dengan alas kertas yang tenang.
- Di ponsel, kedua foto tersusun artistik dengan sedikit tumpang tindih agar tetap besar dan terbaca.
- Jika ingin memakai nama file lain, ubah atribut `src` pada dua elemen `<img>` di dalam `index.html`.
- Selama foto belum tersedia, bingkai menampilkan placeholder tenang bertuliskan “Foto akan segera hadir”. Tata letak tidak akan rusak.
- Keterangan di bawah foto (“Ayah & aku” dan “Ayah & adik”) bisa diubah pada elemen `<figcaption>`.

## 2. Mengganti lagu

Letakkan satu file musik dengan nama `lagu.mp3` di dalam folder `assets/music/`.

- Format yang paling aman adalah MP3.
- Gunakan lagu yang tenang dan volumenya tidak terlalu keras. Volume awal di halaman ini sekitar 50%.
- Musik tidak diputar otomatis sebelum ada interaksi. Saat tombol “Buka Surat” ditekan, musik langsung diputar bersamaan dengan animasi amplop, lalu berulang terus (loop).
- Tombol kontrol muncul di kanan bawah setelah file siap dimuat. Di laptop tombol menampilkan ikon dan label; di ponsel tombolnya berupa ikon musik kecil agar tidak menutupi tulisan.
- Saat diputar, ikon bergerak dan label aksesibilitas berubah menjadi “Jeda musik latar”. Tekan sekali untuk berhenti, tekan lagi untuk melanjutkan.
- Jika file belum ada atau gagal dimuat, tombol disembunyikan dan surat tetap terbuka normal tanpa pesan kesalahan.

## 3. Menjalankan website secara lokal

Cara paling mudah: klik dua kali `index.html` dan buka di browser. Website ini tidak memakai modul atau permintaan data, jadi semua bagian tetap berfungsi tanpa server.

Jika ingin server lokal, pilih salah satu:

```bash
npx serve .
```

Atau gunakan fitur **Live Server** di Visual Studio Code.

## 4. Mengunggah project ke GitHub

Buka terminal di folder project, lalu jalankan:

```bash
git init
git add .
git commit -m "Website ucapan Hari Ayah"
git branch -M main
git remote add origin https://github.com/NAMA_AKUN/NAMA_REPOSITORY.git
git push -u origin main
```

Ganti `NAMA_AKUN` dan `NAMA_REPOSITORY` sesuai akun GitHub-mu.

Pastikan foto dan lagu ikut terunggah jika ukurannya tidak melebihi batas GitHub (maksimal 100 MB per file). Untuk file musik yang besar, gunakan bitrate lebih rendah agar ringan.

## 5. Deployment melalui Vercel

### Cara pertama — melalui dashboard

1. Masuk ke [vercel.com](https://vercel.com) dan login dengan akun GitHub.
2. Pilih **Add New** lalu **Project**.
3. Pilih repository yang baru diunggah.
4. Pada bagian pengaturan:
   - **Framework Preset**: `Other`
   - **Build Command**: kosongkan
   - **Output Directory**: kosongkan atau isi `.`
5. Klik **Deploy** dan tunggu proses selesai.
6. Bagikan tautan website kepada Ayah.

### Cara kedua — melalui Vercel CLI

```bash
npm i -g vercel
vercel
```

Ikuti petunjuk di terminal. Karena website ini statis, tidak diperlukan konfigurasi tambahan.

Setiap kali ada perubahan yang di-push ke branch utama, Vercel akan memperbarui website secara otomatis.

## 6. Kustomisasi

- **Teks surat**: judul, lima paragraf pesan, dan penutup ada di dalam bagian `.letter-sheet` pada `index.html`.
- **Warna**: semua warna utama berada di bagian `:root` pada `css/style.css` (ivory, cream, mocha, champagne gold, taupe).
- **Ornamen kertas**: garis tipis, aksen gold, segel “A”, bekas lipatan, cahaya lembut, partikel, dan tekstur kertas diatur pada bagian `.letter-sheet` di `css/style.css`.
- **Kecepatan animasi**: jeda setelah kertas keluar dari amplop sebelum kertas membesar diatur pada angka `2200` milidetik di `js/script.js`. Durasi kertas membesar diatur lewat `transition` pada `.opening.is-reading .letter-sheet`.
- **Urutan kemunculan isi**: jeda judul, foto, pesan, dan penutup diatur lewat variabel `--d` serta nilai `transition-delay` pada elemen di dalam `.letter-sheet`.
- **Ukuran judul**: ubah `font-size` pada `.letter-sheet__title` bila ingin judul lebih besar atau lebih kecil.

## 7. Catatan kualitas

- Tampilan dioptimalkan untuk ponsel terlebih dahulu, lalu tablet dan laptop.
- Isi surat dapat digulir di dalam kertas bila layar lebih pendek, tanpa memindahkan amplop atau halaman.
- Tombol dan tautan dapat digunakan dengan keyboard. Setelah surat terbuka, fokus berpindah ke judul surat.
- Animasi otomatis dikurangi bila perangkat mengaktifkan pengaturan “kurangi gerak”.
- Bila JavaScript dimatikan, isi surat tetap tampil sebagai halaman biasa.
- Tidak ada backend, database, atau proses build.
