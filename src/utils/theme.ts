export type Theme = 'violet' | 'orange' | 'green' | 'blue' | 'pink'

const STORAGE_KEY = 'lumbit-theme'

export function getTheme(): Theme {
  return (localStorage.getItem(STORAGE_KEY) as Theme) ?? 'violet'
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem(STORAGE_KEY, theme)
}
