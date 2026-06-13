import { NavLink } from 'react-router-dom'
import { RiFilmLine, RiHeartLine } from 'react-icons/ri'
import ThemeToggle from './ThemeToggler'
import useFavoritesStore from '../store/useFavouriteStore'

const Navbar = () => {
  const count = useFavoritesStore((s) => s.favorites.length)

  return (
    <nav className="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

        <NavLink to="/" className="flex items-center gap-2 no-underline">
          <RiFilmLine size={22} className="text-(--accent)" />
          <span className="text-(--text-primary) font-bold text-[1.05rem] tracking-[-0.02em]">
            Cine<span className="text-(--accent)">Stream</span>
          </span>
        </NavLink>

        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            Home
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            <span className="flex items-center gap-1.5">
              <RiHeartLine size={14} />
              Favorites
              {count > 0 && (
                <span className="bg-(--accent) text-black rounded-full text-[0.65rem] font-bold px-1.5 py-px leading-[1.6]">
                  {count}
                </span>
              )}
            </span>
          </NavLink>

          <div className="w-px h-4.5 bg-(--border) mx-1" />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

export default Navbar