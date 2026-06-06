import type { Metadata } from "next";
import Link from "next/link";
import "../globals.css";

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
  return (
    <>
      <header style={{ height: 56, background: "white", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/en" style={{ display: "flex", alignItems: "center", textDecoration: "none", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 14 }}>P</div>
            <span style={{ fontSize: "1.15rem", fontWeight: 700, color: "#1e293b" }}>PromptHub</span>
          </Link>
          <nav style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <Link href="/en" style={{ padding: "8px 16px", borderRadius: 8, fontSize: "0.9rem", color: "#64748b", textDecoration: "none" }}>Home</Link>
            <Link href="/en/search" style={{ padding: "8px 16px", borderRadius: 8, fontSize: "0.9rem", color: "#64748b", textDecoration: "none" }}>Search</Link>
            <Link href="/" style={{ padding: "6px 12px", borderRadius: 6, fontSize: "0.8rem", color: "#6366f1", border: "1px solid #6366f1", textDecoration: "none" }}>中文</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer style={{ background: "#0f172a", color: "#94a3b8", padding: "40px 16px", textAlign: "center", marginTop: 40 }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "white", marginBottom: 10 }}>PromptHub</div>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.6, marginBottom: 16 }}>Curated AI prompts to help you get the most out of AI tools</p>
          <p style={{ fontSize: "0.8rem", color: "#64748b" }}>© 2026 PromptHub. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
