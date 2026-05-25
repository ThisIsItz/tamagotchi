import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePetStore } from '../../store/usePetStore'
import { CreatureSprite } from './CreatureSprite'
import { MoodBubble } from './MoodBubble'

const SHOW_DURATION = 4000
const MIN_INTERVAL = 8000
const MAX_INTERVAL = 20000

const STAGE_WIDTH = 280
const SPRITE_WIDTH = 160
const MAX_X = STAGE_WIDTH - SPRITE_WIDTH

const MOVE_MIN = 3000
const MOVE_MAX = 6000

interface Props {
  actionMessage?: string
}

export function CreatureStage({ actionMessage }: Props) {
  const mood = usePetStore((s) => s.mood)
  const [visible, setVisible] = useState<boolean>(false)
  const [bubbleKey, setBubbleKey] = useState<number>(0)
  const [posX, setPosX] = useState<number>(MAX_X / 2)
  const moveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const scheduleMove = () => {
      const delay = MOVE_MIN + Math.random() * (MOVE_MAX - MOVE_MIN)
      moveTimer.current = setTimeout(() => {
        const newX = Math.random() * MAX_X
        setPosX(newX)
        scheduleMove()
      }, delay)
    }
    scheduleMove()
    return () => {
      if (moveTimer.current) clearTimeout(moveTimer.current)
    }
  }, [])

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
      <div className="relative" style={{ width: STAGE_WIDTH, height: 180 }}>
        <motion.div
          animate={{ x: posX }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="absolute bottom-0"
          style={{ width: SPRITE_WIDTH }}
        >
          <div className="flex justify-center mb-2 h-12 items-end">
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
          <CreatureSprite mood={mood} />
        </motion.div>
      </div>
    </div>
  )
}
