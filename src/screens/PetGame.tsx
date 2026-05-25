import { useState, useRef } from 'react'
import { usePetStore } from '../store/usePetStore'
import { usePetTick } from '../hooks/usePetTick'
import { AppShell } from '../components/Layout/AppShell'
import { BottomNav, type NavTab } from '../components/Layout/BottomNav'
import { CreatureStage } from '../components/Creature/CreatureStage'
import { StatsPanel } from '../components/UI/StatsPanel'
import { ActionPanel } from '../components/UI/ActionPanel'
import { Profile } from './Profile'
import { Settings } from './Settings'
import type { ActionType } from '../utils/constants'

export const PetGame = () => {
  const isSleepingRef = useRef(false)
  usePetTick(isSleepingRef)
  const performAction = usePetStore((s) => s.performAction)
  const sleepRegen = usePetStore((s) => s.sleepRegen)
  const [activeAction, setActiveAction] = useState<ActionType | 'no' | undefined>()
  const [isSleeping, setIsSleeping] = useState(false)
  const [tab, setTab] = useState<NavTab>('pet')
  const actionTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sleepTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  const handleAction = (action: ActionType) => {
    if (action === 'sleep') {
      if (isSleeping) {
        if (sleepTimer.current) { clearInterval(sleepTimer.current); sleepTimer.current = null }
        isSleepingRef.current = false
        setIsSleeping(false)
        setActiveAction(undefined)
      } else {
        isSleepingRef.current = true
        setIsSleeping(true)
        setActiveAction('sleep')
        sleepRegen()
        sleepTimer.current = setInterval(sleepRegen, 3000)
      }
      return
    }

    const { rejected } = performAction(action)
    if (actionTimer.current) clearTimeout(actionTimer.current)
    setActiveAction(rejected ? 'no' : action)
    actionTimer.current = setTimeout(() => {
      setActiveAction(undefined)
    }, 4000)
  }

  return (
    <AppShell nav={<BottomNav active={tab} onChange={setTab} />}>
      {tab === 'pet' && (
        <>
          <CreatureStage activeAction={activeAction} isSleeping={isSleeping} />
          <StatsPanel />
          <ActionPanel onAction={handleAction} isSleeping={isSleeping} />
        </>
      )}
      {tab === 'profile' && <Profile />}
      {tab === 'settings' && <Settings />}
    </AppShell>
  )
}
