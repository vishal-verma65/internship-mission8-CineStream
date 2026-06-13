import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (movie) => {
        const exists = get().favorites.some((m) => m.id === movie.id)
        if (!exists) set((s) => ({ favorites: [...s.favorites, movie] }))
      },

      removeFavorite: (id) =>
        set((s) => ({ favorites: s.favorites.filter((m) => m.id !== id) })),

      toggleFavorite: (movie) => {
        const isFav = get().isFavorite(movie.id)
        if (isFav) get().removeFavorite(movie.id)
        else get().addFavorite(movie)
        return !isFav
      },

      isFavorite: (id) => get().favorites.some((m) => m.id === id),
    }),
    { name: 'cine-favorites' }
  )
)

export default useFavoritesStore