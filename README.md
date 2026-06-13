# 🎬 Cine-Stream

A Netflix-inspired media discovery SPA built with React + Vite, consuming the TMDB REST API. Features infinite scroll, debounced search, AI-powered mood matching via Mistral, and a persistent favorites list.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Popular Movies Feed** | Fetches TMDB popular movies rendered in a responsive CSS Grid |
| **Debounced Search** | 500ms debounce on the search input — no request fires per keystroke |
| **Infinite Scroll** | `IntersectionObserver` auto-fetches the next page as you scroll |
| **Mood Matcher (AI)** | Describe your mood → Mistral AI returns a movie title → silently searched on TMDB |
| **Favorites** | Heart any movie to save it to `localStorage`, view at `/favorites` |
| **Theme Toggle** | Dark / Light mode, persisted across sessions via Zustand + `localStorage` |
| **Lazy Loading** | All poster images use native `loading="lazy"` |
| **Skeleton Loaders** | Shimmer placeholders on initial load — no layout shift |
| **React Query Cache** | API responses cached — navigating back doesn't re-fetch |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| HTTP Client | Axios |
| Data Fetching | TanStack React Query v5 |
| State Management | Zustand v5 with `persist` middleware |
| Routing | React Router v7 |
| Icons | React Icons (Remix Icon set) |
| AI Integration | Mistral AI (`mistral-small-latest`) |

---

## 📁 Project Structure

```
cine-stream/
├── .env                          # API keys (never commit this)
├── .env.example                  # Key reference template
├── vite.config.js                # Vite + Tailwind v4 plugin
└── src/
    ├── main.jsx                  # App entry — providers (Router, QueryClient)
    ├── App.jsx                   # Routes + theme init
    ├── index.css                 # Tailwind import + CSS variables + global styles
    ├── lib/
    │   └── axios.js              # TMDB Axios instance + API helper functions
    ├── store/
    │   ├── useThemeStore.js      # Zustand — dark/light theme (persisted)
    │   └── useFavoritesStore.js  # Zustand — favorites array (persisted)
    ├── hooks/
    │   ├── useDebounce.js        # Delays value update by N ms
    │   ├── useMovies.js          # Infinite query — popular movies
    │   ├── useSearch.js          # Infinite query — search results
    │   └── useMoodMatcher.js     # Mistral AI mood → movie title
    ├── components/
    │   ├── Navbar.jsx            # Sticky nav with logo, links, favorites count
    │   ├── ThemeToggle.jsx       # Sun/moon toggle button
    │   ├── SearchBar.jsx         # Controlled search input with clear button
    │   ├── MoodMatcher.jsx       # AI mood input panel
    │   ├── MovieCard.jsx         # Individual movie card (poster, title, year, rating, heart)
    │   └── MovieGrid.jsx         # Responsive grid + IntersectionObserver sentinel
    └── pages/
        ├── Home.jsx              # Discover page — search + mood matcher + grid
        └── Favorites.jsx         # Saved movies page
```

---

## 🚀 Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-username/cine-stream.git
cd cine-stream
npm install
```

### 2. Get your API keys

**TMDB** (free) — [developer.themoviedb.org](https://developer.themoviedb.org)
1. Create an account → Settings → API → Request a key (Developer)
2. Copy the **API Key (v3 auth)** string

**Mistral AI** (free tier available) — [console.mistral.ai](https://console.mistral.ai)
1. Sign up → API Keys → Create new key
2. Copy the key

### 3. Configure environment

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_MISTRAL_API_KEY=your_mistral_api_key_here
```

> ⚠️ Never commit `.env` to version control. It's already in `.gitignore` by default with Vite.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📦 Dependencies

### Runtime

```bash
npm install axios @tanstack/react-query zustand react-router-dom react-icons @mistralai/mistralai
```

### Dev

```bash
npm install -D tailwindcss @tailwindcss/vite
```

> `react`, `react-dom`, `vite`, and `@vitejs/plugin-react` come pre-installed from the Vite scaffold.

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_TMDB_API_KEY` | ✅ Yes | TMDB v3 API key for movie data |
| `VITE_MISTRAL_API_KEY` | ✅ For AI feature | Mistral API key for Mood Matcher |

---

## ⚙️ Available Scripts

```bash
npm run dev        # Start development server (localhost:5173)
npm run build      # Production build → /dist
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
```

---

## 🏗️ Architecture Notes

### Infinite Scroll
`MovieGrid` attaches an `IntersectionObserver` to a sentinel `<div>` at the bottom of the grid. When it enters the viewport (with a `200px` root margin), `fetchNextPage()` is called. React Query appends new pages to the existing cache — the DOM never re-renders existing cards.

### Debouncing
`useDebounce(query, 500)` in `Home.jsx` holds off on updating `debouncedQuery` until the user stops typing for 500ms. `useSearch` is gated on `enabled: Boolean(debouncedQuery.trim())`, so zero requests fire during active typing.

### Mood Matcher Flow
```
User types mood → Mistral (mistral-small-latest) → returns movie title string
                                                  → setQuery(title) in Home.jsx
                                                  → debounce fires → useSearch → TMDB
```

### State Persistence
Both `useThemeStore` and `useFavoritesStore` use Zustand's `persist` middleware writing to `localStorage` under keys `cine-theme` and `cine-favorites`. Full movie payloads are stored in favorites so `/favorites` renders with zero API calls.

---

## 🎓 Academic Context

Built as a sprint project for **BCA 611 — Artificial Intelligence** coursework at MIET Kumaon. Demonstrates:
- On-demand data hydration (Infinite Scroll via `IntersectionObserver`)
- API request throttling (Input Debouncing)
- LLM API integration (Mistral AI)
- Client-side state persistence (`localStorage` via Zustand)

---

## 📄 License

MIT
