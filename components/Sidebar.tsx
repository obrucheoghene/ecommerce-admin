import Link from 'next/link';
import React from 'react';
import {
  AiOutlineAppstoreAdd,
  AiOutlineDashboard,
  AiOutlineSetting,
  AiOutlineShoppingCart,
  AiOutlineUnorderedList,
} from 'react-icons/ai';
import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  const items = [
    {
      label: 'Dashboard',
      href: '/',
      isActive: router.pathname === '/' ? true : false,
      icon: AiOutlineDashboard,
    },
    {
      label: 'Products',
      href: '/products',
      isActive: router.pathname === '/products' ? true : false,
      icon: AiOutlineShoppingCart,
    },

    {
      label: 'Orders',
      href: '/orders',
      isActive: router.pathname === '/orders' ? true : false,
      icon: AiOutlineUnorderedList,
    },
    {
      label: 'Settings',
      href: '/settings',
      isActive: router.pathname === '/settings' ? true : false,
      icon: AiOutlineSetting,
    },
  ];

  return (
    <aside className="text-white pl-4">
      <SidebarLogo />

      <nav className=" flex flex-col space-y-2 ">
        {items.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            href={item.href}
            icon={item.icon}
            isActive={item?.isActive}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
