import { useState } from 'react'
import { usePetStore } from '../store/usePetStore'
import { usePetTick } from '../hooks/usePetTick'
import { useToast } from '../hooks/useToast'
import { AppShell } from '../components/Layout/AppShell'
import { CreatureStage } from '../components/Creature/CreatureStage'
import { StatsPanel } from '../components/UI/StatsPanel'
import { ActionPanel } from '../components/UI/ActionPanel'
import { MemoryLog } from '../components/UI/MemoryLog'
import { Toast } from '../components/UI/Toast'
import type { ActionType } from '../utils/constants'

export const PetGame = () => {
  usePetTick()
  const performAction = usePetStore((s) => s.performAction)
  const { toast, showToast, clearToast } = useToast()
  const [actionMessage, setActionMessage] = useState<string | undefined>()
  const [isCleaning, setIsCleaning] = useState(false)

  const handleAction = (action: ActionType) => {
    const msg = performAction(action)
    if (msg) {
      showToast(msg)
      setActionMessage(msg)
      setTimeout(() => setActionMessage(undefined), 2500)
    }
    if (action === 'clean') {
      setIsCleaning(true)
      setTimeout(() => setIsCleaning(false), 100)
    }
  }

  return (
    <AppShell>
      <CreatureStage actionMessage={actionMessage} isCleaning={isCleaning} />
      <StatsPanel />
      <ActionPanel onAction={handleAction} />
      <MemoryLog />
      {toast && (
        <Toast key={toast.key} message={toast.message} onDone={clearToast} />
      )}
    </AppShell>
  )
}
