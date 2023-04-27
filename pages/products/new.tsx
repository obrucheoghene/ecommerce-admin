import Layout from '@/components/Layout';
import ProductForm from '@/components/ProductForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

const NewProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const router = useRouter();

  const handleSubmit = useCallback(async () => {
    const data = { name, description, price };
    try {
      await axios.post('/api/products', data);
      router.push('/products');
    } catch (error) {
      console.log(error);
    }
  }, [name, description, price, router]);

  return (
    <Layout>
      <h1> New Product</h1>
      <ProductForm />
    </Layout>
  );
};

export default NewProduct;
