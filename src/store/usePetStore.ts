import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PetState, MemoryEntry, CreatureType, PoopEntry } from '../types/pet'
import { ACTION_EFFECTS, type ActionType, MAX_MEMORY, MAX_POOPS, POOP_CHANCE_PER_TICK } from '../utils/constants'
import { clamp, deriveMood, applyDecay } from '../utils/petLogic'

const ACTION_LABELS: Record<ActionType, string> = {
  feed: 'Snack',
  play: 'Play time',
  sleep: 'Nap',
  clean: 'Bath',
  pet: 'Pets'
}

const ACTION_MESSAGES: Record<ActionType, string[]> = {
  feed: ['Tasty!', 'Yummy!', 'Delicious!'],
  play: ['That was fun!', 'Again?', 'Best time ever!'],
  sleep: ['Time to rest', 'Good night', 'Sweet dreams'],
  clean: ['So fresh!', 'Sparkling clean!', 'Like new!'],
  pet: ['That was nice!', 'Love you!', 'More pets, please!']
}

const MEMORY_TEXTS: Record<ActionType, string[]> = {
  feed: ['Tiny snack', 'Tasty treat', 'Yummy meal'],
  play: ['Playtime', 'Fun games'],
  sleep: ['Warm nap', 'Soft dreams', 'Cozy rest'],
  clean: ['Bubble bath', 'Refreshing shower'],
  pet: ['Head pats', 'Big hug', 'Warm cuddles']
}

const pick = (msgs: string[]): string =>
  msgs[Math.floor(Math.random() * msgs.length)]

const pickMessage = (action: ActionType): string =>
  pick(ACTION_MESSAGES[action])
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
  performAction: (action: ActionType) => string
  clearPoops: () => void
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
  return {
    name: '',
    ...DEFAULT_STATS,
    mood: 'happy',
    age: 0,
    lastTickAt: now,
    memories: [],
    isAlive: true,
    bornAt: now,
    creatureType,
    poops: []
  }
}

export const usePetStore = create<PetStore>()(
  persist(
    (set, get) => ({
      ...makeInitialState(),

      setName: (name) => set({ name }),

      performAction: (action) => {
        const state = get()
        if (!state.isAlive) return ''

        const effects = ACTION_EFFECTS[action]
        const message = pickMessage(action)

        const hunger = clamp(state.hunger + (effects.hunger ?? 0))
        const happiness = clamp(state.happiness + (effects.happiness ?? 0))
        const energy = clamp(state.energy + (effects.energy ?? 0))
        const hygiene = clamp(state.hygiene + (effects.hygiene ?? 0))
        const health = clamp(state.health + (effects.health ?? 0))
        const mood = deriveMood({ hunger, happiness, energy, hygiene, health })

        const entry = makeMemoryEntry(action, pickMemoryText(action))
        const memories = [entry, ...state.memories].slice(0, MAX_MEMORY)

        set({ hunger, happiness, energy, hygiene, health, mood, memories })
        return message
      },

      clearPoops: () => set({ poops: [] }),

      tick: (ticks = 1) => {
        const state = get()
        if (!state.isAlive) return

        let merged = { ...state }
        for (let i = 0; i < ticks; i++) {
          const decayed = applyDecay(merged)
          merged = { ...merged, ...decayed }

          // Random poop chance per tick
          if (Math.random() < POOP_CHANCE_PER_TICK && merged.poops.length < MAX_POOPS) {
            const newPoop: PoopEntry = {
              id: `${Date.now()}-${Math.random()}`,
              x: 10 + Math.random() * 80
            }
            merged = { ...merged, poops: [...merged.poops, newPoop] }
          }
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
