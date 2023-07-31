import { LocaleToggle } from 'entities/locale'
import { ThemeToggle } from 'entities/theme'
import ExpandableMenu from 'features/expandableMenu'
import FullScreenLoader from 'features/fullScreenLoader'
import { useEffect } from 'react'
import { deviceType } from 'shared/lib'

import useSequencesStore from '../model/store/useSequencesStore'

import ScrollSequences from './ScrollSequences'
import StretchingLettersMobile from './StretchingLettersMobile'
import StretchingLetters from './StretchingLetters'
import TopBar from './TopBar'

const Home = () => {
  const { setSequences, count, loaded, incrementLoaded, resetLoaded } =
    useSequencesStore((state) => state)

  useEffect(() => {
    resetLoaded()
    let shouldUpdate = true

    Promise.all(
      Array.from(Array(count)).map(
        (_, index) => import(`../assets/sequences/dunk_${index}.png`),
      ),
    ).then((importedImages) => {
      if (shouldUpdate) {
        setTimeout(() => {
          setSequences(
            importedImages.map((importedImage) => {
              const image = new Image()
              image.src = importedImage.default
              image.onload = incrementLoaded

              return image
            }),
          )
        }, 1000)
      }
    })

    return () => {
      shouldUpdate = false
    }
  }, [count, setSequences, incrementLoaded, resetLoaded])

  return (
    <main>
      <TopBar />
      <ExpandableMenu>
        <>
          <LocaleToggle />
          <ThemeToggle />
        </>
      </ExpandableMenu>

      {loaded === count ? (
        <>
          {deviceType === 'mobile' ? (
            <StretchingLettersMobile />
          ) : (
            <StretchingLetters />
          )}
          <ScrollSequences />
        </>
      ) : (
        <FullScreenLoader />
      )}
    </main>
  )
}

export default Home
