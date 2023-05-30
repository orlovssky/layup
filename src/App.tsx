import { MorphSVGPlugin } from 'gsap-trial/MorphSVGPlugin'
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger'
import { gsap } from 'gsap-trial'
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

gsap.registerPlugin(MorphSVGPlugin, ScrollTrigger)

interface Letter {
  ref: RefObject<SVGPathElement>
  id: string
  value: string
  idle: string
  stretched: string
  tween: gsap.core.Tween | null
}

const App = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<Letter[]>(
    letters.map((letter) => ({
      ref: createRef<SVGPathElement>(),
      id: nanoid(),
      tween: null,
      ...letter,
    }))
  )

  useEffect(() => {
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

    if (svgRef.current && divRef.current) {
      gsap.to(svgRef.current, {
        scrollTrigger: {
          trigger: divRef.current,
          end: '+=300',
          scrub: 0.5,
        },
        width: 0,
        opacity: 0,
      })
    }
  }, [])

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
        duration: 0.5,
        overwrite: true,
      })
    }
  }

  return (
    <main>
      <div className="svg-container">
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          width="128"
          height="100"
          viewBox="0 0 128 100"
          fill="none"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {lettersRef.current.map((letter) => (
            <path
              key={letter.id}
              ref={letter.ref}
              d={letter.idle}
              fill="black"
            />
          ))}
        </svg>
      </div>

      <div className="bottom" />
      <div ref={divRef} className="bottom" />
    </main>
  )
}

export default App
