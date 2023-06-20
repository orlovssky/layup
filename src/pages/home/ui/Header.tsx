import BlinkingAnchor from 'features/blinkingAnchor'
import { gsap } from 'gsap-trial'
import { useEffect, useRef } from 'react'
import { LogoIcon } from 'shared/assets'

import headerClasses from '../assets/styles/header.module.css'

const Header = () => {
  const headerRef = useRef<HTMLHeadingElement>(null)
  const headerUpTweenRef = useRef<gsap.core.Tween | null>(null)
  const headerDownTweenRef = useRef<gsap.core.Tween | null>(null)
  const headerAnimationRef = useRef<{
    animated: boolean
    direction: 'down' | 'up' | null
  }>({
    animated: false,
    direction: null,
  })

  useEffect(() => {
    const gsapContext = gsap.context(() => {
      if (headerRef.current) {
        headerUpTweenRef.current = gsap.to(headerRef.current, {
          top: -100,
          duration: 0.5,
          ease: 'back.in',
          paused: true,
          onComplete: () => {
            headerAnimationRef.current = {
              ...headerAnimationRef.current,
              animated: false,
            }
          },
        })
        headerDownTweenRef.current = gsap.to(headerRef.current, {
          top: 0,
          duration: 0.5,
          ease: 'back.out',
          paused: true,
          onComplete: () => {
            headerAnimationRef.current = {
              ...headerAnimationRef.current,
              animated: false,
            }
          },
        })
      }
    }, headerRef)

    let scrollPosition = 0

    const handleScroll = () => {
      const { top } = document.body.getBoundingClientRect()
      const { animated, direction } = headerAnimationRef.current

      if (top > scrollPosition) {
        if (!animated && [null, 'down'].includes(direction)) {
          headerAnimationRef.current = {
            animated: true,
            direction: 'up',
          }
          headerDownTweenRef.current?.restart()
        }
      } else {
        if (!animated && [null, 'up'].includes(direction)) {
          headerAnimationRef.current = {
            animated: true,
            direction: 'down',
          }
          headerUpTweenRef.current?.restart()
        }
      }

      scrollPosition = top
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      gsapContext.kill()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header ref={headerRef} className={headerClasses.header}>
      <BlinkingAnchor text="NBA" link="https://www.nba.com/" />
      <LogoIcon className={headerClasses.logo} />
      <BlinkingAnchor text="FIBA" link="https://www.fiba.basketball/" />
    </header>
  )
}

export default Header
