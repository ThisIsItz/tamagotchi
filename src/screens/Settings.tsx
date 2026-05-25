import { useState } from 'react'
import { usePetStore } from '../store/usePetStore'
import { applyTheme, getTheme, applyColorMode, getColorMode, type Theme, type ColorMode } from '../utils/theme'

const THEMES: { id: Theme; label: string; color: string }[] = [
  { id: 'violet', label: 'Violet', color: '#8b5cf6' },
  { id: 'orange', label: 'Orange', color: '#f97316' },
  { id: 'green',  label: 'Green',  color: '#22c55e' },
  { id: 'blue',   label: 'Blue',   color: '#3b82f6' },
  { id: 'pink',   label: 'Pink',   color: '#ec4899' },
]

export const Settings = () => {
  const currentName = usePetStore((s) => s.name)
  const setName = usePetStore((s) => s.setName)
  const [input, setInput] = useState(currentName)
  const [saved, setSaved] = useState(false)
  const [activeTheme, setActiveTheme] = useState<Theme>(getTheme())
  const [colorMode, setColorMode] = useState<ColorMode>(getColorMode())

  const handleSave = () => {
    const trimmed = input.trim()
    if (!trimmed || trimmed === currentName) return
    setName(trimmed)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleTheme = (theme: Theme) => {
    applyTheme(theme)
    setActiveTheme(theme)
  }

  const handleColorMode = (mode: ColorMode) => {
    applyColorMode(mode)
    setColorMode(mode)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
          Rename pet
        </h2>
        <input
          type="text"
          maxLength={20}
          spellCheck={false}
          value={input}
          onChange={(e) => { setInput(e.target.value); setSaved(false) }}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          className="input-base"
        />
        <button
          onClick={handleSave}
          disabled={!input.trim() || input.trim() === currentName}
          className="w-full btn-primary"
        >
          {saved ? '✓ Saved!' : 'Save name'}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
          Color theme
        </h2>
        <div className="flex gap-3">
          {THEMES.map(({ id, label, color }) => (
            <button
              key={id}
              onClick={() => handleTheme(id)}
              title={label}
              className="flex flex-col items-center gap-1.5 flex-1"
            >
              <span
                className="w-10 h-10 rounded-full border-4 transition-all"
                style={{
                  backgroundColor: color,
                  borderColor: activeTheme === id ? color : 'transparent',
                  boxShadow: activeTheme === id ? `0 0 0 2px white, 0 0 0 4px ${color}` : 'none',
                }}
              />
              <span className="text-[10px] text-gray-500 dark:text-gray-400">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
          Appearance
        </h2>
        <div className="flex gap-3">
          {(['light', 'dark'] as ColorMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => handleColorMode(mode)}
              className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 transition-all ${
                colorMode === mode
                  ? 'border-primary bg-primary-light dark:bg-gray-700'
                  : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800'
              }`}
            >
              <span className="text-2xl">{mode === 'light' ? '☀️' : '🌙'}</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 capitalize">{mode}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
