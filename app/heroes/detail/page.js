import { getHeroById } from '@/lib/notion'
import Link from 'next/link'

export default async function HeroDetail({ searchParams }) {
  const heroId = searchParams.id
  if(!heroId) {
    return (
      <div className="content-inner">
        <p>缺少英雄ID</p>
        <Link href="/heroes" className="back-btn">← 返回英雄列表</Link>
      </div>
    )
  }
  const hero = await getHeroById(heroId)
  return (
    <div className="content-inner">
      <Link href="/heroes" className="back-btn">← 返回英雄列表</Link>
      <div className="detail-card">
        <div className="detail-top">
          {hero.avatar && <img src={hero.avatar} alt={hero.name} className="avatar"/>}
          <div>
            <h2>{hero.name}</h2>
            <div>{hero.alias}</div>
            <span>{hero.attr}</span> <span>{hero.diff}</span>
          </div>
        </div>
        <div className="detail-body">
          <section><h3>对线思路</h3><p>{hero.line}</p></section>
          <section><h3>出装推荐</h3><p>{hero.equip}</p></section>
          <section><h3>技能加点</h3><p>{hero.skill}</p></section>
          <section><h3>克制英雄</h3><p>{hero.anti}</p></section>
          <section><h3>被克制英雄</h3><p>{hero.beAnti}</p></section>
        </div>
      </div>
    </div>
  )
}

