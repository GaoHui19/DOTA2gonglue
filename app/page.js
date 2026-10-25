import { Client } from '@notionhq/client'
import HeroCardList from './HeroCardList'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

async function getHeroList() {
  const res = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    filter: {
      property: "是否发布",
      checkbox: { equals: true }
    },
    sorts: [
      {
        property: "排序号",
        direction: "ascending",
      },
    ],
  })
  return res.results
}

export default async function Home() {
  const list = await getHeroList()

  // 格式化数据，转成普通对象传给客户端组件（必须序列化！）
  const heroDataList = list.map(item => {
    const props = item.properties
    return {
      id: item.id,
      name: props['英雄名']?.title?.[0]?.plain_text || "无名英雄",
      titleEn: props['称号']?.rich_text?.[0]?.plain_text || "",
      position: props['定位']?.multi_select?.map(i=>i.name).join("、") || "-",
      diff: props['难度']?.select?.name || "-",
      equip: props['出装']?.rich_text?.[0]?.plain_text || "-",
      skill: props['技能加点']?.rich_text?.[0]?.plain_text || "-",
      avatarUrl: props['头像']?.files?.[0]?.file?.url || ""
    }
  })

  return (
    <div className="container">
      <h1>DOTA2 英雄攻略库</h1>
      <HeroCardList heroes={heroDataList} />
    </div>
  )
}
