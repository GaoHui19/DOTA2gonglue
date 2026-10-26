export default async function ItemsPage() {
  // 装备模拟数据，后续对接Notion
  const items = [
    { id: '1', name: '闪烁匕首', category: '战术装备', price: 2250, effect: '传送至最远1200距离位置' },
    { id: '2', name: '黑皇杖', category: '防具', price: 3975, effect: '技能免疫10秒' },
    { id: '3', name: '蝴蝶剑', category: '武器', price: 5000, effect: '+30敏捷 +35%闪避' },
    { id: '4', name: '魔龙枪', category: '武器', price: 2250, effect: '+14敏捷 +40攻击距离' },
  ]

  return (
    <div className="content-inner">
      <div className="page-header">
        <h1>装备图鉴</h1>
        <p>DOTA2 常用装备效果与价格一览</p>
      </div>
      <div className="item-grid">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <h4>{item.name}</h4>
            <p>分类：{item.category}</p>
            <p>价格：{item.price} 金币</p>
            <p>效果：{item.effect}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
