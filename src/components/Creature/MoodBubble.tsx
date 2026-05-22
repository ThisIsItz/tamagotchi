import { motion } from 'framer-motion'
import type { Mood } from '../../types/pet'

interface Props {
  mood: Mood
  customMessage?: string
}

const moodMessages: Record<Mood, string[]> = {
  ecstatic: ['Best day ever! ✨', 'I love you!! 💛', 'Life is wonderful!'],
  happy: ['Feeling great!', 'Happy happy!', 'Yay!'],
  neutral: ['...', 'Hmmm'],
  sad: ["I'm a bit sad...", 'I miss you...', 'Feeling down...'],
  angry: ["I'm upset!!", "Don't ignore me!"],
  sick: ['Not feeling well...', 'Ugh...', 'I think I caught a bug...'],
  sleeping: ['Zzz...', 'So sleepy...']
}

const pickMoodMessage = (mood: Mood): string => {
  const msgs = moodMessages[mood]
  return msgs[Math.floor(Math.random() * msgs.length)]
}

export const MoodBubble = ({ mood, customMessage }: Props) => {
  const text = customMessage ?? pickMoodMessage(mood)

  return (
    <motion.div
      key={text}
      initial={{ opacity: 0, y: -8, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      className="relative inline-block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-md max-w-[180px] text-center"
    >
      {text}
      {/* Border triangle */}
      <span className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[9px] border-t-gray-200 dark:border-t-gray-600" aria-hidden />
      {/* Fill triangle (1px smaller, sits on top) */}
      <span className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] border-t-white dark:border-t-gray-800" aria-hidden />
    </motion.div>
  )
}
