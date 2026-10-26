import HeroCardList from '../HeroCardList'
import SearchFilter from '../SearchFilter'

export default async function HeroesPage({ searchParams }) {
  const heroes = [
    {
      id: '1',
      name: '斧王',
      alias: 'Mogul Khan',
      avatar: '',
    },
    {
      id: '2',
      name: '影魔',
      alias: 'Nevermore',
      avatar: '',
    },
  ]

  const q = searchParams?.q || ''

  let filtered = heroes
  if (q) {
    filtered = filtered.filter((h) => h.name.includes(q))
  }

  return (
    <div className="content-inner">
      <div className="page-header">
        <h1>英雄资料</h1>
        <SearchFilter />
      </div>
      <HeroCardList heroes={filtered} />
    </div>
  )
}
