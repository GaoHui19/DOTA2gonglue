'use client'
import Link from 'next/link'

export default function HeroCardList({heroes}) {
  return (
    <div className="card-list">
      {heroes.map(hero=>{
        return (
          <div className="card" key={hero.id}>
            <div className="avatar-wrap">
              {hero.avatarUrl ? <img src={hero.avatarUrl} alt={hero.name} className="avatar"/> : <div className="avatar-empty">{hero.name[0]}</div>}
            </div>
            <h2>{hero.name}</h2>
            <div className="en-title">{hero.titleEn}</div>
            <div className="tag-row">
              <span className="tag">{hero.position}</span>
              <span className="tag diff-tag">{hero.diff}</span>
            </div>
            <Link href={`/hero?id=${hero.id}`} className="detail-btn">查看详细攻略</Link>
          </div>
        )
      })}
    </div>
  )
}
