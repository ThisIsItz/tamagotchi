import { useState, useRef, useEffect } from 'react'
import { usePetStore } from '../store/usePetStore'
import { usePetTick } from '../hooks/usePetTick'
import { AppShell } from '../components/Layout/AppShell'
import { BottomNav, type NavTab } from '../components/Layout/BottomNav'
import { CreatureStage } from '../components/Creature/CreatureStage'
import { StatsPanel } from '../components/UI/StatsPanel'
import { ActionPanel } from '../components/UI/ActionPanel'
import { Profile } from './Profile'
import { Settings } from './Settings'
import { CatchTreats } from './CatchTreats'
import type { ActionType } from '../utils/constants'

export const PetGame = () => {
  const isSleepingRef = useRef(false)
  usePetTick(isSleepingRef)
  const performAction = usePetStore((s) => s.performAction)
  const logSleep = usePetStore((s) => s.logSleep)
  const sleepRegen = usePetStore((s) => s.sleepRegen)
  const applyPlayResult = usePetStore((s) => s.applyPlayResult)
  const [activeAction, setActiveAction] = useState<
    ActionType | 'no' | undefined
  >()
  const [isSleeping, setIsSleeping] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const [tab, setTab] = useState<NavTab>('pet')
  const actionTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sleepTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  const handleAction = (action: ActionType) => {
    if (action === 'sleep') {
      if (isSleeping) {
        if (sleepTimer.current) {
          clearInterval(sleepTimer.current)
          sleepTimer.current = null
        }
        isSleepingRef.current = false
        setIsSleeping(false)
        setActiveAction(undefined)
      } else {
        isSleepingRef.current = true
        setIsSleeping(true)
        setActiveAction('sleep')
        logSleep()
        sleepRegen()
        sleepTimer.current = setInterval(sleepRegen, 3000)
      }
      return
    }

    if (action === 'play') {
      const energy = usePetStore.getState().energy
      if (energy <= 20) {
        if (actionTimer.current) clearTimeout(actionTimer.current)
        setActiveAction('no')
        actionTimer.current = setTimeout(() => setActiveAction(undefined), 4000)
      } else {
        setShowGame(true)
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

  const handleGameFinish = (score: number) => {
    applyPlayResult(score)
    setShowGame(false)
  }

  const handleGameCancel = () => {
    setShowGame(false)
  }

  useEffect(() => {
    if (tab !== 'pet' && showGame) {
      setShowGame(false)
    }
  }, [tab, showGame])

  return (
    <AppShell nav={<BottomNav active={tab} onChange={setTab} />}>
      {tab === 'pet' && (
        <>
          {showGame ? (
            <CatchTreats
              onClose={handleGameFinish}
              onCancel={handleGameCancel}
            />
          ) : (
            <>
              <CreatureStage
                activeAction={activeAction}
                isSleeping={isSleeping}
              />
              <StatsPanel />
              <ActionPanel
                onAction={handleAction}
                isSleeping={isSleeping}
                isActing={!!activeAction && !isSleeping}
              />
            </>
          )}
        </>
      )}
      {tab === 'profile' && <Profile />}
      {tab === 'settings' && <Settings />}
    </AppShell>
  )
}
