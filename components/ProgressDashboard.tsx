"use client";

import { DashboardCard } from "@/components/DashboardCard";
import { ProgressBar } from "@/components/ProgressBar";
import { useLearning } from "@/components/LearningProvider";
import { formatPercent } from "@/lib/utils";
import { sampleWords } from "@/data/sampleWords";

export function ProgressDashboard() {
  const { state, ready } = useLearning();
  const correct = state.records.filter((record) => record.isCorrect).length;
  const wrong = state.records.length - correct;
  const activeMistakes = state.mistakes.filter((item) => item.status === "active").length;
  const accuracy = formatPercent(correct, state.records.length);
  const mastery = formatPercent(state.masteredWordIds.length, sampleWords.length);
  const recent = state.records.slice(-12);
  if (!ready) return <div className="panel h-64 animate-pulse" />;

  return <div className="space-y-6"><div className="grid grid-cols-2 gap-3 xl:grid-cols-6"><DashboardCard label="总学习次数" value={state.records.length} note="累计测试提交" /><DashboardCard label="答对次数" value={correct} note="稳定回忆" accent="green" /><DashboardCard label="答错次数" value={wrong} note="可改进空间" accent="red" /><DashboardCard label="正确率" value={`${accuracy}%`} note="总体表现" accent="violet" /><DashboardCard label="已掌握单词" value={state.masteredWordIds.length} note={`共 ${sampleWords.length} 个`} accent="green" /><DashboardCard label="当前错题" value={activeMistakes} note="等待处理" accent="red" /></div><div className="grid gap-5 xl:grid-cols-[.8fr_1.2fr]"><article className="panel"><p className="label">Progress</p><h2 className="mt-2 text-2xl font-bold">掌握进度</h2><div className="mt-8 space-y-7"><ProgressBar value={mastery} label="单词掌握率" /><ProgressBar value={accuracy} label="测试正确率" /><ProgressBar value={Math.min(100, state.records.length * 5)} label="本阶段练习量" /></div></article><article className="panel"><p className="label">Recent Activity</p><h2 className="mt-2 text-2xl font-bold">最近 12 次答题</h2><div className="mt-8 flex h-48 items-end gap-2">{recent.length ? recent.map((record, index) => <div key={record.id} className="group flex flex-1 flex-col items-center gap-2"><div className={`w-full rounded-t-md transition group-hover:opacity-80 ${record.isCorrect ? "bg-gradient-to-t from-emerald-600 to-emerald-300" : "bg-gradient-to-t from-rose-700 to-rose-400"}`} style={{ height: `${record.isCorrect ? 82 + (index % 3) * 12 : 42 + (index % 3) * 9}px` }} /><span className="text-[10px] text-slate-600">{index + 1}</span></div>) : <div className="grid size-full place-items-center text-sm text-slate-500">完成测试后，这里会出现学习趋势图。</div>}</div></article></div></div>;
}
