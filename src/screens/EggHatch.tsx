import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePetStore } from '../store/usePetStore'
import { EGG_IDLE_CONFIGS, EGG_HATCH_CONFIGS } from '../data/sprites'

const SCALE = 8

function StaticEggFrame({
  config,
  frameOffset,
  scale
}: {
  config: (typeof EGG_IDLE_CONFIGS)[0]
  frameOffset: number
  scale: number
}) {
  const { src, frameW, frameH, cols, startFrame = 0 } = config
  const frame = startFrame + frameOffset
  const col = frame % cols
  const row = Math.floor(frame / cols)
  const displayW = frameW * scale
  const displayH = frameH * scale
  const sheetW = frameW * cols * scale
  return (
    <div
      style={{
        width: displayW,
        height: displayH,
        backgroundImage: `url(${src})`,
        backgroundSize: `${sheetW}px auto`,
        backgroundPosition: `${-(col * displayW)}px ${-(row * frameH * scale)}px`,
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated'
      }}
    />
  )
}

export const EggHatch = () => {
  const setName = usePetStore((s) => s.setName)
  const [hatchStep, setHatchStep] = useState(0)
  const [showNaming, setShowNaming] = useState(false)
  const [input, setInput] = useState('')

  const [eggIndex] = useState(() => Math.floor(Math.random() * EGG_IDLE_CONFIGS.length))
  const idleConfig = EGG_IDLE_CONFIGS[eggIndex]
  const hatchConfig = EGG_HATCH_CONFIGS[eggIndex]
  const totalHatchFrames = hatchConfig.frameCount

  const handleTap = () => {
    if (showNaming) return
    const next = hatchStep + 1
    if (next >= totalHatchFrames) {
      setHatchStep(next)
      setTimeout(() => setShowNaming(true), 300)
    } else {
      setHatchStep(next)
    }
  }

  const submit = () => {
    const trimmed = input.trim()
    if (trimmed) setName(trimmed)
  }

  return (
    <div className="page-bg">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-8 w-full max-w-md flex flex-col items-center gap-6"
      >
        <AnimatePresence mode="wait">
          {!showNaming && (
            <motion.div
              key="egg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.3 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                key={hatchStep}
                animate={{ scale: hatchStep > 0 ? [1, 1.15, 1] : 1 }}
                transition={{ duration: 0.2 }}
                className="cursor-pointer select-none"
                onClick={handleTap}
              >
                {hatchStep === 0 ? (
                  <StaticEggFrame
                    config={idleConfig}
                    frameOffset={0}
                    scale={SCALE}
                  />
                ) : (
                  <StaticEggFrame
                    config={hatchConfig}
                    frameOffset={hatchStep - 1}
                    scale={SCALE}
                  />
                )}
              </motion.div>

              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  A tiny creature appeared!
                </h1>
                <motion.p
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.4,
                    ease: 'easeInOut'
                  }}
                  className="text-primary font-semibold mt-1"
                >
                  Tap to hatch
                </motion.p>
              </div>
            </motion.div>
          )}

          {showNaming && (
            <motion.div
              key="naming"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-6 w-full"
            >
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100"></h1>{' '}
                It hatched!
                <p className="text-gray-600 dark:text-gray-400 text-md mt-1">
                  Give your creature a name.
                </p>
              </div>
              <input
                autoFocus
                type="text"
                maxLength={20}
                spellCheck={false}
                placeholder="Name your pet..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                className="input-base text-center w-full"
              />
              <button
                onClick={submit}
                disabled={!input.trim()}
                className="w-full btn-primary"
              >
                Say hello!
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
