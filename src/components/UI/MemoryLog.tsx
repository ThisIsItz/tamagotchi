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
      <p className="text-center text-sm text-gray-400 dark:text-gray-500 py-2">
        No memories yet. Interact with your pet to create memories!
      </p>
    )
  }

  return (
    <div>
      <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">
        Memory
      </h2>
      <ul className="flex flex-col gap-1.5 max-h-44 overflow-y-auto pr-1">
        {memory.map((entry) => (
          <li
            key={entry.id}
            className="rounded-2xl bg-white/60 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 px-3 py-2"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium text-xs text-gray-700 dark:text-gray-200">
                {entry.text}
              </span>

              <span className="text-gray-400 dark:text-gray-500 text-xs shrink-0">
                {relativeTime(entry.createdAt)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
