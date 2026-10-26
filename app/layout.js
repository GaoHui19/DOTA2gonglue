import './globals.css'
import SideMenu from './SideMenu'

export const metadata = {
  title: 'DOTA2攻略库',
  description: 'DOTA2英雄装备攻略站',
}

export default function RootLayout({ children }) {
  const menuTree = [
    {
      id: 'home',
      title: '首页',
      link: '/',
      children: []
    },
    {
      id: 'heroes',
      title: '英雄资料',
      link: '/heroes',
      children: [
        { id: 'popular', title: '热门英雄', link: '/heroes/popular', children: [] }
      ]
    },
    {
      id: 'items',
      title: '装备图鉴',
      link: '/items',
      children: []
    }
  ]
  return (
    <html lang="zh-CN">
      <body>
        <div className="page-wrap">
          <SideMenu menuTree={menuTree}/>
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
