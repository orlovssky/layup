import { gsap } from 'gsap-trial'
import { nanoid } from 'nanoid'
import { useEffect, useRef } from 'react'

import blinkingAnchorClasses from '../assets/styles/blinkingAnchor.module.css'
import makeGetDelay from '../lib/utils/makeGetDelay'
import makeGetOddRepeat from '../lib/utils/makeGetOddRepeat'

const getDelay = makeGetDelay(0, 0.8)
const getOddRepeat = makeGetOddRepeat(1, 7)

const BlinkingAnchor = ({ text, link }: { text: string; link: string }) => {
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const lettersRef = useRef(
    [...text].map((letter, letterIndex) => ({
      id: `${nanoid()}-${-letterIndex}`,
      letter,
    }))
  )
  const timelineRef = useRef(
    gsap.timeline({
      paused: true,
    })
  )

  useEffect(() => {
    const children = gsap.utils.toArray<HTMLSpanElement>(
      anchorRef.current?.children || null
    )

    const gsapContext = gsap.context(() => {
      for (const child of children) {
        timelineRef.current.fromTo(
          child,
          { opacity: 1 },
          {
            opacity: 0.15,
            duration: 0.2,
            yoyo: true,
            repeat: getOddRepeat(),
            delay: getDelay(),
          },
          0
        )
      }
    }, anchorRef)

    return () => {
      gsapContext.revert()
    }
  }, [])

  return (
    <a
      ref={anchorRef}
      href={link}
      target="_blank"
      rel="noreferrer"
      className={blinkingAnchorClasses.anchor}
      onMouseEnter={() => {
        timelineRef.current.restart()
      }}
    >
      {lettersRef.current.map(({ id, letter }) => (
        <span key={id}>{letter}</span>
      ))}
    </a>
  )
}

export default BlinkingAnchor
