"use client";

import Link from "next/link";
import { DashboardCard } from "@/components/DashboardCard";
import { ProgressBar } from "@/components/ProgressBar";
import { useLearning } from "@/components/LearningProvider";
import { calculateStreak, formatPercent, localDateKey } from "@/lib/utils";
import { sampleWords } from "@/data/sampleWords";

export function DashboardOverview() {
  const { state, ready } = useLearning();
  const correct = state.records.filter((record) => record.isCorrect).length;
  const accuracy = formatPercent(correct, state.records.length);
  const mistakes = state.mistakes.filter((item) => item.status === "active").length;
  const todayRecords = state.records.filter((record) => localDateKey(new Date(record.createdAt)) === localDateKey()).length;
  const learned = new Set(state.records.map((record) => record.wordId)).size;
  const completion = formatPercent(state.masteredWordIds.length, sampleWords.length);
  const value = (text: string | number) => ready ? text : "—";

  return <>
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/15 via-white/[0.04] to-violet-500/15 p-7 shadow-2xl shadow-black/30 md:p-10">
      <div className="absolute -right-20 -top-24 size-80 rounded-full bg-blue-500/20 blur-3xl" />
      <p className="label">Personal Learning OS</p><h1 className="relative mt-3 text-4xl font-black tracking-[-.045em] md:text-6xl">Leng Learning Hub</h1><p className="relative mt-4 max-w-2xl text-base leading-7 text-slate-400">把单词、测试、错题、笔记与复习节奏收进一个清醒而可持续的个人学习中心。</p>
      <div className="relative mt-7 flex flex-wrap gap-3"><Link href="/english/words" className="gradient-button">开始今日学习</Link><Link href="/english/test" className="ghost-button">快速测试</Link></div>
    </section>

    <section className="mt-7 grid grid-cols-2 gap-3 xl:grid-cols-5">
      <DashboardCard label="已学单词" value={value(learned)} note={`共 ${sampleWords.length} 个示例词`} />
      <DashboardCard label="今日复习" value={value(todayRecords)} note="建议完成 12 题" accent="violet" />
      <DashboardCard label="正确率" value={value(`${accuracy}%`)} note={`${state.records.length} 次测试记录`} accent="green" />
      <DashboardCard label="错题数量" value={value(mistakes)} note="等待再次掌握" accent="red" />
      <DashboardCard label="连续学习" value={value(`${calculateStreak(state.studyDates)} 天`)} note="保持轻量而稳定" />
    </section>

    <section className="mt-7 grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
      <article className="panel"><div className="flex items-start justify-between"><div><p className="label">Today Plan</p><h2 className="mt-2 text-2xl font-bold">今日学习计划</h2></div><span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-200">Day 1 · Words 1–50</span></div><div className="mt-7 space-y-4">{([[
        "复习 12 个旧单词", todayRecords >= 12
      ], ["完成 10 道中译英测试", todayRecords >= 10], ["处理当前错题", mistakes === 0]] as Array<[string, boolean]>).map(([label, done]) => <div key={label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-black/15 p-4"><span className={`grid size-7 place-items-center rounded-full ${done ? "bg-emerald-400/15 text-emerald-300" : "bg-white/5 text-slate-500"}`}>{done ? "✓" : "·"}</span><span className={done ? "text-slate-500 line-through" : "text-slate-200"}>{label}</span></div>)}</div></article>
      <article className="panel"><p className="label">Mastery</p><div className="mt-6 grid place-items-center"><div className="grid size-40 place-items-center rounded-full p-3" style={{ background: `conic-gradient(#60a5fa ${completion}%, rgba(255,255,255,.08) 0)` }}><div className="grid size-full place-items-center rounded-full bg-[#0d1022] text-center"><div><strong className="text-3xl">{completion}%</strong><span className="block text-xs text-slate-500">掌握进度</span></div></div></div></div><div className="mt-7"><ProgressBar value={completion} label="全部词汇完成度" /></div></article>
    </section>
  </>;
}
