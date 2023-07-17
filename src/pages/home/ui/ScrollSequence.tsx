import { ScrollTrigger } from 'gsap-trial/ScrollTrigger'
import { gsap } from 'gsap-trial'
import { useEffect, useRef } from 'react'

import scrollSequenceClasses from '../assets/styles/scrollSequence.module.css'

gsap.registerPlugin(ScrollTrigger)

const ScrollSequence = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesCountRef = useRef(55)

  useEffect(() => {
    Promise.all(
      Array.from(Array(framesCountRef.current)).map(
        (_, index) =>
          import(`../assets/images/some/OFFF_Hero_landing_V3_${index}.webp`)
      )
    ).then((importedImages) => {
      const canvasContext = canvasRef.current?.getContext('2d')

      if (!canvasContext || !canvasRef.current) {
        return
      }

      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
      const frames = { frame: 0 }
      const images: HTMLImageElement[] = importedImages.map((importedImage) => {
        const image = new Image()
        image.src = importedImage.default

        return image
      })

      const handleUpdate = () => {
        if (canvasRef.current) {
          const { width, height } = canvasRef.current

          canvasContext.clearRect(0, 0, width, height)
          canvasContext.drawImage(images[frames.frame], 0, 0, width, height)
        }
      }

      gsap.to(frames, {
        frame: framesCountRef.current - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          end: 2000,
          scrub: 0.5,
        },
        onUpdate: handleUpdate,
      })
    })
  }, [])

  return (
    <div ref={containerRef}>
      <canvas ref={canvasRef} className={scrollSequenceClasses.canvas} />
      <div style={{ height: '100vh' }} />
      <div style={{ height: 6000 }} />
    </div>
  )
}

export default ScrollSequence
