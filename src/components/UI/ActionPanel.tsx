import { ActionButton, HnIcon } from './ActionButton'
import type { ActionType } from '../../utils/constants'
import type { ReactNode } from 'react'
import FeedIcon from '../../assets/icons/feed.svg?react'

interface Props {
  onAction: (action: ActionType) => void
  isSleeping?: boolean
  isActing?: boolean
}

const BASE_ACTIONS: { action: ActionType; icon: ReactNode }[] = [
  { action: 'feed', icon: <FeedIcon className="size-8 fill-primary" /> },
  { action: 'play', icon: <HnIcon name="gaming" /> },
  { action: 'sleep', icon: <HnIcon name="lightbulb" /> },
  { action: 'clean', icon: <HnIcon name="broom-solid" /> },
  { action: 'pet', icon: <HnIcon name="huggingface" /> },
  { action: 'medicine', icon: <HnIcon name="science" /> }
]

export function ActionPanel({
  onAction,
  isSleeping = false,
  isActing = false
}: Props) {
  return (
    <div className="flex justify-center gap-2 flex-wrap mt-6">
      {BASE_ACTIONS.map(({ action, icon }) => (
        <ActionButton
          key={action}
          icon={icon}
          onClick={() => onAction(action)}
          disabled={(isSleeping && action !== 'sleep') || isActing}
        />
      ))}
    </div>
  )
}
