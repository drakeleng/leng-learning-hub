"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { WordCard } from "@/components/WordCard";
import { sampleWords } from "@/data/sampleWords";

export default function WordsPage() {
  const [search, setSearch] = useState("");
  const [day, setDay] = useState("all");
  const words = useMemo(() => sampleWords.filter((word) => (day === "all" || String(word.day) === day) && [word.word,word.meaning,word.collocation,word.groupName].join(" ").toLowerCase().includes(search.toLowerCase())), [search, day]);
  return <><PageHeader eyebrow="Vocabulary" title="单词列表" description="点击卡片翻转。通过 Day 或 Words 分组缩小范围，再用搜索快速找到目标单词。" action={<span className="text-sm text-slate-500">显示 {words.length} / {sampleWords.length}</span>} /><div className="panel mb-6 grid gap-3 md:grid-cols-[1fr_auto]"><input className="input" type="search" placeholder="搜索英文、中文或搭配…" value={search} onChange={(event) => setSearch(event.target.value)} /><div className="flex flex-wrap gap-2">{["all","1","2","3"].map((value) => <button key={value} onClick={() => setDay(value)} className={day === value ? "gradient-button" : "ghost-button"}>{value === "all" ? "全部" : `Day ${value}`}</button>)}</div></div><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{words.map((word) => <WordCard key={word.id} word={word} />)}</div>{!words.length && <div className="panel py-16 text-center text-slate-500">没有匹配的单词。</div>}</>;
}
