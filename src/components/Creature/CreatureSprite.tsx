import { useEffect, useState } from 'react'
import { motion, AnimatePresence, type TargetAndTransition } from 'framer-motion'
import type { Mood } from '../../types/pet'

const FRAME_W = 128
const FRAME_H = 128
const COLS = 4
const SCALE = 1.25
const DISPLAY_W = FRAME_W * SCALE  // 160
const DISPLAY_H = FRAME_H * SCALE  // 160
const SHEET_DISPLAY_W = FRAME_W * COLS * SCALE  // 640

interface SpriteConfig {
  row: number
  frameCount: number
  fps: number
}

const moodSprite: Record<Mood, SpriteConfig> = {
  ecstatic: { row: 2, frameCount: 4, fps: 10 },
  happy:    { row: 1, frameCount: 4, fps: 7  },
  neutral:  { row: 0, frameCount: 4, fps: 4  },
  sad:      { row: 0, frameCount: 2, fps: 2  },
  angry:    { row: 0, frameCount: 4, fps: 12 },
  sick:     { row: 3, frameCount: 2, fps: 2  },
  sleeping: { row: 3, frameCount: 4, fps: 3  },
}

const bodyAnimations: Record<Mood, TargetAndTransition> = {
  ecstatic: { y: [0, -10, 0], transition: { repeat: Infinity, duration: 0.8 } },
  happy:    { y: [0, -5, 0],  transition: { repeat: Infinity, duration: 1.5 } },
  neutral:  { y: [0, -2, 0],  transition: { repeat: Infinity, duration: 2   } },
  sad:      { x: [0, -4, 4, 0], transition: { repeat: Infinity, duration: 2.5 } },
  angry:    { x: [0, -5, 5, -5, 0], transition: { repeat: Infinity, duration: 0.4 } },
  sick:     { rotate: [0, -3, 3, 0], transition: { repeat: Infinity, duration: 2 } },
  sleeping: { scale: [1, 1.03, 1], transition: { repeat: Infinity, duration: 2.5 } },
}

interface Props {
  mood: Mood
}

export function CreatureSprite({ mood }: Props) {
  const config = moodSprite[mood]
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    setFrame(0)
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % config.frameCount)
    }, 1000 / config.fps)
    return () => clearInterval(interval)
  }, [mood, config.frameCount, config.fps])

  const bgX = -(frame * DISPLAY_W)
  const bgY = -(config.row * DISPLAY_H)

  return (
    <motion.div
      animate={bodyAnimations[mood]}
      className="select-none flex items-center justify-center"
      style={{ width: DISPLAY_W, height: DISPLAY_H }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={mood}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            width: DISPLAY_W,
            height: DISPLAY_H,
            backgroundImage: 'url(/tiger-sprite.png)',
            backgroundSize: `${SHEET_DISPLAY_W}px auto`,
            backgroundPosition: `${bgX}px ${bgY}px`,
            backgroundRepeat: 'no-repeat',
            imageRendering: 'pixelated',
          }}
        />
      </AnimatePresence>
    </motion.div>
  )
}
