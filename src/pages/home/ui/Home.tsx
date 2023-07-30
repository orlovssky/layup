import { LocaleToggle } from 'entities/locale'
import { ThemeToggle } from 'entities/theme'
import ExpandableMenu from 'features/expandableMenu'
import { nanoid } from 'nanoid'
import { useEffect } from 'react'
import { deviceType } from 'shared/lib'

import useSequencesStore from '../model/store/useSequencesStore'

import ScrollSequences from './ScrollSequences'
import StretchingLettersMobile from './StretchingLettersMobile'
import StretchingLetters from './StretchingLetters'
import TopBar from './TopBar'

const Home = () => {
  const { sequences, setSequences, count } = useSequencesStore((state) => state)

  useEffect(() => {
    console.log('assets/sequences')
    Promise.all(
      Array.from(Array(count)).map(
        (_, index) => import(`../assets/sequences/dunk_${index}.png`),
      ),
    ).then((importedImages) => {
      setSequences(
        importedImages.map((importedImage, importedImageIndex) => (
          <img
            key={`${nanoid()}-${importedImageIndex}`}
            src={importedImage.default}
            alt="Scroll sequence"
          />
        )),
      )
    })
  }, [count, setSequences])

  return (
    <main style={{ height: '200vh' }}>
      {sequences.length > 0 ? (
        <>
          <TopBar />
          {deviceType === 'mobile' ? (
            <StretchingLettersMobile />
          ) : (
            <StretchingLetters />
          )}
          <ScrollSequences />
          <ExpandableMenu>
            <>
              <LocaleToggle />
              <ThemeToggle />
            </>
          </ExpandableMenu>
        </>
      ) : (
        <div style={{ color: 'rgb(var(--color-primary))' }}>loading</div>
      )}
    </main>
  )
}

export default Home
