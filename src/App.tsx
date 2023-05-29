import MorphSVGPlugin from 'gsap-trial/MorphSVGPlugin'
import gsap from 'gsap-trial'
import letters from 'letters'
import { nanoid } from 'nanoid'
import { createRef, MouseEvent, RefObject, useEffect, useRef } from 'react'

import './App.scss'

gsap.registerPlugin(MorphSVGPlugin)

interface Letter {
  svgRef: RefObject<SVGSVGElement>
  pathRef: RefObject<SVGPathElement>
  id: string
  value: string
  idle: string
  stretched: string
  viewBox: string
}

const App = () => {
  const letterTimelinesRef = useRef<gsap.core.Timeline[]>([])
  const lettersRef = useRef<Letter[]>(
    letters.map((letter) => ({
      svgRef: createRef<SVGSVGElement>(),
      pathRef: createRef<SVGPathElement>(),
      id: nanoid(),
      ...letter,
    }))
  )

  const handleMouseMove = (
    event: MouseEvent,
    { letter, letterIndex }: { letter: Letter; letterIndex: number }
  ) => {
    if (letterTimelinesRef.current && letter.svgRef.current) {
      const { left, right, width } =
        letter.svgRef.current.getBoundingClientRect()
      const center = left + width / 2
      let positionToCenter

      if (event.pageX > center) {
        positionToCenter = 1 - (event.pageX - center) / (right - center)
      } else if (event.pageX >= left) {
        positionToCenter = (event.pageX - left) / (center - left)
      }

      if (positionToCenter !== undefined) {
        gsap.to(letterTimelinesRef.current[letterIndex], {
          progress: positionToCenter.toFixed(2),
          duration: 0.5,
          overwrite: true,
        })
      }
    }
  }

  const handleMouseLeave = (
    _: MouseEvent,
    { letter, letterIndex }: { letter: Letter; letterIndex: number }
  ) => {
    if (letterTimelinesRef.current && letter.svgRef.current) {
      gsap.to(letterTimelinesRef.current[letterIndex], {
        progress: 0,
        duration: 0.5,
        overwrite: true,
      })
    }
  }

  useEffect(() => {
    for (const letter of lettersRef.current) {
      if (letterTimelinesRef.current && letter.pathRef.current) {
        letterTimelinesRef.current.push(
          gsap
            .timeline({
              paused: true,
            })
            .fromTo(
              letter.pathRef.current,
              {
                morphSVG: letter.idle,
              },
              {
                morphSVG: letter.stretched,
                ease: 'linear',
              }
            )
        )
      }
    }
  }, [])

  return (
    <main>
      {lettersRef.current.map((letter, letterIndex) => (
        <svg
          key={letter.id}
          ref={letter.svgRef}
          viewBox={letter.viewBox}
          onMouseMove={(event) =>
            handleMouseMove(event, { letter, letterIndex })
          }
          onMouseLeave={(event) =>
            handleMouseLeave(event, { letter, letterIndex })
          }
        >
          <path ref={letter.pathRef} d={letter.idle} fill="black" />
        </svg>
      ))}
    </main>
  )
}

export default App
