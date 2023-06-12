import { gsap } from 'gsap-trial'
import { nanoid } from 'nanoid'
import { useEffect, useRef } from 'react'

import blinkingAnchorClasses from '../assets/styles/blinkingAnchor.module.css'
import makeGetDelay from '../lib/utils/makeGetDelay'
import makeGetOddRepeat from '../lib/utils/makeGetOddRepeat'

const BlinkingAnchor = ({ text, link }: { text: string; link: string }) => {
  const timelineRef = useRef(gsap.timeline({ paused: true }))
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const lettersRef = useRef(
    [...text].map((letter) => ({ id: nanoid(), letter: letter }))
  )

  const handleMouseEnter = () => {
    timelineRef.current.restart()
  }

  useEffect(() => {
    const gsapContext = gsap.context(() => {
      if (anchorRef.current) {
        const getDelay = makeGetDelay(0, 0.8)
        const getOddRepeat = makeGetOddRepeat(1, 7)

        gsap.utils
          .toArray<HTMLSpanElement>(anchorRef.current.children)
          .forEach((child) => {
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
          })
      }
    }, anchorRef)

    return () => gsapContext.kill()
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
