import Layout from '@/components/Layout';
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
      <label htmlFor="">Product Name</label>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Product name"
      />

      <label htmlFor="">Description</label>
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description"
      />

      <label htmlFor="">Price (in USD)</label>
      <input
        type="number"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        placeholder="Price"
      />

      <button onClick={handleSubmit} className="btn-primary">
        Save
      </button>
    </Layout>
  );
};

export default NewProduct;
