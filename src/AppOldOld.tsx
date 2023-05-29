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

const App = () => {
  const tl = useRef<gsap.core.Timeline>()
  const lettersRef = useRef<
    {
      ref: RefObject<SVGPathElement>
      id: string
      value: string
      idle: string
      stretched: string
    }[]
  >(
    letters.map((letter) => ({
      ref: createRef<SVGPathElement>(),
      id: nanoid(),
      ...letter,
    }))
  )

  const handleMouseMove: MouseEventHandler = (event) => {
    console.log(event)
  }

  useEffect(() => {
    tl.current = gsap.timeline({
      paused: true,
    })

    for (const letter of lettersRef.current) {
      if (tl.current && letter.ref.current) {
        const { left, width } = letter.ref.current.getBoundingClientRect()

        console.log(left, left + width)
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
      width="117"
      height="100"
      viewBox="0 0 117 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseMove={handleMouseMove}
    >
      {lettersRef.current.map(({ ref, id, idle }) => (
        <path key={id} ref={ref} d={idle} fill="black" />
      ))}
    </svg>
  )
}

export default App
