export const TICK_INTERVAL_MS = 60_000

export const MAX_CATCHUP_TICKS = 30

export const DECAY = {
  hunger: 3,
  happiness: 2,
  energy: 2,
  hygiene: 1.5
} as const

export const STAT_MIN = 0
export const STAT_MAX = 100

export const MOOD_THRESHOLDS = {
  sleepingEnergy: 15,
  sickHealth: 30,
  sickCombo: 15,
  angryHappiness: 20,
  sadHappiness: 40,
  sadHunger: 25,
  happyAvg: 60,
  ecstaticMin: 70
} as const

export const HEALTH_DECAY_THRESHOLD = 45 // if any stat below this: health decays
export const HEALTH_DECAY_AMOUNT_LOW = 2 // 1 stat critically low
export const HEALTH_DECAY_AMOUNT_HIGH = 5 // 2+ stats critically low
export const HEALTH_DECAY_DELAY_TICKS = 1 // ticks with low stats before health drops (~60s)
export const HEALTH_RECOVERY_AMOUNT = 0.5 // slower recovery
export const HEALTH_RECOVERY_THRESHOLD = 55 // all stats must exceed this to recover

export const ACTION_EFFECTS = {
  feed: { hunger: 30, happiness: 5, energy: 0, hygiene: -3, health: 0 },
  play: { hunger: -8, happiness: 22, energy: -10, hygiene: -6, health: 0 },
  sleep: { hunger: -3, happiness: 3, energy: 35, hygiene: 0, health: 2 },
  clean: { hunger: 0, happiness: 3, energy: 0, hygiene: 35, health: 0 },
  pet: { hunger: 0, happiness: 12, energy: 0, hygiene: 0, health: 0 },
  medicine: { hunger: 0, happiness: 0, energy: 0, hygiene: 0, health: 100 }
} as const

export type ActionType = keyof typeof ACTION_EFFECTS
