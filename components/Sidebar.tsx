import Link from 'next/link';
import React from 'react';
import {
  AiOutlineAppstoreAdd,
  AiOutlineDashboard,
  AiOutlineLogout,
  AiOutlineSetting,
  AiOutlineShoppingCart,
  AiOutlineUnorderedList,
} from 'react-icons/ai';
import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

interface SidebarProps {
  show: boolean
}
const Sidebar: React.FC<SidebarProps> = ({show}) => {
  const router = useRouter();
  const { pathname } = router;
  const items = [
    {
      label: 'Dashboard',
      href: '/',
      isActive: pathname === '/' ? true : false,
      icon: AiOutlineDashboard,
    },
    {
      label: 'Products',
      href: '/products',
      isActive: pathname.includes('/products') ? true : false,
      icon: AiOutlineShoppingCart,
    },

    {
      label: 'Orders',
      href: '/orders',
      isActive: pathname.includes('/orders') ? true : false,
      icon: AiOutlineUnorderedList,
    },
    {
      label: 'Categories',
      href: '/categories',
      isActive: pathname.includes('/categories') ? true : false,
      icon: AiOutlineUnorderedList,
    },
    {
      label: 'Settings',
      href: '/settings',
      isActive: pathname.includes('/settings') ? true : false,
      icon: AiOutlineSetting,
    },
    {
      label: 'Logout',
      icon: AiOutlineLogout,
    },
  ];

  return (
    <aside className={`${show? "left-0" : "-left-full "} text-neutral-700 pl-4 fixed h-full w-full md:static md:w-auto bg-gray-200`}>
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
