import Layout from '@/components/Layout';
import React from 'react';

const NewProduct = () => {
  return (
    <Layout>
      <h1> New Product</h1>

      <label htmlFor="">Product Name</label>
      <input type="text" placeholder="Product name" />

      <label htmlFor="">Description</label>
      <textarea placeholder="Description"></textarea>

      <label htmlFor="">Price (in USD)</label>
      <input type="text" placeholder="Price" />

      <button className="btn-primary">Save</button>
    </Layout>
  );
};

export default NewProduct;
