import { LOCALE } from 'entities/locale'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { gsap } from 'gsap'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef } from 'react'

import stretchingLettersClasses from '../assets/styles/stretchingLetters.module.css'
import stretchingLettersMobileClasses from '../assets/styles/stretchingLettersMobile.module.css'
import stretchingLetters from '../lib/static/stretchingLetters'
import { LettersRef } from '../lib/typings/stretchingLetters'
import generateLetters from '../lib/utils/generateLetters'

gsap.registerPlugin(MorphSVGPlugin)

const StretchingLettersMobile = () => {
  const { i18n } = useTranslation()
  const locale = i18n.language as LOCALE
  const svgRef = useRef<SVGSVGElement>(null)
  const lettersRef = useRef<LettersRef>(generateLetters())

  useEffect(() => {
    const gsapContext = gsap.context(() => {
      const timeline = gsap.timeline({
        yoyo: true,
        repeat: 1,
      })

      for (const letter of lettersRef.current[locale]) {
        timeline.to(
          lettersRef.current.map.get(letter.id) || null,
          {
            morphSVG: letter.stretched,
            yoyo: true,
            repeat: 1,
            duration: 0.2,
          },
          '<+=15%',
        )
      }
    }, svgRef)

    return () => {
      gsapContext.revert()
    }
  }, [locale])

  return (
    <svg
      ref={svgRef}
      {...stretchingLetters[locale].svgAttributes}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={stretchingLettersMobileClasses.letters}
    >
      {lettersRef.current[locale].map((letter) => (
        <path
          key={letter.id}
          ref={(node) => {
            if (node) {
              lettersRef.current.map.set(letter.id, node)
            } else {
              lettersRef.current.map.delete(letter.id)
            }
          }}
          d={letter.idle}
          className={stretchingLettersClasses.letter}
        />
      ))}
    </svg>
  )
}

export default StretchingLettersMobile
