import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function getMenuList() {
  const databaseId = process.env.NOTION_MENU_DB_ID;
  const res = await notion.databases.query({
    database_id: databaseId,
  });

  return res.results.map((item) => {
    return {
      id: item.id,
      title: item.properties.title?.title[0]?.plain_text || '',
      path: item.properties.path?.rich_text[0]?.plain_text || '',
      parent: item.properties.parent?.rich_text[0]?.plain_text || '',
    };
  });
}
