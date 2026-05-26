import { useState } from 'react'
import { usePetStore } from '../store/usePetStore'
import { ConfirmModal } from '../components/UI/ConfirmModal'
import {
  applyTheme,
  getTheme,
  applyColorMode,
  getColorMode,
  type Theme,
  type ColorMode
} from '../utils/theme'

const THEMES: { id: Theme; label: string; color: string }[] = [
  { id: 'violet', label: 'Violet', color: '#8b5cf6' },
  { id: 'orange', label: 'Orange', color: '#f97316' },
  { id: 'green', label: 'Green', color: '#22c55e' },
  { id: 'blue', label: 'Blue', color: '#3b82f6' },
  { id: 'pink', label: 'Pink', color: '#ec4899' }
]

export const Settings = () => {
  const currentName = usePetStore((s) => s.name)
  const setName = usePetStore((s) => s.setName)
  const reset = usePetStore((s) => s.reset)
  const [input, setInput] = useState(
    currentName.charAt(0).toUpperCase() + currentName.slice(1)
  )
  const [activeTheme, setActiveTheme] = useState<Theme>(getTheme())
  const [colorMode, setColorMode] = useState<ColorMode>(getColorMode())
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSave = () => {
    const trimmed = input.trim()
    if (!trimmed || trimmed === currentName) return
    setName(trimmed.charAt(0).toUpperCase() + trimmed.slice(1))
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
        <h2 className="section-title">Rename pet</h2>
        <div className="flex flex-row gap-2">
          <input
            type="text"
            maxLength={20}
            spellCheck={false}
            value={input}
            onChange={(e) => {
              const v = e.target.value
              setInput(v.charAt(0).toUpperCase() + v.slice(1))
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            className="input-base"
          />
          <button
            onClick={handleSave}
            disabled={!input.trim() || input.trim() === currentName}
            className="btn-primary px-3 w-12 flex items-center justify-center"
          >
            <i className="hn hn-save-solid text-lg" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="section-title">Color theme</h2>
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
                  boxShadow:
                    activeTheme === id
                      ? `0 0 0 2px white, 0 0 0 4px ${color}`
                      : 'none'
                }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="section-title">Appearance</h2>
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
              <span className="text-2xl fill-primary">
                {mode === 'light' ? (
                  <i className="hn hn-brightness-high-solid text-primary" />
                ) : (
                  <i className="hn hn-moon-solid text-primary" />
                )}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                {mode}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="section-title">Danger zone</h2>
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full py-2.5 rounded-xl border-2 border-red-300 dark:border-red-700 text-red-500 dark:text-red-400 text-sm font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          Reset pet
        </button>
      </div>

      {showConfirm && (
        <ConfirmModal
          message="Reset your pet? This cannot be undone."
          onConfirm={() => {
            reset()
            setShowConfirm(false)
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  )
}
