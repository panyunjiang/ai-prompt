import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Header from "@/components/Header";
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
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
  verification: {
    other: {
      "baidu-site-verification": "codeva-akYN5rMLN6",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body style={{ background: "#f5f7fa", margin: 0, fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9NW77YSS9T"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9NW77YSS9T');
          `}
        </Script>
        <Header />
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
