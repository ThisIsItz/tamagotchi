import {
  motion,
  AnimatePresence,
  type TargetAndTransition
} from 'framer-motion'
import type { Mood } from '../../types/pet'
import type { ActionType } from '../../utils/constants'
import { Sprite } from './Sprite'
import { LEVEL_SPRITES, type SpriteAnim } from '../../data/sprites'

const SCALE = 2
const FRAME_SIZE = 128
export const SPRITE_DISPLAY_SIZE = FRAME_SIZE * SCALE

const moodToAnim: Record<Mood, SpriteAnim> = {
  ecstatic: 'idle',
  happy: 'idle',
  neutral: 'idle',
  sad: 'idle',
  angry: 'no',
  sick: 'sick',
  sleeping: 'sleep'
}

const actionToAnim: Partial<Record<ActionType, SpriteAnim>> = {
  clean: 'bath',
  pet: 'pet',
  sleep: 'sleep',
  play: 'like',
  feed: 'like',
  medicine: 'sick'
}

const bodyAnimations: Record<Mood, TargetAndTransition> = {
  ecstatic: { y: [0, -10, 0], transition: { repeat: Infinity, duration: 0.8 } },
  happy: { y: [0, -5, 0], transition: { repeat: Infinity, duration: 1.5 } },
  neutral: { y: [0, -2, 0], transition: { repeat: Infinity, duration: 2 } },
  sad: { x: [0, -4, 4, 0], transition: { repeat: Infinity, duration: 2.5 } },
  angry: {
    x: [0, -5, 5, -5, 0],
    transition: { repeat: Infinity, duration: 0.4 }
  },
  sick: {
    rotate: [0, -3, 3, 0],
    transition: { repeat: Infinity, duration: 2 }
  },
  sleeping: {
    scale: [1, 1.03, 1],
    transition: { repeat: Infinity, duration: 2.5 }
  }
}

interface Props {
  mood: Mood
  activeAction?: ActionType | 'no'
  level?: number
}

export function CreatureSprite({ mood, activeAction, level = 1 }: Props) {
  const levelSprites = LEVEL_SPRITES[level] ?? LEVEL_SPRITES[1]
  const fallback = levelSprites.idle!

  const anim: SpriteAnim =
    activeAction === 'no'
      ? 'no'
      : activeAction
        ? (actionToAnim[activeAction as ActionType] ?? moodToAnim[mood])
        : moodToAnim[mood]

  const config = levelSprites[anim] ?? fallback

  const freezeBody = anim === 'sleep' || anim === 'bath'

  return (
    <motion.div
      animate={freezeBody ? {} : bodyAnimations[mood]}
      className="select-none flex items-center justify-center"
      style={{ width: SPRITE_DISPLAY_SIZE, height: SPRITE_DISPLAY_SIZE }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${level}-${anim}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <Sprite config={config} scale={SCALE} />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
