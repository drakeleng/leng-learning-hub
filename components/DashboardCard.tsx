export function DashboardCard({ label, value, note, accent = "blue" }: { label: string; value: string | number; note: string; accent?: "blue" | "green" | "violet" | "red" }) {
  const glow = { blue: "from-blue-500/20", green: "from-emerald-500/20", violet: "from-violet-500/20", red: "from-rose-500/20" }[accent];
  return <article className={`panel relative overflow-hidden bg-gradient-to-br ${glow} to-transparent transition hover:-translate-y-1`}><p className="text-sm text-slate-400">{label}</p><strong className="mt-3 block text-3xl tracking-tight">{value}</strong><p className="mt-1 text-xs text-slate-500">{note}</p></article>;
}
