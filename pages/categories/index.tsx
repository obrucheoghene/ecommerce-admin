import Layout from '@/components/Layout';
import axios from 'axios';
import Link from 'next/link';
import { useCallback, useState } from 'react';

const Categories = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateCategory = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios.post(`api/categories`, { name });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [name]);
  return (
    <Layout>
      <h1> Category</h1>

      <label htmlFor="">New category name</label>
      <div className="flex flex-row items-center space-x-2">
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className=" mb-0  "
          placeholder="Category name"
        />
        <button
          disabled={loading}
          onClick={handleCreateCategory}
          className=" btn-primary"
        >
          Save
        </button>
      </div>
    </Layout>
  );
};

export default Categories;
