import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import { nanoid } from 'nanoid'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef } from 'react'

import slidesClasses from '../assets/styles/slides.module.css'

gsap.registerPlugin(ScrollTrigger)

const slides = [
  {
    id: `${nanoid()}-first`,
    translationNode: 'slides.first',
  },
  {
    id: `${nanoid()}-second`,
    translationNode: 'slides.second',
  },
  {
    id: `${nanoid()}-third`,
    translationNode: 'slides.third',
  },
  {
    id: `${nanoid()}-fourth`,
    translationNode: 'slides.fourth',
  },
]

const Slides = () => {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const gsapContext = gsap.context(() => {
      if (containerRef.current) {
        const sections = containerRef.current.children
        const { width } = containerRef.current.getBoundingClientRect()

        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: `+=${width}`,
          },
        })
      }
    }, containerRef)

    return () => {
      gsapContext.revert()
    }
  }, [])

  return (
    <div ref={containerRef} className={slidesClasses.container}>
      {slides.map(({ id, translationNode }) => (
        <section
          key={id}
          className={slidesClasses.slide}
          dangerouslySetInnerHTML={{
            __html: t(translationNode),
          }}
        />
      ))}
    </div>
  )
}

export default Slides
