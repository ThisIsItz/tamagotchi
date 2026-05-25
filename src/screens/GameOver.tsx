import { motion } from 'framer-motion'
import { usePetStore } from '../store/usePetStore'
import { Sprite } from '../components/Creature/Sprite'
import { DEAD_ANGEL_CONFIG } from '../data/sprites'

export const GameOver = () => {
  const name = usePetStore((s) => s.name)
  const reset = usePetStore((s) => s.reset)

  return (
    <div className="page-bg">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card p-8 w-full max-w-xs flex flex-col items-center gap-5 text-center"
      >
        <Sprite config={DEAD_ANGEL_CONFIG} scale={2} />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Goodbye, {name}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-md">
          {name}'s tiny journey came to an end. But you can still care for
          another tiny creature.
        </p>
        <button onClick={reset} className="btn-primary px-6">
          Start again
        </button>
      </motion.div>
    </div>
  )
}
