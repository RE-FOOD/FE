import { useQuery } from '@tanstack/react-query';
import { getReport } from '@/api/environment';
import { queryKeys } from '@/constants/keys';

export function useGetReport() {
  return useQuery({
    queryKey: [queryKeys.ENVIRONMENT, queryKeys.GET_REPORT],
    queryFn: () => getReport(),
  });
}
