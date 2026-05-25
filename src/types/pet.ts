export type Mood =
  | 'ecstatic'
  | 'happy'
  | 'neutral'
  | 'sad'
  | 'angry'
  | 'sick'
  | 'sleeping'

export type CreatureType = 'fox' | 'bunny'

export interface MemoryEntry {
  id: string
  type: string
  text: string
  createdAt: number
  sentiment: 'positive' | 'negative' | 'neutral'
}

export interface PoopEntry {
  id: string
  x: number // 0-100 percentage within stage
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
  creatureType: CreatureType
  poops: PoopEntry[]
}
