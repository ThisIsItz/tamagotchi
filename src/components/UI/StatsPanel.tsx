import { usePetStore } from '../../store/usePetStore'
import { StatBar } from './StatBar'

export const StatsPanel = () => {
  const { hunger, happiness, energy, hygiene, health } = usePetStore()

  // TODO: change icons
  return (
    <div className="flex flex-col gap-3 w-full">
      <StatBar label="Hunger" icon="🍖" value={hunger} />
      <StatBar label="Happiness" icon="✨" value={happiness} />
      <StatBar label="Energy" icon="⚡" value={energy} />
      <StatBar label="Hygiene" icon="🫧" value={hygiene} />
      <StatBar label="Health" icon="❤️" value={health} />
    </div>
  )
}
