import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Prompt Library - ChatGPT/Midjourney/Cursor Prompts | PromptHub",
  description: "Curated AI prompt collection for writing, coding, art, and productivity. Works with ChatGPT, Midjourney, Stable Diffusion, and more.",
  keywords: "AI prompts,ChatGPT prompts,Prompt engineering,Midjourney prompts,AI art prompts,prompt library",
  metadataBase: new URL("https://prompt.aiv.yn.cn"),
  alternates: { canonical: "https://prompt.aiv.yn.cn/en" },
  openGraph: {
    title: "AI Prompt Library - PromptHub",
    description: "Curated AI prompts for writing, coding, art, and productivity",
    url: "https://prompt.aiv.yn.cn/en",
    siteName: "PromptHub",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
