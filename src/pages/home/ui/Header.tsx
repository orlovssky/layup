import BlinkingAnchor from 'features/blinkingAnchor'
import { gsap } from 'gsap-trial'
import { useEffect, useRef } from 'react'
import { MainLogo } from 'shared/main'

import headerClasses from '../assets/styles/header.module.css'
import { Animation } from '../lib/typings/header'

const Header = () => {
  const headerRef = useRef<HTMLElement>(null)
  const animationRef = useRef<Animation>({
    tween: null,
    scrollPosition: 0,
    animationStarted: false,
  })

  useEffect(() => {
    const gsapContext = gsap.context(() => {
      animationRef.current.tween = gsap.to(headerRef.current, {
        top: 0,
        duration: 0.5,
        ease: 'back.out',
        paused: document.body.getBoundingClientRect().top !== 0,
        onStart: () => {
          animationRef.current.animationStarted = true
        },
      })
    }, headerRef)

    const handleScroll: EventListener = () => {
      if (!animationRef.current.tween) {
        return
      }

      const { top } = document.body.getBoundingClientRect()
      const up = top > animationRef.current.scrollPosition

      if (up) {
        if (!animationRef.current.animationStarted) {
          animationRef.current.tween.restart()
        }
      } else {
        if (!animationRef.current.tween.reversed()) {
          animationRef.current.animationStarted = false
          animationRef.current.tween.reverse()
        }
      }

      animationRef.current.scrollPosition = top
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      gsapContext.revert()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header ref={headerRef} className={headerClasses.header}>
      <BlinkingAnchor text="NBA" link="https://www.nba.com/" />
      <MainLogo className={headerClasses.logo} />
      <BlinkingAnchor text="FIBA" link="https://www.fiba.basketball/" />
    </header>
  )
}

export default Header
