"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");

  return (
    <header style={{ height: 56, background: "white", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href={isEn ? "/en" : "/"} style={{ display: "flex", alignItems: "center", textDecoration: "none", gap: 8 }}>
          <img src="/icon.svg" alt="PromptHub" width={32} height={32} />
          <span style={{ fontSize: "1.15rem", fontWeight: 700, color: "#1e293b" }}>PromptHub</span>
        </Link>
        <nav style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <Link href={isEn ? "/en" : "/"} style={{ padding: "8px 16px", borderRadius: 8, fontSize: "0.9rem", color: "#64748b", textDecoration: "none" }}>
            {isEn ? "Home" : "首页"}
          </Link>
          <Link href={isEn ? "/en/search" : "/search"} style={{ padding: "8px 16px", borderRadius: 8, fontSize: "0.9rem", color: "#64748b", textDecoration: "none" }}>
            {isEn ? "Search" : "搜索"}
          </Link>
          {isEn ? (
            <Link href="/" style={{ padding: "6px 12px", borderRadius: 6, fontSize: "0.8rem", color: "#6366f1", border: "1px solid #6366f1", textDecoration: "none" }}>中文</Link>
          ) : (
            <Link href="/en" style={{ padding: "6px 12px", borderRadius: 6, fontSize: "0.8rem", color: "#6366f1", border: "1px solid #6366f1", textDecoration: "none" }}>EN</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
