'use client';
import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Menu, Switch, MenuProps, MenuTheme } from 'antd';
import Link from 'next/link';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Gerencie Autores', 'sub1', <SettingOutlined />, [
    getItem(<Link href={ '/dashboard/authors' }>Autores</Link>, '1'),
  ]),

  getItem('Gerencie Livros', 'sub2', <SettingOutlined />, [
    getItem(<Link href={ '/dashboard/books' }>Livros</Link>, '2'),
  ]),
];

function MenuSideBar() {
  const [theme, setTheme] = useState<MenuTheme>('dark');
  const [current, setCurrent] = useState('1');

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };
  
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <div>
      <Switch
        checked={ theme === 'dark' }
        onChange={ changeTheme }
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      <Menu
        theme={ theme }
        onClick={ onClick }
        style={ { width: 256 } }
        defaultOpenKeys={ ['sub1'] }
        selectedKeys={ [current] }
        mode="inline"
        items={ items }
      />
    </div>
  );
}

export default MenuSideBar;