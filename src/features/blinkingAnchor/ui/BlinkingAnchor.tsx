import { gsap } from 'gsap-trial'
import { nanoid } from 'nanoid'
import { useEffect, useRef } from 'react'

import blinkingAnchorClasses from '../assets/styles/blinkingAnchor.module.css'

const BlinkingAnchor = ({ text, link }: { text: string; link: string }) => {
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const lettersRef = useRef(
    [...text].map((letter) => ({ id: nanoid(), letter: letter }))
  )
  const lastDelaysRef = useRef<number[]>([])
  const lastRepeatsRef = useRef<number[]>([])
  const timelineRef = useRef(gsap.timeline({ paused: true }))

  const handleMouseEnter = () => {
    timelineRef.current.restart()
  }

  useEffect(() => {
    const getDelay = (): number => {
      const min = 0
      const max = 0.6
      let delay = +(min + Math.random() * (max - min)).toFixed(1)

      if (lastDelaysRef.current.length === 3) {
        lastDelaysRef.current = []
      }

      if (lastDelaysRef.current.includes(delay)) {
        delay += 0.1
      }

      lastDelaysRef.current.push(delay)

      return delay
    }

    const getOddRepeat = (): number => {
      const min = 2
      const max = 5
      const randomInt = Math.floor(min + Math.random() * (max - min + 1))
      let repeatOdd = randomInt % 2 === 0 ? randomInt - 1 : randomInt

      if (lastRepeatsRef.current.length === 3) {
        lastRepeatsRef.current = []
      }

      if (lastRepeatsRef.current.includes(repeatOdd)) {
        repeatOdd = repeatOdd === 5 ? 3 : repeatOdd + 2
      }

      lastRepeatsRef.current.push(repeatOdd)

      return repeatOdd
    }

    if (anchorRef.current) {
      gsap.utils
        .toArray<HTMLSpanElement>(anchorRef.current.children)
        .forEach((child) => {
          timelineRef.current.fromTo(
            child,
            {
              opacity: 1,
            },
            {
              opacity: 0.15,
              duration: 0.2,
              yoyo: true,
              repeat: getOddRepeat(),
              delay: getDelay(),
            },
            0
          )
        })
    }
  }, [])

  return (
    <a
      ref={anchorRef}
      href={link}
      target="_blank"
      rel="noreferrer"
      className={blinkingAnchorClasses.anchor}
      onMouseEnter={handleMouseEnter}
    >
      {lettersRef.current.map(({ id, letter }) => (
        <span key={id}>{letter}</span>
      ))}
    </a>
  )
}

export default BlinkingAnchor
