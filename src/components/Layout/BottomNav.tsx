import HeartIcon from '@hackernoon/pixel-icon-library/icons/SVG/regular/heart.svg?react'
import NotebookIcon from '@hackernoon/pixel-icon-library/icons/SVG/regular/notebook.svg?react'
import CogIcon from '@hackernoon/pixel-icon-library/icons/SVG/regular/cog.svg?react'

export type NavTab = 'pet' | 'memories' | 'settings'

interface Props {
  active: NavTab
  onChange: (tab: NavTab) => void
}

const TABS: {
  id: NavTab
  label: string
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
}[] = [
  { id: 'pet', label: 'Pet', Icon: HeartIcon },
  { id: 'memories', label: 'Memories', Icon: NotebookIcon },
  { id: 'settings', label: 'Settings', Icon: CogIcon }
]

export function BottomNav({ active, onChange }: Props) {
  return (
    <div className="flex border-t border-gray-100 dark:border-gray-700">
      {TABS.map(({ id, label, Icon }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors
              ${
                isActive
                  ? 'text-primary'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
          >
            <Icon width={20} height={20} fill="currentColor" />
            <span className="text-sm font-semibold tracking-wide">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
