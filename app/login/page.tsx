import { PageHeader } from "@/components/PageHeader";
import { AuthPanel } from "@/components/AuthPanel";

export default function LoginPage() { return <><PageHeader eyebrow="Account" title="登录 Leng Learning Hub" description="连接 Supabase 后，可以使用邮箱注册和登录。未配置前仍可使用本地 MVP。" /><AuthPanel /></>; }
