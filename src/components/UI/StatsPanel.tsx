import { usePetStore } from '../../store/usePetStore'
import { StatBar } from './StatBar'
import FireIcon from '@hackernoon/pixel-icon-library/icons/SVG/regular/fire.svg?react'
import StarIcon from '@hackernoon/pixel-icon-library/icons/SVG/regular/star.svg?react'
import BoltIcon from '@hackernoon/pixel-icon-library/icons/SVG/regular/bolt.svg?react'
import SparklesIcon from '@hackernoon/pixel-icon-library/icons/SVG/regular/sparkles.svg?react'
import HeartIcon from '@hackernoon/pixel-icon-library/icons/SVG/regular/heart.svg?react'

export const StatsPanel = () => {
  const { hunger, happiness, energy, hygiene, health } = usePetStore()

  return (
    <div className="flex flex-col gap-3 w-full">
      <StatBar label="Hunger"    icon={<FireIcon     width={18} height={18} fill="#fb7185" />} value={hunger} />
      <StatBar label="Happiness" icon={<StarIcon     width={18} height={18} fill="#fbbf24" />} value={happiness} />
      <StatBar label="Energy"    icon={<BoltIcon     width={18} height={18} fill="#60a5fa" />} value={energy} />
      <StatBar label="Hygiene"   icon={<SparklesIcon width={18} height={18} fill="#34d399" />} value={hygiene} />
      <StatBar label="Health"    icon={<HeartIcon    width={18} height={18} fill="#f472b6" />} value={health} />
    </div>
  )
}
