import { gsap } from 'gsap-trial'
import { nanoid } from 'nanoid'
import { useEffect, useRef } from 'react'

import blinkingAnchorClasses from '../assets/styles/blinkingAnchor.module.css'

const BlinkingAnchor = ({ text, link }: { text: string; link: string }) => {
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const lettersRef = useRef(
    [...text].map((letter) => ({
      id: nanoid(),
      letter,
    }))
  )
  const delaysRef = useRef<number[]>([])
  const repeatsRef = useRef<number[]>([])
  const timeline = useRef(gsap.timeline({ paused: true }))

  const handleMouseEnter = () => {
    timeline.current.restart()
  }

  useEffect(() => {
    const getDelay = (): number => {
      const delay = +(Math.random() * 0.8).toFixed(1)

      if (delaysRef.current.includes(delay)) {
        return getDelay()
      } else {
        delaysRef.current.push(delay)

        return delay
      }
    }

    const getRepeat = (): number => {
      const randomDigit = Math.floor(Math.random() * (6 - 1 + 1)) + 1
      const repeat = randomDigit % 2 == 0 ? randomDigit + 1 : randomDigit

      if (repeatsRef.current.includes(repeat)) {
        return getRepeat()
      } else {
        repeatsRef.current.push(repeat)

        return repeat
      }
    }

    delaysRef.current = []
    repeatsRef.current = []

    if (anchorRef.current) {
      gsap.utils
        .toArray<HTMLSpanElement>(anchorRef.current.children)
        .forEach((child) => {
          timeline.current.fromTo(
            child,
            {
              opacity: 1,
            },
            {
              opacity: 0.2,
              duration: 0.2,
              ease: 'power',
              yoyo: true,
              repeat: getRepeat(),
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
