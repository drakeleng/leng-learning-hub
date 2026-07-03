export type Word = {
  id: number;
  word: string;
  meaning: string;
  partOfSpeech: string;
  phonetic: string;
  example: string;
  collocation: string;
  memoryTip: string;
  day: number;
  groupName: string;
};

export type StudyRecord = {
  id: string;
  wordId: number;
  answer: string;
  isCorrect: boolean;
  createdAt: string;
};
