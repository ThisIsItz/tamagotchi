import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  icon?: ReactNode
  onClick: () => void
  disabled?: boolean
}

export function ActionButton({ icon, onClick, disabled = false }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      initial={false}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      whileHover={disabled ? undefined : { y: -2 }}
      className={`
        flex items-center justify-center rounded-2xl p-2
        transition
        ${
          disabled
            ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed'
            : 'bg-white/80 text-gray-700 shadow-sm ring-1 ring-gray-200 hover:bg-white hover:shadow-md dark:bg-gray-800/80 dark:text-gray-100 dark:ring-gray-700 dark:hover:bg-gray-800'
        }
      `}
    >
      {icon}
    </motion.button>
  )
}
