import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PetState, MemoryEntry, CreatureType, Sex } from '../types/pet'
import { ACTION_EFFECTS, type ActionType } from '../utils/constants'
import { clamp, deriveMood, applyDecay } from '../utils/petLogic'

const ACTION_LABELS: Record<ActionType, string> = {
  feed: 'Snack',
  play: 'Play time',
  sleep: 'Nap',
  clean: 'Bath',
  pet: 'Pets',
  medicine: 'Medicine'
}



const MEMORY_TEXTS: Record<ActionType, string[]> = {
  feed: ['Tiny snack', 'Tasty treat', 'Yummy meal'],
  play: ['Playtime', 'Fun games'],
  sleep: ['Warm nap', 'Soft dreams', 'Cozy rest'],
  clean: ['Bubble bath', 'Refreshing shower'],
  pet: ['Head pats', 'Big hug', 'Warm cuddles'],
  medicine: ['Took medicine', 'Feeling better']
}

const pick = (msgs: string[]): string =>
  msgs[Math.floor(Math.random() * msgs.length)]

const pickMemoryText = (action: ActionType): string =>
  pick(MEMORY_TEXTS[action])

const makeMemoryEntry = (action: ActionType, text: string): MemoryEntry => {
  return {
    id: `${Date.now()}-${Math.random()}`,
    type: ACTION_LABELS[action],
    text,
    createdAt: Date.now(),
    sentiment: ['feed', 'play', 'clean', 'pet'].includes(action)
      ? 'positive'
      : 'neutral'
  }
}

interface PetStore extends PetState {
  setName: (name: string) => void
  performAction: (action: ActionType) => { rejected: boolean }
  sleepRegen: () => void
  tick: (ticks?: number) => void
  reset: () => void
}

const DEFAULT_STATS = {
  hunger: 80,
  happiness: 80,
  energy: 80,
  hygiene: 80,
  health: 100
}

const makeInitialState = (): PetState => {
  const now = Date.now()
  const creatureType: CreatureType = Math.random() < 0.5 ? 'fox' : 'bunny'
  const sex: Sex = Math.random() < 0.5 ? 'male' : 'female'
  return {
    name: '',
    sex,
    ...DEFAULT_STATS,
    mood: 'happy',
    age: 0,
    lastTickAt: now,
    memories: [],
    isAlive: true,
    bornAt: now,
    creatureType
  }
}

export const usePetStore = create<PetStore>()(
  persist(
    (set, get) => ({
      ...makeInitialState(),

      setName: (name) => set({ name }),

      performAction: (action) => {
        const state = get()
        if (!state.isAlive) return { message: '', rejected: false }

        const rejected =
          (action === 'feed' && state.hunger >= 100) ||
          (action === 'play' && state.energy <= 20) ||
          (action === 'sleep' && state.energy >= 80) ||
          (action === 'clean' && state.hygiene >= 100) ||
          (action === 'medicine' && state.mood !== 'sick')

        if (rejected) return { rejected: true }

        const effects = ACTION_EFFECTS[action]

        const hunger = clamp(state.hunger + (effects.hunger ?? 0))
        const happiness = clamp(state.happiness + (effects.happiness ?? 0))
        const energy = clamp(state.energy + (effects.energy ?? 0))
        const hygiene = clamp(state.hygiene + (effects.hygiene ?? 0))
        const health = action === 'medicine' ? 100 : clamp(state.health + (effects.health ?? 0))
        const mood = deriveMood({ hunger, happiness, energy, hygiene, health })

        const entry = makeMemoryEntry(action, pickMemoryText(action))
        const memories = [entry, ...state.memories]

        set({ hunger, happiness, energy, hygiene, health, mood, memories })
        return { rejected }
      },

      sleepRegen: () => {
        const state = get()
        if (!state.isAlive) return
        const energy = clamp(state.energy + 3)
        const mood = deriveMood({ ...state, energy })
        set({ energy, mood })
      },

      tick: (ticks = 1) => {
        const state = get()
        if (!state.isAlive) return

        let merged = { ...state }
        for (let i = 0; i < ticks; i++) {
          const decayed = applyDecay(merged)
          merged = { ...merged, ...decayed }
        }

        const isAlive = merged.health > 0
        set({
          ...merged,
          age: state.age + ticks,
          lastTickAt: Date.now(),
          isAlive
        })
      },

      reset: () => set(makeInitialState())
    }),
    {
      name: 'lumbit-pet'
    }
  )
)
