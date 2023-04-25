import Link from 'next/link';
import { IconType } from 'react-icons';

interface SidebarItemType {
  label: string;
  href: string;
  isActive?: boolean;
  icon: IconType;
}
const SidebarItem: React.FC<SidebarItemType> = ({
  label,
  href,
  isActive = false,
  icon: Icon,
}) => {
  const inActiveLink = 'flex flex-row items-center space-x-2 p-1';
  const activeLink =
    inActiveLink + ' bg-white text-blue-900 rounded rounded-r-none';
  return (
    <Link href={href} className={isActive ? activeLink : inActiveLink}>
      <Icon size={28} />
      <span>{label}</span>
    </Link>
  );
};

export default SidebarItem;
