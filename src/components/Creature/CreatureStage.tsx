import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePetStore } from '../../store/usePetStore'
import { CreatureSprite, SPRITE_DISPLAY_SIZE } from './CreatureSprite'
import { MoodBubble } from './MoodBubble'
import type { ActionType } from '../../utils/constants'

const SHOW_DURATION = 4000
const MIN_INTERVAL = 8000
const MAX_INTERVAL = 20000

const STAGE_WIDTH = 280
const MAX_X = STAGE_WIDTH - SPRITE_DISPLAY_SIZE

const MOVE_MIN = 3000
const MOVE_MAX = 6000

interface Props {
  actionMessage?: string
  activeAction?: ActionType | 'no'
  isSleeping?: boolean
}

export function CreatureStage({
  actionMessage,
  activeAction,
  isSleeping = false
}: Props) {
  const mood = usePetStore((s) => s.mood)
  const [visible, setVisible] = useState<boolean>(false)
  const [bubbleKey, setBubbleKey] = useState<number>(0)
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

  useEffect(() => {
    if (!actionMessage) return
    setVisible(true)
    setBubbleKey((k) => k + 1)
    const t = setTimeout(() => setVisible(false), SHOW_DURATION)
    return () => clearTimeout(t)
  }, [actionMessage])

  useEffect(() => {
    let showTimer: ReturnType<typeof setTimeout>
    let hideTimer: ReturnType<typeof setTimeout>

    const schedule = () => {
      const delay = MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL)
      showTimer = setTimeout(() => {
        if (!actionMessage) {
          setVisible(true)
          setBubbleKey((k) => k + 1)
          hideTimer = setTimeout(() => {
            setVisible(false)
            schedule()
          }, SHOW_DURATION)
        } else {
          schedule()
        }
      }, delay)
    }

    schedule()
    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [actionMessage])

  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <div className="relative" style={{ width: STAGE_WIDTH, height: 230 }}>
        <motion.div
          animate={{ x: posX }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="absolute bottom-0"
          style={{ width: SPRITE_DISPLAY_SIZE }}
        >
          <div className="flex justify-center mb-2 h-16 items-end">
            <AnimatePresence mode="wait">
              {visible && (
                <MoodBubble
                  key={bubbleKey}
                  mood={mood}
                  customMessage={actionMessage}
                />
              )}
            </AnimatePresence>
          </div>
          <CreatureSprite mood={mood} activeAction={activeAction} />
        </motion.div>

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
