import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

interface Props {
  message: string
  onDone: () => void
}

export function Toast({ message, onDone }: Props) {
  useEffect(() => {
    const id = setTimeout(onDone, 2200)
    return () => clearTimeout(id)
  }, [message, onDone])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.9 }}
        transition={{ duration: 0.25 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg pointer-events-none"
      >
        {message}
      </motion.div>
    </AnimatePresence>
  )
}
