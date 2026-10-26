import HeroCardList from '../HeroCardList'
import SearchFilter from '../SearchFilter'

export default async function HeroesPage({ searchParams }) {
  const heroes = [
    {
      id: '1',
      name: '斧王',
      alias: 'Mogul Khan',
      avatar: '',
      attr: '力量'
    },
    {
      id: '2',
      name: '影魔',
      alias: 'Nevermore',
      avatar: '',
      attr: '敏捷'
    },
  ]

  const q = searchParams?.q || ''
  const cate = searchParams?.cate || ''

  let filtered = heroes
  // 关键词搜索过滤
  if (q) {
    filtered = filtered.filter((h) => h.name.includes(q))
  }
  // 属性分类过滤
  if (cate) {
    filtered = filtered.filter((h) => h.attr === cate)
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
