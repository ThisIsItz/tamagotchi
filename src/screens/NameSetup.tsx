import { useState } from 'react'
import { motion } from 'framer-motion'
import { usePetStore } from '../store/usePetStore'

export const NameSetup = () => {
  const setName = usePetStore((s) => s.setName)
  const [input, setInput] = useState('')

  const submit = () => {
    const trimmed = input.trim()
    if (trimmed) setName(trimmed)
  }

  return (
    <div className="page-bg">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-8 w-full max-w-sm flex flex-col items-center gap-6"
      >
        <div className="text-6xl">🥚</div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            A tiny creature appeared!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Give your creature a name to begin.
          </p>
        </div>
        <input
          autoFocus
          type="text"
          maxLength={20}
          spellCheck={false}
          placeholder="Name your pet…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          className="input-base text-center"
        />
        <button
          onClick={submit}
          disabled={!input.trim()}
          className="w-full btn-primary cursor-pointer"
        >
          Say hello
        </button>
      </motion.div>
    </div>
  )
}
