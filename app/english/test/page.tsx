import { PageHeader } from "@/components/PageHeader";
import { TestPanel } from "@/components/TestPanel";

export default function TestPage() { return <><PageHeader eyebrow="Active Recall" title="中译英测试" description="看到中文后写出英文。每一次答案都会计入学习记录，错误会自动进入错题本。" /><div className="mx-auto max-w-3xl"><TestPanel /></div></>; }
