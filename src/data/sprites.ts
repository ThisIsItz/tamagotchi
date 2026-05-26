import lvl1Stand from '../assets/sprites/lvl1/stand.png'
import lvl1Sleep from '../assets/sprites/lvl1/sleep.png'
import lvl1Sick from '../assets/sprites/lvl1/sick.png'
import lvl1Bath from '../assets/sprites/lvl1/bath.png'
import lvl1Hot from '../assets/sprites/lvl1/hot.png'
import lvl1Cold from '../assets/sprites/lvl1/cold.png'
import lvl1Like from '../assets/sprites/lvl1/like.png'
import lvl1Dislike from '../assets/sprites/lvl1/dislike.png'
import lvl1Pet from '../assets/sprites/lvl1/pet.png'
import lvl1No from '../assets/sprites/lvl1/no.png'
import deadSheet from '../assets/sprites/status/dead.png'
import foodSheet from '../assets/sprites/status/food.png'
import medicineSheet from '../assets/sprites/status/medicine.png'

export interface SpriteConfig {
  src: string
  frameW: number
  frameH: number
  cols: number
  frameCount: number
  fps: number
  startFrame?: number
  cropTop?: number
  cropBottom?: number
  loop?: boolean
}

export type SpriteAnim =
  | 'idle'
  | 'sleep'
  | 'sick'
  | 'bath'
  | 'hot'
  | 'cold'
  | 'like'
  | 'dislike'
  | 'pet'
  | 'no'

export const DEAD_ANGEL_CONFIG: SpriteConfig = {
  src: deadSheet,
  frameW: 128,
  frameH: 128,
  cols: 2,
  frameCount: 4,
  startFrame: 0,
  fps: 3,
  cropTop: 40
}

export const FOOD_EAT_CONFIG: SpriteConfig = {
  src: foodSheet,
  frameW: 128,
  frameH: 128,
  cols: 4,
  frameCount: 5,
  startFrame: 13,
  fps: 1.25,
  loop: false,
  cropBottom: 35
}

export const MEDICINE_CONFIG: SpriteConfig = {
  src: medicineSheet,
  frameW: 128,
  frameH: 128,
  cols: 2,
  frameCount: 4,
  fps: 1.25,
  loop: false
}

export const LEVEL_SPRITES: Record<
  number,
  Partial<Record<SpriteAnim, SpriteConfig>>
> = {
  1: {
    idle: {
      src: lvl1Stand,
      frameW: 128,
      frameH: 128,
      cols: 2,
      frameCount: 4,
      fps: 4
    },
    sleep: {
      src: lvl1Sleep,
      frameW: 128,
      frameH: 128,
      cols: 2,
      frameCount: 4,
      fps: 3
    },
    sick: {
      src: lvl1Sick,
      frameW: 128,
      frameH: 128,
      cols: 2,
      frameCount: 4,
      fps: 2
    },
    bath: {
      src: lvl1Bath,
      frameW: 128,
      frameH: 128,
      cols: 2,
      frameCount: 4,
      fps: 6
    },
    hot: {
      src: lvl1Hot,
      frameW: 128,
      frameH: 128,
      cols: 2,
      frameCount: 4,
      fps: 5
    },
    cold: {
      src: lvl1Cold,
      frameW: 128,
      frameH: 128,
      cols: 2,
      frameCount: 2,
      fps: 3
    },
    like: {
      src: lvl1Like,
      frameW: 128,
      frameH: 128,
      cols: 2,
      frameCount: 4,
      fps: 6
    },
    dislike: {
      src: lvl1Dislike,
      frameW: 128,
      frameH: 128,
      cols: 2,
      frameCount: 4,
      fps: 2.5
    },
    pet: {
      src: lvl1Pet,
      frameW: 128,
      frameH: 128,
      cols: 2,
      frameCount: 4,
      fps: 6
    },
    no: {
      src: lvl1No,
      frameW: 128,
      frameH: 128,
      cols: 2,
      frameCount: 4,
      fps: 5
    }
  }
}
