export type Theme = 'violet' | 'orange' | 'green' | 'blue' | 'pink'
export type ColorMode = 'light' | 'dark'

const STORAGE_KEY = 'lumbit-theme'
const MODE_KEY = 'lumbit-color-mode'

export function getTheme(): Theme {
  return (localStorage.getItem(STORAGE_KEY) as Theme) ?? 'violet'
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem(STORAGE_KEY, theme)
}

export function getColorMode(): ColorMode {
  return (localStorage.getItem(MODE_KEY) as ColorMode) ?? 'light'
}

export function applyColorMode(mode: ColorMode) {
  if (mode === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem(MODE_KEY, mode)
}
