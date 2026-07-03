"use client";

import { FormEvent, useState } from "react";
import { createSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

export function AuthPanel() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const supabase = createSupabaseClient();
    if (!supabase) { setMessage("请先在 .env.local 配置 Supabase URL 和 Publishable Key。"); return; }
    setLoading(true); setMessage("");
    const result = mode === "login" ? await supabase.auth.signInWithPassword({ email, password }) : await supabase.auth.signUp({ email, password });
    setLoading(false);
    setMessage(result.error ? result.error.message : mode === "login" ? "登录成功。" : "注册成功，请按 Supabase 设置检查邮箱确认。" );
  }

  return <div className="panel mx-auto max-w-lg"><div className="flex gap-2 rounded-xl bg-black/20 p-1"><button onClick={() => setMode("login")} className={`flex-1 rounded-lg px-3 py-2 text-sm ${mode === "login" ? "bg-blue-500/20 text-white" : "text-slate-500"}`}>登录</button><button onClick={() => setMode("signup")} className={`flex-1 rounded-lg px-3 py-2 text-sm ${mode === "signup" ? "bg-violet-500/20 text-white" : "text-slate-500"}`}>注册</button></div><form onSubmit={submit} className="mt-6 space-y-4"><input className="input" type="email" required placeholder="邮箱" value={email} onChange={(event) => setEmail(event.target.value)} /><input className="input" type="password" minLength={6} required placeholder="密码（至少 6 位）" value={password} onChange={(event) => setPassword(event.target.value)} /><button className="gradient-button w-full" disabled={loading}>{loading ? "处理中…" : mode === "login" ? "登录" : "创建账号"}</button></form><div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-slate-400">Supabase 状态：<b className={isSupabaseConfigured ? "text-emerald-300" : "text-amber-300"}>{isSupabaseConfigured ? "已配置" : "等待配置"}</b></div>{message && <p className="mt-4 text-sm text-blue-200">{message}</p>}</div>;
}
