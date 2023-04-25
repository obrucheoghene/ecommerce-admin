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

const Sidebar = () => {
  const items = [
    {
      label: 'Dashboard',
      href: '/',
      isActive: true,
      icon: AiOutlineDashboard,
    },
    {
      label: 'Products',
      href: '/products',
      icon: AiOutlineShoppingCart,
    },

    {
      label: 'Orders',
      href: '/orders',
      icon: AiOutlineUnorderedList,
    },
    {
      label: 'Settings',
      href: '/settings',
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
