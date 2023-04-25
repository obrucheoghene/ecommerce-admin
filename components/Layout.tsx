import { useSession, signIn, signOut } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className=" bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn('google')}
            className=" bg-white p-2 px-4 rounded-lg text-black"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className=" bg-blue-900 min-h-screen flex ">
      <Sidebar />
      <div className=" bg-white flex-grow ml-0 m-2 rounded-lg text-black ">
        {children}
      </div>
    </div>
  );
}
