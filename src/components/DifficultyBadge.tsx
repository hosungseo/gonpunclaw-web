const colors = {
  하: "bg-green-100 text-green-800",
  중: "bg-yellow-100 text-yellow-800",
  상: "bg-red-100 text-red-800",
} as const;

export default function DifficultyBadge({
  level,
}: {
  level: string;
}) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[level as keyof typeof colors] || colors["중"]}`}
    >
      난이도 {level}
    </span>
  );
}
