import Layout from '@/components/Layout';
import useCategories from '@/hooks/useCategory';
import axios from 'axios';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';

const Categories = () => {
  const [name, setName] = useState('');
  const [parent, setParent] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: fetchedCategories = [], mutate: mutateCategories } =
    useCategories();

  const handleCreateCategory = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios.post(`api/categories`, { name, parent });
      setName('');
      mutateCategories();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [name, parent, mutateCategories]);
  return (
    <Layout>
      <h1> Category</h1>

      <label htmlFor="">New category name</label>
      <div className="flex flex-row items-center space-x-2">
        <select
          name=""
          id=""
          className=" mb-0 "
          value={parent}
          onChange={(event) => setParent(event.target.value)}
        >
          <option value="">No parent category</option>
          {fetchedCategories.map((category: Record<string, any>) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
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
          className=" btn-primary w-fit"
        >
          Save
        </button>
      </div>

      <table className=" basic mt-2">
        <thead>
          <tr>
            <td>Categories</td>
            <td>Parents</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {fetchedCategories?.map((category: Record<string, any>) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category?.parent?.name}</td>
              <td className=" flex flex-row items-center space-x-2">
                <Link href={`/products/${category._id}`}>
                  <AiFillEdit />
                  <span>Edit</span>
                </Link>
                <button data-product-id={category._id} className="delete">
                  <AiOutlineDelete />
                  <span>Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Categories;
