import { LocaleToggle } from 'entities/locale'
import { ThemeToggle } from 'entities/theme'
import ExpandableMenu from 'features/expandableMenu'
import { deviceType } from 'shared/lib'

import StretchingLettersMobile from './StretchingLettersMobile'
import StretchingLetters from './StretchingLetters'
import TopBar from './TopBar'

const Home = () => {
  return (
    <main style={{ height: '200vh' }}>
      <TopBar />
      {deviceType === 'mobile' ? (
        <StretchingLettersMobile />
      ) : (
        <StretchingLetters />
      )}
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
