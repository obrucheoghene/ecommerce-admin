import fetcher from '@/lib/fetcher';
import useSWR from 'swr';
const useProducts = (productId?: string) => {
  const uri = `api/products/${productId && productId}`;
  const { data, isLoading, error, mutate } = useSWR(uri, fetcher);

  return { data, isLoading, error, mutate };
};

export default useProducts;
