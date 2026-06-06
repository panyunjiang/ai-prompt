import promptsData from "@/data/prompts.json";
import categoriesData from "@/data/categories.json";

export interface Prompt {
  id: string;
  title: string;
  category: string;
  platform: string;
  content: string;
  tags: string[];
  useCase: string;
  example: string;
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  description: string;
}

export const prompts: Prompt[] = promptsData;
export const categories: Category[] = categoriesData;

export function getPromptsByCategory(slug: string): Prompt[] {
  return prompts.filter((p) => p.category === slug);
}

export function getPromptById(id: string): Prompt | undefined {
  return prompts.find((p) => p.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function searchPrompts(query: string): Prompt[] {
  const q = query.toLowerCase();
  return prompts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.useCase.toLowerCase().includes(q) ||
      p.platform.toLowerCase().includes(q)
  );
}
