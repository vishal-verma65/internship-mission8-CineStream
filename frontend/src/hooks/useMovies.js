import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchPopularMovies } from '../lib/axios'

const useMovies = () => {
  return useInfiniteQuery({
    queryKey: ['movies', 'popular'],
    queryFn: ({ pageParam = 1 }) => fetchPopularMovies(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 5,
  })
}

export default useMovies