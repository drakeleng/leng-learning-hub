"use client";

import { sampleWords } from "@/data/sampleWords";
import { createSupabaseClient } from "@/lib/supabase";

/**
 * Best-effort cloud sync for the MVP. Local storage remains the fast offline
 * source of truth; once a user is signed in, new activity is also written to
 * Supabase. A failed network request never blocks a study session.
 */
export async function syncAnswerToSupabase(wordId: number, answer: string, isCorrect: boolean) {
  const supabase = createSupabaseClient();
  const word = sampleWords.find((item) => item.id === wordId);
  if (!supabase || !word) return;

  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user;
  if (!user) return;

  const { data: cloudWord, error: wordError } = await supabase
    .from("words")
    .upsert({
      user_id: user.id,
      word: word.word,
      meaning: word.meaning,
      part_of_speech: word.partOfSpeech,
      phonetic: word.phonetic,
      example: word.example,
      collocation: word.collocation,
      memory_tip: word.memoryTip,
      day: word.day,
      group_name: word.groupName,
    }, { onConflict: "user_id,word" })
    .select("id")
    .single();

  if (wordError || !cloudWord) return;

  await supabase.from("study_records").insert({
    user_id: user.id,
    word_id: cloudWord.id,
    answer,
    is_correct: isCorrect,
  });

  if (!isCorrect) {
    const { data: existing } = await supabase
      .from("mistakes")
      .select("id,error_count")
      .eq("user_id", user.id)
      .eq("word_id", cloudWord.id)
      .maybeSingle();

    await supabase.from("mistakes").upsert({
      id: existing?.id,
      user_id: user.id,
      word_id: cloudWord.id,
      wrong_answer: answer,
      error_count: (existing?.error_count ?? 0) + 1,
      status: "active",
      last_wrong_at: new Date().toISOString(),
    });
  }
}

export async function syncMasteredToSupabase(wordId: number) {
  const supabase = createSupabaseClient();
  const word = sampleWords.find((item) => item.id === wordId);
  if (!supabase || !word) return;

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return;

  const { data: cloudWord } = await supabase
    .from("words")
    .select("id")
    .eq("user_id", auth.user.id)
    .eq("word", word.word)
    .maybeSingle();

  if (cloudWord) {
    await supabase.from("mistakes").update({ status: "mastered" })
      .eq("user_id", auth.user.id)
      .eq("word_id", cloudWord.id);
  }
}
