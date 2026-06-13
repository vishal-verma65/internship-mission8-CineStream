import { useInfiniteQuery } from '@tanstack/react-query'
import { searchMovies } from '../lib/axios'

const useSearch = (query) => {
  return useInfiniteQuery({
    queryKey: ['movies', 'search', query],
    queryFn: ({ pageParam = 1 }) => searchMovies(query, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: Boolean(query?.trim()),
    staleTime: 1000 * 60 * 2, 
  })
}

export default useSearch