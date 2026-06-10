/**
 * PromptHub 每周提示词生成脚本
 *
 * 用法:
 *   node scripts/generate-prompts.js [count]
 *
 * 环境变量:
 *   LLM_API_KEY  - LLM API key (默认: DeepSeek)
 *   LLM_BASE_URL - LLM API base URL
 *   LLM_MODEL    - 模型名称
 */

const fs = require("fs");
const path = require("path");

const LLM_API_KEY = process.env.LLM_API_KEY;
if (!LLM_API_KEY) {
  console.error("Error: LLM_API_KEY environment variable is required");
  process.exit(1);
}
const LLM_BASE_URL = process.env.LLM_BASE_URL || "https://api.deepseek.com/v1";
const LLM_MODEL = process.env.LLM_MODEL || "deepseek-chat";
const PROMPTS_FILE = path.join(__dirname, "..", "data", "prompts.json");
const COUNT = parseInt(process.argv[2]) || 5;

async function generatePrompts(count) {
  const response = await fetch(`${LLM_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LLM_API_KEY}`,
    },
    body: JSON.stringify({
      model: LLM_MODEL,
      messages: [
        {
          role: "system",
          content:
            "你是一个JSON数据生成器。只输出有效的JSON，不包含任何解释或markdown标记。生成高质量的中英双语AI提示词。",
        },
        {
          role: "user",
          content: `请生成${count}条新的、高质量的AI提示词（Prompt），中英双语版本。

要求：
1. 主题多样化，覆盖不同场景（写作、编程、绘画、办公、学习、商业等）
2. content字段是完整的提示词文本，包含角色设定和具体要求，要详细、实用
3. 不要与常见的提示词重复，要有创意和新意
4. 每条提示词的id用 "category-slug" 格式

输出纯JSON（不要markdown代码块）：
{
  "prompts": [
    {
      "id": "category-unique-slug",
      "title": "中文标题",
      "category": "writing|coding|art|work|learning|business",
      "platform": "ChatGPT",
      "content": "完整的中文提示词内容（包含角色设定+具体要求+输出格式等）",
      "tags": ["标签1", "标签2", "标签3", "标签4"],
      "useCase": "用途说明",
      "example": "使用示例说明",
      "en": {
        "title": "English Title",
        "content": "Full English prompt content",
        "tags": ["Tag1", "Tag2", "Tag3", "Tag4"],
        "useCase": "Use case description",
        "example": "Example"
      }
    }
  ]
}`,
        },
      ],
      temperature: 0.8,
      max_tokens: 4096,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`LLM API error ${response.status}: ${text}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content || "{}";

  // Clean any accidental markdown fences
  const cleaned = content.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  const parsed = JSON.parse(cleaned);

  return parsed.prompts || [];
}

async function main() {
  console.log(`[PromptHub] Generating ${COUNT} new prompts...`);

  // Read existing prompts
  const existing = JSON.parse(fs.readFileSync(PROMPTS_FILE, "utf-8"));
  const existingIds = new Set(existing.map((p) => p.id));

  console.log(`[PromptHub] Current total: ${existing.length} prompts`);

  // Generate new prompts
  let newPrompts = await generatePrompts(COUNT);

  // Filter out duplicates
  newPrompts = newPrompts.filter((p) => {
    if (existingIds.has(p.id)) {
      console.log(`[PromptHub] Duplicate id, skipping: ${p.id}`);
      return false;
    }
    return true;
  });

  if (newPrompts.length === 0) {
    console.log("[PromptHub] No new prompts generated (all duplicates).");
    return;
  }

  // Validate required fields
  newPrompts = newPrompts.filter((p) => {
    const valid =
      p.id && p.title && p.category && p.content && p.en && p.en.title && p.en.content;
    if (!valid) {
      console.log(`[PromptHub] Missing required fields, skipping: ${p.id || "unknown"}`);
    }
    return valid;
  });

  // Append and save
  const updated = [...existing, ...newPrompts];
  fs.writeFileSync(PROMPTS_FILE, JSON.stringify(updated, null, 2) + "\n", "utf-8");

  console.log(`[PromptHub] Added ${newPrompts.length} prompts.`);
  console.log(`[PromptHub] New total: ${updated.length} prompts.`);
  console.log(`[PromptHub] File saved: ${PROMPTS_FILE}`);

  // Print new prompt titles
  newPrompts.forEach((p) => console.log(`  + ${p.id}: ${p.title}`));
}

main().catch((err) => {
  console.error("[PromptHub] Error:", err.message);
  process.exit(1);
});
