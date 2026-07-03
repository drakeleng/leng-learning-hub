# Leng Learning Hub

一个以英语学习为核心的个人学习中心。当前 MVP 包含仪表盘、单词卡片、中译英测试、错题本、学习进度、学习笔记、Supabase 登录，以及 Notion 同步预留页面。

## 本地运行

需要 Node.js 20.9 或更高版本。

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:3000`。未配置云服务时，测试记录、错题和进度会保存在浏览器 `localStorage` 中。

## 配置 Supabase

1. 在 Supabase 创建项目。
2. 打开 SQL Editor，运行 `supabase/schema.sql`。
3. 在 Project Settings → API 获取 Project URL 和 Publishable key。
4. 复制 `.env.example` 为 `.env.local`，填入：

```env
NEXT_PUBLIC_SUPABASE_URL=https://你的项目.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=你的_publishable_key
```

配置后，访问 `/login` 注册或登录。登录状态下的新答题记录和错题会同时写入 Supabase；本地存储仍保留为离线兜底。

## 配置 Notion（下一阶段）

1. 打开 Notion Integrations 页面，创建 Internal Integration。
2. 复制 Integration Secret，作为 `NOTION_TOKEN`。
3. 在 Notion 的 `English Learning` 页面点击 Share / Connections，把页面分享给该 Integration。
4. 从页面链接复制页面 ID，作为 `NOTION_PAGE_ID`。
5. 在 `.env.local` 增加：

```env
NOTION_TOKEN=ntn_xxx
NOTION_PAGE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

`NOTION_TOKEN` 是服务端秘密，绝对不要加 `NEXT_PUBLIC_` 前缀。当前 `lib/notion.ts` 已预留读取页面 Block 的方法，`/admin/notion-sync` 是同步控制台 UI；真正的数据解析和定时同步属于下一阶段。

## 部署到 Vercel

将仓库导入 Vercel，Framework Preset 选择 Next.js，并在 Vercel 项目设置中添加与 `.env.local` 相同的环境变量。随后部署即可。

## 主要目录

```text
app/                    页面与路由
components/             可复用界面和交互组件
data/                   MVP 示例单词与笔记
lib/                    Supabase、Notion、同步与工具函数
types/                  TypeScript 数据类型
supabase/schema.sql     数据库建表与 RLS 权限策略
```

## 添加单词

编辑 `data/sampleWords.ts`，按现有结构追加对象即可。`id` 需保持唯一，`day` 和 `groupName` 会用于筛选和分组。
