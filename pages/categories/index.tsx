import Layout from '@/components/Layout';
import useCategories from '@/hooks/useCategory';
import axios from 'axios';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';

const Categories = () => {
  const [name, setName] = useState('');
  const [editCategory, setEditCategory] = useState<Record<string, any>>({});
  const [parent, setParent] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: fetchedCategories = [], mutate: mutateCategories } =
    useCategories();

  const handleSaveCategory = useCallback(async () => {
    setLoading(true);

    try {
      if (Object.keys(editCategory).length === 0) {
        await axios.post(`api/categories`, { name, parent });
      } else {
        console.log('hee');
        await axios.patch(`api/categories/${editCategory._id}`, {
          name,
          parent,
        });
      }
      setEditCategory({});
      setName('');
      setParent('');
      mutateCategories();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [name, parent, editCategory, mutateCategories]);

  const handleEditCategory = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      category: Record<string, any>
    ) => {
      setEditCategory(category);
      setName(category.name);
      setParent(category?.parent?._id || '');
    },
    []
  );
  return (
    <Layout>
      <h1> Category</h1>

      <label htmlFor="">
        {Object.keys(editCategory).length === 0
          ? 'Add new category'
          : 'Edit category'}
      </label>
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
          onClick={handleSaveCategory}
          className=" btn-primary w-fit"
        >
          {loading ? 'Saving..' : 'Save'}
        </button>
      </div>

      <table className=" basic mt-2">
        <thead>
          <tr>
            <td>Parents</td>
            <td>Categories</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {fetchedCategories?.map((category: Record<string, any>) => (
            <tr key={category._id}>
              <td>{category?.parent?.name}</td>
              <td>{category.name}</td>

              <td className=" flex flex-row items-center space-x-2">
                <button
                  onClick={(
                    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => handleEditCategory(event, category)}
                  className="edit"
                >
                  <AiFillEdit />
                  <span>Edit</span>
                </button>
                <button data-category-id={category._id} className="delete">
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
