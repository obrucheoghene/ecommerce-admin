import { useSession, signIn, signOut } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';
import Header from './Header';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const { data: session } = useSession();
  const [show, setShow] = useState(false)

  if (!session) {
    return (
      <div className=" bg-gray-200 w-screen h-screen flex items-center">
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
    <div className=" bg-gray-200 min-h-screen flex ">
      <Sidebar show={show} />
      <div className=" bg-white flex-grow ml-0 m-2 rounded-lg text-black p-4">
        <Header setShow={setShow} />
        {children}
      </div>
    </div>
  );
}
