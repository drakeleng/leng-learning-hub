export function ProgressBar({ value, label }: { value: number; label?: string }) {
  const safe = Math.max(0, Math.min(100, value));
  return <div><div className="mb-2 flex justify-between text-xs text-slate-400"><span>{label ?? "完成度"}</span><span>{safe}%</span></div><div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 transition-all duration-700" style={{ width: `${safe}%` }} /></div></div>;
}
