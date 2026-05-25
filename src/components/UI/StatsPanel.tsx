import { usePetStore } from '../../store/usePetStore'
import { StatBar } from './StatBar'

export const StatsPanel = () => {
  const { hunger, happiness, energy, hygiene, health } = usePetStore()

  return (
    <div className="flex flex-col gap-3 w-full">
      <StatBar
        label="Hunger"
        icon={<i className="hn hn-fire-solid" style={{ color: '#fb7185' }} />}
        value={hunger}
      />
      <StatBar
        label="Happiness"
        icon={<i className="hn hn-star-solid" style={{ color: '#fbbf24' }} />}
        value={happiness}
      />
      <StatBar
        label="Energy"
        icon={<i className="hn hn-bolt-solid" style={{ color: '#34d399' }} />}
        value={energy}
      />
      <StatBar
        label="Hygiene"
        icon={<i className="hn hn-sparkles-solid" style={{ color: '#60a5fa' }} />}
        value={hygiene}
      />
      <StatBar
        label="Health"
        icon={<i className="hn hn-heart-solid" style={{ color: '#f472b6' }} />}
        value={health}
      />
    </div>
  )
}
