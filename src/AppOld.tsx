import MorphSVGPlugin from 'gsap-trial/MorphSVGPlugin'
import gsap from 'gsap-trial'
import { useEffect, useRef, MouseEventHandler } from 'react'

import './App.scss'

gsap.registerPlugin(MorphSVGPlugin)
const smallLetter =
  'M60 635.88H0V445H58.6638V468.924H25.1962V522.179H55.0371V545.53H25.1962V612.02H60V635.944V635.88Z'
const longLetter =
  'M60 636.267H0V0H58.6638V23.9236H25.1962V522.566H55.0371V545.917H25.1962V612.407H60V636.331V636.267Z'

const App = () => {
  const tl = useRef<gsap.core.Timeline>()
  const letterPath = useRef<SVGPathElement>(null)
  const letterSvg = useRef<SVGSVGElement>(null)

  const handleMouseMove: MouseEventHandler = (event) => {
    if (letterSvg.current && tl.current) {
      const { left, right, width } = letterSvg.current.getBoundingClientRect()
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
    tl.current = gsap
      .timeline({
        paused: true,
      })
      .addLabel('start')
      .fromTo(
        letterPath.current,
        {
          morphSVG: smallLetter,
        },
        {
          morphSVG: longLetter,
          ease: 'linear',
        },
        'start'
      )
  }, [])

  return (
    <>
      <svg
        ref={letterSvg}
        width="60"
        height="637"
        viewBox="0 0 60 637"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onMouseMove={handleMouseMove}
      >
        <g>
          <path ref={letterPath} d={smallLetter} fill="black" />
        </g>
      </svg>
    </>
  )
}

export default App
