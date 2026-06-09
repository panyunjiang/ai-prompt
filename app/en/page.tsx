import Link from "next/link";
import { categories, prompts, getPrompt, getCategory } from "@/lib/data";
import { WebsiteJsonLd } from "@/components/JsonLd";

export default function EnHomePage() {
  const platforms = [...new Set(prompts.map((p) => p.platform))];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
      <WebsiteJsonLd />
      <section style={{ textAlign: "center", padding: "60px 0 40px" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#1e293b", marginBottom: 12 }}>
          🤖 AI Prompt Library
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#64748b", marginBottom: 32, maxWidth: 600, margin: "0 auto 32px" }}>
          {prompts.length}+ curated prompts for ChatGPT, Midjourney, Stable Diffusion, and more
        </p>
        <form action="/en/search" method="GET" style={{ maxWidth: 500, margin: "0 auto" }}>
          <div style={{ display: "flex", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(99,102,241,0.15)" }}>
            <input type="text" name="q" placeholder="Search prompts..." autoComplete="off" style={{ flex: 1, padding: "14px 16px", border: "none", fontSize: "1rem", outline: "none" }} />
            <button type="submit" style={{ padding: "14px 24px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", border: "none", fontSize: "1rem", fontWeight: 600, cursor: "pointer" }}>Search</button>
          </div>
        </form>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1e293b", marginBottom: 20 }}>📂 Categories</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
          {categories.map((cat) => {
            const count = prompts.filter((p) => p.category === cat.slug).length;
            const en = getCategory(cat, "en");
            return (
              <Link key={cat.slug} href={`/en/category/${cat.slug}`} style={{ background: "white", borderRadius: 12, padding: "20px 16px", textAlign: "center", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: "2rem", marginBottom: 8 }}>{cat.icon}</div>
                <div style={{ fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>{en.name}</div>
                <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>{count} prompts</div>
              </Link>
            );
          })}
        </div>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1e293b", marginBottom: 20 }}>🔧 Platforms</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {platforms.map((p) => (
            <Link key={p} href={`/en/search?q=${encodeURIComponent(p)}`} style={{ padding: "8px 16px", background: "white", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: "0.9rem", color: "#475569" }}>{p}</Link>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1e293b", marginBottom: 20 }}>✨ Latest Prompts</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12 }}>
          {prompts.slice(0, 6).map((prompt) => {
            const t = getPrompt(prompt, "en");
            return (
              <Link key={prompt.id} href={`/en/prompt/${prompt.id}`} style={{ background: "white", borderRadius: 12, padding: "16px 20px", border: "1px solid #e5e7eb", display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: "0.75rem", padding: "2px 8px", borderRadius: 4, background: "#eff6ff", color: "#2563eb", alignSelf: "flex-start" }}>{prompt.platform}</span>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#1e293b" }}>{t.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{t.useCase}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: "auto" }}>
                  {t.tags.slice(0, 3).map((tag) => (
                    <span key={tag} style={{ fontSize: "0.7rem", padding: "2px 6px", borderRadius: 4, background: "#f1f5f9", color: "#64748b" }}>{tag}</span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
