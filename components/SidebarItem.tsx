import Link from 'next/link';
import { IconType } from 'react-icons';

interface SidebarItemProps {
  label: string;
  href: string;
  isActive?: boolean;
  icon: IconType;
}
const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  isActive = false,
  icon: Icon,
}) => {
  const inActiveLink =
    'flex flex-row items-center space-x-2 p-1 hover:bg-gray-400 rounded-lg rounded-r-none';
  const activeLink = inActiveLink + ' bg-white text-blue-900 ';
  return (
    <Link href={href} className={isActive ? activeLink : inActiveLink}>
      <Icon size={28} />
      <span>{label}</span>
    </Link>
  );
};

export default SidebarItem;
