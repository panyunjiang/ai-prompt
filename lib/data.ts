import promptsData from "@/data/prompts.json";
import categoriesData from "@/data/categories.json";

export interface LocalizedText {
  title: string;
  content: string;
  tags: string[];
  useCase: string;
  example: string;
}

export interface Prompt {
  id: string;
  title: string;
  category: string;
  platform: string;
  content: string;
  tags: string[];
  useCase: string;
  example: string;
  en: LocalizedText;
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  description: string;
  en: { name: string; description: string };
}

export const prompts: Prompt[] = promptsData;
export const categories: Category[] = categoriesData;

export type Lang = "zh" | "en";

export function getPrompt(prompt: Prompt, lang: Lang): LocalizedText {
  if (lang === "en") return prompt.en;
  return { title: prompt.title, content: prompt.content, tags: prompt.tags, useCase: prompt.useCase, example: prompt.example };
}

export function getCategory(cat: Category, lang: Lang) {
  if (lang === "en") return { name: cat.en.name, description: cat.en.description };
  return { name: cat.name, description: cat.description };
}

export function getPromptsByCategory(slug: string): Prompt[] {
  return prompts.filter((p) => p.category === slug);
}

export function getPromptById(id: string): Prompt | undefined {
  return prompts.find((p) => p.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function searchPrompts(query: string, lang: Lang = "zh"): Prompt[] {
  const q = query.toLowerCase();
  return prompts.filter((p) => {
    const t = getPrompt(p, lang);
    return (
      t.title.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      t.useCase.toLowerCase().includes(q) ||
      p.platform.toLowerCase().includes(q)
    );
  });
}
