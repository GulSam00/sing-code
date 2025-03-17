import { useQuery } from '@tanstack/react-query';
import { getPopular, Brand, Period } from '@repo/api';
import { UseQueryReturn } from './types';

interface GetPopularProps {
  brand: Brand;
  period: Period;
}

const usePopular = (props: GetPopularProps): UseQueryReturn => {
  const { brand, period } = props;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['popular', { brand, period }],
    queryFn: () => getPopular(props),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export default usePopular;
