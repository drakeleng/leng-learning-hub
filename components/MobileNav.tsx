import Link from "next/link";

export function MobileNav() {
  return <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#080a17]/80 px-4 py-3 backdrop-blur-xl lg:hidden"><Link href="/" className="font-bold">Leng Learning Hub</Link><nav className="flex gap-3 text-xs text-slate-400"><Link href="/english">English</Link><Link href="/progress">Progress</Link><Link href="/notes">Notes</Link></nav></header>;
}
