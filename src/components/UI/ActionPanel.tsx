import { usePetStore } from '../../store/usePetStore'
import { ActionButton } from './ActionButton'
import type { ActionType } from '../../utils/constants'
import type { ReactNode } from 'react'
import PlusIcon from '@hackernoon/pixel-icon-library/icons/SVG/regular/plus.svg?react'
import PlayIcon from '@hackernoon/pixel-icon-library/icons/SVG/regular/play.svg?react'
import MoonIcon from '@hackernoon/pixel-icon-library/icons/SVG/regular/moon.svg?react'
import SparklesIcon from '@hackernoon/pixel-icon-library/icons/SVG/regular/sparkles.svg?react'
import HeartIcon from '@hackernoon/pixel-icon-library/icons/SVG/regular/heart.svg?react'

interface Props {
  onAction: (action: ActionType) => void
}

const ACTIONS: { action: ActionType; label: string; icon: ReactNode }[] = [
  { action: 'feed', label: 'Feed', icon: <PlusIcon width={16} height={16} /> },
  { action: 'play', label: 'Play', icon: <PlayIcon width={16} height={16} /> },
  {
    action: 'sleep',
    label: 'Sleep',
    icon: <MoonIcon width={16} height={16} />
  },
  {
    action: 'clean',
    label: 'Clean',
    icon: <SparklesIcon width={16} height={16} />
  },
  { action: 'pet', label: 'Pet', icon: <HeartIcon width={16} height={16} /> }
]

export function ActionPanel({ onAction }: Props) {
  const isAlive = usePetStore((s) => s.isAlive)

  return (
    <div className="flex justify-center gap-3 flex-wrap mt-4">
      {ACTIONS.map(({ action, label, icon }) => (
        <ActionButton
          key={action}
          label={label}
          icon={icon}
          onClick={() => onAction(action)}
          disabled={!isAlive}
        />
      ))}
    </div>
  )
}
