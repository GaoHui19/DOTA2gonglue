'use client'
import { useState } from 'react'

export default function HeroCardList({heroes}) {
  const [activeHero, setActiveHero] = useState(null)
  const closeModal = () => setActiveHero(null)

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
            <button onClick={()=>setActiveHero(hero)} className="detail-btn">查看详细攻略</button>
          </div>
        )
      })}

      {/* 弹窗详情 */}
      {activeHero && (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal-box" onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              {activeHero.avatarUrl ? <img src={activeHero.avatarUrl} className="modal-avatar"/> : <div className="avatar-empty">{activeHero.name[0]}</div>}
              <div>
                <h2>{activeHero.name}</h2>
                <div className="en-title">{activeHero.titleEn}</div>
              </div>
              <span className="close-btn" onClick={closeModal}>×</span>
            </div>
            <div className="modal-body">
              <div className="info-line"><b>定位：</b>{activeHero.position}</div>
              <div className="info-line"><b>难度：</b>{activeHero.diff}</div>
              <div className="info-line"><b>出装推荐：</b><p>{activeHero.equip}</p></div>
              <div className="info-line"><b>技能加点：</b><p>{activeHero.skill}</p></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

