import { useMemo, useState } from "react";
import { PhoneFrame } from "../components/layout/PhoneFrame";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { Modal } from "../components/ui/Modal";
import { ScoreBar } from "../components/ui/ScoreBar";
import { useSession } from "../context/SessionContext";
import { SCENARIOS, getScenario } from "../data/scenarios";
import { getAvatar } from "../data/avatars";
import { INDICATORS, diffScores } from "../lib/scoring";
import { cn } from "../lib/utils";

function DeltaList({ before, after }) {
  const delta = diffScores(before, after);
  return (
    <div className="mt-3 grid grid-cols-3 gap-2">
      {INDICATORS.map((indicator) => {
        const value = delta[indicator.key];
        return (
          <div key={indicator.key} className="rounded-xl bg-canvas p-2 text-center">
            <p className="text-[10px] font-semibold text-muted">{indicator.label}</p>
            <p
              className={cn(
                "text-sm font-extrabold tabular-nums",
                value > 0 ? "text-success" : value < 0 ? "text-danger" : "text-muted",
              )}
            >
              {value > 0 ? `+${value}` : value}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function Home() {
  const {
    participantCode,
    profile,
    scores,
    results,
    scenarioRun,
    completedCount,
    allScenariosDone,
    openScenario,
    go,
    reset,
  } = useSession();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [lockedOpen, setLockedOpen] = useState(false);
  const [recapId, setRecapId] = useState(null);
  const [resetOpen, setResetOpen] = useState(false);

  const avatar = getAvatar(profile?.avatarId);
  const runningScenario = scenarioRun ? getScenario(scenarioRun.scenarioId) : null;
  const recapScenario = recapId ? getScenario(recapId) : null;
  const recapResult = recapId ? results[recapId] : null;

  const notifications = useMemo(() => {
    const items = [
      {
        id: "welcome",
        title: "Selamat datang di Jejak Digitalku",
        body: "Mulai dari skenario mana saja. Skor awalmu 100 untuk setiap indikator.",
        icon: "sparkles",
      },
    ];
    if (runningScenario) {
      items.unshift({
        id: "resume",
        title: `Skenario ${runningScenario.tema} belum selesai`,
        body: "Lanjutkan dari tempat kamu berhenti agar skormu tidak tertinggal.",
        icon: "play",
      });
    }
    if (allScenariosDone) {
      items.unshift({
        id: "report",
        title: "Rapor digitalmu sudah siap",
        body: "Lihat skor akhir, gelar, dan rekomendasi belajar.",
        icon: "trophy",
      });
    }
    return items;
  }, [allScenariosDone, runningScenario]);

  function handleScenario(scenarioId) {
    if (results[scenarioId]) {
      setRecapId(scenarioId);
      return;
    }
    if (scenarioRun && scenarioRun.scenarioId !== scenarioId) {
      setLockedOpen(true);
      return;
    }
    openScenario(scenarioId);
  }

  function handleReport() {
    if (allScenariosDone) {
      go("report");
      return;
    }
    setLockedOpen(true);
  }

  return (
    <PhoneFrame>
      <header className="shrink-0 border-b border-line/80 bg-white px-4 pb-3 pt-3">
        <div className="flex items-center gap-3">
          <span
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-2xl shadow-[0_8px_18px_-12px_rgba(31,18,53,0.4)]"
            style={{ background: avatar.background }}
            aria-hidden="true"
          >
            {avatar.emoji}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-extrabold leading-tight text-ink">
              Hai, {profile?.username ?? "Siswa"}!
            </p>
            <p className="text-[11px] font-semibold text-muted">
              Kode {participantCode} · {completedCount}/3 skenario
            </p>
          </div>
          <button
            type="button"
            onClick={() => setNotifOpen(true)}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink-soft transition hover:bg-brand-50"
            aria-label="Notifikasi"
          >
            <Icon name="bell" size={19} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-600 ring-2 ring-white" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4 pb-6">
        <ScoreBar scores={scores} />

        {runningScenario ? (
          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
              <Icon name="play" size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-brand-700">
                Skenario berjalan
              </p>
              <p className="truncate text-sm font-bold text-ink">
                {runningScenario.tema} · {runningScenario.judul}
              </p>
            </div>
            <Button size="sm" onClick={() => openScenario(runningScenario.id)}>
              Lanjutkan
            </Button>
          </div>
        ) : null}

        <section id="peta-skenario" className="mt-6 scroll-mt-4">
          <div className="flex items-end justify-between gap-2">
            <div>
              <h2 className="text-lg font-extrabold tracking-tight text-ink">
                Peta Skenario
              </h2>
              <p className="text-xs text-muted">
                Pilih cerita, ambil keputusan, lihat dampaknya.
              </p>
            </div>
            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-extrabold text-brand-700 ring-1 ring-line">
              {completedCount}/3 selesai
            </span>
          </div>

          <div className="mt-3 space-y-3">
            {SCENARIOS.map((scenario) => {
              const done = Boolean(results[scenario.id]);
              const running = scenarioRun?.scenarioId === scenario.id;
              const blocked = Boolean(scenarioRun) && !running && !done;

              return (
                <article
                  key={scenario.id}
                  className={cn(
                    "overflow-hidden rounded-[1.5rem] border bg-white shadow-card transition",
                    done ? "border-emerald-200" : "border-line",
                  )}
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-brand-100">
                    <img
                      src={scenario.cover}
                      alt={`Ilustrasi ${scenario.judul}`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold text-brand-700 backdrop-blur">
                      Skenario {scenario.nomor}
                    </span>
                    {done ? (
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-extrabold text-white">
                        <Icon name="check" size={12} />
                        Selesai
                      </span>
                    ) : running ? (
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-extrabold text-amber-950">
                        <Icon name="play" size={11} />
                        Berjalan
                      </span>
                    ) : null}
                    <div className="absolute bottom-2.5 left-3 right-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                        {scenario.tema}
                      </p>
                      <h3 className="text-base font-extrabold leading-tight text-white">
                        {scenario.judul}
                      </h3>
                    </div>
                  </div>

                  <div className="p-3.5">
                    <p className="text-xs leading-relaxed text-muted">
                      {scenario.ringkas}
                    </p>
                    <Button
                      full
                      className="mt-2.5"
                      variant={done ? "soft" : "primary"}
                      disabled={blocked}
                      onClick={() => handleScenario(scenario.id)}
                    >
                      {done
                        ? "Lihat ringkasan"
                        : running
                          ? "Lanjutkan skenario"
                          : blocked
                            ? "Selesaikan skenario berjalan"
                            : "Mulai skenario"}
                      {!blocked ? <Icon name="arrowRight" size={16} /> : null}
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-4">
          <div className="flex items-center gap-3 rounded-[1.5rem] border border-line bg-white p-4 shadow-card">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-100 text-brand-700">
              <Icon name="report" size={21} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-extrabold text-ink">
                {allScenariosDone ? "Rapor digitalmu siap" : "Lanjut lapor?"}
              </p>
              <p className="text-[11px] leading-snug text-muted">
                {allScenariosDone
                  ? "Lihat skor akhir, gelar, dan tips belajarmu."
                  : `Selesaikan ${3 - completedCount} skenario lagi untuk membuka rapor.`}
              </p>
            </div>
            <Button size="sm" variant={allScenariosDone ? "primary" : "soft"} onClick={handleReport}>
              {allScenariosDone ? "Buka" : "Cek"}
            </Button>
          </div>
        </section>
      </main>

      <nav className="shrink-0 border-t border-line bg-white px-2 pb-1 pt-2 safe-bottom">
        <div className="grid grid-cols-4">
          {[
            { label: "Beranda", icon: "home", active: true, onClick: () => {} },
            {
              label: "Skenario",
              icon: "map",
              onClick: () =>
                document
                  .getElementById("peta-skenario")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" }),
            },
            { label: "Lapor", icon: "report", onClick: handleReport },
            { label: "Profil", icon: "user", onClick: () => setProfileOpen(true) },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl text-[10px] font-bold transition",
                item.active
                  ? "text-brand-700"
                  : "text-muted hover:bg-brand-50 hover:text-brand-700",
              )}
            >
              <Icon name={item.icon} size={20} />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <Modal open={profileOpen} onClose={() => setProfileOpen(false)} title="Profil sesi">
        <div className="flex items-center gap-3">
          <span
            className="grid h-14 w-14 place-items-center rounded-2xl text-3xl"
            style={{ background: avatar.background }}
            aria-hidden="true"
          >
            {avatar.emoji}
          </span>
          <div>
            <p className="text-base font-extrabold text-ink">@{profile?.username}</p>
            <p className="text-xs font-semibold text-muted">
              {profile?.isPublic ? "Akun Publik" : "Akun Privat"} · Kode{" "}
              {participantCode}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-brand-50 p-3 text-xs leading-relaxed text-brand-900/75">
          Profil ini fiktif dan hanya dipakai di dalam simulasi. Tidak ada nama
          asli, email, atau nomor telepon yang dikumpulkan.
        </div>

        <Button
          full
          variant="secondary"
          className="mt-4"
          onClick={() => {
            setProfileOpen(false);
            setResetOpen(true);
          }}
        >
          Mulai ulang sesi
        </Button>
      </Modal>

      <Modal open={notifOpen} onClose={() => setNotifOpen(false)} title="Notifikasi">
        <div className="space-y-2">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-2.5 rounded-2xl border border-line p-3"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
                <Icon name={item.icon} size={17} />
              </span>
              <div>
                <p className="text-sm font-bold text-ink">{item.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        open={lockedOpen}
        onClose={() => setLockedOpen(false)}
        title="Selesaikan skenario berjalan"
      >
        <p className="text-sm leading-relaxed text-muted">
          Kamu masih punya skenario yang belum selesai. Lanjutkan dulu agar skor
          dan pilihanmu tercatat dengan benar.
        </p>
        <div className="mt-3 rounded-2xl bg-brand-50 p-3 text-xs font-semibold text-brand-800">
          Progres: {completedCount} dari 3 skenario selesai.
        </div>
        <Button
          full
          className="mt-4"
          onClick={() => {
            setLockedOpen(false);
            if (scenarioRun) openScenario(scenarioRun.scenarioId);
          }}
          disabled={!scenarioRun}
        >
          Lanjutkan skenario
        </Button>
      </Modal>

      <Modal open={Boolean(recapId)} onClose={() => setRecapId(null)} title="Ringkasan skenario">
        {recapScenario && recapResult ? (
          <div>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={recapScenario.cover}
                alt=""
                className="aspect-video w-full object-cover"
              />
            </div>
            <p className="mt-3 text-[10px] font-extrabold uppercase tracking-wider text-brand-700">
              {recapScenario.tema}
            </p>
            <h3 className="text-base font-extrabold text-ink">{recapScenario.judul}</h3>
            <div className="mt-3 rounded-2xl bg-canvas p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                Pilihanmu
              </p>
              <p className="mt-1 text-sm font-semibold leading-relaxed text-ink">
                {recapScenario.keputusan.pilihan.find(
                  (option) => option.id === recapResult.choiceId,
                )?.teks ?? "Pilihan tidak tercatat"}
              </p>
            </div>
            <DeltaList before={recapResult.before} after={recapResult.after} />
            <Button full variant="soft" className="mt-4" onClick={() => setRecapId(null)}>
              Tutup
            </Button>
          </div>
        ) : null}
      </Modal>

      <Modal open={resetOpen} onClose={() => setResetOpen(false)} title="Mulai ulang sesi?">
        <p className="text-sm leading-relaxed text-muted">
          Semua jawaban, skor, dan progres akan dihapus dari perangkat ini. Tindakan
          ini tidak bisa dibatalkan.
        </p>
        <div className="mt-4 flex gap-2">
          <Button variant="secondary" full onClick={() => setResetOpen(false)}>
            Batal
          </Button>
          <Button
            variant="danger"
            full
            onClick={() => {
              setResetOpen(false);
              setProfileOpen(false);
              reset();
            }}
          >
            Hapus & mulai ulang
          </Button>
        </div>
      </Modal>
    </PhoneFrame>
  );
}
