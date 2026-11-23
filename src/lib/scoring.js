export const INDICATORS = [
  {
    key: "privasi",
    label: "Privasi",
    short: "Data pribadi tetap aman",
    color: "#2563EB",
    track: "#dbeafe",
  },
  {
    key: "reputasi",
    label: "Reputasi",
    short: "Citra diri di mata orang lain",
    color: "#7C3AED",
    track: "#ede9fe",
  },
  {
    key: "keamanan",
    label: "Keamanan",
    short: "Terhindar dari penipuan dan peretasan",
    color: "#D97706",
    track: "#fef3c7",
  },
];

export const INITIAL_SCORES = { privasi: 100, reputasi: 100, keamanan: 100 };

export const clamp = (value, min = 0, max = 100) =>
  Math.min(max, Math.max(min, Math.round(value)));

/**
 * Apply one decision to the three indicators.
 * A public profile makes every negative privacy impact 20% heavier,
 * matching FR-03 in the PRD.
 */
export function applyChoice(scores, delta, isPublic = false) {
  const next = { ...scores };

  for (const { key } of INDICATORS) {
    let change = Number(delta?.[key] ?? 0);
    if (isPublic && key === "privasi" && change < 0) {
      change = Math.round(change * 1.2);
    }
    next[key] = clamp(next[key] + change);
  }

  return next;
}

export function diffScores(before, after) {
  return INDICATORS.reduce((diff, { key }) => {
    diff[key] = after[key] - before[key];
    return diff;
  }, {});
}

export function averageScore(scores) {
  const total = INDICATORS.reduce((sum, { key }) => sum + scores[key], 0);
  return Math.round((total / INDICATORS.length) * 10) / 10;
}

export function getBadge(scores) {
  const average = averageScore(scores);

  if (average >= 80) {
    return {
      key: "bijak",
      title: "Warga Digital Bijak",
      emoji: "🛡️",
      description:
        "Kamu sudah mengambil keputusan yang aman dan sadar risiko di hampir semua situasi.",
      tone: "success",
    };
  }

  if (average >= 50) {
    return {
      key: "waspada",
      title: "Pengguna Waspada",
      emoji: "🔎",
      description:
        "Kamu sudah cukup berhati-hati, tetapi masih ada beberapa keputusan yang bisa diperbaiki.",
      tone: "brand",
    };
  }

  return {
    key: "pemula",
    title: "Pemula Digital",
    emoji: "🌱",
    description:
      "Banyak keputusan masih berisiko. Pelajari kembali tips di setiap skenario, ya.",
    tone: "warning",
  };
}

export function getStrengths(scores) {
  const sorted = [...INDICATORS].sort((a, b) => scores[b.key] - scores[a.key]);
  return {
    strongest: sorted[0],
    weakest: sorted[sorted.length - 1],
  };
}
