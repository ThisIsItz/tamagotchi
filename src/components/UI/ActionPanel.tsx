import { usePetStore } from '../../store/usePetStore'
import { ActionButton } from './ActionButton'
import type { ActionType } from '../../utils/constants'

interface Props {
  onAction: (action: ActionType) => void
}

const ACTIONS: { action: ActionType; label: string }[] = [
  { action: 'feed', label: 'Feed' },
  { action: 'play', label: 'Play' },
  { action: 'sleep', label: 'Sleep' },
  { action: 'clean', label: 'Clean' },
  { action: 'pet', label: 'Pet' }
]

export function ActionPanel({ onAction }: Props) {
  const isAlive = usePetStore((s) => s.isAlive)

  return (
    <div className="flex justify-center gap-3 flex-wrap">
      {ACTIONS.map(({ action, label }) => (
        <ActionButton
          key={action}
          label={label}
          onClick={() => onAction(action)}
          disabled={!isAlive}
        />
      ))}
    </div>
  )
}
