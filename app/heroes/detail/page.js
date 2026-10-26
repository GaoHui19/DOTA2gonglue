import Link from 'next/link'

export default async function HeroDetailPage({ searchParams }) {
  const id = searchParams?.id
  // 模拟英雄数据，后面对接notion数据库后替换
  const heroMap = {
    '1': {
      id: '1',
      name: '斧王',
      alias: 'Mogul Khan',
      avatar: '',
      attr: '力量',
      intro: '斧王是一名冲锋在前的近战力量英雄，擅长先手开团、持续承伤，依靠反击螺旋打出伤害。',
      skill: '狂战士之吼、反击螺旋、战斗饥渴、淘汰之刃',
      build: '前期：相位鞋、先锋盾；中期：跳刀、刃甲；后期：龙心、BKB、强袭装甲'
    },
    '2': {
      id: '2',
      name: '影魔',
      alias: 'Nevermore',
      avatar: '',
      attr: '敏捷',
      intro: '影魔是一个高爆发远程敏捷英雄，魂量决定输出，大招拥有极强的团战毁灭能力。',
      skill: '毁灭阴影、支配死灵、魔王降临、魂之挽歌',
      build: '前期：魔瓶、相位鞋；中期：分身、BKB；后期：蝴蝶、撒旦、大炮'
    }
  }

  const hero = heroMap[id]
  if (!hero) {
    return (
      <div className="content-inner">
        <Link href="/heroes" className="back-btn">← 返回英雄列表</Link>
        <h2>未找到该英雄</h2>
      </div>
    )
  }

  return (
    <div className="content-inner">
      <Link href="/heroes" className="back-btn">← 返回英雄列表</Link>
      <div className="detail-card">
        <div className="detail-top">
          {hero.avatar && <img src={hero.avatar} alt={hero.name} />}
          <div>
            <h2>{hero.name}</h2>
            <p>英文名：{hero.alias}</p>
            <p>属性：{hero.attr}</p>
          </div>
        </div>
        <div className="detail-body">
          <section>
            <h3>英雄简介</h3>
            <p>{hero.intro}</p>
          </section>
          <section>
            <h3>技能介绍</h3>
            <p>{hero.skill}</p>
          </section>
          <section>
            <h3>出装推荐</h3>
            <p>{hero.build}</p>
          </section>
        </div>
      </div>
    </div>
  )
}
