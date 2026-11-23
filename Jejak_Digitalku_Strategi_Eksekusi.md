# Jejak Digitalku: Simulasi Dampak Unggahan Media Sosial

> Capstone Project Literasi Digital: penjelasan lengkap dan strategi eksekusi

---

## Daftar Isi

1. [Ringkasan Proyek](#1-ringkasan-proyek)
2. [Latar Belakang dan Masalah](#2-latar-belakang-dan-masalah)
3. [Tujuan dan Indikator Keberhasilan](#3-tujuan-dan-indikator-keberhasilan)
4. [Target Pengguna](#4-target-pengguna)
5. [Konsep Produk](#5-konsep-produk)
6. [Alur Pengguna (User Flow)](#6-alur-pengguna-user-flow)
7. [Desain Skenario dan Sistem Skor](#7-desain-skenario-dan-sistem-skor)
8. [Fitur](#8-fitur)
9. [Rancangan Teknis](#9-rancangan-teknis)
10. [Pembagian Peran 5 Anggota](#10-pembagian-peran-5-anggota)
11. [Strategi Eksekusi per Tahap](#11-strategi-eksekusi-per-tahap)
12. [Contoh Jadwal Kerja](#12-contoh-jadwal-kerja)
13. [Strategi Pengujian](#13-strategi-pengujian)
14. [Strategi Mengukur Dampak](#14-strategi-mengukur-dampak)
15. [Etika dan Perlindungan Data](#15-etika-dan-perlindungan-data)
16. [Manajemen Risiko](#16-manajemen-risiko)
17. [Strategi Kolaborasi Tim](#17-strategi-kolaborasi-tim)
18. [Strategi Presentasi dan Demo](#18-strategi-presentasi-dan-demo)
19. [Checklist Luaran](#19-checklist-luaran)
20. [Lampiran](#20-lampiran)

---

## 1. Ringkasan Proyek

**Jejak Digitalku** adalah simulasi interaktif berbasis web. Siswa memerankan pemilik akun media sosial fiktif, lalu memilih unggahan atau komentar dalam berbagai situasi. Setelah memilih, siswa melihat **konsekuensi berantai** dari pilihannya, seperti data pribadi yang bocor, reputasi yang turun, atau teman yang tersakiti.

Siswa belajar etika digital dan privasi lewat **pengalaman simulasi yang aman**, tanpa harus mengalami kerugian di dunia nyata.

| Aspek | Keterangan |
|---|---|
| Tema | Literasi digital: etika digital dan privasi |
| Bentuk | Website interaktif (cerita bercabang plus gamifikasi ringan) |
| Pengguna | Siswa SMP/SMA (disarankan dipersempit ke satu jenjang) |
| Pembeda | Siswa merasakan konsekuensi, bukan hanya membaca teori |
| Bukti dampak | Skor pre-test dan post-test, kuesioner kegunaan |

> **Catatan:** Ini bukan game penuh. Bentuknya lebih dekat ke **visual novel atau cerita interaktif** dengan skor dan lencana, sehingga realistis dikerjakan dalam waktu proyek akhir.

---

## 2. Latar Belakang dan Masalah

Remaja menggunakan media sosial hampir setiap hari, tetapi sering tidak menyadari bahwa:

- Unggahan bersifat **permanen**. Tangkapan layar bisa menyebar walau sudah dihapus.
- **Data pribadi** (lokasi, nama sekolah, nomor HP, wajah) bisa disalahgunakan, misalnya untuk penipuan, doxing, atau pelacakan.
- **Komentar kasar** bisa berubah menjadi cyberbullying yang melukai korban dan merusak reputasi pelaku.
- **Hoaks dan pesan berantai** mudah dibagikan tanpa dicek.

Materi literasi digital yang disampaikan lewat ceramah atau teks sering terasa menggurui dan sulit diingat. Simulasi yang menunjukkan **sebab-akibat** lebih mudah dipahami karena siswa mengalaminya sendiri.

**Rumusan masalah (bisa dipakai di laporan):**
1. Bagaimana merancang simulasi interaktif yang menggambarkan dampak unggahan media sosial secara nyata namun aman?
2. Apakah simulasi tersebut meningkatkan pemahaman siswa tentang etika digital dan privasi?
3. Bagaimana tingkat kegunaan (usability) dan penerimaan siswa terhadap simulasi tersebut?

---

## 3. Tujuan dan Indikator Keberhasilan

### Tujuan
1. Membangun simulasi interaktif "Jejak Digitalku" yang berfungsi dengan baik.
2. Meningkatkan pemahaman siswa tentang privasi dan etika bermedia sosial.
3. Mengukur dampak simulasi terhadap pemahaman dan sikap siswa.

### Indikator keberhasilan (target contoh, sesuaikan dengan dosen)

| Indikator | Target contoh | Cara ukur |
|---|---|---|
| Peningkatan pemahaman | Rata-rata skor post-test lebih tinggi dari pre-test | Pre-test dan post-test |
| Kegunaan sistem | Skor SUS ≥ 68 (cukup baik) | Kuesioner SUS |
| Keberfungsian | Semua alur utama berjalan tanpa error kritis | Uji fungsional |
| Keterlibatan | Mayoritas siswa menyelesaikan seluruh skenario | Data penyelesaian |
| Kepuasan | Mayoritas siswa menilai simulasi menarik dan mudah dipahami | Kuesioner kepuasan |

---

## 4. Target Pengguna

### Pengguna utama
**Siswa SMP/SMA.** Pilih satu jenjang agar bahasa, kasus, dan tingkat kesulitan sesuai (contoh: kelas 8 SMP).

### Pengguna pendukung
**Guru** (BK, TIK, atau wali kelas) yang memakai simulasi sebagai alat bantu pembelajaran dan ingin melihat hasil siswa.

### Kebutuhan pengguna (hipotesis awal, validasi lewat wawancara)
- Tampilan akrab, mirip media sosial yang mereka pakai.
- Bahasa santai, tidak menggurui.
- Bisa dibuka lewat HP dan koneksi biasa.
- Hasil yang jelas dan bisa dibanggakan (skor, lencana).

---

## 5. Konsep Produk

### Gambaran pengalaman
Siswa membuka website, membuat profil fiktif, lalu menjalani beberapa skenario seperti membagikan foto, merespons komentar, atau menanggapi giveaway. Setiap pilihan memicu **reaksi dan konsekuensi** yang ditampilkan seperti notifikasi atau DM, lalu diakhiri **penjelasan edukatif**.

### Prinsip desain
1. **Belajar dari konsekuensi.** Tunjukkan akibat, jangan hanya melarang.
2. **Aman dan fiktif.** Semua karakter dan kasus fiktif.
3. **Tidak menghakimi.** Pilihan "berisiko" tetap diberi penjelasan yang membangun.
4. **Singkat.** Satu skenario selesai dalam 2-3 menit.
5. **Bisa diulang.** Siswa boleh mencoba pilihan lain untuk membandingkan hasilnya.

### Tema materi
| Tema | Contoh isi |
|---|---|
| Privasi data | Lokasi, nama sekolah, nomor HP, foto KTP/seragam |
| Cyberbullying dan komentar | Mengejek, membela korban, melaporkan |
| Jejak digital | Unggahan emosional, tangkapan layar yang menyebar |
| Hoaks dan penipuan | Giveaway palsu, pesan berantai, link mencurigakan |

---

## 6. Alur Pengguna (User Flow)

```
[Halaman Awal]
      │
      ▼
[Pre-test] ──► skor awal tersimpan
      │
      ▼
[Buat Profil Fiktif]  (nama, avatar, sekolah fiktif, akun publik/privat)
      │
      ▼
[Pilih Tema / Mulai Skenario]
      │
      ▼
┌─► [Skenario muncul]  (situasi + pilihan unggahan/komentar)
│         │
│         ▼
│   [Siswa memilih aksi]
│         │
│         ▼
│   [Konsekuensi ditampilkan]  (reaksi netizen, DM, notifikasi, skor berubah)
│         │
│         ▼
│   [Refleksi]  (kenapa berisiko/aman + alternatif lebih baik)
│         │
└─────────┘  (ulangi untuk skenario berikutnya)
      │
      ▼
[Rapor Digital]  (skor total, kekuatan, kelemahan, tips)
      │
      ▼
[Post-test] ──► skor akhir tersimpan
      │
      ▼
[Kuesioner Kegunaan & Kepuasan]
```

### Detail tiap langkah
1. **Pre-test:** 10-15 soal pilihan ganda untuk mengukur pemahaman awal.
2. **Profil fiktif:** siswa memilih avatar dan pengaturan akun, yang bisa memengaruhi hasil simulasi (akun publik lebih mudah dijangkau orang asing).
3. **Skenario:** situasi singkat dengan 2-4 pilihan.
4. **Konsekuensi:** hasil bertahap, bisa berupa efek langsung (reaksi cepat) dan efek lanjutan (beberapa jam atau hari kemudian dalam cerita).
5. **Refleksi:** penjelasan edukatif singkat dan tips praktis.
6. **Rapor digital:** ringkasan performa dan rekomendasi.
7. **Post-test:** soal setara pre-test.
8. **Kuesioner:** SUS plus pertanyaan kepuasan.

---

## 7. Desain Skenario dan Sistem Skor

### 7.1 Sistem skor

Tiga indikator, masing-masing mulai dari 100:

| Indikator | Arti | Turun jika... |
|---|---|---|
| **Privasi** | Seberapa aman data pribadi karakter | Membagikan lokasi, nomor HP, info sekolah |
| **Reputasi** | Citra karakter di mata teman dan publik | Berkomentar kasar, mengunggah hal memalukan |
| **Keamanan** | Risiko terhadap penipuan dan peretasan | Mengklik link palsu, membagikan kode OTP |

**Aturan sederhana (contoh):**
- Pilihan aman: skor tetap atau naik (+0 sampai +10).
- Pilihan cukup berisiko: skor turun (-10 sampai -20).
- Pilihan sangat berisiko: skor turun besar (-25 sampai -40).
- Jika salah satu indikator mencapai 0, muncul "krisis" dan siswa diberi kesempatan memulihkan keadaan (opsional).

**Rapor akhir:** total skor dibagi kategori, misalnya *Pemula Digital*, *Pengguna Waspada*, dan *Warga Digital Bijak*.

### 7.2 Daftar skenario (target 8-10)

| No | Tema | Situasi | Pilihan berisiko | Pilihan aman |
|---|---|---|---|---|
| 1 | Privasi | Foto seragam baru | Unggah dengan lokasi dan nama sekolah jelas | Sensor info sekolah, matikan lokasi |
| 2 | Privasi | Giveaway meminta data | Kirim nomor HP dan alamat | Cek akun penyelenggara, jangan kirim data sensitif |
| 3 | Cyberbullying | Teman mengunggah foto kurang bagus | Komentar mengejek | Tegur lewat DM atau diam dan laporkan |
| 4 | Jejak digital | Sedang marah pada seseorang | Unggah curhat emosional | Tunda, simpan di draf, bicara langsung |
| 5 | Penipuan | DM "kamu menang hadiah" | Klik link dan isi data | Abaikan, blokir, laporkan |
| 6 | Hoaks | Pesan berantai heboh | Langsung sebar ke grup | Cek sumber sebelum membagikan |
| 7 | Privasi | Teman minta kode OTP "untuk bantu" | Berikan kode | Tolak, hubungi teman lewat jalur lain |
| 8 | Cyberbullying | Teman jadi korban perundungan | Ikut menertawakan | Bela korban, simpan bukti, laporkan ke guru |
| 9 | Jejak digital | Akun lama berisi unggahan memalukan | Biarkan saja | Tinjau dan hapus unggahan lama |
| 10 | Privasi | Mengunggah foto bersama teman | Unggah tanpa izin | Minta izin sebelum menandai atau mengunggah |

> Semua nama, akun, dan kasus harus **fiktif**. Jangan memakai kasus atau orang nyata.

### 7.3 Struktur tiap skenario (template untuk tim konten)

```
ID Skenario     : S01
Tema            : Privasi data
Situasi         : (2-3 kalimat latar cerita)
Pilihan A       : (aksi) → Konsekuensi: (...) → Perubahan skor: Privasi -20, Reputasi 0, Keamanan -10
Pilihan B       : (aksi) → Konsekuensi: (...) → Perubahan skor: ...
Pilihan C       : (aksi) → Konsekuensi: (...) → Perubahan skor: ...
Refleksi        : (penjelasan edukatif 2-3 kalimat)
Tips praktis    : (1-2 langkah yang bisa dilakukan siswa)
Sumber rujukan  : (referensi pendukung)
```

---

## 8. Fitur

### 8.1 Fitur inti (wajib / MVP)
- [ ] Halaman awal dan petunjuk singkat
- [ ] Pre-test dan post-test
- [ ] Pembuatan profil fiktif (nama, avatar, pengaturan akun)
- [ ] 8-10 skenario bercabang dengan konsekuensi
- [ ] Sistem skor (privasi, reputasi, keamanan)
- [ ] Refleksi edukatif setelah tiap skenario
- [ ] Rapor digital akhir
- [ ] Penyimpanan hasil (agar bisa dianalisis)
- [ ] Kuesioner kegunaan dan kepuasan

### 8.2 Fitur tambahan (jika waktu cukup)
- [ ] Lencana (badge) pencapaian
- [ ] Mode ulangi dan bandingkan dua pilihan
- [ ] Dashboard guru (rekap hasil kelas)
- [ ] Animasi notifikasi ala media sosial
- [ ] Mode "krisis" untuk memulihkan reputasi

> **Aturan emas:** selesaikan fitur inti terlebih dahulu. Jangan menambah fitur tambahan sebelum fitur inti diuji.

---

## 9. Rancangan Teknis

### 9.1 Pilihan teknologi (sesuaikan dengan skill tim)

| Level | Teknologi | Cocok jika |
|---|---|---|
| **Mudah** | Twine, Genially, Google Sites plus Google Forms | Tim minim coding, fokus pada konten |
| **Menengah (disarankan)** | HTML, CSS, JavaScript; data skenario berupa JSON; hasil dikirim ke Google Sheets/Forms | Ada 1-2 anggota yang bisa coding web |
| **Lanjutan** | React/Vue plus Node.js/Laravel plus database (MySQL/Firebase) | Ingin dashboard guru dan penyimpanan terpusat |

### 9.2 Arsitektur sederhana (level menengah)

```
[Siswa / Browser HP]
        │
        ▼
[Frontend Web: HTML/CSS/JS]
   ├── Modul Pre/Post-test
   ├── Mesin Skenario (membaca skenario.json)
   ├── Mesin Skor
   └── Rapor Digital
        │
        ▼
[Penyimpanan Hasil]
   (Google Sheets via Apps Script / Firebase)
        │
        ▼
[Analisis Data oleh Tim: Excel / SPSS / Python]
```

### 9.3 Contoh struktur data skenario (JSON)

```json
{
  "id": "S01",
  "tema": "privasi",
  "situasi": "Kamu punya seragam sekolah baru dan ingin memamerkannya.",
  "pilihan": [
    {
      "teks": "Unggah foto dengan lokasi dan nama sekolah",
      "konsekuensi": "Akun asing mulai mengikuti dan menanyakan jam pulangmu.",
      "skor": { "privasi": -25, "reputasi": 0, "keamanan": -15 }
    },
    {
      "teks": "Unggah foto, tutup nama sekolah dan matikan lokasi",
      "konsekuensi": "Teman-temanmu memberi komentar positif.",
      "skor": { "privasi": 5, "reputasi": 5, "keamanan": 5 }
    }
  ],
  "refleksi": "Info kecil seperti nama sekolah dan lokasi bisa dirangkai orang asing untuk melacak rutinitasmu."
}
```

### 9.3 Data yang disimpan (minimal, anonim)

| Data | Keterangan |
|---|---|
| Kode peserta | Anonim (misalnya P001), bukan nama asli |
| Skor pre-test | Angka |
| Pilihan di tiap skenario | Untuk analisis pola |
| Skor akhir (privasi, reputasi, keamanan) | Angka |
| Skor post-test | Angka |
| Jawaban kuesioner SUS dan kepuasan | Angka dan teks |

### 9.4 Kebutuhan non-fungsional
- **Responsif:** nyaman di layar HP.
- **Ringan:** bisa jalan di koneksi lambat.
- **Aman:** tidak mengumpulkan data pribadi sungguhan.
- **Mudah diakses:** cukup lewat tautan, tanpa instalasi.

---

## 10. Pembagian Peran 5 Anggota

Sesuai ketentuan, tiap anggota memegang **satu peran utama** dan tetap terlibat dalam **pengujian dan dokumentasi**. Cocokkan dengan tabel peran resmi di halaman tugas.

| # | Peran Utama | Tanggung jawab inti | Peran di pengujian & dokumentasi |
|---|---|---|---|
| 1 | **Ketua / Project Manager** | Jadwal, koordinasi tim, komunikasi dengan dosen dan sekolah mitra, kontrol kualitas | Mengatur jadwal uji, menyusun laporan akhir |
| 2 | **Penyusun Konten dan Skenario** | Riset materi, menulis skenario, konsekuensi, refleksi, soal pre/post-test | Memvalidasi isi bersama guru, mendokumentasikan sumber |
| 3 | **Developer** | Membangun website, mesin skenario, mesin skor, penyimpanan data | Memperbaiki bug, mendokumentasikan arsitektur |
| 4 | **Desainer UI/UX** | Wireframe, desain tampilan, avatar, ilustrasi, kemudahan penggunaan | Memimpin uji kegunaan, dokumentasi visual |
| 5 | **Peneliti dan Penguji** | Kuesioner, instrumen tes, pengumpulan dan analisis data, koordinasi responden | Menjalankan uji coba, menyusun hasil dan analisis |

### Aturan kerja
- Setiap peran punya **satu penanggung jawab** dan **satu cadangan** (misalnya developer dibantu desainer untuk front-end).
- Pekerjaan pengujian dan dokumentasi **dibagi rata** (misalnya tiap anggota mendokumentasikan bagiannya sendiri).
- Tiap anggota mencatat **kontribusi mingguan** untuk bukti keterlibatan.

---

## 11. Strategi Eksekusi per Tahap

### Tahap 0: Persiapan awal (Minggu 1)
**Tujuan:** Kelompok resmi dan ide disetujui.

- [ ] Finalisasi 5 anggota dan peran
- [ ] Isi link pengisian data kelompok dan judul project
- [ ] Daftarkan ke dosen dan minta persetujuan ide (**batas paling lambat Minggu ke-9**; lebih cepat lebih baik karena satu ide hanya boleh diambil satu kelompok per kelas)
- [ ] Buat grup koordinasi, folder bersama (Drive), dan papan tugas (Trello atau Notion)
- [ ] Siapkan 1-2 judul cadangan

**Keluaran:** Persetujuan dosen, struktur tim, dan ruang kerja bersama.

### Tahap 1: Riset dan analisis kebutuhan (Minggu 1-2)
**Tujuan:** Memastikan produk menjawab kebutuhan nyata.

- [ ] Kumpulkan referensi: kerangka kompetensi literasi digital, laporan survei literasi digital, kasus cyberbullying dan kebocoran data (diambil sebagai pola, bukan menyebut orang nyata)
- [ ] Tentukan sasaran: jenjang, sekolah mitra, jumlah responden (target 20-30 siswa)
- [ ] Wawancara 1-2 guru (BK/TIK): masalah yang sering muncul di siswa
- [ ] Survei awal kecil ke beberapa siswa: platform yang dipakai dan kebiasaan bermedsos
- [ ] Mulai pengurusan izin ke sekolah

**Keluaran:** Ringkasan kebutuhan, daftar masalah prioritas, dan kontak sekolah mitra.

### Tahap 2: Perancangan (Minggu 2-3)
**Tujuan:** Cetak biru yang jelas sebelum membangun.

- [ ] **Konten:** tulis peta skenario (diagram percabangan) dan aturan skor
- [ ] **UI/UX:** wireframe low-fidelity lalu high-fidelity (Figma/Canva)
- [ ] **Teknis:** tentukan teknologi, struktur data, dan skema penyimpanan hasil
- [ ] **Riset:** susun soal pre/post-test dan kuesioner
- [ ] Review desain dengan guru atau 2-3 siswa (uji cepat 15 menit)

**Keluaran:** Dokumen desain (peta skenario, wireframe, struktur data) dan instrumen tes.

### Tahap 3: Pengembangan (Minggu 3-6)
**Tujuan:** Produk yang berfungsi dan siap diuji.

**Strategi: bangun bertahap (iteratif).**
1. **Sprint 1 (prototipe):** kerangka halaman, 2-3 skenario, mesin skor dasar
2. **Sprint 2 (inti):** semua skenario, pre/post-test, rapor, penyimpanan hasil
3. **Sprint 3 (poles):** tampilan akhir, animasi ringan, perbaikan dari uji awal, fitur tambahan jika sempat

- [ ] Gunakan Git/GitHub untuk versi kode
- [ ] Review mingguan (demo singkat 15 menit ke seluruh tim)
- [ ] Konten dan desain dikirim ke developer secara bertahap, jangan menunggu semuanya selesai

**Keluaran:** Versi 1.0 yang siap diuji ke pengguna.

### Tahap 4: Pengujian (Minggu 6-7)
**Tujuan:** Memastikan kualitas sebelum uji coba ke siswa.

- [ ] Uji fungsional (lihat bagian 13)
- [ ] Uji kegunaan dengan 5 pengguna
- [ ] Perbaikan bug dan masukan
- [ ] Uji lintas perangkat dan browser

**Keluaran:** Laporan pengujian dan versi stabil.

### Tahap 5: Implementasi dan pengumpulan data (Minggu 7-8)
**Tujuan:** Membuktikan dampak.

- [ ] Jadwalkan sesi uji coba dengan sekolah mitra (usahakan satu sesi 45-60 menit)
- [ ] Ikuti alur: **briefing → pre-test → simulasi → post-test → kuesioner → diskusi singkat**
- [ ] Dokumentasi kegiatan (foto tanpa menampilkan wajah siswa jika tidak ada izin)
- [ ] Simpan seluruh data dengan aman dan anonim

**Keluaran:** Data pre/post-test dan kuesioner dari 20-30 siswa.

### Tahap 6: Analisis dan evaluasi (Minggu 8-9)
**Tujuan:** Mengubah data menjadi temuan.

- [ ] Hitung rata-rata skor pre-test dan post-test, selisih, dan persentase peningkatan
- [ ] Jika diminta dosen, lakukan uji statistik (misalnya uji t berpasangan)
- [ ] Hitung skor SUS dan ringkas kepuasan
- [ ] Rangkum masukan kualitatif siswa dan guru
- [ ] Tulis kesimpulan, keterbatasan, dan saran pengembangan

**Keluaran:** Bab hasil dan pembahasan.

### Tahap 7: Dokumentasi dan presentasi (Minggu 9-10)
**Tujuan:** Luaran akhir rapi dan siap dinilai.

- [ ] Finalisasi laporan
- [ ] Siapkan video demo 2-3 menit dan slide presentasi
- [ ] Latihan presentasi (minimal 2 kali)
- [ ] Kumpulkan seluruh bukti: tangkapan layar, foto kegiatan, data mentah, log kontribusi

**Keluaran:** Laporan, produk, demo, dan presentasi akhir.

---

## 12. Contoh Jadwal Kerja

> **Penting:** Jadwal ini hanya **contoh 10 minggu**. Sesuaikan dengan kalender dan tenggat dari dosen. Jika waktu lebih singkat, kurangi jumlah skenario (misalnya jadi 6-8) dan lewati fitur tambahan.

| Minggu | Fokus | Target utama |
|---|---|---|
| 1 | Persiapan dan riset awal | Tim resmi, ide disetujui, kontak sekolah |
| 2 | Riset dan perancangan | Peta skenario, wireframe awal, instrumen tes |
| 3 | Perancangan akhir dan mulai build | Desain final, Sprint 1 dimulai |
| 4 | Pengembangan | Prototipe 3 skenario berjalan |
| 5 | Pengembangan | Semua skenario, pre/post-test terintegrasi |
| 6 | Poles dan uji internal | Versi 1.0, uji fungsional |
| 7 | Uji kegunaan dan perbaikan | Hasil SUS awal, bug diperbaiki |
| 8 | Uji coba ke siswa | Data 20-30 responden terkumpul |
| 9 | Analisis dan laporan | Hasil dan pembahasan selesai |
| 10 | Presentasi | Demo, slide, dan laporan final |

---

## 13. Strategi Pengujian

### 13.1 Uji fungsional (oleh developer dan tim)

| Yang diuji | Kriteria lulus |
|---|---|
| Pre-test dan post-test | Jawaban tersimpan, skor terhitung benar |
| Pembuatan profil | Data profil tampil di skenario |
| Percabangan skenario | Setiap pilihan membawa ke konsekuensi yang benar |
| Mesin skor | Skor berubah sesuai aturan, tidak keluar batas 0-100 |
| Rapor akhir | Ringkasan sesuai hasil pilihan siswa |
| Penyimpanan hasil | Data masuk ke penyimpanan tanpa hilang |
| Tampilan HP | Teks terbaca, tombol mudah ditekan |
| Lintas browser | Berjalan di Chrome dan minimal satu browser lain |

### 13.2 Uji kegunaan (usability)
- **Peserta:** 5 siswa (cukup untuk menemukan sebagian besar masalah utama)
- **Cara:** beri tugas ("Buat profil dan selesaikan satu skenario") lalu amati tanpa membantu
- **Catat:** tempat siswa bingung, salah klik, atau berhenti
- **Ukur:** kuesioner **SUS** (10 pernyataan, skala 1-5)

### 13.3 Uji isi (content validation)
- Minta **guru BK/TIK** memeriksa ketepatan materi dan kesesuaian bahasa
- Pastikan tidak ada konten yang berpotensi menyinggung atau menyalahkan korban

### 13.4 Catatan bug
Buat tabel sederhana agar perbaikan terlacak:

| ID | Deskripsi | Tingkat (Kritis/Sedang/Ringan) | Penanggung jawab | Status |
|---|---|---|---|---|
| B01 | (isi) | | | |

---

## 14. Strategi Mengukur Dampak

### 14.1 Desain pengukuran
**One-group pre-test / post-test:** satu kelompok siswa dites sebelum dan sesudah memakai simulasi.

```
Pre-test  →  Simulasi Jejak Digitalku  →  Post-test
```

> Jika memungkinkan dan sekolah setuju, tambahkan **kelompok pembanding** (siswa yang hanya membaca materi biasa) agar hasilnya lebih kuat. Jika tidak memungkinkan, cukup sebutkan sebagai keterbatasan.

### 14.2 Instrumen
1. **Pre-test dan post-test:** 10-15 soal pilihan ganda (soal setara, bisa dengan urutan atau redaksi berbeda).
2. **Kuesioner sikap (opsional):** skala Likert, misalnya "Saya akan berpikir dulu sebelum membagikan lokasi."
3. **SUS:** 10 pernyataan standar kegunaan sistem.
4. **Kuesioner kepuasan:** 5-6 pernyataan tentang kemenarikan dan kejelasan.
5. **Pertanyaan terbuka:** "Bagian mana yang paling berkesan?" dan "Apa yang perlu diperbaiki?"

### 14.3 Analisis data
| Analisis | Cara |
|---|---|
| Peningkatan pemahaman | Rata-rata post-test dikurangi rata-rata pre-test, hitung persentase kenaikan |
| Signifikansi (jika diminta) | Uji t berpasangan (paired t-test) |
| Peningkatan per tema | Pisahkan skor soal per tema (privasi, cyberbullying, dll.) |
| Skor SUS | Rumus SUS standar, interpretasi: ≥68 di atas rata-rata |
| Kepuasan | Rata-rata skor Likert dan persentase setuju |
| Pola pilihan | Skenario mana yang paling sering menjebak siswa |

### 14.4 Contoh format tabel hasil

| Peserta | Pre-test | Post-test | Selisih |
|---|---|---|---|
| P001 | | | |
| P002 | | | |
| **Rata-rata** | | | |

---

## 15. Etika dan Perlindungan Data

Karena proyek ini berkaitan dengan privasi, **tim harus menerapkan prinsip yang diajarkan**.

- [ ] **Izin sekolah** sebelum uji coba (surat pengantar dari kampus jika diperlukan)
- [ ] **Persetujuan** siswa dan, bila diperlukan, orang tua/wali (informed consent)
- [ ] **Data anonim:** pakai kode peserta, bukan nama
- [ ] **Minimalkan data:** hanya kumpulkan yang dibutuhkan untuk analisis
- [ ] **Konten fiktif:** jangan memakai identitas atau kasus nyata yang bisa dikenali
- [ ] **Foto dokumentasi:** hindari menampilkan wajah siswa tanpa izin tertulis
- [ ] **Sensitivitas konten:** bahas cyberbullying dengan hati-hati, jangan menyalahkan korban
- [ ] **Penyimpanan aman:** data hanya diakses anggota tim, tidak disebar
- [ ] Siapkan **jalur bantuan:** jika siswa merasa tidak nyaman, ada guru BK yang mendampingi

---

## 16. Manajemen Risiko

| Risiko | Dampak | Pencegahan / Solusi |
|---|---|---|
| Ide keduluan kelompok lain | Harus ganti ide | Daftar secepatnya, siapkan 2-3 cadangan |
| Skenario terlalu banyak dan tidak selesai | Produk telat | Mulai dari 8 skenario, tambah jika sempat |
| Developer kewalahan | Build terlambat | Pakai teknologi sesuai skill, bagi kerja front-end dengan desainer |
| Sulit mendapat sekolah mitra | Data tidak terkumpul | Hubungi sekolah sejak minggu pertama, siapkan alternatif (kelas adik tingkat, komunitas, sekolah kenalan) |
| Jumlah responden sedikit | Analisis lemah | Targetkan minimal 20, jelaskan keterbatasan jika kurang |
| Siswa merasa digurui | Simulasi tidak menarik | Bahasa santai, visual akrab, konsekuensi terasa nyata |
| Koneksi internet buruk saat uji | Sesi gagal | Versi ringan, siapkan mode offline atau hotspot cadangan |
| Konflik atau anggota tidak aktif | Beban tidak merata | Kesepakatan tim sejak awal, log kontribusi, komunikasi rutin |
| Data hilang | Analisis gagal | Cadangkan data harian di tempat kedua |
| Waktu mepet | Kualitas turun | Jadwal mundur dari tenggat, sisakan 1 minggu cadangan |

---

## 17. Strategi Kolaborasi Tim

### Alat yang disarankan
| Kebutuhan | Alat |
|---|---|
| Komunikasi | WhatsApp/Discord |
| Papan tugas | Trello / Notion / Google Sheets |
| Penyimpanan dokumen | Google Drive |
| Desain | Figma / Canva |
| Kode | GitHub |
| Analisis data | Excel / Google Sheets / SPSS |

### Ritme kerja
- **Rapat mingguan** (30-45 menit): evaluasi progres, hambatan, tugas minggu depan
- **Check-in singkat** 2-3 kali seminggu lewat chat
- **Demo internal** tiap akhir sprint
- **Konsultasi dosen** di titik penting: persetujuan ide, desain, hasil uji awal, draf laporan

### Aturan tim (buat kesepakatan tertulis)
1. Semua tugas punya penanggung jawab dan tenggat.
2. Kabari jika berhalangan **sebelum** tenggat.
3. Keputusan besar diambil bersama.
4. Setiap anggota mencatat kontribusi mingguan.
5. File diberi nama dan versi yang jelas (contoh: `Skenario_v3`).

### Log kontribusi (template)

| Minggu | Nama | Tugas yang dikerjakan | Bukti (tautan/file) |
|---|---|---|---|
| 1 | | | |

---

## 18. Strategi Presentasi dan Demo

### Alur presentasi (contoh 10-12 menit)
1. **Hook (1 mnt):** tampilkan kasus fiktif yang relatable ("Satu foto seragam bisa membuat orang asing tahu jam pulangmu")
2. **Masalah dan tujuan (1-2 mnt)**
3. **Solusi: Jejak Digitalku (1 mnt)**
4. **Demo langsung atau video (3 mnt):** tampilkan satu skenario sampai konsekuensi dan rapor
5. **Metode dan pengujian (1-2 mnt)**
6. **Hasil dampak (2 mnt):** grafik pre vs post, skor SUS
7. **Kesimpulan, keterbatasan, saran (1 mnt)**
8. **Tanya jawab**

### Tips
- Siapkan **video demo cadangan** jika internet bermasalah.
- Tunjukkan **grafik** hasil, jangan hanya angka.
- Bagi bicara supaya **kelima anggota tampil**, sesuai peran masing-masing.
- Siapkan jawaban untuk pertanyaan umum: "Mengapa pilihan ini efektif?", "Bagaimana validitas hasilnya?", "Apa keterbatasannya?"

---

## 19. Checklist Luaran

### Produk
- [ ] Website Jejak Digitalku yang berfungsi (tautan publik)
- [ ] Minimal 8 skenario lengkap
- [ ] Pre-test, post-test, rapor, dan penyimpanan hasil

### Dokumen
- [ ] Laporan lengkap (latar belakang, tujuan, metode, hasil, kesimpulan)
- [ ] Dokumen desain (wireframe, peta skenario, struktur data)
- [ ] Instrumen penelitian (soal tes, kuesioner)
- [ ] Laporan pengujian
- [ ] Data hasil dan analisis

### Bukti pelaksanaan
- [ ] Dokumentasi uji coba (foto sesuai izin)
- [ ] Surat izin / persetujuan
- [ ] Log kontribusi tiap anggota
- [ ] Catatan konsultasi dengan dosen

### Presentasi
- [ ] Slide
- [ ] Video demo
- [ ] Latihan presentasi

> **Penting:** Bagian luaran dan penilaian resmi harus **dicocokkan dengan halaman tugas dan arahan dosen**. Daftar ini adalah rekomendasi umum.

---

## 20. Lampiran

### Lampiran A: Contoh soal pre/post-test (draf)

1. Kamu mengunggah foto dengan fitur lokasi aktif. Risiko paling mungkin adalah...
   a. Fotonya buram
   b. Orang asing dapat mengetahui keberadaanmu
   c. Baterai cepat habis
   d. Pengikutmu bertambah
2. Seseorang mengirim DM bahwa kamu menang hadiah dan meminta kode OTP. Tindakan terbaik adalah...
   a. Berikan kode agar hadiah cepat dikirim
   b. Abaikan, jangan bagikan kode, dan laporkan
   c. Teruskan ke teman
   d. Balas dengan nomor rekening
3. Temanmu menjadi bahan ejekan di kolom komentar. Sikap yang tepat adalah...
   a. Ikut berkomentar agar tidak dikucilkan
   b. Diam dan tidak peduli
   c. Menyimpan bukti dan melaporkan atau membela dengan sopan
   d. Menyebarkan tangkapan layarnya
4. Unggahan yang sudah dihapus...
   a. Hilang sepenuhnya dari internet
   b. Masih bisa tersimpan lewat tangkapan layar atau arsip
   c. Tidak bisa dilihat siapa pun
   d. Hanya bisa dilihat admin
5. Sebelum membagikan pesan berantai yang heboh, langkah pertama adalah...
   a. Langsung bagikan ke semua grup
   b. Periksa sumber dan keasliannya
   c. Tambahkan kata-kata dramatis
   d. Tunggu orang lain membagikannya

*(Tambahkan sampai 10-15 soal, dan buat versi setara untuk post-test.)*

### Lampiran B: Pernyataan SUS (standar, skala 1-5)

1. Saya berpikir akan sering menggunakan sistem ini.
2. Saya merasa sistem ini terlalu rumit.
3. Saya merasa sistem ini mudah digunakan.
4. Saya membutuhkan bantuan orang teknis untuk menggunakan sistem ini.
5. Saya merasa fitur-fitur dalam sistem ini terintegrasi dengan baik.
6. Saya merasa ada terlalu banyak ketidakkonsistenan dalam sistem ini.
7. Saya membayangkan kebanyakan orang akan cepat belajar menggunakan sistem ini.
8. Saya merasa sistem ini sangat membingungkan.
9. Saya merasa sangat percaya diri menggunakan sistem ini.
10. Saya perlu belajar banyak hal sebelum bisa menggunakan sistem ini.

**Cara hitung skor SUS:**
- Pernyataan ganjil (1, 3, 5, 7, 9): skor jawaban dikurangi 1
- Pernyataan genap (2, 4, 6, 8, 10): 5 dikurangi skor jawaban
- Jumlahkan seluruhnya, lalu kalikan 2,5
- Hasil 0-100; skor ≥ 68 dianggap di atas rata-rata

### Lampiran C: Contoh pernyataan kepuasan (skala 1-5)
1. Simulasi ini menarik untuk dimainkan.
2. Penjelasan setelah setiap pilihan mudah dipahami.
3. Saya jadi lebih paham risiko membagikan data pribadi.
4. Saya akan lebih berpikir sebelum berkomentar atau mengunggah sesuatu.
5. Saya akan merekomendasikan simulasi ini ke teman.

### Lampiran D: Template rencana uji coba (satu sesi)

| Waktu | Kegiatan | Penanggung jawab |
|---|---|---|
| 0-5 menit | Pembukaan dan penjelasan tujuan, persetujuan | Ketua |
| 5-15 menit | Pre-test | Peneliti dan Penguji |
| 15-35 menit | Bermain simulasi | Semua (mendampingi) |
| 35-45 menit | Post-test | Peneliti dan Penguji |
| 45-55 menit | Kuesioner SUS dan kepuasan | Desainer UI/UX |
| 55-60 menit | Diskusi singkat dan penutup | Penyusun Konten |

### Lampiran E: Pertanyaan wawancara guru (draf)
1. Masalah media sosial apa yang paling sering dialami siswa di sekolah ini?
2. Apakah siswa sudah pernah mendapat materi literasi digital? Seperti apa bentuknya?
3. Topik apa yang menurut Bapak/Ibu paling perlu diprioritaskan?
4. Bagaimana gaya bahasa yang paling cocok untuk siswa?
5. Apa yang perlu kami hindari agar materi tidak sensitif atau menyinggung?

---

*Dokumen ini adalah rencana kerja awal. Sesuaikan jadwal, target, dan luaran dengan ketentuan resmi dan arahan dosen pengampu.*
