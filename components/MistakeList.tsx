"use client";

import { sampleWords } from "@/data/sampleWords";
import { useLearning } from "@/components/LearningProvider";

export function MistakeList() {
  const { state, ready, markMastered } = useLearning();
  const active = state.mistakes.filter((mistake) => mistake.status === "active");
  if (!ready) return <div className="panel h-48 animate-pulse" />;
  if (!active.length) return <div className="panel py-16 text-center"><div className="text-4xl text-emerald-300">✓</div><h2 className="mt-4 text-xl font-bold">当前没有待处理错题</h2><p className="mt-2 text-sm text-slate-500">完成测试后，答错的单词会自动出现在这里。</p></div>;
  return <div className="space-y-4">{active.map((mistake) => { const word = sampleWords.find((item) => item.id === mistake.wordId); if (!word) return null; return <article key={word.id} className="panel grid gap-5 md:grid-cols-[1fr_1.5fr_auto] md:items-center"><div><h2 className="text-2xl font-bold">{word.word}</h2><p className="mt-1 text-sm text-slate-400">{word.phonetic} · {word.meaning}</p></div><div className="space-y-2 text-sm"><p className="text-rose-300"><span className="text-slate-500">我的答案：</span>{mistake.wrongAnswer || "（空白）"}</p><p><span className="text-slate-500">正确答案：</span>{word.word}</p><p className="text-xs text-slate-500">错误 {mistake.errorCount} 次 · {word.example}</p></div><button onClick={() => markMastered(word.id)} className="ghost-button whitespace-nowrap">已掌握</button></article>; })}</div>;
}
