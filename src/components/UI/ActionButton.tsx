import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  icon?: ReactNode
  onClick: () => void
  disabled?: boolean
}

export const HnIcon = ({ name }: { name: string }) => (
  <i className={`hn hn-${name} text-3xl text-primary`} />
)

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
        flex items-center justify-center rounded-2xl p-1 size-15
        transition
        ${
          disabled
            ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
            : 'bg-white/80 shadow-sm ring-1 ring-primary/60 hover:bg-white hover:shadow-md dark:bg-gray-700/80 dark:hover:bg-gray-700'
        }
      `}
    >
      {icon}
    </motion.button>
  )
}
