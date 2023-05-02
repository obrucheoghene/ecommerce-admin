import fetcher from '@/lib/fetcher';
import useSWR from 'swr';
const useCategories = (categoryId?: string) => {
  const uri = `/api/categories/${categoryId ? categoryId : ''}`;
  const { data, isLoading, error, mutate } = useSWR(uri, fetcher);

  return { data, isLoading, error, mutate };
};

export default useCategories;
