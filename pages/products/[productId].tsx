import Layout from '@/components/Layout';
import ProductForm from '@/components/ProductForm';
import useProducts from '@/hooks/useProducts';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

const EditProduct = () => {
  const router = useRouter();
  const { productId } = router.query;
  const { data: fetchedProduct } = useProducts(productId as string);

  return (
    <Layout>
      <h1> Edit Product</h1>
      <ProductForm {...fetchedProduct} />
    </Layout>
  );
};

export default EditProduct;
