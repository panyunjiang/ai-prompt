import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getPromptsByCategory, getCategoryBySlug, getPrompt, getCategory } from "@/lib/data";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) return { title: "Category not found" };
  const en = getCategory(cat, "en");
  return { title: `${cat.icon} ${en.name} AI Prompts | PromptHub`, description: en.description };
}

export default function EnCategoryPage({ params }: { params: { slug: string } }) {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) notFound();
  const en = getCategory(cat, "en");
  const promptList = getPromptsByCategory(params.slug);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
      <div style={{ padding: "32px 0" }}>
        <div style={{ fontSize: "0.9rem", color: "#94a3b8", marginBottom: 16 }}>
          <Link href="/en">Home</Link> / <span style={{ color: "#64748b" }}>{en.name}</span>
        </div>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>{cat.icon} {en.name} Prompts</h1>
        <p style={{ color: "#64748b", marginBottom: 32 }}>{en.description}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12 }}>
          {promptList.map((prompt) => {
            const t = getPrompt(prompt, "en");
            return (
              <Link key={prompt.id} href={`/en/prompt/${prompt.id}`} style={{ background: "white", borderRadius: 12, padding: "16px 20px", border: "1px solid #e5e7eb", display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: "0.75rem", padding: "2px 8px", borderRadius: 4, background: "#eff6ff", color: "#2563eb", alignSelf: "flex-start" }}>{prompt.platform}</span>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#1e293b" }}>{t.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5 }}>{t.useCase}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: "auto" }}>
                  {t.tags.map((tag) => <span key={tag} style={{ fontSize: "0.7rem", padding: "2px 6px", borderRadius: 4, background: "#f1f5f9", color: "#64748b" }}>{tag}</span>)}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
