import { PageHeader } from "@/components/PageHeader";
import { NotionSyncPanel } from "@/components/NotionSyncPanel";

export default function NotionSyncPage() { return <><PageHeader eyebrow="Admin" title="Notion 同步" description="为下一阶段预留的内容同步控制台。Token 只在服务端使用，不会发送到浏览器。" /><NotionSyncPanel /></>; }
