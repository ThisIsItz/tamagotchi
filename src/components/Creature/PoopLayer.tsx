import { AnimatePresence, motion } from 'framer-motion'
import type { PoopEntry } from '../../types/pet'

interface Props {
  poops: PoopEntry[]
  sweeping: boolean
  stageWidth: number
}

export function PoopLayer({ poops, sweeping, stageWidth }: Props) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Poop sprites */}
      <AnimatePresence>
        {!sweeping &&
          poops.map((poop) => (
            <motion.span
              key={poop.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-1 text-xl select-none"
              style={{ left: `${poop.x}%`, transform: 'translateX(-50%)' }}
            >
              💩
            </motion.span>
          ))}
      </AnimatePresence>

      {/* Sweep animation - black bar left to right */}
      <AnimatePresence>
        {sweeping && (
          <motion.div
            className="absolute top-0 bottom-0 w-2 bg-black dark:bg-white"
            initial={{ x: 0 }}
            animate={{ x: stageWidth }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'linear' }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
