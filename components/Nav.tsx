import Link from 'next/link';
import React from 'react';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';

const Nav = () => {
  return (
    <aside className="text-white">
      <Link href="" className=" flex flex-row items-center space-x-2">
        <AiOutlineAppstoreAdd />
        <span>EcommerceAdmin</span>
      </Link>

      <nav className=" flex flex-col space-y-2">
        <Link href="/" className=" flex flex-row items-center space-x-2">
          <AiOutlineAppstoreAdd />
          <span>Dashboard</span>
        </Link>
        <Link href="/" className=" flex flex-row items-center space-x-2">
          <AiOutlineAppstoreAdd />
          <span>Products</span>
        </Link>

        <Link href="/" className=" flex flex-row items-center space-x-2">
          <AiOutlineAppstoreAdd />
          <span>Orders</span>
        </Link>

        <Link href="/" className=" flex flex-row items-center space-x-2">
          <AiOutlineAppstoreAdd />
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Nav;
