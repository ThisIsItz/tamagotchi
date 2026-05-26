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
}

export type Sex = 'male' | 'female'

export interface PetState {
  name: string
  sex: Sex
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
  lowStatTicks: number
}
