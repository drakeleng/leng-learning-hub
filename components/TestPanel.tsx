"use client";

import { FormEvent, useState } from "react";
import { sampleWords } from "@/data/sampleWords";
import { useLearning } from "@/components/LearningProvider";
import type { Word } from "@/types/word";

function randomWord(exclude?: number) {
  const pool = sampleWords.filter((word) => word.id !== exclude);
  return pool[Math.floor(Math.random() * pool.length)] ?? sampleWords[0];
}

export function TestPanel() {
  const [current, setCurrent] = useState<Word | null>(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const { recordAnswer } = useLearning();

  function next() {
    setCurrent(randomWord(current?.id));
    setAnswer("");
    setResult(null);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!current || !answer.trim() || result) return;
    const correct = answer.trim().toLowerCase() === current.word.toLowerCase();
    setResult(correct ? "correct" : "wrong");
    recordAnswer(current.id, answer.trim(), correct);
  }

  if (!current) return <div className="panel grid min-h-96 place-items-center text-center"><div><div className="text-5xl text-blue-300">◎</div><h2 className="mt-5 text-2xl font-bold">准备好开始主动回忆了吗？</h2><p className="mt-2 max-w-md text-sm leading-6 text-slate-400">系统会随机显示中文释义。写出英文答案，错题会自动进入错题本。</p><button onClick={next} className="gradient-button mt-7">开始测试</button></div></div>;

  return <div className="panel min-h-96"><div className="flex justify-between"><span className="label">Chinese → English</span><span className="text-xs text-slate-500">Day {current.day}</span></div><h2 className="mt-10 min-h-24 text-2xl font-bold leading-10 md:text-3xl">{current.meaning}</h2><p className="text-sm text-slate-500">{current.partOfSpeech} · {current.groupName}</p><form onSubmit={submit} className="mt-7"><input className="input text-lg" value={answer} onChange={(event) => setAnswer(event.target.value)} disabled={Boolean(result)} placeholder="输入英文单词…" autoFocus />{result && <div className={`mt-4 rounded-xl border p-4 ${result === "correct" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-rose-400/30 bg-rose-400/10 text-rose-300"}`}><strong>{result === "correct" ? "回答正确！" : `正确答案：${current.word}`}</strong><p className="mt-1 text-xs opacity-80">{current.example}</p></div>}<div className="mt-5 flex gap-3">{result ? <button type="button" onClick={next} className="gradient-button flex-1">下一题</button> : <button className="gradient-button flex-1">检查答案</button>}<button type="button" onClick={next} className="ghost-button">跳过</button></div></form></div>;
}
