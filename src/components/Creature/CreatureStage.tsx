import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePetStore } from '../../store/usePetStore'
import { CreatureSprite } from './CreatureSprite'
import { MoodBubble } from './MoodBubble'
import { PoopLayer } from './PoopLayer'

const SHOW_DURATION = 4000
const MIN_INTERVAL = 8000
const MAX_INTERVAL = 20000

const STAGE_WIDTH = 280
const SPRITE_WIDTH = 160
const MAX_X = STAGE_WIDTH - SPRITE_WIDTH

const MOVE_MIN = 3000
const MOVE_MAX = 6000

const SWEEP_DURATION = 550

interface Props {
  actionMessage?: string
  isCleaning?: boolean
}

export function CreatureStage({ actionMessage, isCleaning = false }: Props) {
  const mood = usePetStore((s) => s.mood)
  const poops = usePetStore((s) => s.poops)
  const clearPoops = usePetStore((s) => s.clearPoops)
  const [visible, setVisible] = useState<boolean>(false)
  const [bubbleKey, setBubbleKey] = useState<number>(0)
  const [posX, setPosX] = useState<number>(MAX_X / 2)
  const [sweeping, setSweeping] = useState<boolean>(false)
  const moveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Trigger sweep when clean action fires
  useEffect(() => {
    if (!isCleaning) return
    setSweeping(true)
    const t = setTimeout(() => {
      setSweeping(false)
      clearPoops()
    }, SWEEP_DURATION)
    return () => clearTimeout(t)
  }, [isCleaning, clearPoops])

  useEffect(() => {
    const scheduleMove = () => {
      const delay = MOVE_MIN + Math.random() * (MOVE_MAX - MOVE_MIN)
      moveTimer.current = setTimeout(() => {
        setPosX(Math.random() * MAX_X)
        scheduleMove()
      }, delay)
    }
    scheduleMove()
    return () => { if (moveTimer.current) clearTimeout(moveTimer.current) }
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
      {/* Outer wrapper: no overflow clip so bubble can show above */}
      <div className="relative" style={{ width: STAGE_WIDTH, height: 230 }}>
        {/* Stage floor: overflow-x hidden for sweep, but not overflow-y */}
        <div className="absolute bottom-0 left-0 right-0 overflow-x-hidden" style={{ height: 180 }}>
          <PoopLayer poops={poops} sweeping={sweeping} stageWidth={STAGE_WIDTH} />
        </div>

        {/* Sprite + bubble together, moving horizontally */}
        <motion.div
          animate={{ x: posX }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="absolute bottom-0"
          style={{ width: SPRITE_WIDTH }}
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
          <CreatureSprite mood={mood} />
        </motion.div>
      </div>
    </div>
  )
}
