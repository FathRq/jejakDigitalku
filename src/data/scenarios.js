export const SCENARIOS = [
  {
    id: "S01",
    nomor: 1,
    tema: "Penipuan Online",
    judul: "DM: Kamu Menang Hadiah!",
    ringkas:
      "Kenali pesan, tautan, dan hadiah palsu sebelum kamu terjebak memberi data pribadi.",
    cover: "/scenarios/s1/s1-cover.webp",
    aksen: "#7C3AED",
    indikatorFokus: "keamanan",
    frames: [
      {
        src: "/scenarios/s1/s1-01.webp",
        alt: "Kamar tidur malam hari; seseorang memegang ponsel yang menampilkan pesan masuk.",
        teks: "Malam itu, kamu sedang bersantai di kamar setelah menyelesaikan tugas. Sebuah notifikasi pesan langsung muncul di layar ponselmu.",
      },
      {
        src: "/scenarios/s1/s1-02.webp",
        alt: "Tangkapan layar DM dari akun ElectroMart_Official berisi tawaran hadiah dan tautan pendek.",
        teks: "Pengirimnya mengaku dari ElectroMart_Official. Kamu 'terpilih' sebagai pemenang giveaway dan diminta membuka tautan klaim hadiah.",
      },
      {
        src: "/scenarios/s1/s1-03.webp",
        alt: "Profil akun ElectroMart_Official dengan 12,4 ribu pengikut dan unggahan produk elektronik.",
        teks: "Kamu membuka profil pengirim. Akun itu punya banyak pengikut dan unggahan produk, sekilas tampak seperti akun resmi.",
      },
      {
        src: "/scenarios/s1/s1-04.webp",
        alt: "Pesan baru meminta nama lengkap, nomor telepon, alamat, dan tanggal lahir dengan hitungan waktu.",
        teks: "Pesan baru masuk. Mereka meminta nama lengkap, nomor telepon, alamat rumah, dan tanggal lahir, lengkap dengan hitungan waktu yang mendesak.",
      },
      {
        src: "/scenarios/s1/s1-05.webp",
        alt: "Nadia mengirim pesan agar kamu tidak mengisi data dan memeriksa akun bersama.",
        teks: "Kamu mulai ragu. Nadia mengirim pesan: 'Jangan isi data apa pun dulu. Kita periksa akunnya bersama.'",
      },
      {
        src: "/scenarios/s1/s1-06.webp",
        alt: "Panggilan video dengan Nadia; kamu membandingkan username pengirim dengan akun resmi toko.",
        teks: "Nadia membantumu membandingkan username pengirim dengan akun resmi toko. Ternyata ada perbedaan ejaan dan alamat situs.",
      },
      {
        src: "/scenarios/s1/s1-07.webp",
        alt: "Nadia mencurigai akun palsu yang menyerupai akun resmi.",
        teks: "Nadia: 'Ini bisa jadi akun palsu yang sengaja dibuat menyerupai akun resmi supaya orang percaya.'",
      },
      {
        src: "/scenarios/s1/s1-08.webp",
        alt: "Nadia menjelaskan bahwa jumlah pengikut bukan jaminan keamanan akun.",
        teks: "Nadia: 'Jumlah pengikut bukan jaminan akun itu aman. Sekarang banyak akun palsu yang meniru identitas toko terkenal.'",
      },
      {
        src: "/scenarios/s1/s1-09.webp",
        alt: "Kamu menyadari perlu memeriksa apakah akun dan informasinya benar-benar resmi.",
        teks: "Kamu: 'Iya. Aku harus periksa dulu apakah akun dan informasinya benar-benar resmi.'",
      },
      {
        src: "/scenarios/s1/s1-10.webp",
        alt: "Kamu membuka akun resmi toko dan tidak menemukan pengumuman giveaway.",
        teks: "Kamu membuka akun resmi toko dan mencari pengumuman giveaway. Tidak ada pengumuman apa pun.",
      },
      {
        src: "/scenarios/s1/s1-11.webp",
        alt: "Nadia memperingatkan agar kamu tidak memasukkan data pribadi ke situs yang tidak jelas.",
        teks: "Nadia: 'Nah, berarti semakin mencurigakan. Jangan sampai kamu memasukkan data pribadi ke situs yang nggak jelas.'",
      },
      {
        src: "/scenarios/s1/s1-12.webp",
        alt: "Kamu bingung karena pesan terus berdatangan.",
        teks: "Kamu: 'Mereka terus-terusan mengirim pesan. Aku jadi bingung harus bagaimana.'",
      },
      {
        src: "/scenarios/s1/s1-13.webp",
        alt: "Pesan mendesak agar formulir segera diisi sebelum hadiah dialihkan.",
        teks: "Pesan terakhir: 'Kesempatanmu hampir berakhir. Segera isi formulir sekarang agar hadiah tidak dialihkan kepada orang lain!'",
      },
      {
        src: "/scenarios/s1/s1-14.webp",
        alt: "Kamu menyadari tekanan waktu sebagai tanda bahaya dan mulai menentukan sikap.",
        teks: "Kamu menyadari tekanan waktu itu justru tanda bahaya. Kini saatnya menentukan sikap.",
      },
    ],
    keputusan: {
      frame: "/scenarios/s1/s1-decision.webp",
      pertanyaan: "Pesan itu semakin mendesak. Apa yang akan kamu lakukan?",
      pilihan: [
        {
          id: "A",
          teks: "Mengeklik tautan dan mengisi seluruh data pribadi agar hadiah bisa segera diklaim.",
          skor: { privasi: -35, reputasi: 0, keamanan: -30 },
          konsekuensi: {
            judul: "Data pribadimu disalahgunakan",
            teks: "Hadiah tidak pernah datang. Data pribadimu dipakai untuk menghubungi dan menipu orang lain. Beberapa hari kemudian, kamu menerima banyak SMS dan panggilan mencurigakan.",
          },
        },
        {
          id: "B",
          teks: "Mengabaikan pesan, memblokir akun, dan melaporkannya sebagai penipuan.",
          skor: { privasi: 5, reputasi: 5, keamanan: 5 },
          konsekuensi: {
            judul: "Kamu berhenti tepat waktu",
            teks: "Kamu memblokir dan melaporkan akun tersebut. Tidak ada data yang bocor, meski pesan penipuan lain masih mungkin datang.",
          },
        },
        {
          id: "C",
          teks: "Memastikan informasi lewat akun resmi toko, lalu melaporkan akun yang mencurigakan.",
          skor: { privasi: 10, reputasi: 10, keamanan: 15 },
          konsekuensi: {
            judul: "Kamu memutus rantai penipuan",
            teks: "Kamu mengonfirmasi ke akun resmi bahwa giveaway itu palsu, lalu melaporkan akun penipu. Data pribadimu tetap aman dan kamu membantu orang lain terhindar dari penipuan yang sama.",
          },
        },
      ],
    },
    refleksi: {
      frames: [
        {
          src: "/scenarios/s1/s1-refl-1.webp",
          alt: "Nadia mengingatkan agar tidak mudah tergiur hadiah.",
          teks: "Nadia: 'Betul! Jangan mudah tergiur, apalagi kalau sampai diminta mengisi data pribadi lewat link yang mencurigakan.'",
        },
        {
          src: "/scenarios/s1/s1-refl-2.webp",
          alt: "Kamu bersyukur belum mengisi formulir.",
          teks: "Kamu: 'Iya, untung aku belum mengisi formulirnya.'",
        },
        {
          src: "/scenarios/s1/s1-refl-3.webp",
          alt: "Nadia menyarankan mengganti password dan mengaktifkan verifikasi dua langkah.",
          teks: "Nadia: 'Kalau sudah terlanjur memberikan data, segera ganti password dan aktifkan verifikasi dua langkah.'",
        },
        {
          src: "/scenarios/s1/s1-refl-4.webp",
          alt: "Nadia menegaskan agar tidak langsung percaya pesan berhadiah.",
          teks: "Nadia: 'Jadi, sekarang sudah tahu, kan? Kalau dapat pesan yang menawarkan hadiah, jangan langsung percaya.'",
        },
        {
          src: "/scenarios/s1/s1-refl-5.webp",
          alt: "Kamu merenungkan bahwa kamu hampir tertipu karena tergiur hadiah.",
          teks: "Kamu: 'Ternyata, aku hampir saja tertipu hanya karena tergiur hadiah.'",
        },
      ],
      narasi:
        "Penipu memanfaatkan rasa senang, rasa takut kehilangan, dan tekanan waktu. Akun palsu bisa meniru nama, logo, bahkan jumlah pengikut toko terkenal.",
      tips: [
        "Cek username dan akun resmi sebelum percaya.",
        "Jangan bagikan data pribadi lewat tautan.",
        "Waspadai tekanan waktu dan ancaman kehilangan hadiah.",
        "Blokir dan laporkan akun penipu.",
      ],
    },
  },
  {
    id: "S02",
    nomor: 2,
    tema: "Hoaks",
    judul: "Pesan Berantai di Grup Kelas",
    ringkas:
      "Cek kebenaran kabar heboh sebelum kamu ikut meneruskannya ke grup lain.",
    cover: "/scenarios/s2/s2-cover.webp",
    aksen: "#0EA5E9",
    indikatorFokus: "reputasi",
    frames: [
      {
        src: "/scenarios/s2/s2-01.webp",
        alt: "Grup kelas 8A ramai oleh pesan berantai tentang sekolah diliburkan karena banjir.",
        teks: "Malam itu, grup Kelas 8A ramai oleh pesan 'Diteruskan'. Bimo mengirim kabar: sekolah diliburkan karena banjir besar.",
      },
      {
        src: "/scenarios/s2/s2-02.webp",
        alt: "Teman-teman meneruskan pesan; kamu ragu dan mengirim tangkapan layar ke Nadia.",
        teks: "Teman-teman mulai meneruskan pesan itu ke grup lain. Jarimu sudah di tombol 'Teruskan', tapi kamu ragu dan mengirim tangkapan layar ke Nadia.",
      },
      {
        src: "/scenarios/s2/s2-03.webp",
        alt: "Nadia memeriksa situs resmi sekolah dan menemukan tanda-tanda hoaks.",
        teks: "Nadia membantumu memeriksa situs resmi sekolah. Tidak ada pengumuman libur. Pesannya juga tanpa tanggal, banyak huruf kapital, dan fotonya lama.",
      },
      {
        src: "/scenarios/s2/s2-04.webp",
        alt: "Grup kembali ramai; teman-teman mendesakmu ikut menyebarkan pesan.",
        teks: "Grup kembali ramai. Teman-teman mendesakmu ikut menyebarkan. Nadia mengingatkan: 'Kalau salah, kamu bisa dianggap penyebar kabar bohong.'",
      },
    ],
    keputusan: {
      frame: "/scenarios/s2/s2-decision.webp",
      pertanyaan: "Apa yang akan kamu lakukan?",
      pilihan: [
        {
          id: "A",
          teks: "Langsung meneruskan pesan ke grup kelas dan grup lain.",
          skor: { privasi: 0, reputasi: -30, keamanan: -10 },
          konsekuensi: {
            judul: "Kabar bohong menyebar lebih jauh",
            teks: "Pesan itu menyebar ke banyak grup. Keesokan harinya sekolah tetap masuk. Teman-teman dan guru tahu kamu ikut menyebarkan kabar bohong; reputasimu di kelas menurun.",
          },
        },
        {
          id: "B",
          teks: "Mengabaikan pesan dan menunggu sampai besok pagi.",
          skor: { privasi: 0, reputasi: -10, keamanan: -5 },
          konsekuensi: {
            judul: "Kamu diam, tetapi kabar tetap beredar",
            teks: "Kamu tidak menyebarkan pesan itu, tetapi teman-teman lain tetap panik. Karena tidak ada yang mengoreksi, kabar bohong terus beredar.",
          },
        },
        {
          id: "C",
          teks: "Memastikan lewat akun resmi sekolah, mengabari grup bahwa kabar itu belum terbukti, lalu melaporkan pesannya.",
          skor: { privasi: 5, reputasi: 15, keamanan: 10 },
          konsekuensi: {
            judul: "Kamu menghentikan kepanikan",
            teks: "Kamu mengabari grup bahwa kabar itu belum terbukti dan meminta semua menunggu pengumuman resmi. Beberapa teman berterima kasih karena tidak jadi ikut menyebarkan.",
          },
        },
      ],
    },
    refleksi: {
      frames: [
        {
          src: "/scenarios/s2/s2-06.webp",
          alt: "Nadia menjelaskan cara memeriksa sumber, tanggal, dan akun resmi sebelum membagikan.",
          teks: "Nadia: 'Sebelum membagikan sesuatu, cek tiga hal: siapa sumbernya, kapan dibuat, dan apakah ada di akun resmi.' Kamu berhenti menekan tombol teruskan.",
        },
      ],
      narasi:
        "Kabar bisa menyebar lebih cepat daripada kebenarannya. Hoaks sering memakai huruf kapital, ajakan panik, foto lama, dan tanpa tanggal untuk memancing orang ikut menyebarkan.",
      tips: [
        "Cek sumber, tanggal, dan akun resmi.",
        "Jangan meneruskan pesan yang memancing panik.",
        "Koreksi kabar bohong dengan sopan di grup.",
        "Laporkan pesan hoaks ke platform.",
      ],
    },
  },
  {
    id: "S03",
    nomor: 3,
    tema: "Privasi Data",
    judul: "Foto Candid dan Kartu Pelajar",
    ringkas:
      "Pelajari cara melindungi data pribadi ketika foto orang lain membuatmu ikut terekspos.",
    cover: "/scenarios/s3/s3-cover.webp",
    aksen: "#DB2777",
    indikatorFokus: "privasi",
    frames: [
      {
        src: "/scenarios/s3/s3-01.webp",
        alt: "Unggahan Raka berisi foto kegiatan bersama teman-teman beberapa hari lalu.",
        teks: "Sore itu, kamu membuka media sosial dan melihat unggahan Raka: foto kegiatan bersama teman-teman beberapa hari lalu.",
      },
      {
        src: "/scenarios/s3/s3-02.webp",
        alt: "Kartu pelajar dengan nama, NISN, dan kelas terlihat jelas di dalam foto.",
        teks: "Saat mengamati foto, kamu menyadari kartu pelajarmu terlihat jelas, lengkap dengan nama, NISN, dan kelas.",
      },
      {
        src: "/scenarios/s3/s3-03.webp",
        alt: "Kamu merasa tidak nyaman karena informasi pribadi ikut terlihat.",
        teks: "Kamu mulai merasa tidak nyaman. Informasi di dalam foto itu seharusnya tidak dibagikan ke publik.",
      },
      {
        src: "/scenarios/s3/s3-04.webp",
        alt: "Notifikasi pesan dari akun tidak dikenal masuk ke ponselmu.",
        teks: "Beberapa menit kemudian, akun tak dikenal mengirim pesan yang membuatmu terkejut.",
      },
      {
        src: "/scenarios/s3/s3-05.webp",
        alt: "Akun tidak dikenal mengetahui nama lengkap dan nomor identitas sekolahmu.",
        teks: "Akun itu tahu nama lengkap dan nomor identitas sekolahmu, lalu mulai menanyakan alamat rumahmu.",
      },
      {
        src: "/scenarios/s3/s3-06.webp",
        alt: "Profil akun tidak dikenal tidak memiliki informasi pemilik yang jelas.",
        teks: "Kamu memeriksa profil akun tersebut, tetapi tidak ada informasi yang jelas tentang pemiliknya.",
      },
      {
        src: "/scenarios/s3/s3-07.webp",
        alt: "Akun itu terus mengirim pesan dan mengaku tahu informasi tentangmu.",
        teks: "Akun itu terus mengirim pesan: 'Tenang saja, aku cuma ingin kenalan. Aku juga tahu beberapa informasi tentangmu dari unggahan yang beredar.'",
      },
      {
        src: "/scenarios/s3/s3-08.webp",
        alt: "Kamu menyadari informasi yang terlihat sepele bisa dipakai orang lain.",
        teks: "Kamu menyadari informasi yang terlihat sepele bisa dipakai orang lain untuk mencari tahu identitas dan kehidupan pribadimu.",
      },
    ],
    keputusan: {
      frame: "/scenarios/s3/s3-08.webp",
      pertanyaan:
        "Informasi pribadimu mulai tersebar dan akun tak dikenal terus menghubungimu. Apa yang akan kamu lakukan?",
      pilihan: [
        {
          id: "A",
          teks: "Membalas dan memberikan alamat rumah agar akun itu berhenti bertanya.",
          skor: { privasi: -35, reputasi: -5, keamanan: -30 },
          konsekuensi: {
            judul: "Kamu kehilangan kendali atas data pribadi",
            teks: "Kamu memberikan alamat rumah. Akun itu terus meminta informasi lain dan mulai mengirim pesan yang makin mengganggu. Kamu kehilangan kendali atas data pribadimu.",
          },
        },
        {
          id: "B",
          teks: "Memblokir akun itu, menceritakan ke Nadia, lalu meminta Raka menghapus foto dan mengatur akun menjadi privat.",
          skor: { privasi: 15, reputasi: 10, keamanan: 10 },
          konsekuensi: {
            judul: "Kamu mengambil langkah yang tepat",
            teks: "Kamu memblokir akun tersebut, bercerita ke Nadia, dan meminta Raka menghapus foto. Raka meminta maaf dan menghapusnya. Kamu juga mengatur akun menjadi privat.",
          },
          epilog: [
            {
              src: "/scenarios/s3/s3-09.webp",
              alt: "Kamu menceritakan kejadian itu kepada Nadia lewat pesan.",
              teks: "Karena khawatir, kamu menceritakan kejadian itu kepada Nadia dan mengirimkan tangkapan layar unggahan Raka serta pesan akun tak dikenal.",
            },
            {
              src: "/scenarios/s3/s3-10.webp",
              alt: "Nadia terkejut dan bertanya apakah kamu pernah memberi informasi itu.",
              teks: "Nadia: 'Kok bisa? Kamu pernah memberi informasi ini ke orang itu?' Kamu: 'Tidak pernah. Tapi foto Raka memperlihatkan kartu pelajarku.'",
            },
            {
              src: "/scenarios/s3/s3-11.webp",
              alt: "Nadia menjelaskan bahwa orang lain bisa mendapatkan informasi dari foto.",
              teks: "Nadia: 'Dari situ orang lain bisa mendapatkan informasi tentangmu.' Kamu: 'Padahal cuma foto biasa. Aku tidak menyangka bisa sampai seperti ini.'",
            },
            {
              src: "/scenarios/s3/s3-12.webp",
              alt: "Nadia menyarankanmu berbicara dengan Raka tentang foto tersebut.",
              teks: "Nadia menjelaskan bahwa alamat rumah, nomor telepon, kartu identitas, lokasi, dan dokumen pribadi tidak boleh dibagikan sembarangan. Ia menyarankanmu bicara dengan Raka.",
            },
            {
              src: "/scenarios/s3/s3-13.webp",
              alt: "Kamu menghubungi Raka dan menjelaskan bahwa foto itu memperlihatkan data pribadimu.",
              teks: "Kamu menghubungi Raka dan menjelaskan bahwa foto itu memperlihatkan informasi pribadimu.",
            },
            {
              src: "/scenarios/s3/s3-14.webp",
              alt: "Raka awalnya tidak sadar, lalu kamu menjelaskan dampaknya.",
              teks: "Raka: 'Lho, memang kenapa? Kan cuma foto biasa.' Kamu menjelaskan bahwa ada data pribadi yang terlihat dan sudah ada orang tak dikenal yang menghubungimu.",
            },
            {
              src: "/scenarios/s3/s3-15.webp",
              alt: "Raka menyadari kesalahannya dan langsung menghapus unggahan.",
              teks: "Raka menyadari kesalahannya dan meminta maaf. Ia langsung menghapus unggahan tersebut.",
            },
            {
              src: "/scenarios/s3/s3-16.webp",
              alt: "Kamu memeriksa unggahan lama dan mengatur akun menjadi privat.",
              teks: "Kamu juga memeriksa kembali unggahan lama, mengatur akun menjadi privat, dan memastikan tidak ada informasi sensitif yang bisa diakses sembarangan.",
            },
          ],
        },
        {
          id: "C",
          teks: "Mengabaikan pesan akun tak dikenal, tetapi tidak melakukan apa pun terhadap foto yang sudah tersebar.",
          skor: { privasi: -15, reputasi: -5, keamanan: -10 },
          konsekuensi: {
            judul: "Fotomu tetap beredar",
            teks: "Kamu tidak membalas, tetapi fotomu tetap beredar. Informasi pribadi masih bisa dilihat orang lain, dan pesan dari akun tak dikenal bisa datang lagi kapan saja.",
          },
        },
      ],
    },
    refleksi: {
      frames: [
        {
          src: "/scenarios/s3/s3-17.webp",
          alt: "Kamu memahami pentingnya menjaga privasi di dunia digital.",
          teks: "Setelah kejadian tersebut, kamu mulai memahami pentingnya menjaga privasi di dunia digital. Sesuatu yang terlihat sederhana, seperti mengunggah foto, bisa menimbulkan risiko.",
        },
        {
          src: "/scenarios/s3/s3-18.webp",
          alt: "Kamu memeriksa ulang unggahan lama dan mengatur akun lebih privat.",
          teks: "Kamu juga mulai memeriksa kembali unggahan lama, mengatur akun media sosial menjadi lebih privat, dan memastikan tidak ada informasi sensitif yang bisa diakses sembarangan.",
        },
        {
          src: "/scenarios/s3/s3-19.webp",
          alt: "Raka bertanya apakah keadaanmu sudah lebih tenang.",
          teks: "Raka: 'Gimana? Sudah lebih tenang sekarang?' Kamu: 'Sudah. Aku juga jadi sadar kalau banyak informasi pribadi yang tanpa sengaja bisa tersebar lewat media sosial.'",
        },
        {
          src: "/scenarios/s3/s3-20.webp",
          alt: "Pesan penutup: jaga privasimu, hargai privasi sesama.",
          teks: "Privasi adalah hak kita. Tidak semua hal tentang diri kita harus diketahui orang lain. Jaga privasimu, hargai privasi sesama!",
        },
      ],
      narasi:
        "Data pribadi bisa tersebar tanpa sengaja lewat foto orang lain. Menjaga privasi bukan hanya soal akun sendiri, tetapi juga soal menghormati privasi orang lain.",
      tips: [
        "Periksa latar foto sebelum mengunggah.",
        "Minta izin sebelum membagikan foto orang lain.",
        "Atur akun menjadi privat dan tinjau unggahan lama.",
        "Jangan pernah memberikan alamat rumah ke orang tak dikenal.",
      ],
    },
  },
];

export function getScenario(id) {
  return SCENARIOS.find((scenario) => scenario.id === id);
}
