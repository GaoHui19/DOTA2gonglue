import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_TOKEN
})
const MENU_DB_ID = process.env.NOTION_MENU_DB_ID

// 获取菜单，组装成嵌套树形结构
export async function getMenuTree() {
  const res = await notion.databases.query({
    database_id: MENU_DB_ID,
    filter: {
      property: 'status',
      select: {
        equals: 'Published上线'
      }
    },
    sorts: [
      {
        property: 'sort',
        direction: 'ascending'
      }
    ]
  })

  const allItems = res.results.map(item => {
    return {
      id: item.id,
      title: item.properties.title?.title[0]?.plain_text || '',
      link: item.properties.slug?.rich_text[0]?.plain_text || '#',
      type: item.properties.type?.select?.name || '',
      parentId: item.properties.parent?.relation?.[0]?.id || null
    }
  })

  // 分成一级菜单、二级子菜单
  const firstMenus = allItems.filter(i => i.type === 'Menu一级菜单')
  const subMenus = allItems.filter(i => i.type === 'SubMenu二级子菜单')

  // 把子菜单挂载到对应的一级菜单
  firstMenus.forEach(menu => {
    menu.children = subMenus.filter(sub => sub.parentId === menu.id)
  })

  return firstMenus
}
