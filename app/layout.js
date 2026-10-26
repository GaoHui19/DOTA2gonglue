import './globals.css'
import SideMenu from './SideMenu'
import { getMenuTree } from '../lib/notion'

export const metadata = {
  title: 'DOTA2攻略库',
  description: 'DOTA2英雄装备攻略站',
}

export default async function RootLayout({ children }) {
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
