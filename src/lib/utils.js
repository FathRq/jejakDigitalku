export function cn(...values) {
  return values.filter(Boolean).join(" ");
}

export function formatNumber(value) {
  return new Intl.NumberFormat("id-ID").format(value);
}

export function formatDuration(seconds) {
  if (!seconds) return "0 menit";
  const minutes = Math.round(seconds / 60);
  if (minutes < 1) return "kurang dari 1 menit";
  return `${minutes} menit`;
}
