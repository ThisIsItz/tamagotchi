import { usePetStore } from '../../store/usePetStore'

function formatAge(ticks: number): string {
  const totalSecs = ticks * 60
  const h = Math.floor(totalSecs / 3600)
  const m = Math.floor((totalSecs % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m`
  return 'newborn'
}

interface Props {
  children: React.ReactNode
}

export function AppShell({ children }: Props) {
  const name = usePetStore((s) => s.name)
  const age = usePetStore((s) => s.age)
  const reset = usePetStore((s) => s.reset)

  return (
    <div className="page-bg">
      <div className="card w-full max-w-sm overflow-hidden">
        <div className="header-gradient px-5 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-white font-bold text-lg leading-tight capitalize">
              {name}
            </h1>
            <p className="text-primary-muted text-xs">Age: {formatAge(age)}</p>
          </div>
          <button
            onClick={() => {
              // TODO: create a confirmation modal instead of using window.confirm
              if (confirm('Reset your pet? This cannot be undone.')) reset()
            }}
            className="text-primary-muted hover:text-white text-xs underline transition-colors"
          >
            Reset
          </button>
        </div>
        <div className="p-5 flex flex-col gap-5">{children}</div>
      </div>
    </div>
  )
}
