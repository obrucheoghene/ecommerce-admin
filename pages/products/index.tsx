import Layout from '@/components/Layout';
import useProducts from '@/hooks/useProducts';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';

const Products = () => {
  const { data: fetchedProducts, isLoading, error, mutate } = useProducts();

  console.log(fetchedProducts);
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
                <button className="delete">
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
