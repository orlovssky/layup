import { gsap } from 'gsap'
import { nanoid } from 'nanoid'
import { PiArrowUpRightBold } from 'react-icons/pi'
import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react'

import blinkingAnchorClasses from '../assets/styles/blinkingAnchor.module.css'
import { Props, AnchorRef } from '../lib/typings/blinkingAnchor'
import makeGetDelay from '../lib/utils/makeGetDelay'
import makeGetOddRepeat from '../lib/utils/makeGetOddRepeat'

const BlinkingAnchor = forwardRef<AnchorRef, Props>(
  (
    {
      text,
      link,
      delays = [0, 0.8],
      delayTick = 0.1,
      repeats = [1, 7],
      repeatTick = 2,
      blinkOnMount = false,
      blinkOnHover = false,
    },
    ref,
  ) => {
    const anchorRef = useRef<HTMLAnchorElement>(null)
    const lettersRef = useRef(
      [...text].map((letter, letterIndex) => ({
        id: `${nanoid()}-${letterIndex}`,
        letter,
      })),
    )
    const timelineRef = useRef(
      gsap.timeline({
        paused: !blinkOnMount,
      }),
    )

    useImperativeHandle(ref, () => ({
      current: anchorRef.current,
    }))

    useEffect(() => {
      const getDelay = makeGetDelay(delays, delayTick)
      const getOddRepeat = makeGetOddRepeat(repeats, repeatTick)
      const children = gsap.utils.toArray<HTMLSpanElement>(
        anchorRef.current?.children || null,
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
            0,
          )
        }
      }, anchorRef)

      return () => {
        gsapContext.revert()
      }
    }, [delays, delayTick, repeats, repeatTick])

    return (
      <a
        ref={anchorRef}
        href={link}
        target="_blank"
        rel="noreferrer"
        className={blinkingAnchorClasses.anchor}
        onMouseEnter={() => {
          if (blinkOnHover) {
            timelineRef.current.restart()
          }
        }}
      >
        {lettersRef.current.map(({ id, letter }) => (
          <span key={id}>{letter}</span>
        ))}
        <PiArrowUpRightBold className={blinkingAnchorClasses.icon} />
      </a>
    )
  },
)

BlinkingAnchor.displayName = 'BlinkingAnchor'

export default BlinkingAnchor
