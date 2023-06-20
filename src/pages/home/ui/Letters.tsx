import { MorphSVGPlugin } from 'gsap-trial/MorphSVGPlugin'
import { gsap } from 'gsap-trial'
import { nanoid } from 'nanoid'
import { createRef, MouseEventHandler, useRef, useEffect } from 'react'

import lettersClasses from '../assets/styles/letters.module.css'
import letters from '../lib/static/letters'
import { Letter } from '../lib/typings/letters'

gsap.registerPlugin(MorphSVGPlugin)

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
  const lettersRef = useRef<Letter[]>(
    letters.map((letter) => ({
      ref: createRef<SVGPathElement>(),
      id: nanoid(),
      tween: null,
      ...letter,
    }))
  )

  const handleMouseMove: MouseEventHandler = (event) => {
    if (!svgRef.current) return

    const { width: svgWidth } = svgRef.current.getBoundingClientRect()

    for (const { ref, tween } of lettersRef.current) {
      if (ref.current && svgRef.current) {
        const {
          width: letterWidth,
          left: letterLeft,
          right: letterRight,
        } = ref.current.getBoundingClientRect()
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
    for (const letter of lettersRef.current) {
      gsap.to(letter.tween, {
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
          console.log('asdas')
          containerAnimationRef.current = {
            ...containerAnimationRef.current,
            animated: false,
          }
        },
      })

      for (const letter of lettersRef.current) {
        letter.tween = gsap.fromTo(
          letter.ref.current,
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

    const handleScroll = () => {
      const { top } = document.body.getBoundingClientRect()
      const { animated, direction, initiated } = containerAnimationRef.current
      console.log('==================')
      console.log(top)
      console.log(animated)
      console.log(direction)
      console.log('==================')

      if (top < -30) {
        if (!animated && [null, 'down'].includes(direction)) {
          containerAnimationRef.current = {
            animated: true,
            direction: 'up',
            initiated: true,
          }
          containerTweenRef.current?.restart()
        }
      } else {
        if (initiated && !animated && [null, 'up'].includes(direction)) {
          containerAnimationRef.current = {
            ...containerAnimationRef.current,
            animated: true,
            direction: 'down',
          }
          containerTweenRef.current?.reverse()
        }
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
        {lettersRef.current.map((letter) => (
          <path
            key={letter.id}
            ref={letter.ref}
            d={letter.idle}
            className={lettersClasses.letter}
          />
        ))}
      </svg>
    </div>
  )
}

export default Letters
