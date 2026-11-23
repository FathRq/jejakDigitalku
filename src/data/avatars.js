export const AVATARS = [
  {
    id: "rubah",
    emoji: "🦊",
    label: "Rubah",
    background: "linear-gradient(135deg,#fb923c,#f43f5e)",
  },
  {
    id: "panda",
    emoji: "🐼",
    label: "Panda",
    background: "linear-gradient(135deg,#a78bfa,#6366f1)",
  },
  {
    id: "kucing",
    emoji: "🐱",
    label: "Kucing",
    background: "linear-gradient(135deg,#f472b6,#a855f7)",
  },
  {
    id: "burung",
    emoji: "🦉",
    label: "Burung Hantu",
    background: "linear-gradient(135deg,#34d399,#0ea5e9)",
  },
];

export function getAvatar(id) {
  return AVATARS.find((avatar) => avatar.id === id) ?? AVATARS[0];
}
