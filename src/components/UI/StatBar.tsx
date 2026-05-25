import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  label: string
  icon: ReactNode
  value: number
}

const BAR_COLORS = {
  good: 'stat-bar-good',
  warn: 'stat-bar-warn',
  bad: 'stat-bar-bad'
} as const

const barColor = (value: number): string => {
  if (value >= 60) return BAR_COLORS.good
  if (value >= 30) return BAR_COLORS.warn
  return BAR_COLORS.bad
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
          <motion.div
            initial={false}
            className={`h-full rounded-full ${barColor(pct)}`}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  )
}
