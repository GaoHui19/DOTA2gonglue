'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SideMenu() {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const res = await fetch('/api/menu');
      const list = await res.json();
      setMenuData(list);
    };
    fetchMenu();
  }, []);

  // 整理成父子菜单
  const rootMenu = menuData.filter(item => !item.parent);
  const childMenu = menuData.filter(item => item.parent);

  return (
    <aside style={{
      width: '220px',
      background: '#1a1d26',
      minHeight: '100vh',
      padding: '24px 16px',
      color: '#fff'
    }}>
      <h3 style={{margin: '0 0 24px 0', fontSize: '18px', color: '#ffc145'}}>DOTA2攻略</h3>
      <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
        {rootMenu.map(root => (
          <li key={root.id} style={{marginBottom: '12px'}}>
            <Link href={root.path} style={{
              color: '#e2e2e2',
              textDecoration: 'none',
              display: 'block',
              padding: '8px 6px',
              borderRadius: '6px'
            }}>
              {root.title}
            </Link>
            <ul style={{listStyle: 'none', paddingLeft: '16px', margin: '4px 0 0 0'}}>
              {childMenu.filter(c => c.parent === root.title).map(child => (
                <li key={child.id}>
                  <Link href={child.path} style={{
                    color: '#aaa',
                    textDecoration: 'none',
                    display: 'block',
                    padding: '6px 6px',
                    fontSize: '14px',
                    borderRadius: '6px'
                  }}>
                    {child.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
}
