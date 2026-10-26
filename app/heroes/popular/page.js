import HeroCardList from '../../HeroCardList'

export default async function PopularHeroPage() {
  const popularHeroes = [
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
    {
      id: '3',
      name: '火女',
      alias: 'Lina',
      avatar: '',
    },
    {
      id: '4',
      name: '卡尔',
      alias: 'Invoker',
      avatar: '',
    },
  ]

  return (
    <div className="content-inner">
      <div className="page-header">
        <h1>热门英雄</h1>
        <p>玩家高频选用英雄推荐</p>
      </div>
      <HeroCardList heroes={popularHeroes} />
    </div>
  )
}
