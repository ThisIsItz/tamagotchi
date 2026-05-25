import { usePetStore } from '../store/usePetStore'

const relativeTime = (ts: number): string => {
  const secs = Math.floor((Date.now() - ts) / 1000)
  if (secs < 60) return 'just now'
  const mins = Math.floor(secs / 60)
  if (mins < 60) return `${mins}m ago`
  return `${Math.floor(mins / 60)}h ago`
}

const formatAge = (ticks: number): string => {
  const totalSecs = ticks * 60
  const h = Math.floor(totalSecs / 3600)
  const m = Math.floor((totalSecs % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m`
  return 'newborn'
}

export const Profile = () => {
  const name = usePetStore((s) => s.name)
  const age = usePetStore((s) => s.age)
  const sex = usePetStore((s) => s.sex)
  const memories = usePetStore((s) => s.memories)

  const last10 = memories.slice(0, 10)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h2 className="section-title">Profile</h2>
        <div className="rounded-xl bg-white/60 dark:bg-gray-800/60 border border-primary/40 dark:border-gray-700 px-4 py-3 flex flex-col gap-2">
          <ProfileInfo label="Name" value={name || '—'} />
          <ProfileInfo label="Age" value={formatAge(age)} />
          <ProfileInfo
            label="Sex"
            value={sex === 'male' ? '♂ Male' : '♀ Female'}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 min-h-0">
        <h2 className="section-title">Last memories</h2>
        {last10.length === 0 ? (
          <p className="text-center text-md text-gray-600 dark:text-gray-300 py-2">
            No memories yet. Interact with your pet to create some!
          </p>
        ) : (
          <ul className="flex flex-col gap-2 overflow-y-auto max-h-[320px] pr-1">
            {last10.map((entry) => (
              <li
                key={entry.id}
                className="rounded-xl bg-white/60 dark:bg-gray-700/20 border border-primary/40 dark:border-gray-700 px-3 py-2"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-primary flex items-center gap-1.5">
                    {entry.text}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 text-xs shrink-0">
                    {relativeTime(entry.createdAt)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function ProfileInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col justify-between gap-0.5">
      <h3 className="text-xs text-primary uppercase tracking-wide">{label}</h3>
      <span className="text-md font-semibold text-gray-700 dark:text-gray-200">
        {value}
      </span>
    </div>
  )
}
