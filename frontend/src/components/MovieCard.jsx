import { useState } from 'react'
import { RiHeartLine, RiHeartFill, RiStarSmileLine, RiImageLine } from 'react-icons/ri'
import { IMG_W342 } from '../lib/axios'
import useFavoritesStore from '../store/useFavouriteStore'

const MovieCard = ({ movie }) => {
  const [imgLoaded, setImgLoaded] = useState(false)
  const { toggleFavorite, isFavorite } = useFavoritesStore()
  const fav = isFavorite(movie.id)

  const year = movie.release_date?.slice(0, 4) || '—'
  const rating = movie.vote_average?.toFixed(1) || 'N/A'
  const posterUrl = movie.poster_path ? `${IMG_W342}${movie.poster_path}` : null

  const handleFav = (e) => {
    e.stopPropagation()
    toggleFavorite(movie)
  }

  return (
    <div className="movie-card fade-in relative">

      <div className="relative overflow-hidden">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            loading="lazy"
            className={`movie-card-img ${imgLoaded ? 'loaded' : 'loading'}`}
            onLoad={() => setImgLoaded(true)}
          />
        ) : (
          <div className="poster-placeholder">
            <RiImageLine size={28} />
            <span>No Image</span>
          </div>
        )}

        {posterUrl && !imgLoaded && (
          <div className="skeleton skeleton-poster absolute inset-0" />
        )}

        <button
          className={`fav-btn ${fav ? 'active' : ''}`}
          onClick={handleFav}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        >
          {fav ? <RiHeartFill size={15} /> : <RiHeartLine size={15} />}
        </button>
      </div>

      <div className="pt-2.5 px-3 pb-4">
        <p className="text-[0.82rem] font-semibold text-(--text-primary) leading-[1.35] mb-1.5" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {movie.title}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-[0.72rem] text-(--text-muted)">{year}</span>
          <span className="rating-badge">
            <RiStarSmileLine size={11} />
            {rating}
          </span>
        </div>
      </div>
    </div>
  )
}

export default MovieCard