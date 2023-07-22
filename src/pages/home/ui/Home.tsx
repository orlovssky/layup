import { LocaleToggle } from 'entities/locale'
import { ThemeToggle } from 'entities/theme'
import ExpandableMenu from 'features/expandableMenu'

import TopBar from './TopBar'

const Home = () => {
  return (
    <main style={{ height: '200vh' }}>
      <TopBar />
      <ExpandableMenu>
        <>
          <LocaleToggle />
          <ThemeToggle />
        </>
      </ExpandableMenu>
    </main>
  )
}

export default Home
