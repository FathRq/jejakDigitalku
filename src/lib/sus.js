/**
 * Standard System Usability Scale (SUS) calculation.
 * Odd items: score - 1. Even items: 5 - score. Total x 2.5.
 */
export function calculateSus(answers) {
  if (!Array.isArray(answers) || answers.length !== 10) {
    return null;
  }

  const total = answers.reduce((sum, value, index) => {
    const score = Number(value) || 0;
    return sum + (index % 2 === 0 ? score - 1 : 5 - score);
  }, 0);

  return Math.round(total * 2.5 * 10) / 10;
}

export function susLabel(score) {
  if (score == null) return "Belum dihitung";
  if (score >= 85) return "Sangat baik";
  if (score >= 68) return "Di atas rata-rata";
  if (score >= 51) return "Cukup";
  return "Perlu ditingkatkan";
}

export function average(values) {
  const list = values.filter((value) => Number.isFinite(Number(value)));
  if (!list.length) return 0;
  return list.reduce((sum, value) => sum + Number(value), 0) / list.length;
}
