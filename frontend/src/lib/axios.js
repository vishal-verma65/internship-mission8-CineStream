import axios from 'axios'

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p'
export const IMG_W342 = `${TMDB_IMAGE_BASE}/w342`
export const IMG_W500 = `${TMDB_IMAGE_BASE}/w500`

export const tmdb = axios.create({
  baseURL: TMDB_BASE_URL,
  params: { api_key: TMDB_API_KEY, language: 'en-US' },
  timeout: 10000,
})

export const fetchPopularMovies = (page = 1) =>
  tmdb.get('/movie/popular', { params: { page } }).then(r => r.data)

export const searchMovies = (query, page = 1) =>
  tmdb.get('/search/movie', { params: { query, page, include_adult: false } }).then(r => r.data)

export const fetchMovieDetails = (id) =>
  tmdb.get(`/movie/${id}`).then(r => r.data)