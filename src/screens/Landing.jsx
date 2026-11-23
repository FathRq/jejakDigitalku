import { useMemo, useState } from "react";
import { Button } from "../components/ui/Button";
import { Icon, Logo } from "../components/ui/Icon";
import { Modal } from "../components/ui/Modal";
import { useSession } from "../context/SessionContext";
import { cn } from "../lib/utils";

const FEATURES = [
  {
    key: "pre",
    label: "Pre-Test",
    title: "Pre-Test",
    description: "Uji pengetahuan awal tentang keamanan dan jejak digital.",
    cta: "Mulai Pre-Test",
    icon: "report",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    key: "post",
    label: "Post-Test",
    title: "Post-Test",
    description: "Evaluasi pemahaman setelah menyelesaikan pembelajaran.",
    cta: "Mulai Post-Test",
    icon: "trophy",
    accent: "from-indigo-500 to-violet-500",
  },
  {
    key: "story",
    label: "Story Skenario",
    title: "Story Skenario",
    description: "Pelajari kasus nyata dalam kehidupan digital.",
    cta: "Jelajahi",
    icon: "play",
    accent: "from-sky-500 to-cyan-400",
  },
];

const GUIDE = [
  "Masukkan kode peserta dari gurumu.",
  "Kerjakan pre-test 5 soal dengan jujur.",
  "Buat profil fiktif, lalu jalani 3 skenario.",
  "Lihat rapor digital, post-test, dan kuesioner.",
];

export function Landing() {
  const { startSession, participantCode } = useSession();
  const [codeModal, setCodeModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [code, setCode] = useState(participantCode ?? "");
  const [error, setError] = useState("");

  const cleanCode = useMemo(() => code.trim().toUpperCase(), [code]);

  function openCodeModal() {
    setCode(participantCode ?? "");
    setError("");
    setCodeModal(true);
  }

  function handleStart(event) {
    event.preventDefault();
    if (!cleanCode) {
      setError("Kode peserta wajib diisi.");
      return;
    }
    if (cleanCode.length < 3) {
      setError("Kode peserta minimal 3 karakter, contoh: P001.");
      return;
    }
    if (!/^[A-Z0-9-]+$/.test(cleanCode)) {
      setError("Gunakan huruf, angka, atau tanda hubung saja.");
      return;
    }
    setCodeModal(false);
    startSession(cleanCode);
  }

  return (
    <div className="min-h-svh bg-canvas pb-10">
      <header className="sticky top-0 z-30 border-b border-line/70 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Logo size={34} />
            <span className="whitespace-nowrap text-sm font-extrabold tracking-tight text-ink sm:text-lg">
              Jejak Digitalku
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLoginModal(true)}
              className="inline-flex min-h-10 items-center justify-center rounded-xl bg-brand-600 px-3 text-sm font-bold text-white transition hover:bg-brand-700 sm:px-4"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setLoginModal(true)}
              className="inline-flex min-h-10 items-center justify-center rounded-xl border border-brand-600 bg-white px-3 text-sm font-bold text-brand-700 transition hover:bg-brand-50 sm:px-4"
            >
              SignUp
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-4 pt-5 sm:px-6 sm:pt-8">
          <div className="overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-brand-100 via-violet-100 to-fuchsia-100 p-5 sm:p-8 lg:p-10">
            <div className="grid items-center gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="animate-rise">
                <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-700">
                  <Icon name="sparkles" size={14} />
                  Simulasi Literasi Digital
                </p>
                <h1 className="mt-3 text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-brand-900 sm:text-4xl lg:text-5xl">
                  Kenali Jejak Digitalmu, Lindungi Dirimu di Dunia Digital!
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-900/70 sm:text-base">
                  Jelajahi dunia digital dengan lebih bijak melalui pembelajaran
                  interaktif tentang jejak digital, keamanan data pribadi,
                  privasi, dan etika berinternet.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2.5">
                  <Button size="lg" onClick={openCodeModal} className="px-6">
                    Get Started
                    <Icon name="arrowRight" size={18} />
                  </Button>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-2 text-xs font-semibold text-brand-800">
                    <Icon name="clock" size={15} />
                    ±15–20 menit
                  </span>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
                <div className="absolute -inset-4 rounded-[2rem] bg-white/40 blur-2xl" />
                <img
                  src="/hero.webp"
                  alt="Ilustrasi seorang siswa memegang ponsel dikelilingi kartu identitas digital."
                  className="relative w-full rounded-[1.5rem] object-cover shadow-card"
                  width="660"
                  height="715"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Fitur Evaluasi Pembelajaran
            </h2>
            <div className="mx-auto mt-2 h-1 w-28 rounded-full bg-brand-600" />
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
              Ukur pemahamanmu melalui evaluasi literasi digital yang singkat dan
              menyenangkan.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {FEATURES.map((feature) => (
              <article
                key={feature.key}
                className="group overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-float"
              >
                <div
                  className={cn(
                    "relative flex h-32 items-center justify-center overflow-hidden bg-gradient-to-br",
                    feature.accent,
                  )}
                >
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/20" />
                  <div className="absolute -bottom-8 -left-4 h-24 w-24 rounded-full bg-white/15" />
                  <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-white/20 text-white backdrop-blur">
                    <Icon name={feature.icon} size={30} />
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-extrabold text-ink">{feature.title}</h3>
                  <p className="mt-1 min-h-10 text-sm leading-relaxed text-muted">
                    {feature.description}
                  </p>
                  <Button
                    full
                    className="mt-3"
                    onClick={openCodeModal}
                    variant={feature.key === "story" ? "secondary" : "primary"}
                  >
                    {feature.cta}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-brand-700 via-violet-700 to-fuchsia-700 p-6 text-white sm:p-8">
            <p className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
              &ldquo;Empowering You for a Digital Future&rdquo;
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[
                ["3", "Skenario interaktif"],
                ["5+5", "Soal pre & post-test"],
                ["100%", "Data anonim"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl bg-white/10 p-3 backdrop-blur">
                  <p className="text-xl font-extrabold sm:text-2xl">{value}</p>
                  <p className="mt-0.5 text-[11px] font-medium text-white/75">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-6 max-w-6xl px-4 sm:px-6">
          <div className="rounded-[1.5rem] border border-line bg-white p-5">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-700">
              Cara bermain
            </h3>
            <ol className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {GUIDE.map((item, index) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-100 text-xs font-extrabold text-brand-700">
                    {index + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <footer className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-3 border-t border-line pt-5 text-xs text-muted sm:flex-row">
          <div className="flex items-center gap-2">
            <Logo size={26} />
            <span className="font-bold text-ink">Jejak Digitalku</span>
          </div>
          <p>Capstone Project Literasi Digital · Data peserta disimpan anonim.</p>
        </div>
      </footer>

      <Modal
        open={codeModal}
        onClose={() => setCodeModal(false)}
        title="Mulai sesi simulasi"
      >
        <p className="text-sm leading-relaxed text-muted">
          Masukkan kode peserta dari gurumu. Kode ini menjaga hasil tetap anonim
          dan tidak meminta nama asli.
        </p>

        <form onSubmit={handleStart} className="mt-4">
          <label
            htmlFor="participant-code"
            className="text-xs font-extrabold uppercase tracking-wider text-ink-soft"
          >
            Kode peserta
          </label>
          <input
            id="participant-code"
            value={code}
            onChange={(event) => {
              setCode(event.target.value.toUpperCase());
              setError("");
            }}
            placeholder="Contoh: P001"
            autoComplete="off"
            autoCapitalize="characters"
            className="mt-1.5 min-h-12 w-full rounded-2xl border border-line bg-canvas px-4 text-base font-bold uppercase tracking-wider text-ink placeholder:font-medium placeholder:normal-case placeholder:tracking-normal placeholder:text-muted/70 focus:border-brand-500 focus:bg-white focus:outline-none"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "code-error" : undefined}
          />
          {error ? (
            <p id="code-error" className="mt-1.5 text-xs font-semibold text-danger">
              {error}
            </p>
          ) : null}

          <div className="mt-4 rounded-2xl bg-brand-50 p-3">
            <p className="flex items-center gap-1.5 text-xs font-bold text-brand-800">
              <Icon name="shield" size={15} />
              Sesi anonim
            </p>
            <p className="mt-1 text-xs leading-relaxed text-brand-900/70">
              Jangan gunakan nama asli, email, nomor telepon, atau lokasi asli.
              Semua karakter dalam cerita adalah fiktif.
            </p>
          </div>

          <Button type="submit" full size="lg" className="mt-4">
            Mulai Pre-Test
            <Icon name="arrowRight" size={18} />
          </Button>
        </form>
      </Modal>

      <Modal
        open={loginModal}
        onClose={() => setLoginModal(false)}
        title="Login & SignUp segera hadir"
      >
        <div className="grid place-items-center py-3">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-100 text-brand-700">
            <Icon name="lock" size={28} />
          </span>
        </div>
        <p className="text-center text-sm leading-relaxed text-muted">
          Untuk menjaga data tetap anonim, sesi simulasi dimulai dengan{" "}
          <strong className="text-ink">kode peserta</strong> dari guru, tanpa akun
          email atau kata sandi.
        </p>
        <Button
          full
          size="lg"
          className="mt-4"
          onClick={() => {
            setLoginModal(false);
            openCodeModal();
          }}
        >
          Gunakan kode peserta
        </Button>
        <button
          type="button"
          onClick={() => setLoginModal(false)}
          className="mt-2 min-h-11 w-full rounded-2xl text-sm font-semibold text-muted transition hover:bg-black/5"
        >
          Nanti saja
        </button>
      </Modal>
    </div>
  );
}
