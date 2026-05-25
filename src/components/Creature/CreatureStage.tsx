import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { usePetStore } from '../../store/usePetStore'
import { CreatureSprite } from './CreatureSprite'
import { MoodBubble } from './MoodBubble'

const SHOW_DURATION = 4000 // how long the bubble stays visible
const MIN_INTERVAL = 8000 // minimum time before next bubble
const MAX_INTERVAL = 20000 // maximum time before next bubble

interface Props {
  actionMessage?: string
}

export function CreatureStage({ actionMessage }: Props) {
  const mood = usePetStore((s) => s.mood)
  const [visible, setVisible] = useState<boolean>(false)
  const [bubbleKey, setBubbleKey] = useState<number>(0)

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
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="h-10 flex items-end justify-center">
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
      <div>
        <CreatureSprite mood={mood} />
      </div>
    </div>
  )
}
