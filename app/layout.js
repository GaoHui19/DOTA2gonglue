import './globals.css'
import SideMenu from '@/components/SideMenu'

export const metadata = {
  title: 'DOTA2攻略库',
  description: 'DOTA2英雄装备攻略站',
}

export default function RootLayout({ children }) {
  // 临时写死菜单，不再调用notion接口，先规避报错
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
