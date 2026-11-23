import { useState } from "react";
import { PhoneFrame } from "../components/layout/PhoneFrame";
import { TopBar } from "../components/layout/TopBar";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { useSession } from "../context/SessionContext";
import { AVATARS, getAvatar } from "../data/avatars";
import { cn } from "../lib/utils";

export function ProfileSetup() {
  const { participantCode, saveProfile } = useSession();
  const [username, setUsername] = useState("");
  const [avatarId, setAvatarId] = useState(AVATARS[0].id);
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState("");

  const avatar = getAvatar(avatarId);
  const cleanName = username.trim().replace(/\s+/g, "_");

  function submit(event) {
    event.preventDefault();
    if (cleanName.length < 3) {
      setError("Username minimal 3 karakter.");
      return;
    }
    if (cleanName.length > 18) {
      setError("Username maksimal 18 karakter.");
      return;
    }
    if (!/^[a-zA-Z0-9._]+$/.test(cleanName)) {
      setError("Gunakan huruf, angka, titik, atau garis bawah saja.");
      return;
    }

    saveProfile({
      username: cleanName.toLowerCase(),
      avatarId,
      isPublic,
    });
  }

  return (
    <PhoneFrame>
      <TopBar
        eyebrow="Langkah 2 · Profil"
        title="Buat profil fiktifmu"
        code={participantCode}
      />

      <main className="flex-1 overflow-y-auto px-4 py-4">
        <form onSubmit={submit} className="space-y-4 pb-24">
          <section className="overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-card">
            <div className="relative h-24 bg-gradient-to-br from-brand-600 via-violet-600 to-fuchsia-500">
              <div className="absolute -bottom-8 left-4">
                <span
                  className="grid h-20 w-20 place-items-center rounded-3xl border-4 border-white text-4xl shadow-card"
                  style={{ background: avatar.background }}
                  aria-hidden="true"
                >
                  {avatar.emoji}
                </span>
              </div>
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">
                <Icon name={isPublic ? "eye" : "lock"} size={12} />
                Akun {isPublic ? "Publik" : "Privat"}
              </span>
            </div>

            <div className="px-4 pb-4 pt-10">
              <p className="text-lg font-extrabold text-ink">
                @{cleanName || "username_kamu"}
              </p>
              <p className="text-xs font-medium text-muted">
                Karakter fiktif · Kode {participantCode}
              </p>
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-line bg-white p-4">
            <label
              htmlFor="username"
              className="text-xs font-extrabold uppercase tracking-wider text-ink-soft"
            >
              Username fiktif
            </label>
            <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-line bg-canvas px-3 focus-within:border-brand-500 focus-within:bg-white">
              <span className="text-sm font-bold text-brand-600">@</span>
              <input
                id="username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                  setError("");
                }}
                placeholder="bintang_biru"
                autoComplete="off"
                maxLength={18}
                className="min-h-12 flex-1 bg-transparent text-sm font-semibold text-ink outline-none placeholder:font-medium placeholder:text-muted/70"
                aria-invalid={Boolean(error)}
              />
            </div>
            {error ? (
              <p className="mt-1.5 text-xs font-semibold text-danger">{error}</p>
            ) : (
              <p className="mt-1.5 text-[11px] text-muted">
                Jangan gunakan nama asli. 3–18 karakter, tanpa spasi.
              </p>
            )}
          </section>

          <section className="rounded-[1.5rem] border border-line bg-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-ink-soft">
                Pilih avatar
              </h2>
              <span className="text-[10px] font-semibold text-muted">
                {AVATARS.length} pilihan
              </span>
            </div>
            <div className="mt-2.5 grid grid-cols-4 gap-2">
              {AVATARS.map((option) => {
                const active = avatarId === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setAvatarId(option.id)}
                    aria-pressed={active}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-2xl border p-1.5 transition",
                      active
                        ? "border-brand-600 bg-brand-50"
                        : "border-line bg-white hover:border-brand-300",
                    )}
                  >
                    <span
                      className="grid h-12 w-12 place-items-center rounded-2xl text-2xl"
                      style={{ background: option.background }}
                      aria-hidden="true"
                    >
                      {option.emoji}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] font-bold",
                        active ? "text-brand-700" : "text-muted",
                      )}
                    >
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-line bg-white p-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-ink-soft">
              Pengaturan akun
            </h2>
            <div className="mt-2.5 space-y-2">
              <button
                type="button"
                onClick={() => setIsPublic(false)}
                aria-pressed={!isPublic}
                className={cn(
                  "flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition",
                  !isPublic
                    ? "border-brand-600 bg-brand-50"
                    : "border-line bg-white hover:border-brand-300",
                )}
              >
                <span
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
                    !isPublic ? "bg-brand-600 text-white" : "bg-brand-100 text-brand-700",
                  )}
                >
                  <Icon name="lock" size={19} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-ink">Akun Privat</span>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-extrabold text-emerald-700">
                      Aman
                    </span>
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                    Hanya pengikut yang disetujui bisa melihat unggahanmu.
                  </span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsPublic(true)}
                aria-pressed={isPublic}
                className={cn(
                  "flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition",
                  isPublic
                    ? "border-brand-600 bg-brand-50"
                    : "border-line bg-white hover:border-brand-300",
                )}
              >
                <span
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
                    isPublic ? "bg-brand-600 text-white" : "bg-brand-100 text-brand-700",
                  )}
                >
                  <Icon name="eye" size={19} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-ink">Akun Publik</span>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-extrabold text-amber-700">
                      Risiko
                    </span>
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                    Siapa pun bisa melihat unggahan dan informasi profilmu.
                  </span>
                </span>
              </button>
            </div>

            {isPublic ? (
              <p className="mt-2.5 flex items-start gap-1.5 rounded-xl bg-amber-50 p-2.5 text-[11px] leading-relaxed text-amber-800">
                <Icon name="alert" size={14} className="mt-0.5 shrink-0" />
                Profil publik membuat penalti Privasi dari pilihan berisiko menjadi
                20% lebih besar.
              </p>
            ) : null}
          </section>

          <div className="sticky bottom-0 -mx-4 border-t border-line bg-canvas/95 px-4 py-3 backdrop-blur safe-bottom">
            <Button type="submit" full size="lg">
              Mulai Skenario
              <Icon name="arrowRight" size={18} />
            </Button>
          </div>
        </form>
      </main>
    </PhoneFrame>
  );
}
