import { PageHeader } from "@/components/PageHeader";
import { sampleNotes } from "@/data/sampleNotes";

export default function NotesPage() {
  return <><PageHeader eyebrow="Knowledge Notes" title="学习笔记" description="集中保存方法、结论和可复用的学习线索。第一版使用本地 Mock 数据。" /><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{sampleNotes.map((note) => <article key={note.id} className="panel min-h-64 transition hover:-translate-y-1 hover:border-violet-400/30"><div className="flex items-center justify-between"><span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-200">{note.category}</span><span className="text-xs text-slate-600">{note.updatedAt}</span></div><h2 className="mt-6 text-xl font-bold leading-8">{note.title}</h2><p className="mt-3 text-sm leading-7 text-slate-400">{note.content}</p><div className="mt-6 flex flex-wrap gap-2">{note.tags.map((tag) => <span key={tag} className="text-xs text-blue-300">#{tag}</span>)}</div><p className="mt-4 border-t border-white/8 pt-4 text-xs text-slate-600">来源：{note.source}</p></article>)}</div></>;
}
