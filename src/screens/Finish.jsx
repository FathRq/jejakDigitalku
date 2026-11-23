import { useState } from "react";
import { PhoneFrame } from "../components/layout/PhoneFrame";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { Modal } from "../components/ui/Modal";
import { ScoreBar } from "../components/ui/ScoreBar";
import { useSession } from "../context/SessionContext";
import { getAvatar } from "../data/avatars";
import { buildPayload } from "../lib/payload";
import { averageScore, getBadge } from "../lib/scoring";
import { downloadJson } from "../lib/storage";
import { formatDuration, cn } from "../lib/utils";

export function Finish() {
  const session = useSession();
  const {
    participantCode,
    profile,
    scores,
    preTest,
    postTest,
    susScore,
    submitStatus,
    startedAt,
    completedAt,
    reset,
  } = session;

  const [confirmOpen, setConfirmOpen] = useState(false);
  const badge = getBadge(scores);
  const avatar = getAvatar(profile?.avatarId);
  const average = averageScore(scores);

  const duration =
    startedAt && completedAt
      ? Math.round(
          (new Date(completedAt).getTime() - new Date(startedAt).getTime()) / 1000,
        )
      : 0;

  function handleDownload() {
    const slug = participantCode ? participantCode.toLowerCase() : "peserta";
    downloadJson(
      buildPayload({ ...session, completedAt }),
      `jejak-digitalku-${slug}.json`,
    );
  }

  return (
    <PhoneFrame>
      <main className="flex-1 overflow-y-auto px-4 py-5 pb-6">
        <section className="animate-pop overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-brand-700 via-violet-600 to-fuchsia-500 p-5 text-center text-white shadow-float">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-white/15 text-3xl backdrop-blur">
            🎉
          </div>
          <h1 className="mt-3 text-2xl font-extrabold leading-tight">Sesi selesai!</h1>
          <p className="mx-auto mt-1.5 max-w-[18rem] text-sm leading-relaxed text-white/80">
            Terima kasih sudah belajar menjaga jejak digital bersama Jejak Digitalku.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-white/10 p-2.5 backdrop-blur">
            <span
              className="grid h-10 w-10 place-items-center rounded-xl text-xl"
              style={{ background: avatar.background }}
              aria-hidden="true"
            >
              {avatar.emoji}
            </span>
            <div className="text-left">
              <p className="text-sm font-extrabold leading-tight">@{profile?.username}</p>
              <p className="text-[10px] font-semibold text-white/70">
                Kode {participantCode} · {formatDuration(duration)}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-3 rounded-[1.5rem] border border-line bg-white p-4 shadow-card">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted">
                Skor akhir
              </p>
              <p className="text-3xl font-extrabold leading-tight text-ink">
                {average}
                <span className="ml-1 text-sm font-semibold text-muted">/100</span>
              </p>
            </div>
            <Badge badge={badge} />
          </div>
          <div className="mt-3">
            <ScoreBar scores={scores} compact />
          </div>
        </section>

        <section className="mt-3 grid grid-cols-3 gap-2">
          {[
            { label: "Pre-Test", value: preTest.score ?? "—", tone: "text-ink-soft" },
            { label: "Post-Test", value: postTest.score ?? "—", tone: "text-brand-700" },
            { label: "SUS", value: susScore ?? "—", tone: "text-emerald-700" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-line bg-white p-2.5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                {item.label}
              </p>
              <p className={cn("mt-1 text-xl font-extrabold tabular-nums", item.tone)}>
                {item.value}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-3 rounded-[1.5rem] border border-line bg-white p-4">
          <p className="flex items-center gap-1.5 text-xs font-extrabold text-ink">
            <Icon name="info" size={15} className="text-brand-600" /> Status pengiriman
          </p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
            {submitStatus?.local
              ? "Hasil tersimpan di perangkat ini. Unduh berkas JSON lalu serahkan ke gurumu."
              : submitStatus?.ok
                ? "Hasil berhasil dikirim ke server peneliti."
                : submitStatus?.ok === false
                  ? "Hasil gagal dikirim. Jangan khawatir—unduh berkas JSON dan serahkan ke gurumu."
                  : "Hasil tersimpan di perangkat ini. Unduh berkas JSON jika diminta."}
          </p>

          <div className="mt-3 grid gap-2">
            <Button variant="secondary" full onClick={handleDownload}>
              <Icon name="download" size={17} />
              Unduh hasil (JSON)
            </Button>
            <Button variant="ghost" full onClick={() => setConfirmOpen(true)}>
              <Icon name="refresh" size={17} />
              Mulai sesi baru
            </Button>
          </div>
        </section>

        <p className="mt-4 text-center text-[10px] leading-relaxed text-muted">
          Data disimpan anonim tanpa nama asli, email, atau nomor telepon.
          <br />
          Jejak Digitalku · Capstone Project Literasi Digital
        </p>
      </main>

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Mulai sesi baru?">
        <p className="text-sm leading-relaxed text-muted">
          Hasil sesi ini akan dihapus dari perangkat. Pastikan kamu sudah mengunduh
          berkas JSON jika diperlukan.
        </p>
        <div className="mt-4 flex gap-2">
          <Button variant="secondary" full onClick={() => setConfirmOpen(false)}>
            Batal
          </Button>
          <Button
            variant="danger"
            full
            onClick={() => {
              setConfirmOpen(false);
              reset();
            }}
          >
            Hapus & mulai
          </Button>
        </div>
      </Modal>
    </PhoneFrame>
  );
}
