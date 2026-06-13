import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import useThemeStore from './store/useThemeStore'

const Home = lazy(() => import('./pages/Home'))
const Favorites = lazy(() => import('./pages/Favourite'))

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-60px)]">
    <div className="text-lg text-(--text-secondary)">Loading...</div>
  </div>
)

const App = () => {
  const initTheme = useThemeStore((s) => s.initTheme)

  useEffect(() => { initTheme() }, [initTheme])

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) transition-colors duration-100">
      <Navbar />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App