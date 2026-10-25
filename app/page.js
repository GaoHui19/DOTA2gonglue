import { Client } from '@notionhq/client'
import HeroCardList from './HeroCardList'
import SearchFilter from './SearchFilter'
import Link from 'next/link'

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

export default async function Home({searchParams}) {
  const list = await getHeroList()
  const q = searchParams?.q || ''
  const cate = searchParams?.cate || ''

  let heroDataList = list.map(item => {
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

  // 关键词过滤
  if(q){
    heroDataList = heroDataList.filter(h=> h.name.includes(q))
  }
  // 分类过滤（匹配定位里的文字）
  if(cate){
    heroDataList = heroDataList.filter(h=> h.position.includes(cate))
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          {/* 顶部导航菜单 */}
          <nav className="top-nav">
            <Link href="/" className="nav-link active">🏠 首页</Link>
            <Link href="/" className="nav-link">🦸 英雄库</Link>
            <Link href="#" className="nav-link">⚔️ 装备库</Link>
          </nav>
          <h1 className="header-title">DOTA2 英雄攻略库</h1>
          <p className="header-sub">专注DOTA2英雄出装、技能加点、玩法思路参考</p>
          <div className="header-desc">
            本攻略库持续更新，适合新手快速上手，老玩家参考新思路
          </div>
          {/* 搜索 + 分类区域 */}
          <SearchFilter />
        </div>
      </header>
      <main className="container">
        {heroDataList.length <= 0 ? (
          <div className="empty-tip">没有找到匹配的英雄</div>
        ) : (
          <HeroCardList heroes={heroDataList} />
        )}
      </main>
    </>
  )
}
