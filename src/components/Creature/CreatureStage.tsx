import { usePetStore } from '../../store/usePetStore'
import { CreatureSprite } from './CreatureSprite'

export function CreatureStage() {
  const mood = usePetStore((s) => s.mood)

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <div className="mt-2">
        <CreatureSprite mood={mood} />
      </div>
    </div>
  )
}
