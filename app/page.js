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
    <>
      {/* 表头信息全部写死在这里，想改文字直接改这里 */}
      <header className="site-header">
        <div className="header-inner">
          <h1 className="header-title">DOTA2 英雄攻略库</h1>
          <p className="header-sub">专注DOTA2英雄出装、技能加点、玩法思路参考</p>
          <div className="header-desc">
            本攻略库持续更新，适合新手快速上手，老玩家参考新思路
          </div>
        </div>
      </header>
      <main className="container">
        <HeroCardList heroes={heroDataList} />
      </main>
    </>
  )
}
