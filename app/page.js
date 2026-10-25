import { Client } from '@notionhq/client'
'use client'
import { useState } from 'react'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

async function getHeroList() {
  const res = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    filter: {
      property: "是否发布",
      checkbox: { equals: true }
    }
  })
  return res.results
}

export default async function Home() {
  const list = await getHeroList()

  return (
    <HeroPage heroes={list}/>
  )
}

function HeroPage({heroes}) {
  const [activeHero, setActiveHero] = useState(null)
  const closeModal = () => setActiveHero(null)

  return (
    <div className="container">
      <h1>DOTA2 英雄攻略库</h1>
      <div className="card-list">
        {heroes.map(item=>{
          const props = item.properties
          const name = props['英雄名']?.title?.[0]?.plain_text || "无名英雄"
          const titleEn = props['称号']?.rich_text?.[0]?.plain_text || ""
          const position = props['定位']?.multi_select?.map(i=>i.name).join("、") || "-"
          const diff = props['难度']?.select?.name || "-"
          const equip = props['出装']?.rich_text?.[0]?.plain_text || "-"
          const skill = props['技能加点']?.rich_text?.[0]?.plain_text || "-"
          const avatarUrl = props['头像']?.files?.[0]?.file?.url || ""

          const heroData = {name,titleEn,position,diff,equip,skill,avatarUrl}

          return (
            <div className="card" key={item.id}>
              <div className="avatar-wrap">
                {avatarUrl ? <img src={avatarUrl} alt={name} className="avatar"/> : <div className="avatar-empty">{name[0]}</div>}
              </div>
              <h2>{name}</h2>
              <div className="en-title">{titleEn}</div>
              <div className="tag-row">
                <span className="tag">{position}</span>
                <span className="tag diff-tag">{diff}</span>
              </div>
              <button onClick={()=>setActiveHero(heroData)} className="detail-btn">查看详细攻略</button>
            </div>
          )
        })}
      </div>

      {/* 弹窗详情 */}
      {activeHero && (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal-box" onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              {activeHero.avatarUrl ? <img src={activeHero.avatarUrl} className="modal-avatar"/> : <div className="avatar-empty">{activeHero.name[0]}</div>}
              <div>
                <h2>{activeHero.name}</h2>
                <div className="en-title">{activeHero.titleEn}</div>
              </div>
              <span className="close-btn" onClick={closeModal}>×</span>
            </div>
            <div className="modal-body">
              <div className="info-line"><b>定位：</b>{activeHero.position}</div>
              <div className="info-line"><b>难度：</b>{activeHero.diff}</div>
              <div className="info-line"><b>出装推荐：</b><p>{activeHero.equip}</p></div>
              <div className="info-line"><b>技能加点：</b><p>{activeHero.skill}</p></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
