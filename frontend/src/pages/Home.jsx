import { useState, useMemo } from 'react'
import SearchBar from '../components/SearchBar'
import MoodMatcher from '../components/MoodMatcher'
import MovieGrid from '../components/MovieGrid'
import useMovies from '../hooks/useMovies'
import useSearch from '../hooks/useSearch'
import useDebounce from '../hooks/useDebounce'

const Home = () => {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)

  const popular = useMovies()
  const search = useSearch(debouncedQuery)

  const isSearching = Boolean(debouncedQuery.trim())
  const active = isSearching ? search : popular

  const movies = useMemo(
    () => active.data?.pages.flatMap((p) => p.results) ?? [],
    [active.data]
  )

  const handleMoodMatch = (title) => setQuery(title)
  const handleClear = () => setQuery('')

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 min-h-screen">

      <div className="flex flex-col gap-3 mb-7">
        <SearchBar value={query} onChange={setQuery} onClear={handleClear} />
        <MoodMatcher onMatch={handleMoodMatch} />
      </div>

      {/* Section heading */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">
          {isSearching ? `Results for "${debouncedQuery}"` : 'Popular Movies'}
        </h2>
        {active.data && (
          <span className="text-[0.75rem] text-(--text-muted)">{movies.length} titles</span>
        )}
      </div>

      <MovieGrid
        movies={movies}
        isLoading={active.isLoading}
        isFetchingNextPage={active.isFetchingNextPage}
        hasNextPage={active.hasNextPage}
        fetchNextPage={active.fetchNextPage}
        emptyMessage={isSearching ? `No results for "${debouncedQuery}"` : 'No movies found.'}
      />
    </main>
  )
}

export default Home