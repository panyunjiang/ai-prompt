import Link from "next/link";
import { notFound } from "next/navigation";
import { prompts, getPromptById, getPrompt, getCategoryBySlug, getCategory } from "@/lib/data";
import CopyButton from "@/components/CopyButton";
import { PromptJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return prompts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const prompt = getPromptById(id);
  if (!prompt) return { title: "Prompt not found" };
  const t = getPrompt(prompt, "en");
  return { title: `${t.title} - AI Prompt | PromptHub`, description: t.useCase };
}

export default async function EnPromptDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const prompt = getPromptById(id);
  if (!prompt) notFound();
  const t = getPrompt(prompt, "en");
  const cat = getCategoryBySlug(prompt.category);
  const catEn = cat ? getCategory(cat, "en") : null;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 16px" }}>
      <PromptJsonLd
        title={t.title}
        description={t.useCase}
        url={`https://prompt.aiv.yn.cn/en/prompt/${prompt.id}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://prompt.aiv.yn.cn/en" },
          { name: catEn?.name || prompt.category, url: `https://prompt.aiv.yn.cn/en/category/${prompt.category}` },
          { name: t.title, url: `https://prompt.aiv.yn.cn/en/prompt/${prompt.id}` },
        ]}
      />
      <div style={{ padding: "32px 0" }}>
        <div style={{ fontSize: "0.9rem", color: "#94a3b8", marginBottom: 24 }}>
          <Link href="/en">Home</Link> / <Link href={`/en/category/${prompt.category}`}>{catEn?.name}</Link> / <span style={{ color: "#64748b" }}>{t.title}</span>
        </div>

        <h1 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b", marginBottom: 12 }}>{t.title}</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          <span style={{ padding: "4px 12px", borderRadius: 6, background: "#eff6ff", color: "#2563eb", fontSize: "0.85rem" }}>{prompt.platform}</span>
          {catEn && <span style={{ padding: "4px 12px", borderRadius: 6, background: "#f1f5f9", color: "#475569", fontSize: "0.85rem" }}>{cat?.icon} {catEn.name}</span>}
        </div>

        <div style={{ background: "white", borderRadius: 12, padding: "16px 20px", border: "1px solid #e5e7eb", marginBottom: 16 }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>📋 Use Case</h2>
          <p style={{ color: "#475569", lineHeight: 1.7 }}>{t.useCase}</p>
        </div>

        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e5e7eb", marginBottom: 16, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", background: "#f8fafc", borderBottom: "1px solid #e5e7eb" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 600 }}>📝 Prompt</h2>
            <CopyButton text={t.content} />
          </div>
          <pre style={{ padding: "16px 20px", whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 1.8, color: "#334155", fontSize: "0.9rem", margin: 0 }}>{t.content}</pre>
        </div>

        {t.example && (
          <div style={{ background: "white", borderRadius: 12, padding: "16px 20px", border: "1px solid #e5e7eb", marginBottom: 16 }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>💡 Example</h2>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>{t.example}</p>
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
          {t.tags.map((tag) => (
            <Link key={tag} href={`/en/search?q=${encodeURIComponent(tag)}`} style={{ padding: "4px 10px", borderRadius: 6, background: "#f1f5f9", color: "#64748b", fontSize: "0.8rem" }}>#{tag}</Link>
          ))}
        </div>

        <div style={{ background: "#fffbeb", borderRadius: 12, padding: "16px 20px", border: "1px solid #fde68a" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8, color: "#92400e" }}>⚠️ How to Use</h2>
          <p style={{ color: "#92400e", lineHeight: 1.7, fontSize: "0.9rem" }}>
            Replace <code style={{ background: "#fef3c7", padding: "2px 4px", borderRadius: 4 }}>{'{variable}'}</code> placeholders with your actual content before using the prompt.
          </p>
        </div>
      </div>
    </div>
  );
}
