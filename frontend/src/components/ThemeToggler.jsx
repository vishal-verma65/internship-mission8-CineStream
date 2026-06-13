import { RiSunLine, RiMoonLine } from 'react-icons/ri'
import useThemeStore from '../store/useThemeStore'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore()
  const isDark = theme === 'dark'

  return (
    <button
      className="theme-btn"
      onClick={toggleTheme}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label="Toggle theme"
    >
      {isDark
        ? <RiSunLine size={17} />
        : <RiMoonLine size={17} />
      }
    </button>
  )
}

export default ThemeToggle