import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className=" text-blue-900 flex justify-between items-center p-4">
        <h2>
          {' '}
          Hello <b>{session?.user?.name}</b>
        </h2>
        <div className=" flex bg-gray-300 text-black items-center rounded-lg pr-2 overflow-hidden">
          <Image
            src={'/images/defaultAvatar.png'}
            width={40}
            height={40}
            alt="User image"
            className=""
          />
          <p>{session?.user?.name}</p>
        </div>
      </div>
    </Layout>
  );
}
