import { useState } from 'react'
import { usePetStore } from '../../store/usePetStore'
import { ConfirmModal } from '../UI/ConfirmModal'

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
  nav?: React.ReactNode
}

export function AppShell({ children, nav }: Props) {
  const name = usePetStore((s) => s.name)
  const age = usePetStore((s) => s.age)

  return (
    <div className="page-bg">
      <div className="card w-full max-w-md overflow-hidden flex flex-col">
        <div className="header-gradient px-5 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-white font-bold text-lg leading-tight capitalize">
              {name}
            </h1>
            <p className="text-primary-muted text-xs">Age: {formatAge(age)}</p>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1 min-h-[520px]">{children}</div>
        {nav}
      </div>
    </div>
  )
}
