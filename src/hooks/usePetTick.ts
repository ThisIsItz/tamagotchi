import { useEffect } from 'react'
import { usePetStore } from '../store/usePetStore'
import { TICK_INTERVAL_MS, MAX_CATCHUP_TICKS } from '../utils/constants'

export function usePetTick() {
  const tick = usePetStore((s) => s.tick)
  const lastTick = usePetStore((s) => s.lastTickAt)
  const isAlive = usePetStore((s) => s.isAlive)

  useEffect(() => {
    if (!isAlive) return
    const elapsed = Date.now() - lastTick
    const missedTicks = Math.floor(elapsed / TICK_INTERVAL_MS)
    if (missedTicks > 0) {
      tick(Math.min(missedTicks, MAX_CATCHUP_TICKS))
    }
  }, [])

  useEffect(() => {
    if (!isAlive) return
    const id = setInterval(() => tick(1), TICK_INTERVAL_MS)
    return () => clearInterval(id)
  }, [tick, isAlive])
}
