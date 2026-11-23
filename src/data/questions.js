export const PRE_TEST = [
  {
    id: "pre-1",
    tema: "Penipuan Online",
    pertanyaan:
      'Kamu menerima DM: "Selamat, kamu menang undian! Klik tautan ini untuk klaim hadiah." Apa yang sebaiknya kamu lakukan pertama kali?',
    pilihan: [
      "Langsung klik tautan agar hadiah tidak hangus.",
      "Isi data diri supaya hadiah segera dikirim.",
      "Periksa akun pengirim dan cek info di akun resmi toko.",
      "Teruskan ke teman agar mereka ikut menang.",
    ],
    jawaban: 2,
    penjelasan:
      "Verifikasi akun dan tautan lewat kanal resmi sebelum mengambil tindakan. Tekanan waktu adalah tanda bahaya.",
  },
  {
    id: "pre-2",
    tema: "Hoaks",
    pertanyaan:
      'Di grup kelas beredar pesan "Besok sekolah libur karena banjir" tanpa tanggal dan sumber yang jelas. Sikap terbaikmu?',
    pilihan: [
      "Langsung teruskan ke semua grup.",
      "Cek situs atau akun resmi sekolah sebelum meneruskan.",
      "Tambahkan komentar dramatis agar semua percaya.",
      "Diam saja dan tunggu orang lain meneruskan.",
    ],
    jawaban: 1,
    penjelasan:
      "Hoaks sering memancing panik. Periksa sumber, tanggal, dan kanal resmi sebelum membagikan.",
  },
  {
    id: "pre-3",
    tema: "Privasi Data",
    pertanyaan:
      "Temanmu mengunggah foto bersama dan kartu pelajarmu terlihat di dalamnya. Apa yang sebaiknya kamu lakukan?",
    pilihan: [
      "Membiarkannya karena foto itu terlihat biasa.",
      "Meminta temanmu menghapus atau menyensor data pribadimu dengan sopan.",
      "Ikut mengunggah ulang foto itu.",
      "Menyebarkan tautan foto ke grup lain.",
    ],
    jawaban: 1,
    penjelasan:
      "Kartu pelajar memuat nama, nomor identitas, dan kelas. Data itu tidak boleh tersebar bebas.",
  },
  {
    id: "pre-4",
    tema: "Keamanan Akun",
    pertanyaan:
      'Seseorang mengaku temanmu meminta kode OTP "untuk membantu verifikasi akun". Tindakanmu?',
    pilihan: [
      "Memberikan kode agar urusan cepat selesai.",
      "Menolak, tidak membagikan kode, dan menghubungi teman lewat jalur lain.",
      "Mengirim kode lewat DM lain.",
      "Membalas dengan nomor rekening.",
    ],
    jawaban: 1,
    penjelasan:
      "Kode OTP adalah kunci akun. Tidak ada alasan sah untuk membagikannya kepada siapa pun.",
  },
  {
    id: "pre-5",
    tema: "Jejak Digital",
    pertanyaan: "Unggahan yang sudah kamu hapus dari media sosial...",
    pilihan: [
      "Hilang sepenuhnya dari internet.",
      "Masih bisa tersimpan lewat tangkapan layar atau arsip.",
      "Tidak bisa dilihat siapa pun.",
      "Hanya bisa dilihat oleh admin platform.",
    ],
    jawaban: 1,
    penjelasan:
      "Jejak digital bisa bertahan lewat tangkapan layar, arsip, dan unggahan ulang orang lain.",
  },
];

export const POST_TEST = [
  {
    id: "post-1",
    tema: "Penipuan Online",
    pertanyaan:
      'Kamu mendapat tautan "klaim hadiah" yang meminta nama lengkap, alamat rumah, dan tanggal lahir. Langkah paling aman?',
    pilihan: [
      "Isi seperlunya agar hadiah cepat datang.",
      "Verifikasi lewat akun resmi toko dan laporkan tautan mencurigakan.",
      "Kirim data ke teman untuk dicek.",
      "Klik tautan dan lihat dulu tampilannya.",
    ],
    jawaban: 1,
    penjelasan:
      "Tautan hadiah yang meminta data sensitif hampir selalu penipuan. Verifikasi dan laporkan.",
  },
  {
    id: "post-2",
    tema: "Hoaks",
    pertanyaan:
      "Video bencana viral di grup keluarga tanpa tanggal dan sumber. Apa yang kamu lakukan?",
    pilihan: [
      "Langsung sebarkan ke grup lain.",
      "Cek tanggal, sumber, dan akun resmi sebelum mempercayai.",
      "Percaya karena sudah banyak yang membagikan.",
      "Tambahkan narasi agar lebih menarik.",
    ],
    jawaban: 1,
    penjelasan:
      "Banyaknya orang yang membagikan bukan bukti kebenaran. Cek sumber dan tanggalnya.",
  },
  {
    id: "post-3",
    tema: "Privasi Data",
    pertanyaan:
      "Temanmu mengunggah fotomu tanpa izin dan lokasi sekolah terlihat. Sikap terbaik?",
    pilihan: [
      "Marah dan membalas dengan unggahan buruk tentangnya.",
      "Minta dengan sopan agar foto dihapus, lalu sepakati izin sebelum mengunggah.",
      "Diamkan saja karena tidak ingin ribut.",
      "Unggah ulang fotonya sebagai balasan.",
    ],
    jawaban: 1,
    penjelasan:
      "Komunikasi sopan lebih efektif daripada membalas dengan hal yang sama berisikonya.",
  },
  {
    id: "post-4",
    tema: "Keamanan Akun",
    pertanyaan:
      'Temanmu meminta kode OTP dengan alasan "akunnya bermasalah". Tindakanmu?',
    pilihan: [
      "Memberikan kode karena dia teman.",
      "Menolak dan menghubunginya lewat telepon atau tatap muka.",
      "Mengirim kode tapi meminta janji tidak disalahgunakan.",
      "Memberikan kode setelah dia memaksa.",
    ],
    jawaban: 1,
    penjelasan:
      "Akun bisa dibajak dan mengaku sebagai temanmu. Verifikasi lewat jalur lain.",
  },
  {
    id: "post-5",
    tema: "Privasi Data",
    pertanyaan: "Apa manfaat utama mengatur akun media sosial menjadi privat?",
    pilihan: [
      "Akun otomatis bebas dari penipuan.",
      "Membatasi siapa yang bisa melihat unggahan dan informasi pribadi.",
      "Membuat unggahan lebih cepat viral.",
      "Menghapus semua komentar negatif.",
    ],
    jawaban: 1,
    penjelasan:
      "Akun privat mengurangi jangkauan orang asing, tetapi kamu tetap perlu berhati-hati saat mengunggah.",
  },
];

export function scoreTest(questions, answers) {
  const correct = questions.reduce((total, question, index) => {
    return total + (answers?.[index] === question.jawaban ? 1 : 0);
  }, 0);

  return {
    correct,
    total: questions.length,
    score: Math.round((correct / questions.length) * 1000) / 10,
  };
}
