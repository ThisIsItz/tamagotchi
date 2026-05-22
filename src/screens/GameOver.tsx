import { motion } from 'framer-motion'
import { usePetStore } from '../store/usePetStore'

export const GameOver = () => {
  const name = usePetStore((s) => s.name)
  const reset = usePetStore((s) => s.reset)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card p-8 w-full max-w-xs flex flex-col items-center gap-5 text-center"
      >
        <div className="text-6xl">🌙</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Goodbye, {name}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {name}'s tiny journey came to an end. But you can still care for
          another tiny creature.
        </p>
        <button onClick={reset} className="btn-primary px-6 cursor-pointer">
          Start again
        </button>
      </motion.div>
    </div>
  )
}
