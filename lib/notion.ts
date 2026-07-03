/**
 * Phase-two Notion adapter.
 * Keep NOTION_TOKEN server-only; never expose it with a NEXT_PUBLIC_ prefix.
 */
export async function getNotionPageBlocks(pageId: string) {
  const token = process.env.NOTION_TOKEN;
  if (!token) throw new Error("NOTION_TOKEN is not configured");
  const response = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children`, {
    headers: { Authorization: `Bearer ${token}`, "Notion-Version": "2026-03-11" },
    next: { revalidate: 3600 },
  });
  if (!response.ok) throw new Error(`Notion API error: ${response.status}`);
  return response.json();
}
