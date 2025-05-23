import { useQuery } from '@tanstack/react-query';
import { getRelease, Brand } from '@repo/open-api';
import { OpenAPIResponse } from '../types';

interface GetReleaseProps {
  release: string;
  brand?: Brand;
}

const useRelease = (props: GetReleaseProps): OpenAPIResponse => {
  const { release, brand } = props;

  // queryKey를 위한 brandKey 생성 (없으면 'all' 사용)
  const brandKey = brand || 'all';

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['open', 'release', release, brandKey],
    queryFn: () => getRelease({ release, brand }),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export default useRelease;
