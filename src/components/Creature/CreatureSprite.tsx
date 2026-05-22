import { motion, type TargetAndTransition } from 'framer-motion'
import type { Mood, CreatureType } from '../../types/pet'
import { usePetStore } from '../../store/usePetStore'

interface Props {
  mood: Mood
}

const moodImages: Record<CreatureType, Record<Mood, string>> = {
  fox: {
    ecstatic: '/fox/ecstatic.png',
    happy: '/fox/happy.png',
    neutral: '/fox/neutral.png',
    sad: '/fox/sad.png',
    angry: '/fox/angry.png',
    sick: '/fox/sick.png',
    sleeping: '/fox/sleeping.png'
  },
  bunny: {
    ecstatic: '/bunny/ecstatic.png',
    happy: '/bunny/happy.png',
    neutral: '/bunny/neutral.png',
    sad: '/bunny/sad.png',
    angry: '/bunny/angry.png',
    sick: '/bunny/sick.png',
    sleeping: '/bunny/sleeping.png'
  }
}

const bodyAnimations: Record<Mood, TargetAndTransition> = {
  ecstatic: { y: [0, -12, 0], transition: { repeat: Infinity, duration: 1.2 } },
  happy: { y: [0, -6, 0], transition: { repeat: Infinity, duration: 2 } },
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
    scale: [1, 1.04, 1],
    transition: { repeat: Infinity, duration: 2.5 }
  }
}

export function CreatureSprite({ mood }: Props) {
  const creatureType = usePetStore((s) => s.creatureType)
  return (
    <motion.div
      animate={bodyAnimations[mood]}
      className="select-none"
      style={{ display: 'inline-block' }}
    >
      <img
        src={moodImages[creatureType][mood]}
        alt={mood}
        width={150}
        height={100}
        style={{ imageRendering: 'auto' }}
      />
    </motion.div>
  )
}
