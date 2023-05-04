import Layout from '@/components/Layout';
import useCategories from '@/hooks/useCategory';
import axios from 'axios';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import {
  AiFillEdit,
  AiFillExclamationCircle,
  AiOutlineDelete,
} from 'react-icons/ai';
import { Modal } from 'antd';

const { confirm } = Modal;

const Categories = () => {
  const [name, setName] = useState('');
  const [editCategory, setEditCategory] = useState<Record<string, any>>({});
  const [parent, setParent] = useState('');
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<Record<string, any>[]>([]);
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

  const showDeleteConfirm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    category: Record<string, any>
  ) => {
    confirm({
      title: 'Are you sure?',
      icon: <AiFillExclamationCircle />,
      content: `Do you want to delete ${category.name} category?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        return axios
          .delete(`/api/categories/${category._id}`)
          .then(() => mutateCategories())
          .catch(() => console.log('Ooops and error occurred'));
      },
      onCancel() {},
    });
  };

  const handleAddProperties = useCallback(() => {
    setProperties((prev) => [...prev, { name: '', values: '' }]);
  }, []);

  const handlePropertyNameChange = useCallback(
    (name: string, property: Record<string, any>, index: number) => {
      setProperties((prev) => {
        const properties = [...prev];
        properties[index].name = name;
        return properties;
      });
    },
    []
  );
  const handlePropertyValueChange = useCallback(
    (value: string, property: Record<string, any>, index: number) => {
      setProperties((prev) => {
        const properties = [...prev];
        properties[index].value = value;
        return properties;
      });
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
      <div>
        <div className="flex flex-row items-center space-x-2">
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Category name"
          />
          <select
            name=""
            id=""
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
        </div>
        <div className="mb-2">
          <label htmlFor="">Properties</label>
          <br />
          <button
            onClick={handleAddProperties}
            className=" p-2 bg-gray-300 rounded-md"
          >
            Add properties
          </button>
          {properties?.map((property: Record<string, any>, index: number) => (
            <div key={index} className="flex gap-1">
              <input
                type="text"
                placeholder="name"
                value={property.name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handlePropertyNameChange(event.target.value, property, index)
                }
              />
              <input
                type="text"
                placeholder="value"
                value={property.value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handlePropertyValueChange(event.target.value, property, index)
                }
              />
            </div>
          ))}
        </div>
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
                <button
                  onClick={(
                    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => handleEditCategory(event, category)}
                  className="edit"
                >
                  <AiFillEdit />
                  <span>Edit</span>
                </button>
                <button
                  onClick={(
                    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => showDeleteConfirm(event, category)}
                  className="delete"
                >
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
