import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sprite } from '../components/Creature/Sprite'
import { LEVEL_SPRITES } from '../data/sprites'

const GAME_W = 300
const GAME_H = 300
const PET_SCALE = 0.75
const PET_W = Math.round(128 * PET_SCALE)
const PET_H = Math.round(128 * PET_SCALE)
const PET_PAD_X = 26
const PET_PAD_TOP = 64
const PET_Y = GAME_H - PET_H - 4
const HIT_Y = PET_Y + PET_PAD_TOP
const PET_SPEED = 4
const TREAT_SIZE = 28
const FALL_SPEED = 2.2
const SPAWN_MS = 1300
const GAME_DURATION = 30

interface Treat {
  id: number
  x: number
  y: number
}

interface Props {
  onClose: (score: number) => void
}

export function CatchTreats({ onClose }: Props) {
  const petXRef = useRef((GAME_W - PET_W) / 2)
  const treatsRef = useRef<Treat[]>([])
  const scoreRef = useRef(0)
  const timeLeftRef = useRef(GAME_DURATION)
  const nextId = useRef(0)
  const keys = useRef({ left: false, right: false })
  const endedRef = useRef(false)
  const rafId = useRef<ReturnType<typeof requestAnimationFrame> | undefined>(undefined)

  const [petX, setPetX] = useState(petXRef.current)
  const [treats, setTreats] = useState<Treat[]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [ended, setEnded] = useState(false)

  const config = LEVEL_SPRITES[1].idle!

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        keys.current.left = true
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        keys.current.right = true
      }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') keys.current.left = false
      if (e.key === 'ArrowRight') keys.current.right = false
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      if (endedRef.current) return
      const x = Math.random() * (GAME_W - TREAT_SIZE)
      treatsRef.current.push({ id: nextId.current++, x, y: -TREAT_SIZE })
    }, SPAWN_MS)

    const timerInterval = setInterval(() => {
      if (endedRef.current) return
      timeLeftRef.current -= 1
      setTimeLeft(timeLeftRef.current)
      if (timeLeftRef.current <= 0) {
        endedRef.current = true
        setEnded(true)
      }
    }, 1000)

    let lastTime = performance.now()

    const loop = (now: number) => {
      if (endedRef.current) return
      const dt = Math.min(now - lastTime, 50)
      lastTime = now

      if (keys.current.left)
        petXRef.current = Math.max(-PET_PAD_X, petXRef.current - (PET_SPEED * dt) / 16)
      if (keys.current.right)
        petXRef.current = Math.min(
          GAME_W - PET_W + PET_PAD_X,
          petXRef.current + (PET_SPEED * dt) / 16
        )

      let caught = 0
      treatsRef.current = treatsRef.current
        .map((t) => ({ ...t, y: t.y + (FALL_SPEED * dt) / 16 }))
        .filter((t) => {
          const hitX1 = petXRef.current + PET_PAD_X
          const hitX2 = petXRef.current + PET_W - PET_PAD_X
          const hitY1 = HIT_Y
          const hitY2 = GAME_H
          const hitY = t.y + TREAT_SIZE >= hitY1 && t.y <= hitY2
          const hitX = t.x + TREAT_SIZE > hitX1 && t.x < hitX2
          if (hitY && hitX) {
            caught++
            return false
          }
          return t.y < GAME_H
        })

      if (caught > 0) {
        scoreRef.current += caught
        setScore(scoreRef.current)
      }

      setPetX(petXRef.current)
      setTreats([...treatsRef.current])
      rafId.current = requestAnimationFrame(loop)
    }

    rafId.current = requestAnimationFrame(loop)

    return () => {
      clearInterval(spawnInterval)
      clearInterval(timerInterval)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  if (ended) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-6 h-full py-8"
      >
        <h2 className="text-primary text-sm">Time's up!</h2>
        <div className="text-6xl">
          {score >= 12 ? '🎉' : score >= 6 ? '😊' : '🍪'}
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
          You caught{' '}
          <span className="text-primary font-bold text-base">{score}</span>{' '}
          treats!
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-xs">
          {score >= 12
            ? 'Amazing! Max happiness boost!'
            : score >= 6
              ? 'Pretty good!'
              : 'Keep practicing!'}
        </p>
        <button
          className="btn-primary px-8 py-3"
          onClick={() => onClose(score)}
        >
          Continue
        </button>
      </motion.div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex justify-between w-full px-1">
        <span className="font-bold text-sm text-primary">🍪 {score}</span>
        <span
          className={`text-sm font-bold ${timeLeft <= 5 ? 'text-red-400' : 'text-gray-500 dark:text-gray-400'}`}
        >
          ⏱ {timeLeft}s
        </span>
      </div>

      <div
        className="relative overflow-hidden rounded-2xl bg-primary-light dark:bg-gray-800 border border-primary-muted"
        style={{ width: GAME_W, height: GAME_H }}
      >
        <AnimatePresence>
          {treats.map((t) => (
            <div
              key={t.id}
              className="absolute flex items-center justify-center select-none"
              style={{
                left: t.x,
                top: t.y,
                width: TREAT_SIZE,
                height: TREAT_SIZE,
                fontSize: TREAT_SIZE - 4
              }}
            >
              🍪
            </div>
          ))}
        </AnimatePresence>

        <div
          className="absolute"
          style={{ left: petX, top: PET_Y, width: PET_W, height: PET_H }}
        >
          <Sprite config={config} scale={PET_SCALE} />
        </div>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500">
        ← → arrow keys to move
      </p>
    </div>
  )
}
