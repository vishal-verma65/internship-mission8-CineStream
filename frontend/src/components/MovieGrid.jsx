import { useEffect, useRef } from 'react'
import { RiFilmLine } from 'react-icons/ri'
import MovieCard from './MovieCard'

const SkeletonCard = () => (
  <div className="rounded-(--radius-card) overflow-hidden">
    <div className="skeleton skeleton-poster" />
    <div className="pt-2.5 px-3 pb-3 bg-(--bg-card)">
      <div className="skeleton skeleton-line w-[80%]" />
      <div className="skeleton skeleton-line w-[50%] mt-1.5" />
    </div>
  </div>
)

const MovieGrid = ({
  movies = [],
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  emptyMessage = 'No movies found.',
}) => { const sentinelRef = useRef(null)

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage()
      },
      { rootMargin: '200px' }
    )

    const el = sentinelRef.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isLoading) {
    return (
      <div className="movies-grid">
        {Array.from({ length: 20 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    )
  }

  if (!movies.length) {
    return (
      <div className="empty-state">
        <RiFilmLine size={40} className="opacity-30" />
        <p className="text-[0.875rem]">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div id="load-more-trigger" ref={sentinelRef}>
        {isFetchingNextPage && <span className="spinner" />}
      </div>
    </>
  )
}

export default MovieGrid