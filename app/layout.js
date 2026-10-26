import './globals.css';
import SideMenu from './SideMenu.jsx';

export const metadata = {
  title: 'DOTA2攻略站',
  description: 'DOTA2英雄、装备攻略',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, display: 'flex' }}>
        <SideMenu />
        <main style={{ flex: 1, padding: '30px', background: '#111318', color: '#fff', minHeight: '100vh' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
