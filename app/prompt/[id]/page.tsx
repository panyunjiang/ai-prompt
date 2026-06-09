import Link from "next/link";
import { notFound } from "next/navigation";
import { prompts, getPromptById, getCategoryBySlug } from "@/lib/data";
import CopyButton from "@/components/CopyButton";
import { PromptJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return prompts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const prompt = getPromptById(id);
  if (!prompt) return { title: "提示词不存在" };
  return { title: `${prompt.title} - AI提示词 | PromptHub`, description: prompt.useCase };
}

export default async function PromptDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const prompt = getPromptById(id);
  if (!prompt) notFound();
  const cat = getCategoryBySlug(prompt.category);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 16px" }}>
      <PromptJsonLd
        title={prompt.title}
        description={prompt.useCase}
        url={`https://prompt.aiv.yn.cn/prompt/${prompt.id}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "首页", url: "https://prompt.aiv.yn.cn" },
          { name: cat?.name || prompt.category, url: `https://prompt.aiv.yn.cn/category/${prompt.category}` },
          { name: prompt.title, url: `https://prompt.aiv.yn.cn/prompt/${prompt.id}` },
        ]}
      />
      <div style={{ padding: "32px 0" }}>
        <div style={{ fontSize: "0.9rem", color: "#94a3b8", marginBottom: 24 }}>
          <Link href="/">首页</Link> / <Link href={`/category/${prompt.category}`}>{cat?.name}</Link> / <span style={{ color: "#64748b" }}>{prompt.title}</span>
        </div>

        <h1 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b", marginBottom: 12 }}>{prompt.title}</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          <span style={{ padding: "4px 12px", borderRadius: 6, background: "#eff6ff", color: "#2563eb", fontSize: "0.85rem" }}>{prompt.platform}</span>
          {cat && <span style={{ padding: "4px 12px", borderRadius: 6, background: "#f1f5f9", color: "#475569", fontSize: "0.85rem" }}>{cat.icon} {cat.name}</span>}
        </div>

        <div style={{ background: "white", borderRadius: 12, padding: "16px 20px", border: "1px solid #e5e7eb", marginBottom: 16 }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>📋 使用场景</h2>
          <p style={{ color: "#475569", lineHeight: 1.7 }}>{prompt.useCase}</p>
        </div>

        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e5e7eb", marginBottom: 16, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", background: "#f8fafc", borderBottom: "1px solid #e5e7eb" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 600 }}>📝 提示词</h2>
            <CopyButton text={prompt.content} />
          </div>
          <pre style={{ padding: "16px 20px", whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 1.8, color: "#334155", fontSize: "0.9rem", margin: 0 }}>{prompt.content}</pre>
        </div>

        {prompt.example && (
          <div style={{ background: "white", borderRadius: 12, padding: "16px 20px", border: "1px solid #e5e7eb", marginBottom: 16 }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>💡 使用示例</h2>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>{prompt.example}</p>
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
          {prompt.tags.map((tag) => (
            <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} style={{ padding: "4px 10px", borderRadius: 6, background: "#f1f5f9", color: "#64748b", fontSize: "0.8rem" }}>#{tag}</Link>
          ))}
        </div>

        <div style={{ background: "#fffbeb", borderRadius: 12, padding: "16px 20px", border: "1px solid #fde68a" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8, color: "#92400e" }}>⚠️ 使用说明</h2>
          <p style={{ color: "#92400e", lineHeight: 1.7, fontSize: "0.9rem" }}>
            提示词中的 <code style={{ background: "#fef3c7", padding: "2px 4px", borderRadius: 4 }}>{'{变量名}'}</code> 需要替换为你的实际内容。复制后将花括号内的文字替换即可。
          </p>
        </div>
      </div>
    </div>
  );
}
