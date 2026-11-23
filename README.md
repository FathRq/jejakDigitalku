# Jejak Digitalku

Simulasi **visual novel** literasi digital untuk siswa: penipuan online, hoaks, dan privasi data. Peserta masuk dengan kode anonim, mengerjakan pre-test, membuat profil fiktif, memainkan tiga skenario, lalu melihat rapor digital, post-test, dan kuesioner.

Dibangun dengan **React 19 + Vite 8 + Tailwind CSS 4**. Tanpa backend: progres disimpan di `localStorage`, hasil bisa diunduh sebagai JSON atau dikirim ke endpoint opsional.

## Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

```bash
npm run build    # build produksi ke dist/
npm run preview  # pratinjau hasil build
npm run lint     # cek ESLint
```

## Alur

`Landing → Pre-Test (5 soal) → Profil fiktif → 3 skenario (bebas urutan) → Rapor → Post-Test (5 soal) → Kuesioner SUS + kepuasan → Selesai`

- Tombol **Login / SignUp** di landing hanya membuka penjelasan "segera hadir" dan mengarahkan peserta memakai kode peserta. Tidak ada autentikasi.
- Skenario boleh dimainkan dalam urutan bebas. Rapor terbuka setelah ketiganya selesai.
- Setiap skenario berisi cerita bergambar, satu titik keputusan, konsekuensi, dan refleksi + tips.
- Skenario 3 memiliki epilog tambahan bila peserta memilih jalur aman.

## Aturan skor

Tiga indikator: **Privasi**, **Reputasi**, **Keamanan** (mulai 100, dibatasi 0–100).

- Setiap pilihan keputusan memberi delta pada ketiga indikator.
- Profil **Publik** membuat delta Privasi negatif 20% lebih besar.
- Gelar akhir: 80–100 **Warga Digital Bijak**, 50–79 **Pengguna Waspada**, 0–49 **Pemula Digital**.
- Pre/post-test: 5 soal × 20 poin.
- SUS: item ganjil `(skor − 1)`, item genap `(5 − skor)`, total × 2,5.

## Pengiriman hasil

Salin `.env.example` menjadi `.env` lalu isi:

```bash
VITE_SUBMIT_URL=https://script.google.com/macros/s/.../exec
```

Payload dikirim sebagai `text/plain` (menghindari preflight CORS pada Apps Script). Tanpa variabel ini, hasil tetap lokal dan peserta dapat mengunduh `jejak-digitalku-<kode>.json`.

Payload mencakup: timestamp, kode peserta, profil fiktif, skor pre/post-test, skor akhir, pilihan tiap skenario, jawaban SUS, skor SUS, jawaban kepuasan, masukan, dan durasi sesi. Tidak ada nama asli, email, atau nomor telepon.

## Aset desain

Frame asli ada di `LD_JEJAK_DIGITALKU_DESIGN/` dan **tidak diubah**. Frame dipilih lalu dikonversi ke WebP di `public/scenarios/` (plus `public/hero.webp`) oleh:

```bash
npm run assets
```

Membutuhkan Python 3 + Pillow. Skrip ada di `scripts/prepare-assets.py`; sumber tetap dibaca dari folder desain, sehingga aman dijalankan ulang.

## Struktur

```
src/
  components/
    layout/   PhoneFrame, TopBar, ProgressDots
    ui/       Button, Icon, Modal, Likert, ScoreBar, Badge
  context/    SessionContext (reducer + localStorage)
  data/       scenarios, questions, survey, avatars
  lib/        scoring, sus, storage, submit, payload, utils
  screens/    Landing, TestScreen, ProfileSetup, Home,
              ScenarioScreen, Report, Survey, Finish
  App.jsx     state machine layar
scripts/
  prepare-assets.py
```

## Catatan

- Narasi dan teks pilihan sudah tercetak di dalam frame desain; teks transkrip disimpan di `src/data/scenarios.js` untuk aksesibilitas dan ditampilkan di bawah gambar.
- Progres tersimpan otomatis. "Mulai ulang sesi" menghapus data dari perangkat.
- Target perangkat: ponsel 360 px ke atas; tombol minimal 44 px.
