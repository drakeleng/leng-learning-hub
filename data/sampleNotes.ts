import type { Note } from "@/types/note";

export const sampleNotes: Note[] = [
  { id: "n1", title: "如何建立稳定的英语学习节奏", content: "每天先复习旧词，再学习少量新词。测试不是最后一步，而是记忆过程本身。", category: "学习方法", tags: ["复习", "习惯"], source: "Local mock", updatedAt: "2026-07-04" },
  { id: "n2", title: "Longman 3000 分组规则", content: "按照原始词表顺序，每 50 个词为一个 Day 单元，避免跳词和重复。", category: "英语", tags: ["Longman", "单词"], source: "Notion preview", updatedAt: "2026-07-03" },
  { id: "n3", title: "主动回忆比重复阅读更有效", content: "看到中文后尝试写出英文，再立即核对答案。答错的词进入错题本，直到可以稳定回忆。", category: "学习方法", tags: ["测试", "主动回忆"], source: "Local mock", updatedAt: "2026-07-02" }
];
