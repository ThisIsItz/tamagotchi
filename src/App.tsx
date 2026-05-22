import { usePetStore } from './store/usePetStore'
import { NameSetup } from './screens/NameSetup'
import { GameOver } from './screens/GameOver'
import { PetGame } from './screens/PetGame'

const App = () => {
  const name = usePetStore((s) => s.name)
  const isAlive = usePetStore((s) => s.isAlive)

  if (!name) return <NameSetup />
  if (!isAlive) return <GameOver />
  return <PetGame />
}

export default App
