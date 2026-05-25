export const TICK_INTERVAL_MS = 15_000

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
  sickCombo: 15, // hunger and hygiene both below this: sick
  angryHappiness: 20,
  sadHappiness: 40,
  sadHunger: 25,
  happyAvg: 60,
  ecstaticMin: 70
} as const

export const HEALTH_DECAY_THRESHOLD = 45 // if any stat below this: health decays
export const HEALTH_DECAY_AMOUNT_LOW = 2   // 1 stat critically low
export const HEALTH_DECAY_AMOUNT_HIGH = 5  // 2+ stats critically low
export const HEALTH_RECOVERY_AMOUNT = 0.5  // slower recovery
export const HEALTH_RECOVERY_THRESHOLD = 55 // all stats must exceed this to recover

export const MAX_POOPS = 5
export const POOP_CHANCE_PER_TICK = 0.25 // 25% chance per tick to poop

export const ACTION_EFFECTS = {
  feed: { hunger: 30, happiness: 5, energy: 0, hygiene: -10, health: 0 },
  play: { hunger: -8, happiness: 22, energy: -12, hygiene: -6, health: 0 },
  sleep: { hunger: -6, happiness: 3, energy: 35, hygiene: 0, health: 1 },
  clean: { hunger: 0, happiness: 3, energy: 0, hygiene: 35, health: 0 },
  pet: { hunger: 0, happiness: 12, energy: 0, hygiene: 0, health: 0 }
} as const

export type ActionType = keyof typeof ACTION_EFFECTS
