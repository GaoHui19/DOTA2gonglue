import './globals.css'
import { getMenuTree } from '@/lib/notion'
import SideMenu from '@/components/SideMenu'

export const metadata = {
  title: 'DOTA2攻略库',
  description: 'DOTA2英雄装备攻略站',
}

export default async function RootLayout({ children }) {
  // 全局读取Notion菜单，所有页面共用
  const menuTree = await getMenuTree()
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
