import Link from 'next/link';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';

const SidebarLogo = () => (
  <Link href="/" className=" flex flex-row items-center space-x-2 mr-2 py-4">
    <AiOutlineAppstoreAdd size={36} />
    <span className=" font-bold">EcommerceAdmin</span>
  </Link>
);

export default SidebarLogo;
