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
        (_, index) => import(`../assets/sequences/jordan_${index}.png`),
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
          <div style={{ height: '500px' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque ea
            eius error expedita illo, nihil non odit quasi, quia unde vel velit
            vitae. A corporis nam nobis quaerat quam qui quisquam quod
            reiciendis sit temporibus. Alias aliquid amet consequatur cum cumque
            dicta dolorem eligendi eos esse harum id iste iure laboriosam
            laborum magni minus natus necessitatibus nisi officiis optio qui
            quidem ratione reiciendis rerum saepe sapiente sit tempora, unde
            velit vero vitae voluptates voluptatibus voluptatum. Architecto
            cumque delectus eius labore magnam maiores nam obcaecati unde
            voluptatem. Accusamus alias aperiam beatae commodi, culpa delectus
            doloribus ducimus eaque eos error esse et eveniet exercitationem
            illum inventore iste iusto laborum nulla perferendis placeat,
            provident quaerat temporibus veniam veritatis voluptatibus.
            Asperiores, commodi consequatur iure molestiae perferendis quasi
            quia quibusdam quisquam quo reiciendis repellat suscipit veniam
            voluptas! A accusamus ad, animi aperiam, autem beatae blanditiis
            corporis cupiditate debitis delectus doloremque expedita inventore
            ipsa itaque iure iusto magni necessitatibus nemo nisi nulla quaerat
            quisquam quod quos repellendus reprehenderit repudiandae rerum saepe
            sed vel velit vero vitae voluptatem voluptates? A accusamus
            aspernatur at atque eaque est explicabo hic laboriosam, libero
            magnam natus optio qui rem repellat tempora tempore totam? A
            dignissimos eos ipsam minima non qui quo!
          </div>
        </>
      ) : (
        <FullScreenLoader />
      )}
    </main>
  )
}

export default Home
