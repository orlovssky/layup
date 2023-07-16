import { MorphSVGPlugin } from 'gsap-trial/MorphSVGPlugin'
import { gsap } from 'gsap-trial'
import { nanoid } from 'nanoid'
import { MouseEventHandler, useRef, useEffect } from 'react'

import lettersClasses from '../assets/styles/letters.module.css'
import letters from '../lib/static/letters'
import { Letter } from '../lib/typings/letters'

gsap.registerPlugin(MorphSVGPlugin)

const lettersList: Letter[] = letters.map((letter, letterIndex) => ({
  id: `${nanoid()}-${letterIndex}`,
  tween: null,
  ...letter,
}))

const Letters = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const containerTweenRef = useRef<gsap.core.Tween | null>(null)
  const containerAnimationRef = useRef<{
    animated: boolean
    direction: 'down' | 'up' | null
    initiated: boolean
  }>({
    animated: false,
    direction: null,
    initiated: false,
  })
  const svgRef = useRef<SVGSVGElement>(null)
  const lettersMapRef = useRef(new Map())

  const handleMouseMove: MouseEventHandler = (event) => {
    if (!svgRef.current) return

    const { width: svgWidth } = svgRef.current.getBoundingClientRect()

    for (const { id, tween } of lettersList) {
      const node = lettersMapRef.current.get(id)

      if (node && svgRef.current) {
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
  }

  const handleMouseLeave = () => {
    for (const { tween } of lettersList) {
      gsap.to(tween, {
        progress: 0,
        duration: 0.2,
        overwrite: true,
      })
    }
  }

  useEffect(() => {
    const gsapContext = gsap.context(() => {
      containerTweenRef.current = gsap.to(containerRef.current, {
        width: 0,
        paused: true,
        onComplete: () => {
          containerAnimationRef.current.animated = false
        },
      })

      for (const letter of lettersList) {
        const node = lettersMapRef.current.get(letter.id)

        letter.tween = gsap.fromTo(
          node,
          {
            morphSVG: letter.idle,
          },
          {
            morphSVG: letter.stretched,
            paused: true,
          }
        )
      }
    }, containerRef)

    return () => {
      gsapContext.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className={lettersClasses.container}>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        width="128"
        height="100"
        viewBox="0 0 128 100"
        fill="none"
        className={lettersClasses.letters}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {lettersList.map((letter) => (
          <path
            key={letter.id}
            ref={(node) => {
              if (node) {
                lettersMapRef.current.set(letter.id, node)
              } else {
                lettersMapRef.current.delete(letter.id)
              }
            }}
            d={letter.idle}
            className={lettersClasses.letter}
          />
        ))}
      </svg>
    </div>
  )
}

export default Letters
