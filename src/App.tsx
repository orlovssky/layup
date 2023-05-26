import MorphSVGPlugin from 'gsap-trial/MorphSVGPlugin'
import gsap from 'gsap-trial'
import { useEffect, useRef } from 'react'

import './App.scss'

gsap.registerPlugin(MorphSVGPlugin)

const App = () => {
  const smallB = useRef<SVGPathElement>(null)
  const longB = useRef<SVGPathElement>(null)

  const startMorph = () => {
    if (smallB.current && longB.current) {
      const tl = gsap.timeline()

      tl.fromTo(
        smallB.current,
        {
          morphSVG: smallB.current,
        },
        {
          morphSVG: longB.current,
          duration: 2,
          visibility: 'unset',
          type: 'linear',
        }
      )
    }
  }

  useEffect(() => {
    if (smallB.current && longB.current) {
      const tl = gsap.timeline()
      tl.to(smallB.current, {
        morphSVG: longB.current,
        duration: 2,
        paused: true,
      })
    }
  }, [])

  return (
    <>
      <svg
        width="100"
        height="784"
        viewBox="0 0 100 784"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            ref={smallB}
            d="M60 190.88H0V0H58.6638V23.9236H25.1962V77.1792H55.0371V100.53H25.1962V167.02H60V190.944V190.88Z"
            fill="black"
          />
        </g>

        <g>
          <path
            ref={longB}
            d="M60 636.267H0V0H58.6638V23.9236H25.1962V522.566H55.0371V545.917H25.1962V612.407H60V636.331V636.267Z"
            fill="black"
          />
        </g>
      </svg>

      <button onClick={startMorph}>some</button>
    </>
  )
}

export default App
