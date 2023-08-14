import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { gsap } from 'gsap'
import { nanoid } from 'nanoid'
import { PiMoonFill, PiSunFill } from 'react-icons/pi'
import { useEffect, useRef } from 'react'

import toggleClasses from '../assets/styles/toggle.module.css'
import MODE from '../lib/constants/MODE'
import getMode from '../lib/utils/getMode'
import { setLocal } from '../lib/utils/localStorage'
import toggleMode from '../lib/utils/toggleMode'

gsap.registerPlugin(MorphSVGPlugin)

const Toggle = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<GSAPTween | null>(null)
  const idsRef = useRef({
    sun: `${nanoid()}-sun`,
    moon: `${nanoid()}-moon`,
  })

  const handleClick = () => {
    if (!tweenRef.current) {
      return
    }

    toggleMode()
    setLocal(getMode())

    if (tweenRef.current.reversed()) {
      tweenRef.current.restart()
    } else {
      tweenRef.current.reverse()
    }
  }

  useEffect(() => {
    const gsapContext = gsap.context(() => {
      const sun = document.getElementById(idsRef.current.sun)
        ?.firstChild as SVGPathElement
      const moon = document.getElementById(idsRef.current.moon)
        ?.firstChild as SVGPathElement

      if (sun && moon) {
        tweenRef.current = gsap.to(sun, {
          morphSVG: moon,
          duration: 0.3,
          ease: 'linear',
          paused: true,
        })

        if (getMode() === MODE.DARK) {
          tweenRef.current.reverse()
        } else {
          tweenRef.current.restart()
        }
      }
    }, containerRef)

    return () => {
      gsapContext.revert()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className={toggleClasses.container}
    >
      <PiSunFill id={idsRef.current.sun} className={toggleClasses.sun} />
      <PiMoonFill id={idsRef.current.moon} className={toggleClasses.moon} />
    </div>
  )
}

export default Toggle
