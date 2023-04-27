import Layout from '@/components/Layout';
import useProducts from '@/hooks/useProducts';
import Link from 'next/link';
import {
  AiFillEdit,
  AiFillExclamationCircle,
  AiOutlineDelete,
} from 'react-icons/ai';
import { Modal } from 'antd';
import axios from 'axios';
const Products = () => {
  const { data: fetchedProducts, mutate } = useProducts();
  const { confirm } = Modal;

  const showDeleteConfirm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { productId } = event.currentTarget.dataset;
    confirm({
      title: 'Are you sure delete this product?',
      icon: <AiFillExclamationCircle />,
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        return axios
          .delete(`api/products/${productId}`)
          .then(() => mutate())
          .catch(() => console.log('Ooops and error occurred'));
      },
      onCancel() {},
    });
  };

  return (
    <Layout>
      <Link href="/products/new" className="btn-primary">
        Add new products
      </Link>

      <table className=" basic mt-2">
        <thead>
          <tr>
            <td>Product name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {fetchedProducts?.map((product: Record<string, any>) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td className=" flex flex-row items-center space-x-2">
                <Link href={`/products/${product._id}`}>
                  <AiFillEdit />
                  <span>Edit</span>
                </Link>
                <button
                  data-product-id={product._id}
                  className="delete"
                  onClick={showDeleteConfirm}
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

export default Products;
