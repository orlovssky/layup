import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

import scrollSequencesClasses from '../assets/styles/scrollSequences.module.css'
import useSequencesStore from '../model/store/useSequencesStore'

gsap.registerPlugin(ScrollTrigger)

const height = 5000
let showed = false

const ScrollSequences = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tweenRef = useRef<GSAPTween | null>(null)
  const { sequences, count } = useSequencesStore((state) => state)

  const handleWindowResize = () => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }
  }

  const handleWindowScroll = () => {
    if (window.scrollY === 0) {
      tweenRef.current?.reverse()
      showed = false
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    window.addEventListener('scroll', handleWindowScroll)

    const gsapContext = gsap.context(() => {
      const canvasContext = canvasRef.current?.getContext('2d')

      if (!canvasContext || !canvasRef.current) {
        return
      }

      tweenRef.current = gsap.to(canvasRef.current, {
        opacity: 1,
        duration: 0.2,
        paused: true,
      })

      const frames = { frame: 0 }
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
      const sequenceWidth = sequences[0].width
      const sequenceHeight = sequences[0].height

      const handleUpdate = () => {
        if (!showed && window.scrollY !== 0) {
          showed = true
          tweenRef.current?.restart()
        }

        if (canvasRef.current) {
          const { width, height } = canvasRef.current
          const scaleFactor = Math.max(
            width / sequenceWidth,
            height / sequenceHeight,
          )
          const newWidth = sequenceWidth * scaleFactor
          const newHeight = sequenceHeight * scaleFactor
          const x = width / 2 - newWidth / 2
          const y = height / 2 - newHeight / 2

          canvasContext.clearRect(0, 0, width, height)
          canvasContext.drawImage(
            sequences[frames.frame],
            x,
            y,
            newWidth,
            newHeight,
          )
        }
      }

      gsap.to(frames, {
        frame: count - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          end: `+=${height}`,
          scrub: 0.2,
        },
        onUpdate: handleUpdate,
      })
    }, containerRef)

    return () => {
      gsapContext.kill()
      window.removeEventListener('resize', handleWindowResize)
      window.removeEventListener('scroll', handleWindowScroll)
    }
  }, [sequences])

  return (
    <div ref={containerRef}>
      <canvas ref={canvasRef} className={scrollSequencesClasses.canvas} />
      <div style={{ height: `${height}px` }} />
    </div>
  )
}

export default ScrollSequences
