import { usePetStore } from '../../store/usePetStore'
import { ActionButton, HnIcon } from './ActionButton'
import type { ActionType } from '../../utils/constants'
import type { ReactNode } from 'react'
import FeedIcon from '../../assets/icons/feed.svg?react'

interface Props {
  onAction: (action: ActionType) => void
}

const BASE_ACTIONS: { action: ActionType; icon: ReactNode }[] = [
  { action: 'feed', icon: <FeedIcon className="size-8 fill-primary" /> },
  { action: 'play', icon: <HnIcon name="gaming" /> },
  { action: 'sleep', icon: <HnIcon name="lightbulb-solid" /> },
  { action: 'clean', icon: <HnIcon name="broom-solid" /> },
  { action: 'pet', icon: <HnIcon name="huggingface" /> }
]

const MEDICINE_ACTION = {
  action: 'medicine' as ActionType,
  icon: <HnIcon name="science" />
}

export function ActionPanel({ onAction }: Props) {
  const isAlive = usePetStore((s) => s.isAlive)
  const mood = usePetStore((s) => s.mood)
  const isSick = mood === 'sick'

  const actions = isSick ? [...BASE_ACTIONS, MEDICINE_ACTION] : BASE_ACTIONS

  return (
    <div className="flex justify-center gap-4 flex-wrap mt-4">
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
