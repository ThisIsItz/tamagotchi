import { AppShell } from '../components/Layout/AppShell'
import { CreatureStage } from '../components/Creature/CreatureStage'
import { StatsPanel } from '../components/UI/StatsPanel'

export const PetGame = () => {
  return (
    <AppShell>
      <CreatureStage />
      <StatsPanel />
    </AppShell>
  )
}
