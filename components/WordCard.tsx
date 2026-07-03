"use client";

import { useState } from "react";
import type { Word } from "@/types/word";

export function WordCard({ word }: { word: Word }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <article className="h-80 [perspective:1200px]">
      <button type="button" onClick={() => setFlipped((value) => !value)} className="relative size-full text-left [transform-style:preserve-3d] transition-transform duration-700" style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }} aria-label={`翻转 ${word.word} 单词卡`}>
        <div className="glass absolute inset-0 flex flex-col rounded-2xl p-6 [backface-visibility:hidden] transition hover:-translate-y-1 hover:border-blue-400/30">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500"><span>Day {word.day}</span><span>#{word.id}</span></div>
          <div className="my-auto"><h2 className="text-3xl font-bold tracking-tight">{word.word}</h2><p className="mt-2 text-sm text-cyan-300">{word.phonetic}</p><span className="mt-4 inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-200">{word.partOfSpeech}</span></div>
          <p className="text-xs text-slate-600">点击翻面 · {word.groupName}</p>
        </div>
        <div className="glass absolute inset-0 flex flex-col rounded-2xl bg-gradient-to-br from-violet-500/10 to-blue-500/5 p-6 [backface-visibility:hidden]" style={{ transform: "rotateY(180deg)" }}>
          <p className="text-lg font-bold leading-7">{word.meaning}</p>
          <p className="mt-4 border-l-2 border-violet-400 pl-3 text-sm leading-6 text-slate-300">{word.example}</p>
          <div className="mt-4 space-y-3 text-xs leading-5 text-slate-400"><p><b className="text-blue-300">搭配：</b>{word.collocation}</p><p><b className="text-violet-300">记忆：</b>{word.memoryTip}</p></div>
          <p className="mt-auto text-xs text-slate-600">点击返回英文</p>
        </div>
      </button>
    </article>
  );
}
