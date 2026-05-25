import { usePetStore } from '../../store/usePetStore'

const relativeTime = (ts: number): string => {
  const secs = Math.floor((Date.now() - ts) / 1000)
  if (secs < 60) return 'just now'
  const mins = Math.floor(secs / 60)
  if (mins < 60) return `${mins}m ago`
  return `${Math.floor(mins / 60)}h ago`
}

export const MemoryLog = () => {
  const memory = usePetStore((s) => s.memories)

  if (memory.length === 0) {
    return (
      <p className="text-center text-md text-gray-500 dark:text-gray-400 py-2">
        No memories yet. Interact with your pet to create memories!
      </p>
    )
  }

  return (
    <div>
      <h2 className="section-title mb-4">Memory</h2>
      <ul className="flex flex-col gap-2 overflow-y-auto max-h-[440px] pr-1">
        {memory.map((entry) => (
          <li
            key={entry.id}
            className="rounded-2xl bg-white/60 dark:bg-gray-700/20 border border-primary dark:border-gray-700 px-3 py-2"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-medium text-xs text-primary">{entry.text}</h2>

              <span className="text-gray-600 dark:text-gray-400 text-sm shrink-0">
                {relativeTime(entry.createdAt)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
