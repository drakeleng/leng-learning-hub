"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  ["⌂", "Dashboard", "/"],
  ["Aa", "英语学习", "/english"],
  ["▣", "单词列表", "/english/words"],
  ["◎", "测试模式", "/english/test"],
  ["!", "错题本", "/english/mistakes"],
  ["↗", "学习进度", "/progress"],
  ["✎", "学习笔记", "/notes"],
  ["⟳", "Notion 同步", "/admin/notion-sync"],
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-white/10 bg-[#090b19]/85 p-5 backdrop-blur-2xl lg:flex lg:flex-col">
      <Link href="/" className="flex items-center gap-3 px-2 py-3">
        <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 font-black shadow-lg shadow-blue-900/30">L</span>
        <span><strong className="block">Leng Learning</strong><span className="text-xs text-slate-500">Personal knowledge hub</span></span>
      </Link>
      <nav className="mt-8 space-y-1.5">
        {links.map(([icon, label, href]) => {
          const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
          return <Link key={href} href={href} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition", active && "bg-gradient-to-r from-blue-500/20 to-violet-500/10 text-white ring-1 ring-blue-400/20", !active && "hover:bg-white/5 hover:text-white")}><span className="grid size-7 place-items-center text-xs text-blue-300">{icon}</span>{label}</Link>;
        })}
      </nav>
      <div className="mt-auto rounded-2xl border border-blue-400/15 bg-blue-500/5 p-4">
        <p className="text-xs font-semibold text-blue-300">MVP MODE</p>
        <p className="mt-2 text-xs leading-5 text-slate-500">未配置 Supabase 时，学习数据会安全保存在当前浏览器。</p>
        <Link href="/login" className="mt-3 block text-xs font-semibold text-white">配置登录 →</Link>
      </div>
    </aside>
  );
}
