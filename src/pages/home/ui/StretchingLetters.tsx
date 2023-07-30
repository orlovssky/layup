import { LOCALE } from 'entities/locale'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { gsap } from 'gsap'
import { useTranslation } from 'react-i18next'
import { MouseEventHandler, useEffect, useRef } from 'react'

import stretchingLettersClasses from '../assets/styles/stretchingLetters.module.css'
import stretchingLetters from '../lib/static/stretchingLetters'
import { LettersRef } from '../lib/typings/stretchingLetters'
import generateLetters from '../lib/utils/generateLetters'

gsap.registerPlugin(MorphSVGPlugin)

const StretchingLetters = () => {
  const { i18n } = useTranslation()
  const locale = i18n.language as LOCALE
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const jordanRef = useRef<SVGSVGElement>(null)
  const lettersRef = useRef<LettersRef>(generateLetters())

  const handleMouseMove: MouseEventHandler = (event) => {
    if (!svgRef.current) {
      return
    }

    if (jordanRef.current) {
      gsap.to(jordanRef.current, {
        duration: 0.3,
        x: event.clientX - 64,
        y: event.clientY - 60,
      })
    }

    const { width: svgWidth } = svgRef.current.getBoundingClientRect()

    for (const { id, tween } of lettersRef.current[locale]) {
      const node = lettersRef.current.map.get(id)

      if (!node) {
        return
      }

      const {
        width: letterWidth,
        left: letterLeft,
        right: letterRight,
      } = node.getBoundingClientRect()
      const width = letterWidth + svgWidth / 2
      const left = letterLeft - svgWidth / 2 / 2
      const right = letterRight + svgWidth / 2 / 2

      const center = left + width / 2

      if (event.pageX > center) {
        const positionToCenter = 1 - (event.pageX - center) / (right - center)

        gsap.to(tween, {
          progress: positionToCenter.toFixed(2),
          duration: 0.5,
          overwrite: true,
        })
      } else if (event.pageX >= left) {
        const positionToCenter = (event.pageX - left) / (center - left)

        gsap.to(tween, {
          progress: positionToCenter.toFixed(2),
          duration: 0.5,
          overwrite: true,
        })
      }
    }
  }

  const handleMouseLeave = () => {
    gsap.to(jordanRef.current, {
      duration: 0.5,
      opacity: 0,
      display: 'none',
      scale: 0,
    })

    for (const { tween } of lettersRef.current[locale]) {
      gsap.to(tween, {
        progress: 0,
        duration: 0.2,
        overwrite: true,
      })
    }
  }

  const handleMouseEnter = () => {
    gsap.to(jordanRef.current, {
      duration: 0.5,
      opacity: 1,
      display: 'block',
      scale: 1,
    })
  }

  useEffect(() => {
    const gsapContext = gsap.context(() => {
      gsap.fromTo(
        svgRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1 },
      )

      for (const letter of lettersRef.current[locale]) {
        letter.tween = gsap.fromTo(
          lettersRef.current.map.get(letter.id) || null,
          { morphSVG: letter.idle },
          {
            morphSVG: letter.stretched,
            paused: true,
          },
        )
      }
    }, containerRef)

    return () => {
      gsapContext.kill()
    }
  }, [locale])

  return (
    <div ref={containerRef} className={stretchingLettersClasses.container}>
      <svg
        ref={jordanRef}
        width="128"
        height="120"
        viewBox="0 0 128 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={stretchingLettersClasses.jordan}
      >
        <path
          d="M72.2667 7.65066V7.25066C72.2667 5.38399 72.8693 3.71466 74.0693 2.24799C75.2693 0.781326 76.8 0.0506592 78.6667 0.0506592C80.5333 0.0506592 82.2027 0.647992 83.6693 1.84799C85.136 3.04799 85.936 4.64799 86.0693 6.64799C86.2027 8.64799 85.6 10.3173 84.2667 11.6507C82.9333 12.984 81.3333 13.6507 79.4667 13.6507L78.2667 14.0507L78.6667 14.648L78.2667 16.8507L77.4667 23.2507C77.7333 23.5173 77.8667 23.784 77.8667 24.0507L77.0667 28.0507C76.8 28.584 76.5333 28.984 76.2667 29.2507L75.8667 30.8507C75.1685 33.6788 74.368 36.4806 73.4667 39.2507V40.0507C73.2 41.384 73.0027 42.4507 72.8693 43.2507C72.736 44.0507 72.2667 45.384 71.4667 47.2507C70.9333 48.3173 70.9333 50.0507 71.4667 52.4507L71.8667 52.8507C71.8667 53.6507 72.2027 54.584 72.8693 55.6507C73.536 56.7173 73.8667 57.6507 73.8667 58.4507C74.1333 63.784 73.7333 68.3173 72.6667 72.0507L73.4667 74.4507C76.6667 76.0507 77.6 77.784 76.2667 79.6507L78.2667 80.4507C81.4667 82.0507 83.7333 83.448 85.0667 84.648C86.4 85.848 87.7333 87.1173 89.0667 88.4507C90.1333 88.7173 90.9333 89.1173 91.4667 89.6507L92.6667 90.0507C98.2667 93.784 103.867 98.3173 109.467 103.651L111.067 104.851V105.251L110.667 106.051L111.867 106.851H112.267C113.067 107.384 113.6 107.651 113.867 107.651H114.267C114.533 107.651 114.8 107.517 115.067 107.251L115.867 106.851C116.4 106.317 116.933 105.917 117.467 105.651H119.067C119.333 105.651 119.333 105.784 119.067 106.051L117.467 106.851L115.467 109.251H118.267L121.067 109.651C121.867 109.384 122.533 109.117 123.067 108.851L125.067 107.651C125.867 107.384 126.667 107.651 127.467 108.451H127.867C128.133 108.717 128 109.117 127.467 109.651L122.667 114.051C121.333 115.117 120.133 115.784 119.067 116.051L113.867 119.651C113.6 119.917 113.333 119.917 113.067 119.651L111.867 118.051L111.067 116.451L110.064 115.048L108.864 113.448L107.867 112.248L107.067 111.251L105.467 110.051C104.933 110.051 104.4 109.917 103.867 109.651L98.6667 105.651C97.8667 105.651 96.9333 105.251 95.8667 104.451C91.8667 100.984 89.2 98.8507 87.8667 98.0507L85.4667 96.4507L80.6667 95.6507C79.0667 95.384 76.9333 94.584 74.2667 93.2507L71.0667 91.6507C68.9333 90.584 67.4667 90.0507 66.6667 90.0507L65.0667 89.2507C64 88.984 63.2 88.7173 62.6667 88.4507L61.8667 87.6507C61.3333 87.6507 60.8 87.784 60.2667 88.0507L52.2667 92.0507L42.2667 96.4507C39.6 98.584 37.0667 100.317 34.6667 101.651L30.2667 103.651L23.4667 108.451C22.9333 108.984 22.4 108.984 21.8667 108.451L21.0667 109.251C20.2667 109.517 19.7333 109.651 19.4667 109.651L17.8667 110.451V111.251H17.0667L16.2667 112.451C15.7333 113.517 15.2 114.115 14.6667 114.248C14.1333 114.381 13.8027 114.584 13.6693 114.851C13.5679 115.069 13.433 115.271 13.2693 115.448L12.4693 116.248L11.2693 117.048L9.46667 116.851L7.06667 117.251L5.46667 117.651C4.13333 117.917 3.06667 117.715 2.26667 117.048C1.46667 116.381 0.8 115.384 0.266667 114.051C-0.266667 113.251 0 112.584 1.06667 112.051L1.46667 111.651C1.73333 111.384 2.13333 111.251 2.66667 111.251H5.06667L8.26667 110.051L9.86667 109.651C9.86667 109.117 10 108.717 10.2667 108.451C10.5333 108.184 10.9333 108.051 11.4667 108.051V107.651C11.2096 107.156 11.0726 106.608 11.0667 106.051C10.8 105.517 10.7307 105.117 10.8693 104.851C11.0027 104.584 11.136 104.451 11.2693 104.451H11.4667L11.8667 105.651C12.1333 106.984 12.5333 107.384 13.0667 106.851L13.4667 106.051C13.7333 105.517 14.1333 105.251 14.6667 105.251L15.4667 106.051L16.2667 105.251L15.8667 104.851C15.8667 104.584 16 104.451 16.2667 104.451L17.8667 102.851C19.2 101.251 20.8 99.784 22.6667 98.4507C26.4 95.5173 30.4 93.2507 34.6667 91.6507C36 90.3173 37.4667 89.6507 39.0667 89.6507C40.1333 87.784 41.7333 85.784 43.8667 83.6507C45.7333 82.3173 47.0667 81.384 47.8667 80.8507C48.4 79.784 49.0667 79.2507 49.8667 79.2507H50.2667L51.0667 78.4507C51.6 78.184 52 77.9173 52.2667 77.6507V75.6507C52.2667 74.3173 52.4 73.2507 52.6667 72.4507C52.9333 71.6507 53.6 71.2507 54.6667 71.2507L56.2667 69.6507C55.7333 68.584 55.4667 67.384 55.4667 66.0507H55.0667C54.5333 65.2507 54.2667 64.4507 54.2667 63.6507C53.4667 62.3173 52.9333 61.2507 52.6667 60.4507H51.4667C51.2 61.2507 50.5333 61.784 49.4667 62.0507L49.0667 62.8507C48 64.7173 47.0667 66.1147 46.2667 67.048C45.4667 67.9813 44 69.1173 41.8667 70.4507C40.5333 71.784 39.6 73.2507 39.0667 74.8507C38.8 75.6507 38.8 76.4507 39.0667 77.2507L38.6667 78.0507H39.0667C39.0667 78.584 39.2 78.8507 39.4667 78.8507H39.8667C40.4 79.1173 40.6667 79.448 40.6667 79.848C40.6667 80.248 40.2667 80.3813 39.4667 80.248C38.799 80.1746 38.1708 79.895 37.6693 79.448C37.2693 79.048 36.9333 78.8507 36.6667 78.8507L35.4667 80.0507C34.9333 80.8507 34.4 81.1813 33.8667 81.048C33.3333 80.9147 33.2 80.7173 33.4667 80.4507L33.8667 80.0507C34.1333 79.5173 34.1333 79.2507 33.8667 79.2507L30.6667 80.0507C30.4 80.3173 30.0693 80.3173 29.6693 80.0507C29.2693 79.784 29.3333 79.5173 29.8667 79.2507L31.8667 78.4507C31.8667 78.184 31.7333 78.0507 31.4667 78.0507C30.4 78.584 29.3333 78.7173 28.2667 78.4507L26.2667 78.0507L25.8667 77.6507C25.8667 77.384 26 77.2507 26.2667 77.2507C27.3333 77.5173 28.6667 77.384 30.2667 76.8507L33.0667 75.6507L36.2667 72.0507L36.6667 71.2507C37.7333 69.1173 38.8693 67.1813 40.0693 65.448C41.1257 63.8728 42.4047 62.4589 43.8667 61.2507L44.2667 59.6507C44.8 58.584 45.3333 57.6507 45.8667 56.8507C46.4 56.0507 47.0667 54.984 47.8667 53.6507L49.0667 52.0507C50.1333 50.4507 51.3333 49.6507 52.6667 49.6507L53.8667 48.4507C54.1333 48.184 54.2667 47.784 54.2667 47.2507L55.0667 46.4507L54.6667 46.0507C53.0667 44.7173 52.2667 43.5173 52.2667 42.4507C52 40.584 52.6027 38.984 54.0693 37.6507C55.536 36.3173 57.0027 35.7147 58.4693 35.848C59.936 35.9813 61.0667 36.4507 61.8667 37.2507L62.6667 38.0507C62.9333 38.0507 63.0667 38.184 63.0667 38.4507L64.6667 39.2507V40.4507C65.2 40.984 65.4667 41.384 65.4667 41.6507C66 40.8507 66.8 39.9173 67.8667 38.8507L69.8667 32.4507C69.8667 31.384 70.1333 30.3173 70.6667 29.2507L71.4667 28.0507V27.2507L72.6667 22.4507H73.4667L74.6667 17.6507C74.9347 16.7366 74.9347 15.7648 74.6667 14.8507L73.0667 10.8507L72.2667 7.65066Z"
          fill="currentColor"
        />
      </svg>

      <svg
        ref={svgRef}
        {...stretchingLetters[locale].svgAttributes}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className={stretchingLettersClasses.letters}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
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
    </div>
  )
}

export default StretchingLetters
