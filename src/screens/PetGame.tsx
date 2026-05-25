import { useState } from 'react'
import { usePetStore } from '../store/usePetStore'
import { usePetTick } from '../hooks/usePetTick'
import { useToast } from '../hooks/useToast'
import { AppShell } from '../components/Layout/AppShell'
import { BottomNav, type NavTab } from '../components/Layout/BottomNav'
import { CreatureStage } from '../components/Creature/CreatureStage'
import { StatsPanel } from '../components/UI/StatsPanel'
import { ActionPanel } from '../components/UI/ActionPanel'
import { Profile } from './Profile'
import { Toast } from '../components/UI/Toast'
import { Settings } from './Settings'
import type { ActionType } from '../utils/constants'

export const PetGame = () => {
  usePetTick()
  const performAction = usePetStore((s) => s.performAction)
  const { toast, showToast, clearToast } = useToast()
  const [actionMessage, setActionMessage] = useState<string | undefined>()
  const [tab, setTab] = useState<NavTab>('pet')

  const handleAction = (action: ActionType) => {
    const msg = performAction(action)
    if (msg) {
      showToast(msg)
      setActionMessage(msg)
      setTimeout(() => setActionMessage(undefined), 2500)
    }
  }

  return (
    <AppShell nav={<BottomNav active={tab} onChange={setTab} />}>
      {tab === 'pet' && (
        <>
          <CreatureStage actionMessage={actionMessage} />
          <StatsPanel />
          <ActionPanel onAction={handleAction} />
        </>
      )}
      {tab === 'profile' && <Profile />}
      {tab === 'settings' && <Settings />}
      {toast && (
        <Toast key={toast.key} message={toast.message} onDone={clearToast} />
      )}
    </AppShell>
  )
}
