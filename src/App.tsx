import MorphSVGPlugin from 'gsap-trial/MorphSVGPlugin'
import gsap from 'gsap-trial'
import letters from 'letters'
import { nanoid } from 'nanoid'
import {
  createRef,
  MouseEventHandler,
  RefObject,
  useEffect,
  useRef,
} from 'react'

import './App.scss'

gsap.registerPlugin(MorphSVGPlugin)

interface LetterRef {
  ref: RefObject<SVGPathElement>
  id: string
  value: string
  idle: string
  stretched: string
}

const App = () => {
  const lettersSvgRef = useRef<SVGSVGElement>(null)
  const tl = useRef<gsap.core.Timeline>()
  const lettersRef = useRef<LetterRef[]>(
    letters.map((letter) => ({
      ref: createRef<SVGPathElement>(),
      id: nanoid(),
      ...letter,
    }))
  )

  const handleMouseMove: MouseEventHandler = (event) => {
    if (lettersSvgRef.current && tl.current) {
      const { left, right, width } =
        lettersSvgRef.current.getBoundingClientRect()
      const center = left + width / 2

      if (event.pageX > center) {
        const positionToCenter = 1 - (event.pageX - center) / (right - center)

        gsap.to(tl.current, {
          progress: positionToCenter.toFixed(2),
          duration: 0.5,
          overwrite: true,
        })
      } else if (event.pageX >= left) {
        const positionToCenter = (event.pageX - left) / (center - left)

        gsap.to(tl.current, {
          progress: positionToCenter.toFixed(2),
          duration: 0.5,
          overwrite: true,
        })
      }
    }
  }

  useEffect(() => {
    tl.current = gsap.timeline({
      paused: true,
    })

    for (const letter of lettersRef.current) {
      if (tl.current && letter.ref.current) {
        tl.current.fromTo(
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
    <svg
      ref={lettersSvgRef}
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
  )
}

export default App
