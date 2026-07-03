import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { sampleWords } from "@/data/sampleWords";

const modules = [
  ["01", "单词卡片", "搜索、筛选并翻转学习当前词表。", "/english/words", "开始学习"],
  ["02", "中译英测试", "用主动回忆检查真正记住了多少。", "/english/test", "开始测试"],
  ["03", "错题本", "集中处理高频错误，掌握后归档。", "/english/mistakes", "查看错题"],
];

export default function EnglishPage() {
  return <><PageHeader eyebrow="English Center" title="英语学习中心" description="Longman 3000 分组学习、主动回忆测试和错题复习都在这里。" /><div className="grid gap-5 md:grid-cols-3">{modules.map(([number,title,description,href,action]) => <Link key={href} href={href} className="panel group min-h-64 transition hover:-translate-y-1 hover:border-blue-400/30"><span className="text-sm font-black text-blue-300">{number}</span><h2 className="mt-16 text-2xl font-bold group-hover:text-blue-200">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-400">{description}</p><p className="mt-6 text-sm font-semibold">{action} →</p></Link>)}</div><section className="panel mt-6"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-center"><div><p className="label">Current Library</p><h2 className="mt-2 text-2xl font-bold">{sampleWords.length} 个示例单词 · 3 个学习单元</h2><p className="mt-2 text-sm text-slate-500">后续接入 Notion 后，可自动扩展完整 Longman 3000 词库。</p></div><Link href="/admin/notion-sync" className="ghost-button">查看同步设置</Link></div></section></>;
}
