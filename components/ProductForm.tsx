import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

interface ProductFormProps {
  _id?: string;
  name?: string;
  description?: string;
  price?: string;
}
const ProductForm: React.FC<ProductFormProps> = ({
  _id,
  name: exitingName,
  description: existingDescription,
  price: existingPrice,
}) => {
  const [name, setName] = useState(exitingName || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice || '');
  const router = useRouter();

  const handleSubmit = useCallback(async () => {
    const data = { name, description, price };

    try {
      if (_id) {
        // UPDATE PRODUCT
        await axios.patch(`/api/products/${_id}`, data);
      } else {
        // CREATE PRODUCT
        await axios.post(`/api/products`, data);
      }
      router.push('/products');
    } catch (error) {
      console.log(error);
    }
  }, [router, name, description, price, _id]);

  return (
    <div>
      <label htmlFor=""> Product name</label>
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
    </div>
  );
};

export default ProductForm;
