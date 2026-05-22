import type { ActionType } from '../utils/constants'

export type Mood =
  | 'ecstatic'
  | 'happy'
  | 'neutral'
  | 'sad'
  | 'angry'
  | 'sick'
  | 'sleeping'

export interface MemoryEntry {
  id: string
  type: string
  text: string
  createdAt: number
  sentiment: 'positive' | 'negative' | 'neutral'
}

export interface PetState {
  name: string
  hunger: number
  happiness: number
  energy: number
  hygiene: number
  health: number
  mood: Mood
  age: number
  bornAt: number
  lastTickAt: number
  memories: MemoryEntry[]
  isAlive: boolean
}
