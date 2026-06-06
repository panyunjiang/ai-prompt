import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI提示词大全 - ChatGPT/Midjourney/Cursor提示词库 | PromptHub",
  description: "精选AI提示词合集，涵盖写作、编程、绘画、办公等场景，支持ChatGPT、Midjourney、Stable Diffusion等主流AI工具。",
  keywords: "AI提示词,ChatGPT提示词,Prompt,Midjourney提示词,AI绘画提示词,提示词大全",
  metadataBase: new URL("https://prompt.aiv.yn.cn"),
  alternates: { canonical: "https://prompt.aiv.yn.cn" },
  openGraph: {
    title: "AI提示词大全 - PromptHub",
    description: "精选AI提示词合集，涵盖写作、编程、绘画、办公等场景",
    url: "https://prompt.aiv.yn.cn",
    siteName: "PromptHub",
    locale: "zh_CN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body style={{ background: "#f5f7fa", margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <header style={{ height: 56, background: "white", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 50 }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 14 }}>P</div>
              <span style={{ fontSize: "1.15rem", fontWeight: 700, color: "#1e293b" }}>PromptHub</span>
            </Link>
            <nav style={{ display: "flex", gap: 4 }}>
              <Link href="/" style={{ padding: "8px 16px", borderRadius: 8, fontSize: "0.9rem", color: "#64748b", textDecoration: "none" }}>首页</Link>
              <Link href="/search" style={{ padding: "8px 16px", borderRadius: 8, fontSize: "0.9rem", color: "#64748b", textDecoration: "none" }}>搜索</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer style={{ background: "#0f172a", color: "#94a3b8", padding: "40px 16px", textAlign: "center", marginTop: 40 }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "white", marginBottom: 10 }}>PromptHub</div>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.6, marginBottom: 16 }}>精选AI提示词合集，让AI更好地为你所用</p>
            <p style={{ fontSize: "0.8rem", color: "#64748b" }}>© 2026 PromptHub. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
