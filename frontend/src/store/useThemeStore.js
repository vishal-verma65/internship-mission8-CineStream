import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme)
}

const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'dark',

      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark'
        applyTheme(next)
        set({ theme: next })
      },

      initTheme: () => {
        applyTheme(get().theme)
      },
    }),
    { name: 'cine-theme' }
  )
)

export default useThemeStore