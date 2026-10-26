import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const MENU_DB_ID = process.env.NOTION_MENU_DB_ID

// 获取侧边菜单树
export async function getMenuTree() {
  if (!MENU_DB_ID) return []
  const res = await notion.databases.query({
    database_id: MENU_DB_ID,
    sorts: [
      {
        property: 'sort',
        direction: 'ascending',
      },
    ],
  })

  const rawList = res.results.map((item) => {
    const props = item.properties
    return {
      id: item.id,
      title: props.title?.title?.[0]?.plain_text || '',
      link: props.link?.url || '',
      parentId: props.parentId?.rich_text?.[0]?.plain_text || '',
      sort: props.sort?.number || 0,
    }
  })

  // 组装树形结构
  const tree = []
  const map = {}
  rawList.forEach((item) => {
    map[item.id] = { ...item, children: [] }
  })
  rawList.forEach((item) => {
    if (item.parentId && map[item.parentId]) {
      map[item.parentId].children.push(map[item.id])
    } else {
      tree.push(map[item.id])
    }
  })
  return tree
}

// 示例：后面可以在这里加英雄、装备查询函数
export async function getHeroList() {
  return []
}
