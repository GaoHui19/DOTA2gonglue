import { getItemList } from '@/lib/notion'

export default async function ItemPage() {
  const items = await getItemList()
  return (
    <div className="content-inner">
      <header className="page-header"><h1>装备图鉴</h1></header>
      <div className="item-grid">
        {items.map(i=>(
          <div key={i.id} className="item-card">
            {i.icon && <img src={i.icon} alt={i.name} />}
            <h4>{i.name}</h4>
            <p>价格：{i.price}</p>
            <p>{i.effect}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

