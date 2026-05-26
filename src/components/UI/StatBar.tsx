import type { ReactNode } from 'react'

interface Props {
  label: string
  icon: ReactNode
  value: number
}

const barColor = (value: number): string => {
  if (value >= 60) return 'stat-bar-good'
  if (value >= 30) return 'stat-bar-warn'
  return 'stat-bar-bad'
}

export const StatBar = ({ label, icon, value }: Props) => {
  const pct = Math.max(0, Math.min(100, value))

  return (
    <div className="flex items-center gap-2">
      <span
        className="w-5 h-5 flex items-center justify-center flex-shrink-0"
        aria-hidden
      >
        {icon}
      </span>
      <div className="flex-1 gap-0.5 flex flex-col">
        <h1 className="text-xs text-primary">{label}</h1>
        <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div
            className={`h-full rounded-full transition-[width] duration-[4000ms] ease-out ${barColor(pct)}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
