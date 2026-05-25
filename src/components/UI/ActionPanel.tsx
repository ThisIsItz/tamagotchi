import { usePetStore } from '../../store/usePetStore'
import { ActionButton } from './ActionButton'
import type { ActionType } from '../../utils/constants'
import type { ReactNode } from 'react'

const PixelIcon = ({ src, alt }: { src: string; alt: string }) => (
  <img
    src={src}
    alt={alt}
    style={{ imageRendering: 'pixelated' }}
    className="block h-10 w-10 object-cover"
  />
)

interface Props {
  onAction: (action: ActionType) => void
}

const BASE_ACTIONS: { action: ActionType; icon: ReactNode }[] = [
  { action: 'feed', icon: <PixelIcon src="/icon-eat.png" alt="feed" /> },
  { action: 'play', icon: <PixelIcon src="/icon-game.png" alt="play" /> },
  { action: 'sleep', icon: <PixelIcon src="/icon-lights.png" alt="sleep" /> },
  { action: 'clean', icon: <PixelIcon src="/icon-bath.png" alt="clean" /> },
  { action: 'pet', icon: <PixelIcon src="/icon-pet.png" alt="pet" /> }
]

export function ActionPanel({ onAction }: Props) {
  const isAlive = usePetStore((s) => s.isAlive)
  const mood = usePetStore((s) => s.mood)
  const isSick = mood === 'sick'

  const actions = isSick
    ? [
        ...BASE_ACTIONS,
        {
          action: 'medicine' as ActionType,
          label: 'Medicine',
          icon: <PixelIcon src="/icon-medicine.png" alt="medicine" />
        }
      ]
    : BASE_ACTIONS

  return (
    <div className="flex justify-center gap-3 flex-wrap mt-4">
      {actions.map(({ action, icon }) => (
        <ActionButton
          key={action}
          icon={icon}
          onClick={() => onAction(action)}
          disabled={!isAlive}
        />
      ))}
    </div>
  )
}
