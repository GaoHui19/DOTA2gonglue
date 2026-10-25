import './globals.css'

export const metadata = {
  title: 'DOTA2英雄攻略库',
  description: 'DOTA2英雄出装、技能加点攻略',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}

