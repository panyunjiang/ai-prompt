import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getPromptsByCategory, getCategoryBySlug } from "@/lib/data";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) return { title: "分类不存在" };
  return {
    title: `${cat.icon} ${cat.name}提示词大全 | PromptHub`,
    description: cat.description,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) notFound();
  const prompts = getPromptsByCategory(params.slug);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
      <div style={{ padding: "32px 0" }}>
        <div style={{ fontSize: "0.9rem", color: "#94a3b8", marginBottom: 16 }}>
          <Link href="/">首页</Link> / <span style={{ color: "#64748b" }}>{cat.name}</span>
        </div>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>{cat.icon} {cat.name}提示词</h1>
        <p style={{ color: "#64748b", marginBottom: 32 }}>{cat.description}</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12 }}>
          {prompts.map((prompt) => (
            <Link key={prompt.id} href={`/prompt/${prompt.id}`} style={{ background: "white", borderRadius: 12, padding: "16px 20px", border: "1px solid #e5e7eb", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: "0.75rem", padding: "2px 8px", borderRadius: 4, background: "#eff6ff", color: "#2563eb" }}>{prompt.platform}</span>
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#1e293b" }}>{prompt.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{prompt.useCase}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: "auto" }}>
                {prompt.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: "0.7rem", padding: "2px 6px", borderRadius: 4, background: "#f1f5f9", color: "#64748b" }}>{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {prompts.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>📭</div>
            <p style={{ color: "#64748b" }}>该分类暂无提示词</p>
          </div>
        )}
      </div>
    </div>
  );
}
