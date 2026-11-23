# Product Requirements Document (PRD)

## Jejak Digitalku: Simulasi Visual Novel Dampak Unggahan Media Sosial

| Atribut | Detail | 
| ----- | ----- | 
| **Nama Produk** | Jejak Digitalku | 
| **Versi Dokumen** | 2.0 (Revisi Scope 3 Skenario Visual Novel) | 
| **Status** | Siap Pengembangan (*Ready for Development*) | 
| **Target Rilis** | Minggu ke-7 (Uji Coba Lapangan) | 
| **Tech Stack Utama** | React (Vite), Tailwind CSS, Google Sheets / Firebase | 

## 1. Gambaran Umum Produk

### 1.1 Latar Belakang

Remaja usia sekolah menengah merupakan pengguna aktif media sosial, namun sering kali kurang menyadari konsekuensi jangka panjang dari aktivitas digital mereka—seperti kebocoran data pribadi (*doxing*), *cyberbullying*, dan penipuan daring. Pendekatan edukasi konvensional (ceramah/teks) cenderung terasa menggurui dan kurang efektif.

### 1.2 Visi Produk

Menyediakan simulasi interaktif berbasis web dengan pendekatan **visual novel (cerita bercabang)** yang aman bagi siswa untuk mengalami hubungan sebab-akibat dari setiap keputusan di media sosial bersama karakter pendamping yang relevan dengan keseharian mereka.

### 1.3 Tujuan Bisnis & Edukasi (Goals)

1. Meningkatkan pemahaman literasi digital siswa yang terukur melalui kenaikan rata-rata skor *post-test* dibandingkan *pre-test*.

2. Mencapai tingkat kegunaan sistem (*usability*) yang baik dengan skor *System Usability Scale* (SUS) minimal **68**.

3. Menghasilkan aplikasi web *visual novel* interaktif yang stabil, ringan di perangkat *mobile*, dan mampu merekam data penelitian secara anonim.

## 2. Target Pengguna (User Personas)

### 2.1 Pengguna Utama: Siswa SMP/SMA (Fokus: Kelas 8 SMP)

* **Karakteristik:** Mengakses internet mayoritas melalui *smartphone* dengan koneksi seluler standar. Terbiasa dengan format percakapan *chat* dan cerita interaktif.

* **Kebutuhan:** Pengalaman belajar berbasis cerita yang tidak menggurui, dialog kasual antar-teman sebaya, durasi singkat (5–7 menit per skenario), serta umpan balik instan.

### 2.2 Pengguna Pendukung: Guru (BK / TIK) & Peneliti (Tim Capstone)

* **Karakteristik:** Memfasilitasi sesi uji coba di kelas selama 45–60 menit dan membutuhkan data hasil evaluasi siswa.

* **Kebutuhan:** Alur aplikasi yang terpandu dari awal hingga akhir tanpa memerlukan instalasi aplikasi maupun pembuatan akun rumit.

## 3. Ruang Lingkup Proyek (Scope)

### 3.1 Dalam Ruang Lingkup (In-Scope / MVP)

* Halaman pembuka dengan input kode peserta anonim.

* Modul *Pre-test* dan *Post-test* (**9–12 soal** pilihan ganda yang terbagi merata untuk 3 tema utama).

* Pembuatan profil media sosial fiktif (nama, avatar, pengaturan akun Publik/Privat).

* **3 Skenario Visual Novel Bercabang** (masing-masing terdiri dari 6 *scene*: Pengenalan, Konflik/Dialog, Keputusan, Konsekuensi Bercabang, dan Refleksi).

* Mesin skor real-time untuk 3 indikator: **Privasi**, **Reputasi**, dan **Keamanan**.

* Halaman Rapor Digital akhir beserta gelar/lencana pencapaian.

* Modul kuesioner SUS (10 item) dan kepuasan pengguna (5 item).

* Penyimpanan otomatis hasil sesi ke Google Sheets atau Firebase.

### 3.2 Di Luar Ruang Lingkup (Out-of-Scope / Pengembangan Lanjutan)

* Sistem autentikasi *login/register* menggunakan email atau kata sandi sungguhan.

* Fitur interaksi multipemain (*multiplayer*) antar siswa secara *real-time*.

* *Dashboard* analitik khusus guru di dalam aplikasi (analisis dilakukan melalui spreadsheet/perangkat lunak statistik).

## 4. Alur Pengguna (User Flow)

```
[1. Landing Page] (Input Kode Peserta Anonim, misal: P001)
       │
       ▼
[2. Pre-Test] (9-12 Soal Pilihan Ganda: 3-4 soal per tema)
       │
       ▼
[3. Setup Profil Fiktif] (Username, Avatar, Tipe Akun: Publik/Privat)
       │
       ▼
[4. Loop 3 Skenario Visual Novel]
   ├── Scene 1-4: Narasi Latar, Dialog Karakter (Kamu, Nadia, dll.), & Gelembung DM/Feed
   ├── Scene 5: Layar Keputusan (Memilih 1 dari 3 Opsi Aksi)
   ├── Scene 5A/5B/5C: Konsekuensi Bercabang sesuai pilihan + Update Skor Real-Time
   └── Scene 6: Dialog Refleksi & Tips Praktis
       │
       ▼
[5. Rapor Digital] (Rekap Skor Akhir, Kategori Gelar, Ringkasan)
       │
       ▼
[6. Post-Test] (9-12 Soal Setara Pre-Test)
       │
       ▼
[7. Kuesioner SUS & Kepuasan] ──► [Kirim Data ke Server & Halaman Selesai]

```

## 5. Persyaratan Fungsional (Functional Requirements)

### FR-01: Onboarding & Identifikasi Anonim

* Sistem wajib menyediakan kolom input **Kode Peserta** (contoh: `P001`) di halaman awal sebelum memulai.

* Sistem memvalidasi bahwa kolom kode peserta tidak boleh kosong.

* Sistem menampilkan panduan singkat cara bermain dan estimasi waktu pengerjaan (±35–45 menit total sesi).

### FR-02: Modul Pre-Test dan Post-Test

* Menampilkan **9 atau 12 soal pilihan ganda** (3–4 soal per topik: *Privasi Data*, *Cyberbullying*, dan *Penipuan/Keamanan Akun*) satu per satu dengan indikator progres.

* Siswa wajib menjawab seluruh soal sebelum dapat melanjutkan ke tahap berikutnya.

* Sistem menghitung skor otomatis ($0\text{--}100$) di latar belakang tanpa langsung membocorkan kunci jawaban setelah *pre-test*.

### FR-03: Pembuatan Profil Fiktif

* Siswa memilih nama pengguna fiktif (*username*), memilih 1 dari minimal 4 pilihan avatar ilustrasi, dan memilih pengaturan privasi akun: **Akun Publik** atau **Akun Privat**.

* **Logika Pengali Risiko:** Jika siswa memilih **Akun Publik**, setiap pilihan dalam skenario yang berdampak negatif pada indikator *Privasi* akan mendapatkan penalti tambahan sebesar $20\%$ (dikalikan $1,2$) serta memicu keterangan tambahan bahwa profil publik mempermudah pelacakan oleh orang asing.

### FR-04: Mesin Cerita Visual Novel & Percabangan Skenario

* Memuat **3 skenario utama** secara berurutan dari berkas `scenarios.json`:

  1. **Skenario 1 (Privasi Data):** *Foto Pertama di Sekolah Baru*

  2. **Skenario 2 (Cyberbullying):** *Foto Candid di Grup Kelas*

  3. **Skenario 3 (Penipuan Online):** *DM "Kamu Menang Hadiah!"*

* Antarmuka *Visual Novel* wajib mendukung rendering elemen berikut secara dinamis per *scene*:

  * **Header Latar & Waktu:** Menampilkan keterangan tempat dan waktu (misal: *KAMAR TOKOH UTAMA · MALAM HARI*) beserta ilustrasi latar.

  * **Kotak Narasi:** Teks cerita yang mengantar situasi.

  * **Balon Dialog Karakter:** Menampilkan nama pembicara dan potret ekspresi karakter tetap (*Kamu*, *Nadia*, *Raka*, *Dimas*, dll.).

  * **Simulasi Antarmuka Medsos:** Menampilkan gelembung pesan masuk (*DM*) atau kartu unggahan *feed* di tengah layar saat adegan melibatkan interaksi aplikasi.

* **Percabangan Konsekuensi:** Pada *Scene Keputusan*, setelah siswa memilih opsi (`A`, `B`, atau `C`), mesin cerita wajib menampilkan *Scene Konsekuensi* khusus (`5A`, `5B`, atau `5C`) yang sesuai dengan pilihan tersebut sebelum masuk ke *Scene Refleksi*.

### FR-05: Sistem Skor & Kalibrasi 3 Skenario

* Ketiga indikator (**Privasi**, **Reputasi**, **Keamanan**) dimulai dari nilai awal **100**.

* Karena jumlah skenario adalah 3 episode, bobot perubahan skor dikalibrasi agar dampak pilihan langsung terasa signifikan pada skor akhir (rentang penalti pilihan sangat berisiko antara **-30 hingga -35 poin**, risiko sedang **-10 hingga -15 poin**, dan pilihan aman **+5 hingga +15 poin**).

* Nilai setiap indikator dibatasi (*clamped*) pada rentang minimal **0** dan maksimal **100**.

### FR-06: Rapor Digital

* Menampilkan skor akhir masing-masing indikator dan rata-rata skor keseluruhan.

* Menentukan predikat/lencana otomatis berdasarkan rata-rata skor akhir:

  * **80 – 100:** *Warga Digital Bijak*

  * **50 – 79:** *Pengguna Waspada*

  * **0 – 49:** *Pemula Digital*

* Menampilkan ringkasan area kekuatan tertinggi dan area yang paling perlu ditingkatkan berdasarkan hasil 3 skenario.

### FR-07: Kuesioner & Pengiriman Data

* Menampilkan 10 pernyataan SUS (skala Likert 1–5) dan 5 pernyataan kepuasan.

* Pada tombol **Kirim & Selesai**, sistem menggabungkan seluruh data sesi menjadi satu objek JSON dan mengirimkannya ke endpoint Google Apps Script / Firebase.

* Menyediakan tombol cadangan (*Download Hasil JSON*) jika pengiriman gagal akibat koneksi internet terputus.

## 6. Persyaratan Non-Fungsional (Non-Functional Requirements)

* **NFR-01 (Responsivitas Mobile-First):** Antarmuka dioptimalkan untuk layar ponsel ($360\text{px} \times 800\text{px}$ ke atas) dengan bingkai terpusat (`max-w-md`) saat dibuka di desktop, serta ukuran tombol minimal tinggi $44\text{px}$.

* **NFR-02 (Performa & Ukuran Aset):** Seluruh aset ilustrasi latar dan potret ekspresi karakter menggunakan format terkompresi (WebP/SVG) sehingga waktu muat awal (*initial load*) di bawah 3 detik pada jaringan 4G standar.

* **NFR-03 (Persistensi State / Anti-Refresh):** Seluruh progres siswa (termasuk posisi *scene* aktif di dalam skenario) disimpan otomatis ke `localStorage` browser setiap kali berpindah langkah.

* **NFR-04 (Privasi & Keamanan Data):** Aplikasi dilarang meminta atau menyimpan nama asli, email, nomor telepon, maupun lokasi GPS asli milik siswa.

## 7. Spesifikasi Teknis & Skema Data

### 7.1 Arsitektur Aplikasi

* **Frontend:** React 18+ (Vite), Tailwind CSS, Lucide Icons, React Context API untuk manajemen *state* global.

* **Storage:** Google Sheets (melalui Google Apps Script Web App URL) sebagai penerima payload JSON via HTTP POST.

### 7.2 Skema JSON Skenario Visual Novel (`scenarios.json`)

```
{
  "id": "S03",
  "tema": "Penipuan Online dan Keamanan Data Pribadi",
  "judul": "DM: Kamu Menang Hadiah!",
  "karakter": [
    { "id": "kamu", "nama": "Kamu" },
    { "id": "nadia", "nama": "Nadia" },
    { "id": "giveaway", "nama": "Akun Giveaway" }
  ],
  "scenes": [
    {
      "scene_id": 1,
      "judul_scene": "Notifikasi yang Tidak Terduga",
      "latar": "kamar_malam",
      "latar_teks": "KAMAR TOKOH UTAMA · MALAM HARI",
      "dialog": [
        { "tipe": "narasi", "teks": "Malam itu, kamu sedang bersantai di kamar..." },
        { "tipe": "dm", "pengirim": "Akun Giveaway", "waktu": "22.14", "teks": "Selamat! Akun kamu terpilih sebagai pemenang Giveaway!" },
        { "tipe": "karakter", "pembicara": "Kamu", "teks": "Hah? Aku menang giveaway? Padahal aku nggak pernah ikut undian." }
      ]
    }
  ],
  "decision_scene": {
    "scene_id": 5,
    "judul_scene": "Tentukan Keputusanmu",
    "pertanyaan": "Apa yang akan kamu lakukan?",
    "pilihan": [
      {
        "id": "A",
        "teks": "Mengeklik tautan dan mengisi semua data pribadi.",
        "skor": { "privasi": -35, "reputasi": 0, "keamanan": -30 },
        "scene_konsekuensi": {
          "latar_teks": "KEESOKAN PAGINYA · KAMAR TOKOH UTAMA",
          "dialog": [
            { "tipe": "narasi", "teks": "Hadiah tidak pernah datang, justru ponselmu dibanjiri SMS penipuan." },
            { "tipe": "karakter", "pembicara": "Nadia", "teks": "Ayo segera ganti password dan aktifkan verifikasi dua langkah!" }
          ]
        }
      }
    ]
  },
  "refleksi_scene": {
    "scene_id": 6,
    "judul_scene": "Refleksi: Jangan Mudah Tergiur",
    "narasi_penutup": "Di dunia digital, kewaspadaan merupakan salah satu bentuk perlindungan diri...",
    "tips_praktis": "Selalu cek tanda centang verifikasi dan bandingkan ejaan username akun."
  }
}

```

### 7.3 Skema Payload Pengiriman Hasil ke Server

```
{
  "timestamp": "2026-11-14T10:30:00Z",
  "participantCode": "P001",
  "profile": {
    "username": "bintang_biru",
    "isPublic": true
  },
  "preTestScore": 66.7,
  "postTestScore": 91.7,
  "finalScores": {
    "privasi": 80,
    "reputasi": 100,
    "keamanan": 85
  },
  "scenarioChoices": [
    { "scenarioId": "S01", "choiceId": "C" },
    { "scenarioId": "S02", "choiceId": "C" },
    { "scenarioId": "S03", "choiceId": "B" }
  ],
  "susAnswers": [4, 2, 5, 1, 4, 2, 5, 1, 4, 2],
  "susTotalScore": 82.5,
  "satisfactionAnswers": [5, 5, 4, 5, 5]
}

```

## 8. Panduan Desain UI/UX & Konten

1. **Tata Letak Visual Novel:** Bagian atas menampilkan *Sticky Score Bar*, bagian tengah menampilkan latar tempat + ilustrasi karakter/gelembung chat medsos, dan bagian bawah menampilkan kotak dialog dengan tombol *"Lanjut"* untuk menavigasi antar-baris dialog.

2. **Konsistensi Karakter:** Karakter **Kamu** dan **Nadia** hadir di seluruh 3 skenario untuk membangun keterikatan emosional siswa dengan alur cerita.

3. **Kode Warna Indikator:**

   * **Privasi:** Biru (`#2563EB`)

   * **Reputasi:** Ungu/Emerald (`#7C3AED` / `#059669`)

   * **Keamanan:** Amber/Oranye (`#D97706`)

   * **Peringatan Risiko:** Merah lembut (`#DC2626`)

## 9. Kriteria Penerimaan (Acceptance Criteria)

Produk dinyatakan siap untuk uji coba lapangan apabila memenuhi seluruh poin berikut:

* \[ \] Siswa dapat menyelesaikan alur penuh (Pre-test → 3 Skenario Visual Novel → Rapor → Post-test → Kuesioner) tanpa *crash* atau layar putih (*blank screen*).

* \[ \] Setiap pilihan keputusan (`A`, `B`, `C`) pada masing-masing skenario memunculkan *Scene Konsekuensi* dan perubahan skor yang sesuai.

* \[ \] Pengaturan akun **Publik** terbukti memberikan pengurangan skor privasi yang lebih besar dibandingkan akun **Privat** pada skenario berisiko.

* \[ \] Seluruh nilai skor (Privasi, Reputasi, Keamanan) tetap berada dalam batas $0\text{--}100$.

* \[ \] Data hasil dari minimal 5 kali simulasi pengujian internal berhasil masuk secara utuh ke baris Google Sheets / database tujuan.