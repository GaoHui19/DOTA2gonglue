import { Client } from '@notionhq/client'
import Link from 'next/link'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

async function getHeroDetail(id) {
  const res = await notion.pages.retrieve({ page_id: id })
  return res
}

export default async function HeroDetail({searchParams}) {
  const heroId = searchParams.id
  if (!heroId) {
    return (
      <main className="container">
        <p>缺少英雄ID</p>
        <Link href="/" className="back-btn">← 返回列表</Link>
      </main>
    )
  }
  const hero = await getHeroDetail(heroId)
  const props = hero.properties

  const heroInfo = {
    name: props['英雄名']?.title?.[0]?.plain_text || "无名英雄",
    titleEn: props['称号']?.rich_text?.[0]?.plain_text || "",
    position: props['定位']?.multi_select?.map(i=>i.name).join("、") || "-",
    diff: props['难度']?.select?.name || "-",
    equip: props['出装']?.rich_text?.[0]?.plain_text || "-",
    skill: props['技能加点']?.rich_text?.[0]?.plain_text || "-",
    avatarUrl: props['头像']?.files?.[0]?.file?.url || ""
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <h1 className="header-title">DOTA2 英雄攻略库</h1>
          <p className="header-sub">专注DOTA2英雄出装、技能加点、玩法思路参考</p>
          <div className="header-desc">
            本攻略库持续更新，适合新手快速上手，老玩家参考新思路
          </div>
        </div>
      </header>
      <main className="container detail-page">
        <Link href="/" className="back-btn">← 返回英雄列表</Link>
        <div className="detail-card">
          <div className="detail-top">
            <div className="detail-avatar">
              {heroInfo.avatarUrl ? <img src={heroInfo.avatarUrl} alt={heroInfo.name}/> : <div className="avatar-empty">{heroInfo.name[0]}</div>}
            </div>
            <div className="detail-title-wrap">
              <h2>{heroInfo.name}</h2>
              <div className="en-title">{heroInfo.titleEn}</div>
              <div className="tag-row">
                <span className="tag">{heroInfo.position}</span>
                <span className="tag diff-tag">{heroInfo.diff}</span>
              </div>
            </div>
          </div>
          <div className="detail-body">
            <div className="detail-item">
              <h3>出装推荐</h3>
              <p>{heroInfo.equip}</p>
            </div>
            <div className="detail-item">
              <h3>技能加点</h3>
              <p>{heroInfo.skill}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

