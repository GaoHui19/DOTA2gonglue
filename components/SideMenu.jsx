'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function SideMenu({ menuTree }) {
  const pathname = usePathname()
  const [openKeys, setOpenKeys] = useState({})

  const toggleOpen = (id) => {
    setOpenKeys((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  if (!menuTree || menuTree.length === 0) {
    return <aside className="side-bar">侧边菜单加载中...</aside>
  }

  return (
    <aside className="side-bar">
      <div className="side-logo">DOTA2 攻略库</div>
      <nav className="side-nav">
        {menuTree.map((menu) => {
          const hasChild = menu.children && menu.children.length > 0
          const isActive = pathname === menu.link
          const isOpen = openKeys[menu.id] ?? true

          return (
            <div key={menu.id} className="menu-group">
              <div className={`menu-item ${isActive ? 'active' : ''}`}>
                <Link href={menu.link || '#'} className="menu-link">
                  {menu.title}
                </Link>
                {hasChild && (
                  <button
                    className="expand-btn"
                    onClick={() => toggleOpen(menu.id)}
                  >
                    {isOpen ? '−' : '+'}
                  </button>
                )}
              </div>
              {hasChild && isOpen && (
                <div className="submenu-wrap">
                  {menu.children.map((sub) => (
                    <Link
                      key={sub.id}
                      href={sub.link || '#'}
                      className={`submenu-item ${
                        pathname === sub.link ? 'active' : ''
                      }`}
                    >
                      {sub.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
      <div className="side-bottom">
        <p>扫码加群交流</p>
        <div className="qrcode-placeholder">QR</div>
        <p className="side-tip">攻略持续更新中</p>
      </div>
    </aside>
  )
}
