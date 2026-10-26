import { getHeroList } from '@/lib/notion'
import HeroCardList from '../../HeroCardList'

export default async function PopularHero() {
  const heroes = await getHeroList()
  const popular = heroes.slice(0,6)
  return (
    <div className="content-inner">
      <header className="page-header"><h1>热门英雄</h1></header>
      <HeroCardList heroes={popular}/>
    </div>
  )
}

