import { useQuery } from '@tanstack/react-query';
import { getNo, Brand } from '@repo/open-api';
import { OpenAPIResponse } from '../types';

interface GetNoProps {
  no: string;
  brand?: Brand;
}

const useNo = (props: GetNoProps): OpenAPIResponse => {
  const { no, brand } = props;

  // queryKey를 위한 brandKey 생성 (없으면 'all' 사용)
  const brandKey = brand || 'all';

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['open', 'no', no, brandKey],
    queryFn: () => getNo({ no, brand }),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export default useNo;
