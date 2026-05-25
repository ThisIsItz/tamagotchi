import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePetStore } from '../../store/usePetStore'
import { CreatureSprite, SPRITE_DISPLAY_SIZE } from './CreatureSprite'
import { Sprite } from './Sprite'
import { FOOD_EAT_CONFIG } from '../../data/sprites'
import type { ActionType } from '../../utils/constants'

const STAGE_WIDTH = 300
const MAX_X = STAGE_WIDTH - SPRITE_DISPLAY_SIZE

const MOVE_MIN = 3000
const MOVE_MAX = 6000

interface Props {
  activeAction?: ActionType | 'no'
  isSleeping?: boolean
}

export function CreatureStage({ activeAction, isSleeping = false }: Props) {
  const mood = usePetStore((s) => s.mood)
  const [posX, setPosX] = useState<number>(MAX_X / 2)
  const moveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (isSleeping || activeAction === 'clean') return
    const scheduleMove = () => {
      const delay = MOVE_MIN + Math.random() * (MOVE_MAX - MOVE_MIN)
      moveTimer.current = setTimeout(() => {
        setPosX(Math.random() * MAX_X)
        scheduleMove()
      }, delay)
    }
    scheduleMove()
    return () => {
      if (moveTimer.current) clearTimeout(moveTimer.current)
    }
  }, [isSleeping, activeAction])

  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <div className="relative" style={{ width: STAGE_WIDTH, height: 210 }}>
        <motion.div
          animate={{ x: posX }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="absolute bottom-0"
          style={{ width: SPRITE_DISPLAY_SIZE }}
        >
          <CreatureSprite mood={mood} activeAction={activeAction} />
        </motion.div>

        <AnimatePresence>
          {activeAction === 'feed' && (
            <motion.div
              key="food"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 0.5 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none"
            >
              <Sprite config={FOOD_EAT_CONFIG} scale={1.5} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isSleeping && (
            <motion.div
              key="sleep-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 rounded-md bg-indigo-950/50 pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
