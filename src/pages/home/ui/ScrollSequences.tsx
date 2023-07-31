import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

import scrollSequencesClasses from '../assets/styles/scrollSequences.module.css'
import useSequencesStore from '../model/store/useSequencesStore'

gsap.registerPlugin(ScrollTrigger)

const height = 5000

const ScrollSequences = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { sequences, count } = useSequencesStore((state) => state)

  useEffect(() => {
    const gsapContext = gsap.context(() => {
      const canvasContext = canvasRef.current?.getContext('2d')

      if (!canvasContext || !canvasRef.current) {
        return
      }

      const frames = { frame: 0 }
      canvasRef.current.height = sequences[1].height
      canvasRef.current.width = sequences[1].width

      const handleUpdate = () => {
        if (canvasRef.current) {
          const { width, height } = canvasRef.current

          canvasContext.clearRect(0, 0, width, height)
          canvasContext.drawImage(sequences[frames.frame], 0, 0, width, height)
        }
      }

      gsap.to(frames, {
        frame: count - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          end: `+=${height}`,
          scrub: 0.3,
        },
        onUpdate: handleUpdate,
      })
    }, containerRef)

    return () => {
      gsapContext.kill()
    }
  }, [sequences, count])

  return (
    <div ref={containerRef}>
      <canvas ref={canvasRef} className={scrollSequencesClasses.canvas} />
      <div style={{ height: `${height}px` }} />
    </div>
  )
}

export default ScrollSequences
