import { getHeroList } from '@/lib/notion'
import HeroCardList from '../HeroCardList'
import SearchFilter from '../SearchFilter'

export default async function HeroPage({ searchParams }) {
  const allHeroes = await getHeroList()
  const q = searchParams?.q || ''
  const cate = searchParams?.cate || ''

  let heroes = allHeroes
  if(q) heroes = heroes.filter(h=>h.name.includes(q))
  if(cate) heroes = heroes.filter(h=>h.attr.includes(cate))

  return (
    <div className="content-inner">
      <header className="page-header">
        <h1>英雄攻略</h1>
        <SearchFilter />
      </header>
      <HeroCardList heroes={heroes}/>
    </div>
  )
}

