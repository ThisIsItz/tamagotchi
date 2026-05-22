import { motion } from 'framer-motion'

interface Props {
  label: string
  icon: string
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
      <span className="text-lg w-6 text-center" aria-hidden>
        {icon}
      </span>
      <div className="flex-1">
        <h1 className="text-xs text-gray-500 dark:text-gray-400">{label}</h1>
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
