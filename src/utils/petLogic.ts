import type { Mood, PetState } from '../types/pet'
import {
  MOOD_THRESHOLDS as T,
  DECAY,
  HEALTH_DECAY_THRESHOLD,
  HEALTH_DECAY_AMOUNT_LOW,
  HEALTH_DECAY_AMOUNT_HIGH,
  HEALTH_DECAY_DELAY_TICKS,
  HEALTH_RECOVERY_AMOUNT,
  HEALTH_RECOVERY_THRESHOLD,
  STAT_MIN,
  STAT_MAX
} from './constants'

export const clamp = (
  value: number,
  min = STAT_MIN,
  max = STAT_MAX
): number => {
  return Math.min(max, Math.max(min, value))
}

export const deriveMood = (
  pet: Pick<PetState, 'hunger' | 'happiness' | 'energy' | 'hygiene' | 'health'>
): Mood => {
  const { hunger, happiness, energy, hygiene, health } = pet

  if (health < T.sickHealth || (hunger < T.sickCombo && hygiene < T.sickCombo))
    return 'sick'

  if (energy < T.sleepingEnergy) return 'sleeping'

  if (happiness < T.angryHappiness) return 'angry'
  if (happiness < T.sadHappiness || hunger < T.sadHunger) return 'sad'

  const allHigh = [hunger, happiness, energy, hygiene, health].every(
    (s) => s >= T.ecstaticMin
  )
  if (allHigh) return 'ecstatic'

  const avg = (hunger + happiness + energy + hygiene + health) / 5
  if (avg >= T.happyAvg) return 'happy'

  return 'neutral'
}

export const applyDecay = (pet: PetState): Partial<PetState> => {
  const hunger = clamp(pet.hunger - DECAY.hunger)
  const energy = clamp(pet.energy - DECAY.energy)
  const hygiene = clamp(pet.hygiene - DECAY.hygiene)

  const lowPenalty = [hunger, energy, hygiene].filter(
    (s) => s < HEALTH_DECAY_THRESHOLD
  ).length
  const happinessDelta = DECAY.happiness + lowPenalty * 2
  const happiness = clamp(pet.happiness - happinessDelta)

  const lowStats = [hunger, happiness, energy, hygiene].filter(
    (s) => s < HEALTH_DECAY_THRESHOLD
  ).length
  const isSickCombo = hunger < T.sickCombo && hygiene < T.sickCombo
  const isLow = isSickCombo || lowStats >= 1
  const shouldRecoverHealth = [hunger, happiness, energy, hygiene].every(
    (s) => s >= HEALTH_RECOVERY_THRESHOLD
  )

  const lowStatTicks = isLow ? pet.lowStatTicks + 1 : 0

  let healthDelta = 0
  if (isLow && lowStatTicks >= HEALTH_DECAY_DELAY_TICKS) {
    if (isSickCombo || lowStats >= 2) {
      healthDelta = -HEALTH_DECAY_AMOUNT_HIGH
    } else {
      healthDelta = -HEALTH_DECAY_AMOUNT_LOW
    }
  } else if (!isLow && shouldRecoverHealth) {
    healthDelta = HEALTH_RECOVERY_AMOUNT
  }
  const health = clamp(pet.health + healthDelta)

  const mood = deriveMood({ hunger, happiness, energy, hygiene, health })

  return { hunger, happiness, energy, hygiene, health, mood, lowStatTicks }
}
