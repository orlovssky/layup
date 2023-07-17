import { MorphSVGPlugin } from 'gsap-trial/MorphSVGPlugin'
import { gsap } from 'gsap-trial'
import { nanoid } from 'nanoid'
import { MouseEventHandler, useRef, useEffect } from 'react'

import lettersClasses from '../assets/styles/letters.module.css'
import letters from '../lib/static/letters'
import { LettersRef } from '../lib/typings/letters'

gsap.registerPlugin(MorphSVGPlugin)

const Letters = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const containerTweenRef = useRef<GSAPTween | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const lettersRef = useRef<LettersRef>({
    map: new Map(),
    list: letters.map((letter, letterIndex) => ({
      id: `${nanoid()}-${letterIndex}`,
      tween: null,
      ...letter,
    })),
  })

  const handleMouseMove: MouseEventHandler = (event) => {
    if (!svgRef.current) {
      return
    }

    const { width: svgWidth } = svgRef.current.getBoundingClientRect()

    for (const { id, tween } of lettersRef.current.list) {
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
    for (const { tween } of lettersRef.current.list) {
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
        scale: 1,
        duration: 0.5,
        ease: 'back.out',
        paused: document.body.getBoundingClientRect().top !== 0,
        delay: document.body.getBoundingClientRect().top === 0 ? 0.4 : 0,
      })

      for (const letter of lettersRef.current.list) {
        letter.tween = gsap.fromTo(
          lettersRef.current.map.get(letter.id) || null,
          { morphSVG: letter.idle },
          {
            morphSVG: letter.stretched,
            paused: true,
          }
        )
      }
    }, containerRef)

    const handleScroll: EventListener = () => {
      if (!containerTweenRef.current) {
        return
      }

      if (document.body.getBoundingClientRect().top === 0) {
        containerTweenRef.current.restart()
      } else if (!containerTweenRef.current.reversed()) {
        containerTweenRef.current.reverse()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      gsapContext.kill()
      window.removeEventListener('scroll', handleScroll)
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
        {lettersRef.current.list.map((letter) => (
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
            className={lettersClasses.letter}
          />
        ))}
      </svg>
    </div>
  )
}

export default Letters
