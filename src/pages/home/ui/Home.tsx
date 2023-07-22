import { ThemeToggle } from 'entities/theme'
import ExpandableMenu from 'features/expandableMenu'

import TopBar from './TopBar'

const Home = () => {
  return (
    <main>
      <TopBar />
      <ExpandableMenu>
        <>
          <ThemeToggle />
        </>
      </ExpandableMenu>
    </main>
  )
}

export default Home
