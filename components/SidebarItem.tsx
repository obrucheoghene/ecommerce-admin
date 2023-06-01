import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconType } from 'react-icons';

interface SidebarItemProps {
  label: string;
  href?: string;
  isActive?: boolean;
  handleClick?: () => {};
  icon: IconType;
}
const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  isActive = false,
  icon: Icon,
}) => {
  const router = useRouter();

  const logout = async () => {
    router.push('/');
    await signOut();
  };
  const inActiveLink =
    'flex flex-row items-center space-x-2 p-1 hover:bg-gray-400 rounded-lg rounded-r-none';
  const activeLink = inActiveLink + ' bg-white text-blue-900 ';
  return href ? (
    <Link href={href} className={isActive ? activeLink : inActiveLink}>
      <Icon size={28} />
      <span>{label}</span>
    </Link>
  ) : (
    <button
      className={inActiveLink}
      onClick={() => {
        logout();
      }}
    >
      <Icon size={28} />

      <span>{label}</span>
    </button>
  );
};

export default SidebarItem;
