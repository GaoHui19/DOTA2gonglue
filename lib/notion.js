import { Client } from '@notionhq/client'
const notion = new Client({ auth: process.env.NOTION_TOKEN })

const MENU_DB_ID = process.env.NOTION_MENU_DB_ID
const HERO_DB_ID = process.env.NOTION_HERO_DB_ID
const ITEM_DB_ID = process.env.NOTION_ITEM_DB_ID

// 获取菜单，生成树形结构，完全匹配你截图MenuDB
export async function getMenuTree() {
  const { results } = await notion.databases.query({
    database_id: MENU_DB_ID,
  })
  const rawList = results.map(item => {
    const props = item.properties
    return {
      id: item.id,
      title: props.title?.title?.[0]?.plain_text || '',
      slug: props.slug?.rich_text?.[0]?.plain_text || '/',
      type: props.type?.select?.name || '',
      parentId: props.parent?.relation?.[0]?.id || null,
      status: props.status?.select?.name || '',
      sort: props.sort?.number ?? 99,
    }
  })
  // 只上线 Published上线
  const published = rawList.filter(m => m.status === 'Published上线')
  // 一级菜单
  const rootMenus = published
    .filter(m => m.type === 'Menu一级菜单' && !m.parentId)
    .sort((a, b) => a.sort - b.sort)
  // 挂载子菜单
  const tree = rootMenus.map(root => {
    const children = published
      .filter(sub => sub.type === 'SubMenu二级子菜单' && sub.parentId === root.id)
      .sort((a, b) => a.sort - b.sort)
    return { ...root, children }
  })
  return tree
}

// 英雄列表
export async function getHeroList() {
  const { results } = await notion.databases.query({
    database_id: HERO_DB_ID,
    filter: { property: "是否发布", checkbox: { equals: true } },
    sorts: [{ property: "sort", direction: "ascending" }],
  })
  return results.map(item => {
    const p = item.properties
    return {
      id: item.id,
      name: p['英雄名']?.title?.[0]?.plain_text || '无名英雄',
      alias: p['称号']?.rich_text?.[0]?.plain_text || '',
      attr: p['主属性']?.multi_select?.map(i=>i.name).join('、') || '',
      diff: p['难度']?.select?.name || '',
      avatar: p['头像']?.files?.[0]?.file?.url || '',
      line: p['对线思路']?.rich_text?.[0]?.plain_text || '',
      equip: p['出装推荐']?.rich_text?.[0]?.plain_text || '',
      skill: p['技能加点']?.rich_text?.[0]?.plain_text || '',
      anti: p['克制英雄']?.rich_text?.[0]?.plain_text || '',
      beAnti: p['被克制英雄']?.rich_text?.[0]?.plain_text || '',
      sort: p['sort']?.number ?? 99
    }
  })
}

// 单英雄详情
export async function getHeroById(pageId) {
  const page = await notion.pages.retrieve({ page_id: pageId })
  const p = page.properties
  return {
    id: page.id,
    name: p['英雄名']?.title?.[0]?.plain_text || '无名英雄',
    alias: p['称号']?.rich_text?.[0]?.plain_text || '',
    attr: p['主属性']?.multi_select?.map(i=>i.name).join('、') || '',
    diff: p['难度']?.select?.name || '',
    avatar: p['头像']?.files?.[0]?.file?.url || '',
    line: p['对线思路']?.rich_text?.[0]?.plain_text || '',
    equip: p['出装推荐']?.rich_text?.[0]?.plain_text || '',
    skill: p['技能加点']?.rich_text?.[0]?.plain_text || '',
    anti: p['克制英雄']?.rich_text?.[0]?.plain_text || '',
    beAnti: p['被克制英雄']?.rich_text?.[0]?.plain_text || '',
  }
}

// 装备列表
export async function getItemList() {
  const { results } = await notion.databases.query({
    database_id: ITEM_DB_ID,
    filter: { property: "是否发布", checkbox: { equals: true } },
    sorts: [{ property: "sort", direction: "ascending" }],
  })
  return results.map(item => {
    const p = item.properties
    return {
      id: item.id,
      name: p['装备名称']?.title?.[0]?.plain_text || '',
      category: p['装备分类']?.select?.name || '',
      price: p['价格']?.number || 0,
      icon: p['装备图标']?.files?.[0]?.file?.url || '',
      effect: p['装备效果']?.rich_text?.[0]?.plain_text || '',
      recipe: p['合成路线']?.rich_text?.[0]?.plain_text || '',
      upgrade: p['进阶合成']?.rich_text?.[0]?.plain_text || '',
      sort: p['sort']?.number ?? 99
    }
  })
}

