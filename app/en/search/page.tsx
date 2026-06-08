import Link from "next/link";
import { searchPrompts, categories, getPrompt, getCategory } from "@/lib/data";

export default async function EnSearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = (q || "").trim();
  const results = query ? searchPrompts(query, "en") : [];
  const hotTags = ["ChatGPT", "Midjourney", "Writing", "Coding", "Art", "Productivity", "SEO", "Copywriting"];

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 16px" }}>
      <div style={{ padding: "32px 0" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b", marginBottom: 24, textAlign: "center" }}>🔍 Search Prompts</h1>

        <form action="/en/search" method="GET" style={{ maxWidth: 500, margin: "0 auto 24px" }}>
          <div style={{ display: "flex", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(99,102,241,0.15)" }}>
            <input type="text" name="q" placeholder="Search prompts..." defaultValue={query} autoFocus style={{ flex: 1, padding: "14px 16px", border: "none", fontSize: "1rem", outline: "none" }} />
            <button type="submit" style={{ padding: "14px 24px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", border: "none", fontSize: "1rem", fontWeight: 600, cursor: "pointer" }}>Search</button>
          </div>
        </form>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 32 }}>
          {hotTags.map((tag) => (
            <Link key={tag} href={`/en/search?q=${encodeURIComponent(tag)}`} style={{ padding: "6px 14px", borderRadius: 20, background: query === tag ? "#6366f1" : "#f1f5f9", color: query === tag ? "white" : "#475569", fontSize: "0.85rem" }}>{tag}</Link>
          ))}
        </div>

        {query ? (
          <>
            <p style={{ color: "#64748b", marginBottom: 20, textAlign: "center" }}>
              {results.length > 0 ? `Found ${results.length} prompts matching "${query}"` : `No prompts found for "${query}"`}
            </p>
            <div style={{ display: "grid", gap: 12 }}>
              {results.map((prompt) => {
                const t = getPrompt(prompt, "en");
                const cat = categories.find((c) => c.slug === prompt.category);
                const catEn = cat ? getCategory(cat, "en") : null;
                return (
                  <Link key={prompt.id} href={`/en/prompt/${prompt.id}`} style={{ background: "white", borderRadius: 12, padding: "16px 20px", border: "1px solid #e5e7eb" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: "0.75rem", padding: "2px 8px", borderRadius: 4, background: "#eff6ff", color: "#2563eb" }}>{prompt.platform}</span>
                      {catEn && <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{cat?.icon} {catEn.name}</span>}
                    </div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>{t.title}</h3>
                    <p style={{ fontSize: "0.85rem", color: "#64748b" }}>{t.useCase}</p>
                  </Link>
                );
              })}
            </div>
            {results.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: 16 }}>😅</div>
                <p style={{ color: "#64748b" }}>Try different keywords</p>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#94a3b8" }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>💡</div>
            <p>Enter keywords to search prompts</p>
          </div>
        )}
      </div>
    </div>
  );
}
