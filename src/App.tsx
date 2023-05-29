import MorphSVGPlugin from 'gsap-trial/MorphSVGPlugin'
import gsap from 'gsap-trial'
import letters from 'letters'
import { nanoid } from 'nanoid'
import {
  createRef,
  MouseEventHandler,
  RefObject,
  useRef,
  useEffect,
} from 'react'

import './App.scss'

gsap.registerPlugin(MorphSVGPlugin)

interface Letter {
  ref: RefObject<SVGPathElement>
  id: string
  value: string
  idle: string
  stretched: string
}

const App = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const lettersRef = useRef<Letter[]>(
    letters.map((letter) => ({
      ref: createRef<SVGPathElement>(),
      id: nanoid(),
      ...letter,
    }))
  )
  const timelineRef = useRef<gsap.core.Timeline>(
    gsap.timeline({ paused: true })
  )

  const handleMouseMove: MouseEventHandler = (event) => {
    if (svgRef.current) {
      const { left, right, width } = svgRef.current.getBoundingClientRect()
      const center = left + width / 2

      if (event.pageX > center) {
        const positionToCenter = 1 - (event.pageX - center) / (right - center)
        gsap.to(timelineRef.current, {
          progress: positionToCenter.toFixed(2),
          duration: 0.5,
          overwrite: true,
        })
      } else if (event.pageX >= left) {
        const positionToCenter = (event.pageX - left) / (center - left)

        gsap.to(timelineRef.current, {
          progress: positionToCenter.toFixed(2),
          duration: 0.5,
          overwrite: true,
        })
      }
    }
  }

  useEffect(() => {
    for (const letter of lettersRef.current) {
      if (letter.ref.current) {
        timelineRef.current.fromTo(
          letter.ref.current,
          {
            morphSVG: letter.idle,
          },
          {
            morphSVG: letter.stretched,
            ease: 'linear',
          }
        )
      }
    }
  }, [])

  return (
    <main>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        width="117"
        height="100"
        viewBox="0 0 117 100"
        fill="none"
        onMouseMove={handleMouseMove}
      >
        {lettersRef.current.map((letter) => (
          <path key={letter.id} ref={letter.ref} d={letter.idle} fill="black" />
        ))}
      </svg>
    </main>
  )
}

export default App
