import Layout from '@/components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Products = () => {
  return (
    <Layout>
      <Link href="/products/new" className="btn-primary">
        Add new products
      </Link>
    </Layout>
  );
};

export default Products;
