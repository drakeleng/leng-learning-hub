import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { LearningProvider } from "@/components/LearningProvider";

export const metadata: Metadata = {
  title: { default: "Leng Learning Hub", template: "%s · Leng Learning Hub" },
  description: "Personal learning center for English, notes, reviews and progress.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><LearningProvider><Sidebar /><MobileNav /><main className="relative min-h-screen px-4 py-8 lg:ml-64 lg:px-10 lg:py-10"><div className="mx-auto max-w-7xl">{children}</div></main></LearningProvider></body></html>;
}
