import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      
    </Layout>
  );
}
