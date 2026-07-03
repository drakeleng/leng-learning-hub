"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { LearningState } from "@/types/mistake";
import { localDateKey } from "@/lib/utils";
import { syncAnswerToSupabase, syncMasteredToSupabase } from "@/lib/learning-sync";

const STORAGE_KEY = "leng-learning-hub-v1";
const initialState: LearningState = { records: [], mistakes: [], masteredWordIds: [], studyDates: [] };

type LearningContextValue = {
  state: LearningState;
  ready: boolean;
  recordAnswer: (wordId: number, answer: string, isCorrect: boolean) => void;
  markMastered: (wordId: number) => void;
};

const LearningContext = createContext<LearningContextValue | null>(null);

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(initialState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setState({ ...initialState, ...JSON.parse(saved) });
    } finally {
      setReady(true);
    }
  }, []);

  function update(recipe: (current: LearningState) => LearningState) {
    setState((current) => {
      const next = recipe(current);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function recordAnswer(wordId: number, answer: string, isCorrect: boolean) {
    update((current) => {
      const existing = current.mistakes.find((item) => item.wordId === wordId);
      const mistakes = isCorrect
        ? current.mistakes
        : existing
          ? current.mistakes.map((item) => item.wordId === wordId ? { ...item, wrongAnswer: answer, errorCount: item.errorCount + 1, status: "active" as const, lastWrongAt: new Date().toISOString() } : item)
          : [...current.mistakes, { wordId, wrongAnswer: answer, errorCount: 1, status: "active" as const, lastWrongAt: new Date().toISOString() }];
      return {
        ...current,
        records: [...current.records, { id: crypto.randomUUID(), wordId, answer, isCorrect, createdAt: new Date().toISOString() }],
        mistakes,
        masteredWordIds: isCorrect ? Array.from(new Set([...current.masteredWordIds, wordId])) : current.masteredWordIds,
        studyDates: Array.from(new Set([...current.studyDates, localDateKey()])),
      };
    });
    void syncAnswerToSupabase(wordId, answer, isCorrect);
  }

  function markMastered(wordId: number) {
    update((current) => ({
      ...current,
      mistakes: current.mistakes.map((item) => item.wordId === wordId ? { ...item, status: "mastered" as const } : item),
      masteredWordIds: Array.from(new Set([...current.masteredWordIds, wordId])),
      studyDates: Array.from(new Set([...current.studyDates, localDateKey()])),
    }));
    void syncMasteredToSupabase(wordId);
  }

  const value = useMemo(() => ({ state, ready, recordAnswer, markMastered }), [state, ready]);
  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) throw new Error("useLearning must be used inside LearningProvider");
  return context;
}
