import { Client } from '@notionhq/client'

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
    <div className="container">
      <h1>DOTA2 英雄攻略库</h1>
      <div className="card-list">
        {list.map(item=>{
          const props = item.properties
          const name = props['名称']?.title?.[0]?.plain_text || "无名英雄"
          const position = props['定位']?.multi_select?.map(i=>i.name).join("、") || "-"
          const diff = props['难度']?.select?.name || "-"
          const equip = props['出装']?.rich_text?.[0]?.plain_text || "-"
          const skill = props['技能加点']?.rich_text?.[0]?.plain_text || "-"

          return (
            <div className="card" key={item.id}>
              <h2>{name}</h2>
              <div>
                <span className="tag">{position}</span>
                <span className="tag">{diff}</span>
              </div>
              <p><b>出装：</b>{equip}</p>
              <p><b>加点：</b>{skill}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

