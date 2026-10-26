'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function SideMenu({ menuTree }) {
  const pathname = usePathname()
  const [openKeys, setOpenKeys] = useState({})
  const toggle = (id) => {
    setOpenKeys(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <aside className="side-bar">
      <div className="side-logo">DOTA2攻略库</div>
      <nav className="side-nav">
        {menuTree.map(menu => {
          const hasChild = menu.children && menu.children.length > 0
          const active = pathname === menu.slug || pathname.startsWith(menu.slug + '/')
          const isOpen = openKeys[menu.id]

          return (
            <div key={menu.id} className="menu-group">
              <div className={`menu-item ${active ? 'active' : ''}`}>
                <Link href={menu.slug} className="menu-link">
                  {menu.title}
                </Link>
                {hasChild && (
                  <button onClick={()=>toggle(menu.id)} className="expand-btn">
                    {isOpen ? '−' : '+'}
                  </button>
                )}
              </div>
              {hasChild && isOpen && (
                <div className="submenu-wrap">
                  {menu.children.map(sub => (
                    <Link
                      key={sub.id}
                      href={sub.slug}
                      className={`submenu-item ${pathname === sub.slug ? 'active' : ''}`}
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
        <p>扫码加群</p>
        <div className="qrcode-placeholder">QR</div>
        <p className="side-tip">有问题，联系在线客服</p>
      </div>
    </aside>
  )
}

