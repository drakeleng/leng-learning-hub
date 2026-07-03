export type Mistake = {
  wordId: number;
  wrongAnswer: string;
  errorCount: number;
  status: "active" | "mastered";
  lastWrongAt: string;
};

export type LearningState = {
  records: import("@/types/word").StudyRecord[];
  mistakes: Mistake[];
  masteredWordIds: number[];
  studyDates: string[];
};
