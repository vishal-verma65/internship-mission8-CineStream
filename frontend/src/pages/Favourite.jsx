import { RiHeartLine, RiDeleteBin6Line } from 'react-icons/ri'
import MovieCard from '../components/MovieCard'
import useFavoritesStore from '../store/useFavouriteStore'

const Favorites = () => {
  const { favorites, removeFavorite } = useFavoritesStore()

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 min-h-screen">

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <RiHeartLine size={20} className="text-(--accent)" />
          <h2 className="section-title">My Favorites</h2>
          {favorites.length > 0 && (
            <span className="text-[0.72rem] bg-(--accent-dim) text-(--accent) rounded-full px-2 py-0.5 font-semibold">{favorites.length}</span>
          )}
        </div>

        {favorites.length > 0 && (
          <button
            onClick={() => favorites.forEach(m => removeFavorite(m.id))}
            className="flex items-center gap-1.5 bg-(--red-dim) text-(--red) border border-transparent rounded-sm px-3 py-1.25 text-[0.75rem] font-medium cursor-pointer transition-all hover:border-(--red)"
          >
            <RiDeleteBin6Line size={13} />
            Clear all
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <RiHeartLine size={44} className="opacity-20" />
          <p className="text-[0.9rem] font-medium">No favorites yet</p>
          <p className="text-[0.78rem]">
            Hit the heart icon on any movie to save it here.
          </p>
        </div>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </main>
  )
}

export default Favorites