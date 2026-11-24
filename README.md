# Jejak Digitalku

Cerita interaktif tentang literasi digital. Pemain menjadi karakter fiktif di media sosial, memilih apa yang akan dilakukan di tiap situasi, lalu melihat akibatnya. Di akhir cerita ada rapor berisi tiga skor dan satu kategori.

Aplikasi ini hanya untuk desktop dan berbahasa Indonesia. Tidak ada peran guru dan tidak ada dashboard. Siswa menunjukkan layar rapor ke guru dan menyetor nilainya secara manual.

README ini juga panduan kerja kita. Baca sampai habis sebelum mengerjakan bagian masing-masing.

## Status

| Bagian | Pemilik | Status |
|---|---|---|
| Skenario 1 (Penipuan) | Fatkhur | On Progres |
| Landing page | Ayun | Belum mulai |
| Skenario 2 (Hoaks) | Ayun | Belum mulai, desain di Figma baru kerangka |
| Skenario 3 (Privasi) | Syihan | Belum mulai, desain di Figma baru kerangka |

Desain Skenario 2 dan 3 belum bisa langsung dikodekan. Skenario 2 punya 6 frame di Figma dan hanya frame 1 sampai 4 yang ada teksnya. Skenario 3 punya 20 frame tanpa teks sama sekali. Keduanya belum punya pilihan, konsekuensi, skor, maupun refleksi. Urutan kerjanya: tulis ceritanya dulu, lengkapi Figma, baru masuk ke kode.

Fitur yang sengaja tidak dibuat: pre-test, post-test, kuesioner SUS, lencana, profil karakter, dashboard guru, reset password, dan login lewat Google.

## Teknologi

React 18, TypeScript 5, Vite 8, Tailwind CSS 3, dan React Router 6. Login, database, dan penyimpanan gambar memakai Supabase (klien v2).

Desain ada di Figma "LD JEJAK DIGITALKU". Halaman 2 berisi frame cerita, halaman "UI Tambahan" berisi layar non-cerita (awal, register, login, kontrol cerita, pilihan, konsekuensi, rapor, peringatan desktop). Tautan Figma tidak saya taruh di repo karena repo bisa publik. Minta ke saya.

## Struktur proyek

```
jejak-digitalku/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── .oxlintrc.json
├── .env
├── .gitignore
├── docs/
│   └── supabase-grants.sql        # GRANT + RLS untuk role authenticated
├── gambar-skenario1-siap-upload/  # gambar sumber Skenario 1, siap unggah
│   ├── s1-penipuan/               # 001.jpg s.d. 031.jpg
│   └── extra/                     # opt-A/B/C.jpg, opt-confirm.jpg (tidak dipakai kode)
├── scripts/
│   ├── upload-images.mjs          # unggah ./images/ ke bucket Supabase Storage
│   ├── test-resume.ts
│   └── test-story1.ts
└── src/
    ├── main.tsx
    ├── App.tsx                    # rute + guard desktop (min. 1024px)
    ├── index.css
    ├── vite-env.d.ts
    ├── styles/
    │   └── tokens.css             # design token: warna, font, ukuran
    ├── components/
    │   ├── Stage.tsx              # kanvas 1920x1080 yang diskalakan
    │   ├── ui/                    # Button, GlassPanel, Input, Pill
    │   └── story/                 # StoryPlayer, Scene/Choice/Consequence/End,
    │                              #   Hud, SceneImage, ProgressSaver, StoryGate,
    │                              #   StoryStatus, StoryBanners, ReportCard
    ├── engine/                    # mesin cerita: types.ts, story.ts, useStory.ts
    ├── auth/
    │   └── AuthProvider.tsx       # sesi Supabase + nama display
    ├── lib/
    │   ├── config.ts              # URL + key Supabase (hardcoded, bukan .env)
    │   ├── supabase.ts            # klien Supabase (anon/publishable)
    │   ├── assets.ts              # helper URL gambar dari bucket Storage
    │   └── storyApi.ts            # progres, log pilihan, hasil, finish_story
    ├── pages/
    │   ├── StartScreen.tsx        # UI-00
    │   ├── Daftar.tsx             # UI-01
    │   ├── Masuk.tsx              # UI-02
    │   ├── Cerita.tsx             # /cerita/:storyId (gate + player)
    │   ├── Rapor.tsx              # UI-06
    │   ├── BukaDiKomputer.tsx     # UI-07
    │   └── SupabaseNotConfigured.tsx
    └── stories/
        ├── index.ts               # registry: auto-muat semua *.json di folder ini
        └── s1-penipuan.json       # Skenario 1
```

Berkas JSON cerita ada di `src/stories/`. Mesin cerita ada di `src/engine/`. Klien Supabase dan berkas konfigurasi ada di `src/lib/`. Layar cerita ada di `src/components/story/`.

## Menjalankan di komputer sendiri

```bash
npm install
npm run dev
```

Konfigurasi Supabase ada di `src/lib/config.ts` (bukan `.env`), karena aplikasi sengaja tidak membaca `import.meta.env`. Nilai `SUPABASE_URL` dan `SUPABASE_ANON_KEY` di situ milik proyek Supabase kita. Kalau kalian pakai proyek Supabase sendiri untuk percobaan, ganti dua nilai itu dengan milik kalian. Kunci publishable/anon memang terlihat di browser; yang melindungi data adalah aturan RLS di database. Kunci `service_role`, secret key, dan password database tidak boleh masuk ke repo atau ke kode di bagian mana pun. Kalau nilai masih placeholder `ISI_...`, aplikasi menampilkan layar "Konfigurasi Supabase belum diisi" alih-alih crash.

## Menyiapkan Supabase

Saya yang memegang proyek Supabase kita. Bagian ini untuk yang perlu membuat proyek sendiri untuk percobaan.

1. Buat proyek baru di supabase.com. Pilih region Southeast Asia (Singapore).
2. Matikan konfirmasi email: Authentication, Sign In / Providers, Email, lalu matikan "Confirm email".
3. Jalankan skema database: buka SQL Editor, tempel isi skema (tabel `profiles`, `story_progress`, `choice_log`, `scoring_rules`, `scoring_settings`, `story_results`, dan fungsi `finish_story`) lalu Run. TODO: berkas skema lengkap tidak ada di repo, minta ke saya. Setelah skema ada, jalankan `docs/supabase-grants.sql` untuk memberi izin (GRANT) dan mengaktifkan RLS.
4. Buat bucket Storage publik bernama `stories`, lalu buat folder per skenario (misalnya `s1-penipuan`) dan unggah gambar bernomor `001.jpg`, `002.jpg`, dan seterusnya. Ada script `scripts/upload-images.mjs` yang membuat bucket (jika belum ada) dan mengunggah semua berkas di `./images/`; script itu butuh key `service_role` (via env `SUPABASE_SERVICE_ROLE_KEY`, `.env`, atau `service-role.txt`).

Bucket `stories` publik, jadi jangan pernah mengunggah data siswa ke sana. Proyek Supabase paket gratis dijeda setelah sekitar seminggu tanpa aktivitas, jadi buka dashboard sehari sebelum sesi kelas.

## Cara kerja cerita

Cerita dibaca dari berkas JSON, satu berkas per skenario. Isinya daftar node, dan tiap node menunjuk node berikutnya lewat `next`.

| Tipe node | Fungsi |
|---|---|
| `scene` | Satu adegan. Berisi gambar, teks alternatif, node berikutnya, dan posisi tombol Lanjut/Kembali (`controlsY`). |
| `choice` | Titik keputusan. Berisi narasi dan daftar opsi, tiap opsi punya teks, node tujuan, dan perubahan skor. |
| `consequence` | Layar akibat dari satu opsi. Berisi judul, penjelasan, dan node berikutnya. |
| `end` | Akhir cerita. Mengarah ke rapor. |

Adegan cerita adalah gambar utuh hasil export dari Figma. Narasi dan balon dialog sudah ada di dalam gambar, jadi aplikasi tidak menulis teks di atasnya. Hanya layar pilihan dan layar konsekuensi yang teksnya dibuat dengan HTML.

Cerita maju lewat tombol Lanjut dan Kembali. Di layar adegan, tombol Spasi, Enter, dan panah kanan juga melanjutkan, dan panah kiri kembali. Klik di sembarang tempat tidak melanjutkan cerita. Tombol Lanjut di layar konsekuensi nonaktif sekitar dua detik supaya akibat pilihan sempat terbaca.

Alur layar pilihan: opsi A, B, dan C berupa kartu (tombol) HTML. Siswa memilih satu kartu, lalu menekan tombol "Konfirmasi pilihan" (nonaktif sampai ada yang dipilih). Tidak ada tombol pembatalan, tetapi siswa bisa mengganti pilihan sebelum mengonfirmasi. Teks risiko tidak muncul sebelum konfirmasi; kartu hanya berisi aksi. Setelah dikonfirmasi, layar konsekuensi menampilkan pilihan yang dipilih, akibatnya, dan perubahan skor.

Setiap pilihan yang dikonfirmasi dicatat di database dengan opsi pertama yang diklik dan opsi akhir. Progres tersimpan otomatis, jadi cerita bisa dilanjutkan setelah halaman dimuat ulang. Mengulang skenario membuat percobaan baru, dan data percobaan lama tidak dihapus.

Skor dihitung oleh database lewat fungsi `finish_story`. Aplikasi hanya menampilkan hasilnya di rapor. Rapor berisi nama, tanggal dan jam selesai (zona Asia/Jakarta), kategori, tiga skor, dan tips.

## Aturan skor

Tiga indikator: Privasi, Reputasi, Keamanan. Perubahan skor per pilihan mengikuti dokumen strategi proyek:

| Jenis pilihan | Perubahan skor |
|---|---|
| Aman | 0 sampai +10 |
| Cukup berisiko | -10 sampai -20 |
| Sangat berisiko | -25 sampai -40 |

Nilai awal tiap indikator disimpan di tabel `scoring_settings` di database; saat ini 70 (TODO: konfirmasi nilainya). Dokumen strategi menyebut 100, tapi kalau mulai dari 100 dan batasnya 100, pilihan aman tidak bisa menaikkan skor. Skor dibatasi antara 0 dan 100.

Batas kategori sementara: rata-rata di bawah 60 jadi Pemula Digital, 60 sampai 74 Pengguna Waspada, 75 ke atas Warga Digital Bijak. Angka ini placeholder. Dengan satu skenario kategorinya belum berarti banyak, jadi kita kalibrasi setelah semua skenario selesai. Nilai awal dan batas kategori disimpan di tabel `scoring_settings`, jadi mengubahnya tidak perlu menyentuh kode.

## Membuat skenario baru

Berlaku untuk Skenario 2 dan 3. Contoh lengkapnya ada di `src/stories/s1-penipuan.json`.

1. Tulis kontennya dulu dengan templat di bawah.
2. Lengkapi desain di Figma.
3. Export gambar.
4. Unggah gambar ke Supabase Storage.
5. Tulis berkas JSON cerita.
6. Tambahkan aturan skor di database.
7. Daftarkan skenario di aplikasi.
8. Uji semua jalur.

### Langkah 1: konten

```
ID Skenario     : S02
Tema            : Hoaks
Situasi         : (2-3 kalimat latar cerita)
Pilihan A       : (aksi) -> Konsekuensi: (...) -> Skor: Privasi 0, Reputasi -20, Keamanan 0
Pilihan B       : (aksi) -> Konsekuensi: (...) -> Skor: ...
Pilihan C       : (aksi) -> Konsekuensi: (...) -> Skor: ...
Refleksi        : (penjelasan edukatif 2-3 kalimat)
Tips praktis    : (1-2 langkah yang bisa dilakukan siswa)
Sumber rujukan  : (referensi pendukung)
```

Semua nama, akun, dan kasus harus fiktif. Nada tulisannya edukatif dan tidak menghakimi, termasuk untuk pilihan yang berisiko. Tiap titik keputusan punya 2 sampai 4 pilihan, dan tiap pilihan punya konsekuensi yang jelas.

Satu pelajaran dari Skenario 1: refleksi harus cocok untuk semua pilihan, atau dibedakan per jalur. Refleksi yang berbunyi "aku hampir saja tertipu" terasa janggal bagi siswa yang tadi memilih langkah berisiko. Jangan juga menampilkan label "risiko" atau "lebih aman" sebelum siswa mengonfirmasi pilihan, karena itu membocorkan jawabannya.

### Langkah 2: Figma

Satu frame untuk satu adegan, ukuran 1920x1080. Teks narasi dan dialog ditaruh di dalam frame, karena frame akan diekspor utuh sebagai gambar. Gayanya sama dengan Skenario 1: font Inder 36 pt, kotak narasi hitam 40% dengan garis putih 30% dan sudut 24, balon dialog putih. Untuk layar pilihan, siapkan juga satu gambar latar tanpa teks. Beri nama frame berurutan (`S2_001`, `S2_002`) dan jangan ada nama ganda. Di Skenario 1 ada sembilan frame bernama "Scene-4", dan itu menyulitkan saat export.

### Langkah 3: export

Format JPEG, skala 1x, hasilnya 1920x1080 dengan ukuran sekitar 200 KB per gambar. Beri nama berurutan: `001.jpg`, `002.jpg`, dan seterusnya sesuai urutan cerita. Periksa tiap gambar sebelum diunggah. Cacat yang ketemu di Skenario 1:

- tanda kutip nyasar di awal kalimat
- garis putih tipis di tepi gambar
- kotak narasi kosong yang tertinggal
- narasi yang sama muncul di dua frame berbeda
- frame yang bukan 16:9

### Langkah 4: unggah gambar

Unggah ke bucket `stories`, di folder skenario masing-masing (`s2-hoaks`, `s3-privasi`). Ada script `scripts/upload-images.mjs` yang membuat bucket (jika belum ada) dan mengunggah semua berkas di `./images/`. Di JSON, jalurnya ditulis relatif terhadap bucket, misalnya `s2-hoaks/001.jpg`.

### Langkah 5: JSON cerita

Ikuti bentuk berkas Skenario 1. Tiap berkas punya `id`, `title`, `subtitle`, `startNodeId`, `totalSteps`, dan `nodes` (plus `stage` dan `notes` untuk internal). Engine menerima beberapa varian: `name` (alih-alih `title`), `startId` (alih-alih `startNodeId`), dan `nodes` sebagai array atau objek. Contoh node pilihan:

```json
{
  "id": "s2-choice",
  "type": "choice",
  "image": "s2-hoaks/025.jpg",
  "narration": "Apa yang akan kamu lakukan?",
  "options": [
    { "id": "A", "text": "...", "next": "s2-cons-A", "scores": { "privasi": 0, "reputasi": -20, "keamanan": 0 } },
    { "id": "B", "text": "...", "next": "s2-cons-B", "scores": { "privasi": 0, "reputasi": 5, "keamanan": 5 } }
  ]
}
```

`id` node harus unik di seluruh aplikasi, jadi awali dengan kode skenario (`s2-`, `s3-`). Setiap `next` harus menunjuk node yang ada, dan tidak boleh ada jalan buntu. Teks adegan tidak ditulis di JSON karena sudah ada di dalam gambar. Field `alt` hanya untuk teks alternatif gambar.

### Langkah 6: aturan skor di database

Tambahkan satu baris per pilihan lewat SQL Editor di Supabase:

```sql
insert into public.scoring_rules (story_id, node_id, choice_id, d_privasi, d_reputasi, d_keamanan) values
  ('s2-hoaks', 's2-choice', 'A', 0, -20, 0),
  ('s2-hoaks', 's2-choice', 'B', 0,   5, 5)
on conflict (story_id, node_id, choice_id) do nothing;
```

`story_id` dan `node_id` harus sama persis dengan yang ada di JSON. Salah satu huruf saja dan skornya tidak terhitung. TODO: konfirmasi nama kolom `scoring_rules` dengan skema database.

### Langkah 7: daftarkan di aplikasi

Skenario didaftarkan otomatis. Letakkan berkas JSON di `src/stories/` (misalnya `s2-hoaks.json`); registry di `src/stories/index.ts` memuat semua `*.json` di folder itu lewat `import.meta.glob` dan mendaftarkannya dengan nama berkas (tanpa ekstensi). Skenario langsung bisa diakses di `/cerita/<nama-berkas>`. Tidak ada fungsi yang perlu diedit. Kalau ada yang tidak jelas, tanya saya sebelum mengubah mesin cerita.

### Langkah 8: uji

Mainkan dari adegan pertama sampai akhir untuk setiap pilihan, lalu periksa:

- gambar semua termuat dan sesuai desain
- tombol Lanjut dan Kembali tidak menutupi teks penting di gambar
- skor di rapor sama dengan hitungan manual untuk tiap pilihan
- muat ulang di tengah cerita, progres lanjut dari adegan yang sama
- tidak ada teks ganda, yaitu teks HTML yang bertumpuk dengan teks di dalam gambar

## Pembagian tugas

Saya mengerjakan Skenario 1, mesin cerita, dan proyek Supabase (database dan bucket gambar). Kalau kalian perlu mengubah mesin cerita, skema database, atau daftar skenario, bilang ke saya dulu supaya tidak bentrok.

Ayun mengerjakan landing page dan Skenario 2 (Hoaks). Desain acuan landing page ada di frame "UI-00 Halaman Awal" di Figma: judul, subjudul, tombol Daftar dan Masuk, ditambah petunjuk singkat cara bermain. Soal halaman pemilihan skenario setelah login belum diputuskan, jadi tanya saya sebelum membuatnya.

Syihan mengerjakan Skenario 3 (Privasi).

Pengerjaan Skenario 2 dan 3 mulai dari langkah 1 di atas, yaitu menulis konten.

## Alur Git

Satu cabang per tugas: `landing-page`, `skenario-2-hoaks`, `skenario-3-privasi`. Jangan bekerja langsung di `main`. Commit kecil dengan pesan yang jelas, misalnya `skenario-2: tambah adegan 1-10`. Buka Pull Request ke `main` dan saya yang meninjau sebelum digabung. Konflik paling sering muncul di berkas bersama (mesin cerita, daftar skenario, skema SQL), jadi kabari saya sebelum mengubahnya.

Sebelum commit, pastikan tidak ada secret key, `service_role`, atau password database di perubahan kalian.

## Yang belum diputuskan

1. Alur layar pilihan. Desain Figma asli punya layar pratinjau tiap opsi lalu konfirmasi dengan tombol silang dan centang. Yang dibuat di kode berbeda: satu layar dengan tiga kartu opsi (A, B, C) dan satu tombol "Konfirmasi pilihan". Tidak ada layar pratinjau per opsi, dan tidak ada tombol silang/centang. Siswa memilih kartu, bisa mengganti pilihan, lalu mengonfirmasi.
2. Apakah refleksi dibedakan per jalur pilihan.
3. Apakah konsekuensi punya efek lanjutan, misalnya beberapa jam atau hari kemudian.
4. Nilai awal skor (70 atau 100) dan batas kategori.
5. Apakah ada halaman pemilihan skenario setelah login.
6. Jumlah skenario. Dokumen strategi menargetkan 8 sampai 10, sedangkan yang direncanakan baru 3.

## Batasan

Pilihan siswa dikirim dari browser. Siswa yang paham teknis bisa mengirim pilihan palsu lewat API, jadi rapor ini cukup untuk tugas kelas tapi tidak untuk penelitian yang butuh data bebas manipulasi. Log pilihan sudah dibuat tidak bisa diubah atau dihapus dari sisi klien, yang menutup celah paling mudah.

Teks konsekuensi Skenario 1 masih draf. Dua gambar Skenario 1 masih punya cacat yang belum diperbaiki di Figma: kotak narasi kosong di adegan 7 dan narasi yang terulang di adegan 4 (sama dengan adegan 3).
